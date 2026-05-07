import { Link } from "react-router-dom";
import { ArrowRight, Box, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

export default function LandingPage() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-center p-6 relative overflow-hidden ${
      isDarkMode ? "bg-brand-bg text-brand-text" : "bg-zinc-50 text-zinc-900"
    }`}>
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#C6A27E]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C6A27E]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* HERO */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-6xl">

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative mb-10 group"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-[32px] bg-[#C6A27E]/20 blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-700" />

          {/* Logo Card */}
          <div
            className={`relative w-28 h-28 rounded-[32px] border backdrop-blur-2xl flex items-center justify-center overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.55)] ${
              isDarkMode
                ? "bg-white/[0.04] border-white/10"
                : "bg-black/[0.03] border-black/10"
            }`}
          >
            {/* Shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />

            {/* Logo */}
            <img
              src={
                isDarkMode
                  ? "/image/logo1.png"
                  : "/image/logo2.png"
              }
              alt="NtaKit Logo"
              className="relative z-10 w-16 h-16 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </motion.div>

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border backdrop-blur-xl text-xs font-bold tracking-[0.25em] uppercase mb-8 ${
              isDarkMode
                ? "border-white/10 bg-white/[0.03] text-[#C6A27E]"
                : "border-black/10 bg-black/[0.03] text-[#9B6B43]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C6A27E] animate-pulse" />
            Beta v1.0 • Built for Developers
          </span>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-black tracking-[-0.06em] leading-[0.9] mb-8"
        >
          CRAFTED{" "}
          <span className="text-[#C6A27E]">
            PRECISION
          </span>
          <br />
          FOR YOUR JSX
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className={`max-w-2xl text-lg md:text-xl leading-relaxed mb-14 ${
            isDarkMode ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Koleksi komponen UI modern dan interaktif yang dibangun dengan{" "}
          <span
            className={
              isDarkMode ? "text-white font-medium" : "text-black font-medium"
            }
          >
            React
          </span>
          ,{" "}
          <span
            className={
              isDarkMode ? "text-white font-medium" : "text-black font-medium"
            }
          >
            Framer Motion
          </span>
          ,{" "}
          <span
            className={
              isDarkMode ? "text-white font-medium" : "text-black font-medium"
            }
          >
            Three.js
          </span>
          , dan{" "}
          <span
            className={
              isDarkMode ? "text-white font-medium" : "text-black font-medium"
            }
          >
            Tailwind CSS v4
          </span>
          .
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col md:flex-row items-center gap-5"
        >
          <Link
            to="/components/github-isometric"
            className="group relative overflow-hidden bg-[#C6A27E] text-black px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_20px_50px_rgba(198,162,126,0.25)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Library
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <a
            href="https://github.com/Ananta-TI"
            target="_blank"
            rel="noreferrer"
            className={`px-10 py-5 rounded-2xl font-semibold text-lg border backdrop-blur-xl transition-all active:scale-[0.97] ${
              isDarkMode
                ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                : "border-black/10 bg-black/[0.03] hover:bg-black/[0.05]"
            }`}
          >
            Github Repository
          </a>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-28 w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Zap size={22} />,
              title: "Fast",
              desc: "Optimized Code",
            },
            {
              icon: <Layers size={22} />,
              title: "10+",
              desc: "Components",
            },
            {
              icon: <Box size={22} />,
              title: "3D",
              desc: "Canvas Ready",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl border backdrop-blur-xl p-8 flex flex-col items-center text-center transition-all hover:border-[#C6A27E]/30 ${
                isDarkMode
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-black/10 bg-black/[0.03]"
              }`}
            >
              <div className="text-[#C6A27E] mb-4">
                {item.icon}
              </div>

              <span className="text-3xl font-black mb-1">
                {item.title}
              </span>

              <span
                className={`text-xs uppercase tracking-[0.25em] ${
                  isDarkMode ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                {item.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}