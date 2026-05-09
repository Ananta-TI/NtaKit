import { Link, useParams } from "react-router-dom";
import { componentRegistry } from "../../registry";

export default function Sidebar() {
  const { id } = useParams();

  return (
<aside className="fixed top-14 left-0 w-56 hidden md:block border-r border-brand-border h-[calc(100vh-56px)] overflow-y-auto bg-brand-bg z-30 px-4 py-8 custom-scrollbar">
    <div className=" mb-4">
        <p className="text-[10px] font-semibold text-brand-text/20 uppercase tracking-[0.15em] mb-3">
          Getting Started
        </p>
        <nav className="flex flex-col gap-0.5 text-[11px] font-medium">
          <a
            href="#"
            className="px-3 py-2 rounded-lg text-brand-text/30 hover:text-brand-accent hover:bg-brand-surface/30 transition-all"
          >
            Installation
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-lg text-brand-text/30 hover:text-brand-accent hover:bg-brand-surface/30 transition-all"
          >
            Theming
          </a>
        </nav>
      </div>
      
      <div className="mb-8 ">
        <p className="text-[10px] font-semibold text-brand-accent/60 uppercase tracking-[0.15em] mb-4 ">
          Components
        </p>
        <div className="flex flex-col gap-0.5">
          {Object.keys(componentRegistry).map((key) => (
            <Link
              key={key}
              to={`/components/${key}`}
              className={`px-3 py-2 rounded-lg text-[11px] transition-all duration-200 flex items-center justify-between font-medium tracking-tight ${
                id === key
                  ? "bg-brand-accent/8 text-brand-accent"
                  : "text-brand-text/30 hover:text-brand-text hover:bg-brand-surface/30"
              }`}
            >
              {componentRegistry[key].name}
              {id === key && (
                <div className="w-1 h-1 rounded-full bg-brand-accent" />
              )}
            </Link>
          ))}
        </div>
      </div>

      
    </aside>
  );
}