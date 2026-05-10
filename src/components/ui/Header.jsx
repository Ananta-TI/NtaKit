import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Layers,
  BookOpen,
  Mail,
  Home,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { componentRegistry } from "../../registry";

/* ================= UTIL ================= */

const navLinks = [
  { label: "Home", to: "/", match: (p) => p === "/", icon: Home },
  { label: "Components", to: "/installation", match: (p) => p.startsWith("/installation"), icon: Layers },
  { label: "Contact", to: "/contact", match: (p) => p === "/contact", icon: Mail },
];

export default function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const isComponentPage = location.pathname.startsWith("/components/");
  const isDocsArea =
    location.pathname.startsWith("/components") ||
    location.pathname.startsWith("/installation");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 10);
  });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (link) => link.match(location.pathname);

  return (
    <>
      {/* ================= HEADER (NO DESIGN CHANGE) ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-14 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-surface/20 border border-brand-border flex items-center justify-center">
                <img src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"} className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold hidden sm:inline">
                Nta<span className="text-brand-accent">Kit</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-2">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    isActive(l)
                      ? "text-brand-accent bg-brand-accent/10"
                      : "text-brand-text/40 hover:text-brand-text"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center border border-brand-border rounded-lg"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center border border-brand-border rounded-lg"
            >
              <Menu size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU (FIXED LOGIC ONLY) ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-xs bg-brand-bg border-l border-brand-border z-50 flex flex-col"
            >
              <div className="p-4 border-b border-brand-border flex justify-between">
                <span className="text-xs uppercase text-brand-text/40">
                  Menu
                </span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={14} />
                </button>
              </div>

              {/* NAV */}
              <div className="p-4 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-brand-text/60 hover:bg-brand-surface/30"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* 🔥 FIX: COMPONENT LIST MUNCUL DI /installation JUGA */}
              {isDocsArea && (
                <div className="p-4 border-t border-brand-border overflow-y-auto">
                  <p className="text-[10px] uppercase text-brand-accent mb-2">
                    Components
                  </p>

                  {Object.entries(componentRegistry).map(([key, data]) => (
                    <Link
                      key={key}
                      to={`/components/${key}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-brand-text/60 hover:bg-brand-surface/30 rounded-lg"
                    >
                      {data.name}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}