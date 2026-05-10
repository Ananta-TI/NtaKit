import { Link, useLocation } from "react-router-dom";
import { componentRegistry } from "../../registry";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (key) =>
    location.pathname === `/components/${key}`;

  return (
    <aside className="hidden md:block fixed left-0 top-14 w-56 h-[calc(100vh-56px)] border-r border-brand-border bg-brand-bg overflow-y-auto">

      {/* INSTALLATION */}
      <div className="p-4">
        <p className="text-[10px] text-brand-text/30 mb-2">
          Getting Started
        </p>

        <Link
          to="/installation"
          className={`block px-3 py-2 rounded-lg text-sm ${
            location.pathname === "/installation"
              ? "text-brand-accent bg-brand-surface/30"
              : "text-brand-text/40"
          }`}
        >
          Installation
        </Link>
      </div>

      {/* COMPONENTS */}
      <div className="p-4 border-t border-brand-border">
        <p className="text-[10px] text-brand-accent mb-2">
          Components
        </p>

        {Object.entries(componentRegistry).map(([key, data]) => (
          <Link
            key={key}
            to={`/components/${key}`}
            className={`block px-3 py-2 rounded-lg text-sm ${
              isActive(key)
                ? "text-brand-accent bg-brand-surface/30"
                : "text-brand-text/40"
            }`}
          >
            {data.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}