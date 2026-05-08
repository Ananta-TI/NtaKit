import { ExternalLink } from "lucide-react"; 

export default function Footer() {
  return (
    <footer className="w-full bg-brand-bg border-t border-brand-border pt-20 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="sm:col-span-2 flex flex-col items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-brand-accent rounded-2xl rotate-6 flex items-center justify-center shadow-2xl shadow-brand-accent/20">
                <span className="text-brand-bg font-black text-2xl">N</span>
              </div>
              <span className="font-black tracking-tighter text-3xl text-brand-text italic uppercase">ISOGIT <span className="text-brand-accent">NTA</span></span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-medium">Eksperimen kreatif menggabungkan React, Three.js, dan Tailwind CSS v4. Fokus pada efisiensi tinggi dan hasil presisi.</p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Resources</h4>
            <nav className="flex flex-col items-center sm:items-start gap-4 text-sm text-zinc-400 font-bold">
              <a href="#" className="hover:text-brand-text transition-colors flex items-center gap-2">Docs <ExternalLink size={12} /></a>
              <a href="#" className="hover:text-brand-text transition-colors">Components</a>
            </nav>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Socials</h4>
            <div className="flex gap-4">
              <a href="https://github.com/Ananta-TI" target="_blank" className="p-3.5 bg-brand-surface/30 rounded-2xl hover:bg-brand-accent hover:text-brand-bg transition-all border border-brand-border active:scale-90"><GithubIcon /></a>
              <a href="#" className="p-3.5 bg-brand-surface/30 rounded-2xl hover:bg-brand-accent hover:text-brand-bg transition-all border border-brand-border active:scale-90"><InstaIcon /></a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-brand-border/30 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] font-black">© 2026 ANANTA FIRDAUS • POLITEKNIK CALTEX RIAU</div>
            <div className="text-[9px] text-zinc-600 font-black uppercase tracking-widest italic">PEKANBARU, RIAU, INDONESIA</div>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-1.5 bg-brand-accent/5 rounded-full border border-brand-accent/20">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[9px] font-black text-brand-accent uppercase tracking-tighter italic">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>; }
function InstaIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y1="6.5"/></svg>; }