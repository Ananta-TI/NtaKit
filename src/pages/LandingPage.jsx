import { Link } from "react-router-dom";
import { ArrowRight, Box, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import Footer from "../components/ui/Footer";
import { ThemeContext } from "../context/ThemeContext";

export default function LandingPage() {
  const { isDarkMode } = useContext(ThemeContext);

  // Variabel Animasi untuk Staggered Children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center transition-colors duration-500 overflow-x-hidden ${
      isDarkMode ? "bg-[#2C3639] text-white" : "bg-zinc-50 text-zinc-900"
    }`}>
      
      {/* 1. BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div 
          className={`absolute inset-0 opacity-[0.15] ${isDarkMode ? "invert-0" : "invert"}`}
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(198,162,126,0.15) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
        
        {/* Dynamic Glows */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#C6A27E]/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#C6A27E]/10 blur-[100px] rounded-full" 
        />
      </div>

      {/* 2. MAIN CONTENT */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-20 w-full max-w-7xl"
      >
        
        {/* BADGE */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md text-[10px] font-bold tracking-[0.3em] uppercase ${
            isDarkMode ? "border-white/10 bg-white/[0.03] text-[#C6A27E]" : "border-black/10 bg-black/[0.03] text-[#9B6B43]"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A27E] animate-ping" />
            Beta v1.0 • Built for Modern Web
          </span>
        </motion.div>

        {/* TITLE */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8">
          CRAFTED <br />
          <span className="bg-gradient-to-b from-[#E5C9A9] to-[#C6A27E] bg-clip-text text-transparent">
            PRECISION
          </span>{" "}
          <br />
          FOR YOUR JSX
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p variants={itemVariants} className={`max-w-2xl text-base md:text-lg leading-relaxed mb-12 ${
          isDarkMode ? "text-zinc-400" : "text-zinc-500"
        }`}>
          Koleksi komponen UI premium dengan performa tinggi. Dibangun menggunakan 
          <span className="text-[#C6A27E] font-semibold"> React</span>, 
          <span className="text-[#C6A27E] font-semibold"> Framer Motion</span>, 
          dan <span className="text-[#C6A27E] font-semibold"> Tailwind CSS v4</span> untuk pengalaman develop yang luar biasa.
        </motion.p>

        {/* CALL TO ACTIONS */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-32">
          <Link
            to="/components/github-isometric"
            className="group relative px-8 py-4 bg-[#C6A27E] text-black font-bold rounded-xl overflow-hidden shadow-lg shadow-[#C6A27E]/20 transition-all hover:translate-y-[-2px] active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <a
            href="https://github.com/Ananta-TI"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold border backdrop-blur-md transition-all hover:bg-white/5 active:scale-95 ${
              isDarkMode ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-black/[0.02]"
            }`}
          >
            <ArrowRight size={18} /> View Source
          </a>
        </motion.div>

        {/* STATS/FEATURES GRID */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { icon: <Zap />, title: "Ultra Fast", desc: "Optimized for 60fps performance" },
            { icon: <Layers />, title: "10+ UI Kits", desc: "Ready to use components" },
            { icon: <Box />, title: "3D Ready", desc: "Easy Three.js integration" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, borderColor: "rgba(198,162,126,0.5)" }}
              className={`p-8 rounded-3xl border text-left backdrop-blur-xl transition-colors ${
                isDarkMode ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-black/[0.02]"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#C6A27E]/10 flex items-center justify-center text-[#C6A27E] mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className={`text-sm ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </motion.main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}