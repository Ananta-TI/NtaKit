import { Link, useLocation } from "react-router-dom";
import { componentRegistry } from "../../registry";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (key) => location.pathname === `/components/${key}`;

  return (
    // Kerangka luar dikembalikan ke versi aslimu agar pas di bawah Header
    <aside className="hidden md:block fixed left-0 top-14 w-56 h-[calc(100vh-56px)] border-r border-brand-border bg-brand-bg overflow-y-auto custom-scrollbar">
      
      {/* INSTALLATION */}
      <div className="p-4">
        <p className="text-[10px] font-bold tracking-wider uppercase text-brand-text/30 mb-3">
          Getting Started
        </p>

        <Link
          to="/installation"
          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname === "/installation"
              ? "text-brand-accent bg-brand-surface/30"
              : "text-brand-text/50 hover:text-brand-text hover:bg-brand-surface/10"
          }`}
        >
          Installation
        </Link>
      </div>

      {/* COMPONENTS */}
      <div className="p-4 border-t border-brand-border/50">
        <p className="text-[10px] font-bold tracking-wider uppercase text-brand-accent mb-3">
          Components
        </p>

        <div className="flex flex-col gap-0.5">
          {Object.entries(componentRegistry).map(([key, data]) => (
            <Link
              key={key}
              to={`/components/${key}`}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(key)
                  ? "text-brand-accent bg-brand-accent/10 border border-brand-accent/20"
                  : "text-brand-text/50 hover:text-brand-text hover:bg-brand-surface/20 border border-transparent"
              }`}
            >
              {data.name}
            </Link>
          ))}
        </div>
      </div>
      
    </aside>
  );
}