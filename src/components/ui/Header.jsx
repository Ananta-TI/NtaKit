import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { componentRegistry } from "../../registry";

export default function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const isComponentPage = location.pathname.startsWith("/components/");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = Object.entries(componentRegistry).filter(([_, data]) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl text-brand-text">
      <div className="h-full px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl border border-brand-border bg-brand-surface/50 flex items-center justify-center">
              <img src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"} alt="Logo" className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Nta<span className="text-brand-accent">Kit</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium opacity-70">
            <Link to="/components/github-isometric" className="hover:text-brand-accent hover:opacity-100 transition-all">Components</Link>
            <Link to="/" className="hover:text-brand-accent hover:opacity-100 transition-all">Docs</Link>
          </nav>
        </div>

        {isComponentPage && (
          <div className="hidden lg:block flex-1 max-w-md mx-auto relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/30 group-focus-within:text-brand-accent" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              className="w-full rounded-2xl pl-11 pr-4 py-2.5 text-sm outline-none border border-brand-border bg-brand-surface/30 focus:border-brand-accent/50 transition-all"
            />
            <AnimatePresence>
              {searchOpen && searchQuery && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-brand-border bg-brand-surface shadow-2xl overflow-hidden">
                  {filteredComponents.map(([id, data]) => (
                    <Link key={id} to={`/components/${id}`} className="block px-4 py-3 text-sm hover:bg-brand-accent/10 border-b border-brand-border last:border-0">{data.name}</Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="w-11 h-11 rounded-2xl border border-brand-border bg-brand-surface/50 flex items-center justify-center hover:border-brand-accent transition-all">
            {isDarkMode ? <Sun size={18} className="text-brand-accent" /> : <Moon size={18} className="text-brand-accent" />}
          </button>
          <a href="https://github.com/Ananta-TI" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-2xl border border-brand-border bg-brand-surface/50 flex items-center justify-center hover:border-brand-accent transition-all text-brand-text">
            <Sun size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}