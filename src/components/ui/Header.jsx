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
} from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { componentRegistry } from "../../registry";

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

export default function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const isComponentPage = location.pathname.startsWith("/components/");
  const isLanding = location.pathname === "/";
  const currentComponentId = isComponentPage ? location.pathname.split("/")[2] : null;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isComponentPage) {
          setSearchOpen((p) => !p);
          setTimeout(() => searchInputRef.current?.focus(), 100);
        } else {
          setMobileSearchOpen((p) => !p);
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

  // ===================== LANDING =====================
  if (isLanding) {
    return (
      <>
        <motion.header
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
            scrolled
              ? "h-14 bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border/40"
              : "h-16 bg-transparent"
          }`}
        >
          <div className="h-full px-5 sm:px-8 max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg border border-brand-border/40 bg-brand-surface/30 flex items-center justify-center">
                <img src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"} alt="Logo" className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold tracking-tight">
                Nta<span className="text-brand-accent">Kit</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link to="/components/github-isometric" className="px-3 py-1.5 rounded-lg text-sm text-brand-text/50 hover:text-brand-text hover:bg-brand-surface/40 transition-all">Components</Link>
              <Link to="/" className="px-3 py-1.5 rounded-lg text-sm text-brand-text/50 hover:text-brand-text hover:bg-brand-surface/40 transition-all">Docs</Link>
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${scrolled ? "border-brand-border/40 bg-brand-surface/20" : "border-white/10 bg-white/5"}`}>
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div key="s" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><Sun size={14} className="text-brand-accent" /></motion.div>
                  ) : (
                    <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Moon size={14} className="text-brand-accent" /></motion.div>
                  )}
                </AnimatePresence>
              </button>
              <a href="https://github.com/Ananta-TI" target="_blank" rel="noreferrer" className={`hidden sm:flex w-8 h-8 rounded-lg border items-center justify-center transition-all ${scrolled ? "border-brand-border/40 bg-brand-surface/20 text-brand-text/40 hover:text-brand-text" : "border-white/10 bg-white/5 text-brand-text/40 hover:text-brand-text"}`}>
                <GithubIcon size={14} />
              </a>
              <Link to="/components/github-isometric" className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-brand-accent text-brand-bg hover:brightness-110 transition-all">
                Get Started <ArrowRight size={12} />
              </Link>
              <button onClick={() => setMobileMenuOpen(true)} className={`md:hidden w-8 h-8 rounded-lg border flex items-center justify-center ${scrolled ? "border-brand-border/40 bg-brand-surface/20" : "border-white/10 bg-white/5"}`}>
                <Menu size={15} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Mobile Menu — Landing */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="fixed top-0 right-0 bottom-0 z-[70] w-[80%] max-w-xs bg-brand-bg border-l border-brand-border">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
                    <span className="text-sm font-bold">Nta<span className="text-brand-accent">Kit</span></span>
                    <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center"><X size={14} /></button>
                  </div>
                  <nav className="flex-1 p-4 space-y-1">
                    {[
                      { label: "Components", to: "/components/github-isometric", icon: Layers },
                      { label: "Documentation", to: "/", icon: BookOpen },
                    ].map((item, i) => (
                      <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.06 }}>
                        <Link to={item.to} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-brand-surface/40 transition-all">
                          <item.icon size={16} className="text-brand-text/40" />
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                  <div className="p-4 border-t border-brand-border space-y-2">
                    <Link to="/components/github-isometric" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-xs font-semibold bg-brand-accent text-brand-bg">
                      Get Started <ArrowRight size={12} />
                    </Link>
                    <div className="flex gap-2">
                      <a href="https://github.com/Ananta-TI" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs border border-brand-border hover:border-brand-accent/40 transition-all">
                        <GithubIcon size={13} /> GitHub
                      </a>
                      <button onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs border border-brand-border hover:border-brand-accent/40 transition-all">
                        {isDarkMode ? <Sun size={13} className="text-brand-accent" /> : <Moon size={13} className="text-brand-accent" />}
                        {isDarkMode ? "Light" : "Dark"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ===================== COMPONENTS =====================
  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "h-14 shadow-sm shadow-black/[0.02]" : "h-16"
        } border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl text-brand-text`}
      >
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link to="/" className="sm:hidden flex-shrink-0 w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center">
              <ChevronRight size={14} className="rotate-180" />
            </Link>
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center">
                <img src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"} alt="Logo" className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold tracking-tight hidden xs:inline">Nta<span className="text-brand-accent">Kit</span></span>
            </Link>
            <nav className="hidden md:flex items-center gap-0.5 text-xs font-medium">
              <Link to="/components/github-isometric" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-brand-accent bg-brand-accent/8">
                <Layers size={13} /> Components
              </Link>
              <Link to="/" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-brand-text/40 hover:text-brand-text hover:bg-brand-surface/40 transition-all">
                <BookOpen size={13} /> Docs
              </Link>
            </nav>
          </div>

          <div className="hidden lg:block flex-1 max-w-sm mx-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/20" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                className="w-full rounded-lg pl-9 pr-12 py-2 text-sm outline-none border border-brand-border bg-brand-surface/15 focus:border-brand-accent/30 placeholder:text-brand-text/20 transition-all"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] text-brand-text/15 border border-brand-border bg-brand-surface/40 font-mono">⌘K</kbd>
              <AnimatePresence>
                {searchOpen && searchQuery && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }} className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-brand-border bg-brand-bg shadow-xl shadow-black/[0.08] overflow-hidden">
                    {filtered.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto py-1">
                        {filtered.map(([id, data]) => (
                          <Link key={id} to={`/components/${id}`} className="flex items-center justify-between px-3 py-2.5 text-sm hover:bg-brand-surface/50 transition-colors">
                            <span className="flex items-center gap-2.5"><Search size={12} className="text-brand-text/15" /><HighlightMatch text={data.name} query={searchQuery} /></span>
                            <ChevronRight size={12} className="text-brand-text/10" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-3 py-8 text-center text-xs text-brand-text/30">No results</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button onClick={() => { setMobileSearchOpen(true); setTimeout(() => mobileSearchRef.current?.focus(), 200); }} className="lg:hidden w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center">
              <Search size={14} className="text-brand-text/40" />
            </button>
            <button onClick={toggleTheme} className="w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div key="s2" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.12 }}><Sun size={13} className="text-brand-accent" /></motion.div>
                ) : (
                  <motion.div key="m2" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.12 }}><Moon size={13} className="text-brand-accent" /></motion.div>
                )}
              </AnimatePresence>
            </button>
            <a href="https://github.com/Ananta-TI" target="_blank" rel="noreferrer" className="hidden sm:flex w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 items-center justify-center text-brand-text/40 hover:text-brand-text transition-all">
              <GithubIcon size={13} />
            </a>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center">
              <Menu size={14} className="text-brand-text/40" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Search — Components */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }} className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ type: "spring", damping: 28, stiffness: 380 }} className="fixed top-0 left-0 right-0 z-[70] bg-brand-bg border-b border-brand-border shadow-xl">
              <div className="p-3.5 flex items-center gap-3">
                <Search size={16} className="text-brand-text/25 flex-shrink-0" />
                <input ref={mobileSearchRef} type="text" placeholder="Search components..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm outline-none placeholder:text-brand-text/25" autoFocus />
                <button onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }} className="px-2 py-0.5 rounded text-[10px] font-medium border border-brand-border text-brand-text/40">ESC</button>
              </div>
              {searchQuery && (
                <div className="max-h-[55vh] overflow-y-auto border-t border-brand-border">
                  {filtered.length > 0 ? filtered.map(([id, data]) => (
                    <Link key={id} to={`/components/${id}`} onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }} className="flex items-center justify-between px-4 py-3.5 text-sm active:bg-brand-surface/40 border-b border-brand-border/30">
                      <span className="flex items-center gap-2.5"><Search size={13} className="text-brand-text/15" /><HighlightMatch text={data.name} query={searchQuery} /></span>
                      <ChevronRight size={12} className="text-brand-text/10" />
                    </Link>
                  )) : (
                    <div className="px-4 py-10 text-center text-xs text-brand-text/30">No results</div>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu — Components (Sidebar + Nav merged) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-xs bg-brand-bg border-l border-brand-border">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
                  <span className="text-xs text-brand-text/40 font-medium">Navigation</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center"><X size={14} /></button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {/* Quick Links */}
                  <div className="p-4 space-y-0.5">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-brand-surface/30 transition-all">
                      <ChevronRight size={14} className="rotate-180 text-brand-text/25" />
                      <span className="text-brand-text/40">Back to Home</span>
                    </Link>
                    <a href="https://github.com/Ananta-TI" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-brand-surface/30 transition-all">
                      <GithubIcon size={14} className="text-brand-text/25" />
                      <span className="text-brand-text/40">GitHub</span>
                    </a>
                  </div>

                  {/* Component List */}
                  <div className="px-4 pb-4">
                    <p className="text-[10px] font-semibold text-brand-accent/60 uppercase tracking-[0.15em] mb-2 px-1">Components</p>
                    <div className="flex flex-col gap-0.5">
                      {Object.entries(componentRegistry).map(([key, data]) => (
                        <Link
                          key={key}
                          to={`/components/${key}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`px-3 py-2.5 rounded-lg text-[11px] transition-all duration-200 flex items-center justify-between font-medium tracking-tight ${
                            currentComponentId === key
                              ? "bg-brand-accent/8 text-brand-accent"
                              : "text-brand-text/30 hover:text-brand-text hover:bg-brand-surface/30"
                          }`}
                        >
                          {data.name}
                          {currentComponentId === key && (
                            <div className="w-1 h-1 rounded-full bg-brand-accent" />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Getting Started */}
                  <div className="px-4 pb-4">
                    <p className="text-[10px] font-semibold text-brand-text/20 uppercase tracking-[0.15em] mb-2 px-1">Getting Started</p>
                    <div className="flex flex-col gap-0.5 text-[11px] font-medium">
                      <a href="#" className="px-3 py-2.5 rounded-lg text-brand-text/30 hover:text-brand-accent hover:bg-brand-surface/30 transition-all">Installation</a>
                      <a href="#" className="px-3 py-2.5 rounded-lg text-brand-text/30 hover:text-brand-accent hover:bg-brand-surface/30 transition-all">Theming</a>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-brand-border">
                  <button onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-xs border border-brand-border hover:border-brand-accent/40 transition-all">
                    {isDarkMode ? <Sun size={13} className="text-brand-accent" /> : <Moon size={13} className="text-brand-accent" />}
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}