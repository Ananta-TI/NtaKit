import { useRef, useCallback, useState, useEffect, useContext } from 'react';
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext.jsx";

/* ─────────────────────────────────────────────
   Helper Functions for BorderGlow Effect
───────────────────────────────────────────── */
function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers = [
    [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
  ];
  return layers.map(([x, y, blur, spread, alpha, inset]) => {
    const a = Math.min(alpha * intensity, 100);
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(', ');
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors) {
  const gradients = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

/* ─────────────────────────────────────────────
   Main Button Component
───────────────────────────────────────────── */
function NtaButton({
  text = "Click Me",
  onClick,
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 12,
  glowRadius = 40,
  glowIntensity = 0.8,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) {
  const { isDarkMode } = useContext(ThemeContext);
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [sweepActive, setSweepActive] = useState(false);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx; const dy = y - cy;
    let kx = Infinity; let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx; const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current; if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    setEdgeProximity(getEdgeProximity(card, x, y));
    setCursorAngle(getCursorAngle(card, x, y));
  }, [getEdgeProximity, getCursorAngle]);

  useEffect(() => {
    if (!animated) return;
    const angleStart = 110; const angleEnd = 465;
    setSweepActive(true); setCursorAngle(angleStart);
    animateValue({ duration: 500, onUpdate: v => setEdgeProximity(v / 100) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart);
    }});
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart);
    }});
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => setEdgeProximity(v / 100),
      onEnd: () => setSweepActive(false),
    });
  }, [animated]); // <-- PERBAIKAN DI SINI: id dihapus

  const colorSensitivity = edgeSensitivity + 20;
  const isVisible = isHovered || sweepActive;
  const borderOpacity = isVisible ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity)) : 0;
  const glowOpacity = isVisible ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity)) : 0;

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map(g => `${g} border-box`);
  const fillBg = meshGradients.map(g => `${g} padding-box`);
  const angleDeg = `${cursorAngle.toFixed(3)}deg`;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-grid',
        isolation: 'isolate',
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        overflow: 'hidden',
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: 'translate3d(0, 0, 0.01px)',
        boxShadow: isDarkMode 
          ? 'rgba(0,0,0,0.3) 0 4px 12px' 
          : 'rgba(0,0,0,0.05) 0 4px 12px',
      }}
    >
      {/* mesh gradient border */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: -1,
        border: '1px solid transparent',
        background: [`linear-gradient(${backgroundColor} 0 100%) padding-box`, 'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box', ...borderBg].join(', '),
        opacity: borderOpacity,
        maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
        WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
        transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
      }} />

      {/* mesh gradient fill */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: -1,
        border: '1px solid transparent',
        background: fillBg.join(', '),
        opacity: borderOpacity * fillOpacity,
        mixBlendMode: isDarkMode ? 'soft-light' : 'multiply',
        transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
      }} />

      {/* outer glow */}
      <span style={{
        position: 'absolute', pointerEvents: 'none', zIndex: 1, borderRadius: 'inherit',
        inset: `${-glowRadius}px`,
        maskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
        WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
        opacity: glowOpacity,
        mixBlendMode: isDarkMode ? 'plus-lighter' : 'multiply',
        transition: isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out',
      }}>
        <span style={{
          position: 'absolute', borderRadius: 'inherit',
          inset: `${glowRadius}px`,
          boxShadow: buildBoxShadow(glowColor, glowIntensity),
        }} />
      </span>

      {/* button content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onClick}
          style={{
            padding: '12px 32px',
            width: '100%',
            borderRadius: 'inherit',
            fontWeight: '700',
            backgroundColor: 'transparent',
            color: isDarkMode ? 'white' : '#1a1a1a',
            border: 'none', outline: 'none', cursor: 'pointer',
            fontSize: '14px',
            letterSpacing: '0.02em'
          }}
        >
          {text}
        </motion.button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HALAMAN UTAMA (Showcase)
───────────────────────────────────────────── */
export default function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12 px-6 gap-14 font-sans bg-transparent">
      
      

      {/* Buttons Grid */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-2xl mx-auto w-full">
        
        {/* Cyberpunk Neon */}
        <NtaButton
          text="System Access"
          animated={true}
          backgroundColor={isDarkMode ? "#0a0a12" : "#fdf2ff"}
          glowColor={isDarkMode ? "300 100 60" : "300 80 80"}
          colors={['#ff00ff', '#00ffff', '#ff00aa']}
          glowIntensity={isDarkMode ? 1.2 : 0.6}
          glowRadius={50}
        />

        {/* Aurora Borealis */}
        <NtaButton
          text="Explore Aurora"
          backgroundColor={isDarkMode ? "#0f172a" : "#f0fff4"}
          glowColor={isDarkMode ? "160 80 50" : "160 60 70"}
          colors={['#34d399', '#818cf8', '#2dd4bf']}
          glowIntensity={isDarkMode ? 0.6 : 0.4}
        />

        {/* Royal Gold */}
        <NtaButton
          text="Premium Access"
          backgroundColor={isDarkMode ? "#1c1917" : "#fffbeb"}
          glowColor={isDarkMode ? "45 90 55" : "45 70 75"}
          colors={['#fbbf24', '#f97316', '#fef3c7']}
          glowIntensity={isDarkMode ? 1.5 : 0.7}
          borderRadius={20}
        />

        {/* Blood Moon */}
        <NtaButton
          text="Enter Sanctum"
          backgroundColor={isDarkMode ? "#1a0a0a" : "#fff5f5"}
          glowColor={isDarkMode ? "0 90 50" : "0 70 80"}
          colors={['#ef4444', '#f97316', '#dc2626']}
          edgeSensitivity={50}
          glowRadius={60}
        />

        {/* Default Variant */}
        <NtaButton 
          text="Default Variant" 
          backgroundColor={isDarkMode ? "#120F17" : "#f4f4f5"}
          glowColor={isDarkMode ? "40 80 80" : "40 60 90"}
        />

      </div>
    </div>
  );
}