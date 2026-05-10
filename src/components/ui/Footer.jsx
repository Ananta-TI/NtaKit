import { ExternalLink } from "lucide-react";

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-brand-bg border-t border-brand-border pt-20 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          {/* BRAND (DISAMAKAN DENGAN HEADER) */}
          <div className="sm:col-span-2 flex flex-col items-center sm:items-start gap-5 text-center sm:text-left">

            <div className="flex items-center gap-2.5">

              {/* logo box sama feel header */}
              <div className="w-9 h-9 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center">
                <img
                  src="/image/logo2.png"
                  alt="NtaKit"
                  className="w-4 h-4"
                />
              </div>

              <span className="text-sm font-bold tracking-tight">
                Nta<span className="text-brand-accent">Kit</span>
              </span>

            </div>

            <p className="text-brand-text/40 text-sm max-w-sm leading-relaxed">
              Eksperimen frontend modern berbasis React, animasi halus, dan design system modular. Fokus: clean, cepat, presisi.
            </p>

          </div>

          {/* RESOURCES */}
          <div className="flex flex-col items-center sm:items-start gap-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
              Resources
            </h4>
            <nav className="flex flex-col items-center sm:items-start gap-3 text-sm text-brand-text/40 font-medium">
              <a href="#" className="hover:text-brand-text transition-colors flex items-center gap-2">
                Docs <ExternalLink size={12} />
              </a>
              <a href="#" className="hover:text-brand-text transition-colors">
                Components
              </a>
            </nav>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col items-center sm:items-start gap-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
              Socials
            </h4>

            <div className="flex gap-3">
              <a
                href="https://github.com/Ananta-TI"
                target="_blank"
                className="w-9 h-9 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all active:scale-95"
              >
                <GithubIcon />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-brand-border bg-brand-surface/20 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all active:scale-95"
              >
                <InstaIcon />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-brand-border/30 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-center md:text-left">
            <div className="text-[10px] font-mono text-brand-text/30 uppercase tracking-[0.35em] font-bold">
              © 2026 NTAKIT • POLITEKNIK CALTEX RIAU
            </div>
            <div className="text-[9px] text-brand-text/20 uppercase tracking-widest mt-1">
              PEKANBARU, RIAU, INDONESIA
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[9px] font-bold text-brand-accent uppercase tracking-wider">
              System Operational
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}