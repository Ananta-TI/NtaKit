import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { componentRegistry } from "../../registry";

export default function Sidebar() {
  const { id } = useParams();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <aside className="w-64 hidden md:block border-r border-brand-border sticky top-20 h-[calc(100vh-80px)] overflow-y-auto bg-brand-bg z-30 px-6 py-8 custom-scrollbar">
      <div className="mb-8">
        <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-4">
          Library Components
        </p>
        <div className="flex flex-col gap-1">
          {Object.keys(componentRegistry).map((key) => (
            <Link 
              key={key} 
              to={`/components/${key}`}
              className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-between group ${
                id === key 
                ? "bg-brand-accent/10 text-brand-accent font-bold border border-brand-accent/20" 
                : "text-brand-text/50 hover:text-brand-text hover:bg-brand-surface/50"
              }`}
            >
              {componentRegistry[key].name}
              {id === key && (
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              )}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-black text-brand-text/40 uppercase tracking-[0.2em] mb-4">
          Getting Started
        </p>
        <nav className="flex flex-col gap-1 text-sm font-medium">
          <a href="#" className="px-4 py-2 text-brand-text/60 hover:text-brand-accent transition-colors">
            Installation
          </a>
          <a href="#" className="px-4 py-2 text-brand-text/60 hover:text-brand-accent transition-colors">
            Theming
          </a>
        </nav>
      </div>
    </aside>
  );
}