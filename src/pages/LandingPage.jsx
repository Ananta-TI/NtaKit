import { Link } from "react-router-dom";
import { ArrowRight, Box, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import Footer from "../components/ui/Footer";
import { ThemeContext } from "../context/ThemeContext";

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function LandingPage() {
  const { isDarkMode } = useContext(ThemeContext);

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center transition-colors duration-500 overflow-x-hidden ${isDarkMode ? "bg-brand-bg text-white" : "bg-zinc-50 text-zinc-900"}`}>

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 opacity-[0.1] ${isDarkMode ? "invert-0" : "invert"}`} style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(198,162,126,0.12) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#C6A27E]/15 blur-[100px] rounded-full" />
        <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#C6A27E]/8 blur-[80px] rounded-full" />
      </div>

      {/* Content */}
      <motion.main variants={container} initial="hidden" animate="visible" className="relative z-10 flex flex-col items-center text-center px-5 pt-28 sm:pt-36 pb-16 w-full max-w-6xl">

        {/* Badge */}
        <motion.div variants={item} className="mb-7">
          <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[9px] font-semibold tracking-[0.25em] uppercase backdrop-blur-md ${isDarkMode ? "border-white/8 bg-white/[0.02] text-[#C6A27E]" : "border-black/8 bg-black/[0.02] text-[#9B6B43]"}`}>
            <span className="w-1 h-1 rounded-full bg-[#C6A27E] animate-ping" />
            Beta v1.0
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={item} className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-5">
          CRAFTED<br />
          <span className="bg-gradient-to-b from-[#E5C9A9] to-[#C6A27E] bg-clip-text text-transparent">PRECISION</span><br />
          FOR YOUR JSX
        </motion.h1>

        {/* Desc */}
        <motion.p variants={item} className={`max-w-lg text-sm sm:text-base leading-relaxed mb-10 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
          Koleksi komponen UI premium. Dibangun dengan
          <span className="text-[#C6A27E] font-medium"> React</span>,{" "}
          <span className="text-[#C6A27E] font-medium">Framer Motion</span>, dan{" "}
          <span className="text-[#C6A27E] font-medium">Tailwind CSS v4</span>.
        </motion.p>

        {/* CTA */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-3 mb-28">
          <Link to="/components/github-isometric" className="group relative px-7 py-3 bg-[#C6A27E] text-black font-semibold rounded-lg overflow-hidden shadow-lg shadow-[#C6A27E]/15 transition-all hover:-translate-y-0.5 active:scale-[0.98] text-sm">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">Get Started <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" /></span>
          </Link>
          <a href="https://github.com/Ananta-TI" target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-7 py-3 rounded-lg font-semibold border text-sm backdrop-blur-md transition-all hover:bg-white/5 active:scale-[0.98] ${isDarkMode ? "border-white/8 bg-white/[0.02]" : "border-black/8 bg-black/[0.02]"}`}>
            <GithubIcon size={14} /> Source
          </a>
        </motion.div>

        {/* Cards */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          {[
            { icon: <Zap size={20} />, title: "Ultra Fast", desc: "Optimized for 60fps" },
            { icon: <Layers size={20} />, title: "10+ Kits", desc: "Ready to use components" },
            { icon: <Box size={20} />, title: "3D Ready", desc: "Three.js integration" },
          ].map((c, i) => (
            <motion.div key={i} whileHover={{ y: -4, borderColor: "rgba(198,162,126,0.35)" }} className={`p-6 rounded-xl border text-left transition-colors ${isDarkMode ? "border-white/5 bg-white/[0.015]" : "border-black/5 bg-black/[0.015]"}`}>
              <div className="w-10 h-10 rounded-lg bg-[#C6A27E]/8 flex items-center justify-center text-[#C6A27E] mb-4">{c.icon}</div>
              <h3 className="text-base font-bold mb-1">{c.title}</h3>
              <p className={`text-xs ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
}