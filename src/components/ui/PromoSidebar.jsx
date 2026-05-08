import { useContext } from "react";
import {  Globe, Code2, Box, Activity, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
// 👇 Import registry untuk ambil data real-time
import { componentRegistry } from "../../registry";

export default function PromoSidebar() {
  const { isDarkMode } = useContext(ThemeContext);
  
  // Kalkulasi data real-time dari registry
  const allComponents = Object.values(componentRegistry);
  const totalComponents = allComponents.length;
  
  // Ambil 3 komponen terakhir untuk ditampilkan sebagai "Latest"
  const latestComponents = allComponents.slice(-3).reverse();

  return (
    <aside className="w-80 hidden xl:block p-8 border-l border-brand-border sticky top-20 h-[calc(100vh-80px)] overflow-y-auto bg-brand-bg custom-scrollbar">
      
      {/* CORE INFO CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-brand-surface/40 border border-brand-border rounded-3xl p-6 mb-8 group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
            <Code2 size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-brand-text leading-none">NtaKit Core</h3>
            <p className="text-[10px] text-brand-text/40 mt-1 uppercase tracking-widest font-mono italic">v1.0.0 Stable</p>
          </div>
        </div>
        
        <p className="text-brand-text/60 text-[11px] mb-6 leading-relaxed">
          Evolving collection of <span className="text-brand-text font-bold">{totalComponents} components</span>. Crafted for high-performance React applications.
        </p>
        
        <div className="flex gap-2">
          <a 
            href="https://github.com/Ananta-TI" 
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-brand-surface border border-brand-border text-brand-text py-2 rounded-xl text-[11px] font-bold hover:border-brand-accent hover:text-brand-accent transition-all flex items-center justify-center gap-2"
          >
            <Globe size={14} /> GitHub
          </a>
        </div>
      </motion.div>

      {/* REAL-TIME STATS SECTION */}
      <div className="space-y-8">
        <div>
          <p className="text-[10px] font-bold text-brand-text/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Activity size={12} /> Library Insights
          </p>
          <div className="p-5 bg-brand-surface/20 border border-brand-border rounded-2xl space-y-4">
            <StatRow label="Total Components" value={totalComponents} icon={<Box size={12} />} />
            <StatRow label="Framework" value="React 18" icon={<Layers size={12} />} />
            <StatRow label="Engine" value="GSAP / Framer" icon={<Activity size={12} />} />
          </div>
        </div>

        {/* LATEST COMPONENTS LIST (Dynamic) */}
        <div>
          <p className="text-[10px] font-bold text-brand-text/30 uppercase tracking-[0.2em] mb-4">
            Recently Added
          </p>
          <div className="space-y-3">
            {latestComponents.map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-brand-border hover:bg-brand-surface/30 transition-all cursor-default group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors" />
                  <span className="text-[11px] font-medium text-brand-text/60 group-hover:text-brand-text capitalize">
                    {comp.name.replace(/-/g, ' ')}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-brand-text/20">NEW</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[9px] font-mono tracking-tighter">
          &copy; 2026 ANANTA FIRDAUS • PCR
        </p>
      </footer>
    </aside>
  );
}

function StatRow({ label, value, icon }) {
  return (
    <div className="flex justify-between items-center text-[11px]">
      <div className="flex items-center gap-2 text-brand-text/40">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-brand-text/80 font-bold font-mono">{value}</span>
    </div>
  );
}