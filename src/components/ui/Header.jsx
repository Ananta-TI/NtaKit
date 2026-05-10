import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Layers,
  Mail,
  Home,
  ChevronRight,
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
  const navigate = useNavigate();

  // Cek apakah user sedang di halaman Docs (Installation / Components)
  const isDocsArea =
    location.pathname.startsWith("/components") ||
    location.pathname.startsWith("/installation");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State untuk Fitur Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 10);
  });

  // Shortcut Ctrl+K / Cmd+K untuk buka search & tombol ESC untuk tutup
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (link) => link.match(location.pathname);
  const isIslandMode = !isDocsArea && scrolled;

  // Filter komponen berdasarkan ketikan user
  const filteredComponents = Object.entries(componentRegistry).filter(
    ([key, data]) => {
      const query = searchQuery.toLowerCase();
      return (
        data.name.toLowerCase().includes(query) || key.toLowerCase().includes(query)
      );
    }
  );

  // Fungsi saat komponen di-klik dari hasil pencarian
  const handleSelectComponent = (key) => {
    navigate(`/components/${key}`);
    setIsSearchOpen(false);
    setSearchQuery(""); // Reset input
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed z-40 backdrop-blur-xl flex items-center overflow-hidden transition-colors ${
          isIslandMode
            ? "top-4 left-0 right-0 mx-auto w-[90%] max-w-4xl rounded-full border border-brand-border bg-brand-bg/90 shadow-2xl shadow-black/10 h-14"
            : "top-0 left-0 right-0 w-full rounded-none border-b border-brand-border bg-brand-bg/80 h-14"
        }`}
      >
        <div
          className={`w-full mx-auto flex items-center justify-between h-full transition-all ${
            isIslandMode
              ? "px-5 sm:px-8"
              : "max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10"
          }`}
        >
          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-surface/20 border border-brand-border flex items-center justify-center">
                <img
                  src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"}
                  className="w-4 h-4"
                  alt="Logo"
                />
              </div>
              <span className="text-sm font-bold hidden sm:inline">
                Nta<span className="text-brand-accent">Kit</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
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
            {/* TAMPILKAN SEARCH HANYA DI DOCS AREA (Instalation & Component) */}
            {isDocsArea && (
              <>
                {/* Search Button untuk Desktop */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex items-center justify-between gap-3 px-3 py-1.5 border border-brand-border rounded-lg text-sm text-brand-text/40 hover:text-brand-text hover:bg-brand-surface/30 transition-all bg-brand-surface/10 w-56"
                >
                  <div className="flex items-center gap-2">
                    <Search size={14} />
                    <span>Search...</span>
                  </div>
                  <kbd className="text-[10px] font-mono border border-brand-border/60 px-1.5 py-0.5 rounded text-brand-text/50">
                    ⌘K
                  </kbd>
                </button>

                {/* Search Icon untuk Mobile */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="md:hidden w-8 h-8 flex items-center justify-center border border-brand-border rounded-lg hover:bg-brand-surface/50 transition-colors"
                >
                  <Search size={14} />
                </button>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center border border-brand-border rounded-lg hover:bg-brand-surface/50 transition-colors"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center border border-brand-border rounded-lg hover:bg-brand-surface/50 transition-colors"
            >
              <Menu size={14} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= SEARCH MODAL (COMMAND PALETTE) ================= */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg bg-brand-bg border border-brand-border rounded-2xl shadow-2xl shadow-black/20 overflow-hidden flex flex-col"
            >
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-brand-border bg-brand-surface/10">
                <Search size={18} className="text-brand-accent mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-brand-text placeholder:text-brand-text/30 text-sm"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-brand-text/30 hover:text-brand-text bg-brand-surface/20 rounded-md transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                {filteredComponents.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {filteredComponents.map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => handleSelectComponent(key)}
                        className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-left hover:bg-brand-surface/30 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-surface/50 border border-brand-border flex items-center justify-center text-brand-text/40 group-hover:text-brand-accent group-hover:border-brand-accent/30 transition-colors">
                            <Layers size={14} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-brand-text group-hover:text-brand-accent transition-colors">
                              {data.name}
                            </p>
                            <p className="text-[11px] text-brand-text/40 font-mono mt-0.5">
                              {key}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-brand-text/20 group-hover:text-brand-accent/50 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 mb-3 rounded-full bg-brand-surface/20 flex items-center justify-center text-brand-text/20">
                      <Search size={20} />
                    </div>
                    <p className="text-sm font-medium text-brand-text/60">No components found.</p>
                    <p className="text-xs text-brand-text/30 mt-1">We couldn't find anything matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
              
              {/* Footer Modal */}
              <div className="px-4 py-2 border-t border-brand-border bg-brand-surface/5 flex items-center justify-between">
                <span className="text-[10px] text-brand-text/40">
                  <kbd className="border border-brand-border/60 px-1 py-0.5 rounded mr-1">ESC</kbd> to close
                </span>
                <span className="text-[10px] text-brand-text/40">
                  {filteredComponents.length} results
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE MENU ================= */}
      {/* ... [KODE MOBILE MENU SAMA SEPERTI JAWABAN SEBELUMNYA] ... */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-xs bg-brand-bg border-l border-brand-border z-50 flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-brand-border flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-wider uppercase text-brand-text/40">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-brand-surface/30 rounded-lg hover:text-brand-accent transition-colors"
                >
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
                    className="px-3 py-2.5 rounded-lg text-sm text-brand-text/70 font-medium hover:text-brand-accent hover:bg-brand-surface/30 transition-all"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* COMPONENT LIST */}
              {isDocsArea && (
                <div className="p-4 border-t border-brand-border overflow-y-auto custom-scrollbar">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-brand-accent mb-3">
                    Components
                  </p>

                  <div className="flex flex-col gap-0.5">
                    {Object.entries(componentRegistry).map(([key, data]) => (
                      <Link
                        key={key}
                        to={`/components/${key}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-brand-text/60 hover:text-brand-text hover:bg-brand-surface/30 rounded-lg transition-all"
                      >
                        {data.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}