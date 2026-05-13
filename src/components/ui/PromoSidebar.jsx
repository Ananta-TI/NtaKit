import { useContext } from "react";
import { Code2, Box, Activity, Layers, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
import { componentRegistry } from "../../registry";

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function PromoSidebar() {
  const allComponents = Object.values(componentRegistry);
  const latest = allComponents.slice(-3).reverse();

  return (
<aside className="fixed top-14 right-0 w-64 hidden xl:block  h-[calc(100vh-56px)] overflow-y-auto bg-brand-bg p-5 custom-scrollbar z-20">
      <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
        {/* Card */}
        <div className="bg-brand-surface/20 border border-brand-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-brand-accent/8 border border-brand-accent/15 flex items-center justify-center text-brand-accent">
              <Code2 size={18} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-brand-text">NtaKit Core</h3>
              <p className="text-[9px] text-brand-text/25 font-mono">v1.0.0-alpha</p>
            </div>
          </div>
          <p className="text-[11px] text-brand-text/35 leading-relaxed mb-4">
            <span className="text-brand-text/60 font-medium">{allComponents.length} components</span> for high-performance React apps.
          </p>
          <a href="https://github.com/Ananta-TI" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-brand-surface border border-brand-border text-[10px] font-medium text-brand-text/40 hover:text-brand-accent hover:border-brand-accent/30 transition-all">
            <GithubIcon size={12} /> GitHub <ArrowUpRight size={10} />
          </a>
        </div>

        {/* Stats */}
        <div>
          <p className="text-[10px] font-semibold text-brand-text/20 uppercase tracking-[0.2em] mb-3">Insights</p>
          <div className="space-y-2">
            {[
              { label: "Components", value: allComponents.length, icon: <Box size={12} /> },
              { label: "Framework", value: "React 18", icon: <Layers size={12} /> },
              { label: "Target", value: "60 FPS", icon: <Activity size={12} /> },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-brand-surface/10 text-[10px]">
                <span className="flex items-center gap-2 text-brand-text/25">{s.icon} {s.label}</span>
                <span className="text-brand-text/60 font-mono font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div>
          <p className="text-[10px] font-semibold text-brand-text/20 uppercase tracking-[0.2em] mb-3">Recent</p>
          <div className="space-y-0.5">
            {latest.map((c, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-surface/20 transition-colors group">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-brand-accent/30 group-hover:bg-brand-accent transition-colors" />
                  <span className="text-[10px] text-brand-text/30 group-hover:text-brand-text/60 transition-colors font-medium">{c.name.replace(/-/g, " ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </aside>
  );
}