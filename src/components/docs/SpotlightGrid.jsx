import React, { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Komponen Grid interaktif dengan efek "Spotlight" ala Linear.
 * Cahaya akan mengikuti kursor dan menerangi border serta background.
 */
export default function NtaSpotlightGrid({
  /** Array berisi data untuk masing-masing card */
  items = [
    { 
      title: "Web Development", 
      desc: "React.js, Laravel, Node.js & Tailwind CSS. Selalu mencari cara paling efisien untuk hasil berkualitas." 
    },
    { 
      title: "Cyber Operations", 
      desc: "Bug bounty hunting, reverse engineering, dan OSINT tracking architecture." 
    },
    { 
      title: "Digital Artworks", 
      desc: "Wildstyle graffiti sketching, typography exploration, dan character design." 
    }
  ],
  
  /** Warna cahaya senter (Gunakan format rgba agar halus) */
  spotlightColor = "rgba(57, 211, 83, 0.25)",
  
  /** Seberapa besar sebaran cahaya (dalam pixel) */
  spotlightSize = 350
}) {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // Ambil semua card yang ada di dalam container
    const cards = containerRef.current.querySelectorAll('.spotlight-card');
    
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      // Hitung posisi kursor relatif terhadap masing-masing card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update variabel CSS native agar performa 60fps (tidak memicu re-render React)
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <>
      {/* [DOC-ONLY] */}
      <div className="w-full py-16 px-4 bg-transparent flex items-center justify-center">
      {/* [/DOC-ONLY] */}

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl group"
      >
        {items.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            key={idx}
            // Class 'spotlight-card' penting untuk querySelector
            className="spotlight-card relative h-full rounded-[24px] p-[1px] overflow-hidden bg-zinc-800/30"
          >
            {/* --- EFEK SPOTLIGHT BORDER --- */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(${spotlightSize}px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 40%)`
              }}
            />

            {/* --- KONTEN CARD UTAMA --- */}
            {/* Background solid agar spotlight border hanya terlihat di celah p-[1px] */}
            <div className="relative h-full bg-[#0d1117]/95 backdrop-blur-xl rounded-[23px] p-8 flex flex-col gap-4 overflow-hidden">
              
              {/* --- EFEK SPOTLIGHT BACKGROUND (Cahaya masuk ke dalam card) --- */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(${spotlightSize}px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor.replace('0.25', '0.05')}, transparent 40%)`
                }}
              />

              {/* Header Icon / Avatar */}
              <div className="w-12 h-12 rounded-full border border-brand-border bg-brand-surface/50 flex items-center justify-center mb-2 z-10 text-brand-text/50 font-mono text-sm">
                0{idx + 1}
              </div>

              {/* Teks */}
              <div className="z-10">
                <h3 className="text-xl font-bold text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* [DOC-ONLY] */}
      </div>
      {/* [/DOC-ONLY] */}
    </>
  );
}