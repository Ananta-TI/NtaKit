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

const firstComponentKey = Object.keys(componentRegistry)[0];

const navLinks = [
  {
    label: "Home",
    to: "/",
    match: (p) => p === "/",
    icon: Home,
  },
  {
    label: "Components",
    to: firstComponentKey ? `/components/${firstComponentKey}` : "/installation",
    match: (p) => p.startsWith("/installation") || p.startsWith("/components"),
    icon: Layers,
  },
  {
    label: "Contact",
    to: "/contact",
    match: (p) => p === "/contact",
    icon: Mail,
  },
];

export default function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isDocsArea =
    location.pathname.startsWith("/components") ||
    location.pathname.startsWith("/installation");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 10);
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        if (!isDocsArea) return;

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
  }, [isDocsArea]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  const isActive = (link) => link.match(location.pathname);
  const isIslandMode = !isDocsArea && scrolled;

  const filteredComponents = searchQuery.trim()
    ? Object.entries(componentRegistry).filter(([key, data]) => {
        const query = searchQuery.toLowerCase();

        return (
          data.name.toLowerCase().includes(query) ||
          key.toLowerCase().includes(query)
        );
      })
    : Object.entries(componentRegistry).slice(0, 6);

  const handleSelectComponent = (key) => {
    navigate(`/components/${key}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed z-40 flex items-center overflow-hidden backdrop-blur-xl transition-colors ${
          isIslandMode
            ? "top-4 left-0 right-0 mx-auto h-14 w-[90%] max-w-4xl rounded-full border border-brand-border bg-brand-bg/90 shadow-2xl shadow-black/10"
            : "top-0 left-0 right-0 h-14 w-full rounded-none border-b border-brand-border bg-brand-bg/80"
        }`}
      >
        <div
          className={`mx-auto flex h-full w-full items-center justify-between transition-all ${
            isIslandMode
              ? "px-5 sm:px-8"
              : "max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10"
          }`}
        >
          {/* LEFT */}
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/20">
                <img
                  src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"}
                  className="h-4 w-4"
                  alt="Logo"
                />
              </div>

              <span className="hidden text-sm font-bold sm:inline">
                Nta<span className="text-brand-accent">Kit</span>
              </span>
            </Link>

            <nav className="ml-4 hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      isActive(link)
                        ? "bg-brand-accent/10 text-brand-accent"
                        : "text-brand-text/40 hover:text-brand-text"
                    }`}
                  >
                    <Icon size={14} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {isDocsArea && (
              <>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden w-56 items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-surface/10 px-3 py-1.5 text-sm text-brand-text/40 transition-all hover:bg-brand-surface/30 hover:text-brand-text md:flex"
                >
                  <div className="flex items-center gap-2">
                    <Search size={14} />
                    <span>Search...</span>
                  </div>

                  <kbd className="rounded border border-brand-border/60 px-1.5 py-0.5 font-mono text-[10px] text-brand-text/50">
                    ⌘K
                  </kbd>
                </button>

                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border transition-colors hover:bg-brand-surface/50 md:hidden"
                >
                  <Search size={14} />
                </button>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border transition-colors hover:bg-brand-surface/50"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border transition-colors hover:bg-brand-surface/50 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={14} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= SEARCH MODAL ================= */}
      <AnimatePresence>
        {isSearchOpen && isDocsArea && (
          <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh] sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-bg shadow-2xl shadow-black/20"
            >
              <div className="flex items-center border-b border-brand-border bg-brand-surface/10 px-4 py-3">
                <Search size={18} className="mr-3 text-brand-accent" />

                <input
                  type="text"
                  autoFocus
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-none bg-transparent text-sm text-brand-text outline-none placeholder:text-brand-text/30"
                />

                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="rounded-md bg-brand-surface/20 p-1 text-brand-text/30 transition-colors hover:text-brand-text"
                  aria-label="Close search"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                {filteredComponents.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {filteredComponents.map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => handleSelectComponent(key)}
                        className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors hover:bg-brand-surface/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/50 text-brand-text/40 transition-colors group-hover:border-brand-accent/30 group-hover:text-brand-accent">
                            <Layers size={14} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-brand-text transition-colors group-hover:text-brand-accent">
                              {data.name}
                            </p>
                            <p className="mt-0.5 font-mono text-[11px] text-brand-text/40">
                              {key}
                            </p>
                          </div>
                        </div>

                        <ChevronRight
                          size={16}
                          className="text-brand-text/20 transition-all group-hover:translate-x-1 group-hover:text-brand-accent/50"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface/20 text-brand-text/20">
                      <Search size={20} />
                    </div>

                    <p className="text-sm font-medium text-brand-text/60">
                      No components found.
                    </p>
                    <p className="mt-1 text-xs text-brand-text/30">
                      We couldn't find anything matching "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-brand-border bg-brand-surface/5 px-4 py-2">
                <span className="text-[10px] text-brand-text/40">
                  <kbd className="mr-1 rounded border border-brand-border/60 px-1 py-0.5">
                    ESC
                  </kbd>
                  to close
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
              className="fixed bottom-0 right-0 top-0 z-50 flex w-[85%] max-w-xs flex-col border-l border-brand-border bg-brand-bg shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-brand-border p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/40">
                  Menu
                </span>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-brand-surface/30 p-2 transition-colors hover:text-brand-accent"
                  aria-label="Close menu"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive(link)
                        ? "bg-brand-accent/10 text-brand-accent"
                        : "text-brand-text/70 hover:bg-brand-surface/30 hover:text-brand-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {isDocsArea && (
                <div className="flex-1 overflow-y-auto border-t border-brand-border p-4 custom-scrollbar">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-brand-accent">
                    Components
                  </p>

                  <div className="flex flex-col gap-1">
                    {Object.entries(componentRegistry).map(([key, data]) => (
                      <Link
                        key={key}
                        to={`/components/${key}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm transition-all ${
                          location.pathname === `/components/${key}`
                            ? "bg-brand-surface/30 font-semibold text-brand-accent"
                            : "text-brand-text/60 hover:bg-brand-surface/30 hover:text-brand-text"
                        }`}
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