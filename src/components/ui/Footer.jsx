// Hapus Github, Instagram, dan Twitter dari sini
import { ExternalLink } from "lucide-react"; 

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-brand-border pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Branding */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-accent rounded-xl rotate-6 flex items-center justify-center shadow-lg shadow-brand-accent/20 group hover:rotate-0 transition-transform duration-500">
                <span className="text-brand-bg font-black text-xl">N</span>
              </div>
              <span className="font-black tracking-tighter text-2xl text-brand-text italic">
                ISOGIT <span className="text-brand-accent">NTA</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Eksperimen kreatif menggabungkan React, Three.js, dan Tailwind CSS v4.
            </p>
          </div>

          {/* Kolom 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-accent">Resources</h4>
            <div className="flex flex-col gap-3 text-sm text-zinc-400 font-medium">
              <a href="#" className="hover:text-brand-text transition-colors flex items-center gap-2">Documentation <ExternalLink size={12} /></a>
              <a href="#" className="hover:text-brand-text transition-colors">Component Library</a>
            </div>
          </div>

          {/* Kolom 3: Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-accent">Socials</h4>
            <div className="flex gap-3">
              {/* SVG GITHUB MANUAL (Anti-Error v1) */}
              <a href="https://github.com/Ananta-TI" target="_blank" className="p-3 bg-brand-surface/30 rounded-xl hover:bg-brand-accent hover:text-brand-bg transition-all border border-brand-border active:scale-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              {/* SVG INSTAGRAM MANUAL */}
              <a href="#" className="p-3 bg-brand-surface/30 rounded-xl hover:bg-brand-accent hover:text-brand-bg transition-all border border-brand-border active:scale-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y1="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="pt-8 border-t border-brand-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold">
              © 2026 ANANTA FIRDAUS • POLYTEKNIK CALTEX RIAU
            </div>
            <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
              PEKANBARU, RIAU, INDONESIA
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-accent/10 rounded-full border border-brand-accent/20">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[9px] font-black text-brand-accent uppercase tracking-tighter">System Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}