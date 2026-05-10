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

// ========================= UTILITIES =========================

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function HighlightMatch({ text, query }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <span className="text-brand-accent font-medium">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </span>
  );
}

// Data Navigasi Utama
const navLinks = [
  { label: "Home", to: "/", match: (path) => path === "/", icon: Home },
  { label: "Components", to: "/components/github-isometric", match: (path) => path.startsWith("/components/"), icon: Layers },
  // { label: "Docs", to: "/", match: (path) => path === "/", icon: BookOpen },
  { label: "Contact", to: "/contact", match: (path) => path === "/contact", icon: Mail },
];

// ========================= MAIN HEADER =========================

export default function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const isComponentPage = location.pathname.startsWith("/components/");
  const isLanding = location.pathname === "/" || location.pathname === "/contact";

  const currentComponentId = isComponentPage ? location.pathname.split("/")[2] : null;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);

  const searchInputRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const isScrolled = v > 10;
    const isCompact = v > 80;
    if (scrolled !== isScrolled) setScrolled(isScrolled);
    if (compact !== isCompact) setCompact(isCompact);
  });

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isComponentPage) {
          setSearchOpen(true);
          setTimeout(() => searchInputRef.current?.focus(), 100);
        } else {
          setMobileSearchOpen(true);
          setTimeout(() => mobileSearchRef.current?.focus(), 100);
        }
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isComponentPage]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const filtered = Object.entries(componentRegistry).filter(([_, d]) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper Render Link dengan Magic Pill
  const renderNavLinks = (layoutPrefix) => {
    return navLinks.map((link) => {
      const isActive = link.match(location.pathname);
      return (
        <Link
          key={link.label}
          to={link.to}
          className={`relative px-3 py-1.5 rounded-xl text-sm transition-colors duration-300 flex items-center gap-1.5 font-medium
            ${isActive ? "text-brand-accent" : "text-brand-text/40 hover:text-brand-text"}`}
        >
          {isActive && (
            <motion.div
              layoutId={`${layoutPrefix}-active-nav`}
              className="absolute inset-0 z-[-1] rounded-xl bg-brand-accent/10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {layoutPrefix === "comp" && <link.icon size={13} />}
          {link.label}
        </Link>
      );
    });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLanding ? (
          /* =========================================================
             1. LANDING & CONTACT HEADER (FLOATING)
             ========================================================= */
          <motion.header
            key="landing-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center w-full"
          >
            <motion.div
              initial={false}
              animate={{
                maxWidth: scrolled ? 896 : 1152,
                y: scrolled ? 12 : 0,
                height: scrolled ? 56 : 64,
                borderRadius: scrolled ? 16 : 0,
                scale: compact ? 0.97 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`pointer-events-auto w-full flex items-center justify-between transition-all duration-300
                ${scrolled ? "bg-brand-bg/70 backdrop-blur-2xl border border-white/10 shadow-xl px-5" : "bg-transparent border border-transparent px-6"}`}
            >
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2.5">
                  <motion.div animate={{ width: scrolled ? 36 : 32, height: scrolled ? 36 : 32 }} className={`flex items-center justify-center border transition-colors ${scrolled ? "border-white/10 bg-white/[0.04]" : "border-brand-border/40 bg-brand-surface/30"} rounded-lg`}>
                    <img src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"} alt="Logo" className="w-4 h-4" />
                  </motion.div>
                  <span className="text-sm font-bold tracking-tight">Nta<span className="text-brand-accent">Kit</span></span>
                </Link>
                <nav className="hidden md:flex items-center gap-1">{renderNavLinks("landing")}</nav>
              </div>
              <div className="flex items-center gap-2">
                <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isDarkMode ? <motion.div key="s" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><Sun size={14} className="text-brand-accent" /></motion.div> : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Moon size={14} className="text-brand-accent" /></motion.div>}
                  </AnimatePresence>
                </motion.button>
                <Link to="/components/github-isometric" className="hidden sm:flex items-center gap-1.5 rounded-xl text-xs font-semibold bg-brand-accent text-brand-bg px-4 py-2">Get Started <ArrowRight size={12} /></Link>
                <button onClick={() => setMobileMenuOpen(true)} className="md:hidden w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center"><Menu size={15} /></button>
              </div>
            </motion.div>
          </motion.header>
        ) : (
          /* =========================================================
             2. COMPONENTS HEADER (STICKY BAR)
             ========================================================= */
          <motion.header
            key="component-header"
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`sticky top-0 z-50 h-16 border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl text-brand-text w-full`}
          >
            <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 max-w-[1400px] mx-auto">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <Link to="/" className="sm:hidden w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center"><ChevronRight size={14} className="rotate-180" /></Link>
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center"><img src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"} className="w-4 h-4" /></div>
                  <span className="text-sm font-bold hidden xs:inline">Nta<span className="text-brand-accent">Kit</span></span>
                </Link>
                <nav className="hidden md:flex items-center gap-1">{renderNavLinks("comp")}</nav>
              </div>

              <div className="hidden lg:block flex-1 max-w-sm mx-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/20" />
                  <input ref={searchInputRef} type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setSearchOpen(true)} onBlur={() => setTimeout(() => setSearchOpen(false), 200)} className="w-full rounded-lg pl-9 pr-12 py-2 text-sm outline-none border border-brand-border bg-brand-surface/15 focus:border-brand-accent/30 placeholder:text-brand-text/20 transition-all" />
                  <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] text-brand-text/15 border border-brand-border bg-brand-surface/40 font-mono">⌘K</kbd>
                  <AnimatePresence>
                    {searchOpen && searchQuery && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-brand-border bg-brand-bg shadow-xl overflow-hidden">
                        {filtered.length > 0 ? (
                          <div className="max-h-60 overflow-y-auto py-1">
                            {filtered.map(([id, data]) => (
                              <Link key={id} to={`/components/${id}`} className="flex items-center justify-between px-3 py-2.5 text-sm hover:bg-brand-surface/50 transition-colors">
                                <span className="flex items-center gap-2.5"><Search size={12} className="text-brand-text/15" /><HighlightMatch text={data.name} query={searchQuery} /></span>
                                <ChevronRight size={12} className="text-brand-text/10" />
                              </Link>
                            ))}
                          </div>
                        ) : <div className="px-3 py-8 text-center text-xs text-brand-text/30">No results</div>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setMobileSearchOpen(true); setTimeout(() => mobileSearchRef.current?.focus(), 200); }} className="lg:hidden w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center"><Search size={14} className="text-brand-text/40" /></motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center">{isDarkMode ? <Sun size={13} className="text-brand-accent" /> : <Moon size={13} className="text-brand-accent" />}</motion.button>
                <button onClick={() => setMobileMenuOpen(true)} className="md:hidden w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center"><Menu size={14} className="text-brand-text/40" /></button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ========================= OVERLAYS & MOBILE MENU ========================= */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileSearchOpen(false)} className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-0 left-0 right-0 z-[70] bg-brand-bg border-b border-brand-border shadow-xl">
              <div className="p-3.5 flex items-center gap-3">
                <Search size={16} className="text-brand-text/25" />
                <input ref={mobileSearchRef} type="text" placeholder="Search components..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" autoFocus />
                <button onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }} className="px-2 py-0.5 rounded text-[10px] border border-brand-border text-brand-text/40">ESC</button>
              </div>
              {searchQuery && (
                <div className="max-h-[55vh] overflow-y-auto border-t border-brand-border">
                  {filtered.length > 0 ? filtered.map(([id, data]) => (
                    <Link key={id} to={`/components/${id}`} onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }} className="flex items-center justify-between px-4 py-3.5 text-sm active:bg-brand-surface/40 border-b border-brand-border/30">
                      <span className="flex items-center gap-2.5"><Search size={13} className="text-brand-text/15" /><HighlightMatch text={data.name} query={searchQuery} /></span>
                      <ChevronRight size={12} className="text-brand-text/10" />
                    </Link>
                  )) : <div className="px-4 py-10 text-center text-xs text-brand-text/30">No results</div>}
                </div>
              )}
            </motion.div>
          </>
        )}

        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-xs bg-brand-bg border-l border-brand-border flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
                <span className="text-xs text-brand-text/40 font-medium uppercase tracking-widest">Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center"><X size={14} /></button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 space-y-0.5">
                  {navLinks.map((link) => {
                    const isActive = link.match(location.pathname);
                    return (
                      <Link key={link.label} to={link.to} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${isActive ? "text-brand-accent bg-brand-accent/10 font-semibold" : "hover:bg-brand-surface/30 text-brand-text/70"}`}>
                        <link.icon size={14} className={isActive ? "text-brand-accent" : "text-brand-text/25"} />
                        <span className="flex-1">{link.label}</span>
                      </Link>
                    );
                  })}
                  <a href="https://github.com/Ananta-TI" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm hover:bg-brand-surface/30 text-brand-text/70"><GithubIcon size={14} className="text-brand-text/25" /><span>GitHub</span></a>
                </div>

                {/* INI ISI COMPONENT YANG TIDAK BOLEH HILANG */}
                {isComponentPage && (
                  <div className="px-4 pb-4">
                    <p className="text-[10px] font-semibold text-brand-accent/60 uppercase tracking-[0.15em] mb-2 px-1">Component List</p>
                    <div className="flex flex-col gap-0.5">
                      {Object.entries(componentRegistry).map(([key, data]) => (
                        <Link key={key} to={`/components/${key}`} onClick={() => setMobileMenuOpen(false)} className={`px-3 py-2.5 rounded-lg text-[11px] flex items-center justify-between font-medium ${currentComponentId === key ? "bg-brand-accent/8 text-brand-accent" : "text-brand-text/30 hover:bg-brand-surface/30"}`}>
                          {data.name}
                          {currentComponentId === key && <div className="w-1 h-1 rounded-full bg-brand-accent" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-brand-border"><button onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-brand-border text-xs">{isDarkMode ? <Sun size={13} className="text-brand-accent" /> : <Moon size={13} className="text-brand-accent" />}{isDarkMode ? "Light Mode" : "Dark Mode"}</button></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}