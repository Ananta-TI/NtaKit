import { Link, useLocation } from "react-router-dom";
import { componentRegistry } from "../../registry";
import { Layers, Terminal, Sparkles, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const isComponentActive = (key) => {
    return location.pathname === `/components/${key}`;
  };

  const isInstallationActive = location.pathname === "/installation";

  return (
    <div className="h-full overflow-y-auto border-r border-brand-border bg-brand-bg custom-scrollbar">
      <div className="px-4 py-5">
        <div className="mb-6 rounded-2xl border border-brand-border bg-brand-surface/40 p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-brand-accent text-brand-bg">
              <Layers size={16} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em] text-brand-text">
                NtaKit
              </p>
              <p className="text-xs text-brand-text/45">
                Component Lab
              </p>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-brand-text/50">
            Browse, preview, copy, dan jangan rusak layout lagi demi Tuhan CSS.
          </p>
        </div>

        <section className="mb-6">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-text/35">
            Getting Started
          </p>

          <Link
            to="/installation"
            className={`group flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
              isInstallationActive
                ? "border-brand-accent/35 bg-brand-accent/10 text-brand-accent"
                : "border-transparent text-brand-text/55 hover:border-brand-border hover:bg-brand-surface/40 hover:text-brand-text"
            }`}
          >
            <span className="flex items-center gap-2">
              <Terminal size={14} />
              Installation
            </span>

            <ChevronRight
              size={14}
              className={`transition-all ${
                isInstallationActive
                  ? "text-brand-accent"
                  : "text-brand-text/25 group-hover:translate-x-0.5 group-hover:text-brand-text/60"
              }`}
            />
          </Link>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
              Components
            </p>

            <span className="rounded-full border border-brand-border bg-brand-surface px-2 py-0.5 text-[10px] text-brand-text/45">
              {Object.keys(componentRegistry).length}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {Object.entries(componentRegistry).map(([key, data]) => {
              const active = isComponentActive(key);

              return (
                <Link
                  key={key}
                  to={`/components/${key}`}
                  className={`group flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "border-brand-accent/35 bg-brand-accent/10 text-brand-accent shadow-[0_0_28px_color-mix(in_srgb,var(--color-brand-accent)_12%,transparent)]"
                      : "border-transparent text-brand-text/50 hover:border-brand-border hover:bg-brand-surface/40 hover:text-brand-text"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-lg border ${
                        active
                          ? "border-brand-accent/40 bg-brand-accent/15 text-brand-accent"
                          : "border-brand-border bg-brand-surface/40 text-brand-text/35 group-hover:text-brand-accent"
                      }`}
                    >
                      <Sparkles size={12} />
                    </span>

                    <span className="truncate">{data.name}</span>
                  </span>

                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-all ${
                      active
                        ? "text-brand-accent"
                        : "text-brand-text/20 group-hover:translate-x-0.5 group-hover:text-brand-accent/70"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}