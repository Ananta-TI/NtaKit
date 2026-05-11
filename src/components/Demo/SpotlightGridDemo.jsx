import React, { useRef, useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";

/* ─────────────────────────────────────────────
   DATA KARTU (Varian Teks & Warna)
───────────────────────────────────────────── */
const spotlightItems = [
  {
    title: "Web Development",
    desc: "React.js, Laravel, Node.js & Tailwind CSS. Selalu mencari cara paling efisien untuk hasil berkualitas.",
    spotlightColor: "rgba(57, 211, 83, 0.25)", // Hijau
    spotlightSize: 400
  },
  {
    title: "Cyber Operations",
    desc: "Bug bounty hunting, reverse engineering, dan OSINT tracking architecture.",
    spotlightColor: "rgba(168, 85, 247, 0.25)", // Ungu
    spotlightSize: 350
  },
  {
    title: "Digital Artworks",
    desc: "Wildstyle graffiti sketching, typography exploration, dan character design.",
    spotlightColor: "rgba(251, 191, 36, 0.25)", // Amber
    spotlightSize: 300
  }
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function SpotlightGridDemo() {
  const containerRef = useRef(null);
  
  // Ambil isDarkMode dari context, default ke true jika context tidak ada
  const themeCtx = useContext(ThemeContext);
  const isDarkMode = themeCtx ? themeCtx.isDarkMode : true;

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
    <div className="w-full h-full flex flex-col items-center justify-center py-20 px-6 font-sans bg-transparent">
      
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-brand-text tracking-tight transition-colors">
          Hover Me
        </h1>
        
      </div>

      {/* Grid Utama - Responsif: 1, 2, atau 3 kolom */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl group"
      >
        {spotlightItems.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            key={idx}
            // Class 'spotlight-card' penting untuk querySelector
            // Gunakan class Tailwind yang benar untuk rounded-[24px] dan p-[1px]
            className={`spotlight-card relative h-full rounded-[24px] p-[1px] overflow-hidden ${
              isDarkMode ? "bg-zinc-800/40" : "bg-zinc-300/60"
            }`}
          >
            {/* --- EFEK SPOTLIGHT BORDER --- */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(${item.spotlightSize}px circle at var(--mouse-x) var(--mouse-y), ${item.spotlightColor}, transparent 40%)`
              }}
            />

            {/* --- KONTEN CARD UTAMA --- */}
            {/* Background solid agar spotlight border hanya terlihat di celah p-[1px] */}
            <div className={`relative h-full rounded-[23px] p-8 md:p-10 flex flex-col gap-5 overflow-hidden backdrop-blur-xl ${
              isDarkMode ? "bg-[#0d1117]/95" : "bg-white/95"
            }`}>
              
              {/* --- EFEK SPOTLIGHT BACKGROUND (Cahaya masuk ke dalam card) --- */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(${item.spotlightSize}px circle at var(--mouse-x) var(--mouse-y), ${
                    // opacity lebih rendah untuk efek sorotan di dalam card
                    item.spotlightColor.replace('0.25', '0.05')
                  }, transparent 40%)`
                }}
              />

              {/* Header Icon / Avatar */}
              <div className={`w-14 h-14 rounded-full border flex items-center justify-center mb-2 z-10 font-mono text-base ${
                isDarkMode 
                  ? "border-brand-border bg-brand-surface/50 text-brand-text/50" 
                  : "border-zinc-200 bg-zinc-100 text-zinc-500"
              }`}>
                0{idx + 1}
              </div>

              {/* Teks */}
              <div className="z-10 flex-1 flex flex-col">
                <h3 className={`text-2xl font-bold mb-2.5 tracking-tight ${isDarkMode ? "text-zinc-100" : "text-zinc-800"}`}>
                  {item.title}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  {item.desc}
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}