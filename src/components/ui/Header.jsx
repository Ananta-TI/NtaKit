import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { Search, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`sticky top-0 z-50 h-20 border-b backdrop-blur-2xl transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#09090B]/80 border-white/10 text-white"
          : "bg-white/80 border-black/10 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 md:px-10 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            
            <motion.div
              whileHover={{
                rotate: 0,
                scale: 1.04,
              }}
              initial={{
                rotate: 4,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-[#C6A27E]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Logo Card */}
              <div
                className={`relative w-11 h-11 rounded-2xl border overflow-hidden flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${
                  isDarkMode
                    ? "bg-white/[0.04] border-white/10"
                    : "bg-black/[0.03] border-black/10"
                }`}
              >
                <img
                  src={
                    isDarkMode
                      ? "/image/logo1.png"
                      : "/image/logo2.png"
                  }
                  alt="NtaKit Logo"
                  className="w-6 h-6 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>

            {/* TEXT */}
            <span className="text-xl font-semibold tracking-tight">
              Nta<span className="text-[#C6A27E]">Kit</span>
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/components/github-isometric"
              className={`transition-colors hover:text-[#C6A27E] ${
                isDarkMode
                  ? "text-zinc-400"
                  : "text-zinc-600"
              }`}
            >
              Components
            </Link>

            <Link
              to="/"
              className={`transition-colors hover:text-[#C6A27E] ${
                isDarkMode
                  ? "text-zinc-400"
                  : "text-zinc-600"
              }`}
            >
              Templates
            </Link>

            <Link
              to="/"
              className={`transition-colors hover:text-[#C6A27E] ${
                isDarkMode
                  ? "text-zinc-400"
                  : "text-zinc-600"
              }`}
            >
              Docs
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* SEARCH */}
          <div className="hidden lg:flex relative items-center group">

            <Search
              size={16}
              className={`absolute left-4 transition-colors ${
                isDarkMode
                  ? "text-zinc-500 group-focus-within:text-[#C6A27E]"
                  : "text-zinc-400 group-focus-within:text-[#C6A27E]"
              }`}
            />

            <input
              type="text"
              placeholder="Search components..."
              className={`w-72 rounded-2xl pl-11 pr-14 py-3 text-sm outline-none border transition-all ${
                isDarkMode
                  ? "bg-white/[0.03] border-white/10 focus:border-[#C6A27E]/50 focus:bg-white/[0.05]"
                  : "bg-black/[0.03] border-black/10 focus:border-[#C6A27E]/40"
              }`}
            />

            {/* KEY */}
            <div
              className={`absolute right-3 px-2 py-1 rounded-md border text-[10px] font-bold ${
                isDarkMode
                  ? "bg-white/[0.03] border-white/10 text-zinc-500"
                  : "bg-black/[0.03] border-black/10 text-zinc-400"
              }`}
            >
              ⌘K
            </div>
          </div>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all active:scale-95 ${
              isDarkMode
                ? "bg-white/[0.03] border-white/10 hover:border-[#C6A27E]/40"
                : "bg-black/[0.03] border-black/10 hover:border-[#C6A27E]/40"
            }`}
          >
            {isDarkMode ? (
              <Sun
                size={18}
                className="text-[#C6A27E] transition-transform hover:rotate-45"
              />
            ) : (
              <Moon
                size={18}
                className="text-zinc-500 transition-transform hover:-rotate-12"
              />
            )}
          </button>

          {/* GITHUB */}
          <a
            href="https://github.com/Ananta-TI"
            target="_blank"
            rel="noreferrer"
            className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all active:scale-95 ${
              isDarkMode
                ? "bg-white/[0.03] border-white/10 hover:border-[#C6A27E]/40 hover:text-[#C6A27E]"
                : "bg-black/[0.03] border-black/10 hover:border-[#C6A27E]/40 hover:text-[#C6A27E]"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}