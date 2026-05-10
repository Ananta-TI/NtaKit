import { ExternalLink } from "lucide-react";
import { useContext } from "react";

import MagneticEffect from "../../context/MagneticEffect";
import { ThemeContext } from "../../context/ThemeContext";

/* =========================
   ICONS
========================= */

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstaIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* =========================
   FOOTER
========================= */

export default function Footer() {
  const { isDarkMode } = useContext(ThemeContext);

  const mutedText = isDarkMode
    ? "text-[#2C3639]/60"
    : "text-[#DCD7C9]/60";

  const softText = isDarkMode
    ? "text-[#2C3639]/40"
    : "text-[#DCD7C9]/40";

  const weakText = isDarkMode
    ? "text-[#2C3639]/25"
    : "text-[#DCD7C9]/25";

  const borderSoft = isDarkMode
    ? "border-[#2C3639]/15"
    : "border-[#DCD7C9]/15";

  const surfaceSoft = isDarkMode
    ? "bg-[#2C3639]/10"
    : "bg-[#DCD7C9]/10";

  return (
    <footer
      className={`relative w-full overflow-hidden border-t pt-20 pb-12 px-6 transition-colors duration-500 ${
        isDarkMode
          ? "border-[#2C3639]/15 bg-gradient-to-b from-[#DCD7C9] to-[#CFC7B4] text-[#2C3639]"
          : "border-[#DCD7C9]/15 bg-gradient-to-b from-[#2C3639] to-[#1E2527] text-[#DCD7C9]"
      }`}
    >
      {/* TOP GLOW LINE */}
      <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] left-[10%] h-[260px] w-[260px] rounded-full bg-brand-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-140px] right-[5%] h-[280px] w-[280px] rounded-full bg-brand-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =========================
            TOP GRID
        ========================= */}
        <div className="mb-16 grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-4">

          {/* BRAND */}
          <div className="sm:col-span-2 flex flex-col items-center gap-5 text-center sm:items-start sm:text-left">

            <MagneticEffect>
              <div className="group flex cursor-default items-center gap-3">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg shadow-black/5 transition-all duration-300 group-hover:border-brand-accent/40 group-hover:shadow-brand-accent/10 ${borderSoft} ${surfaceSoft}`}
                >
                  <img
                    src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"}
                    alt="NtaKit"
                    className="h-5 w-5 object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight">
                    Nta
                    <span className="text-brand-accent">Kit</span>
                  </span>

                  <span
                    className={`text-[10px] uppercase tracking-[0.28em] ${softText}`}
                  >
                    UI ENGINE
                  </span>
                </div>
              </div>
            </MagneticEffect>

            {/* DESC */}
            <p className={`max-w-md text-sm leading-relaxed ${mutedText}`}>
              Eksperimen frontend modern berbasis React, animasi presisi,
              micro-interaction premium, dan design system modular.
              Karena sekarang bahkan tombol submit perlu simulasi gravitasi
              kecil supaya manusia merasa masa depannya terkendali.
            </p>
          </div>

          {/* RESOURCES */}
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
              Resources
            </h4>

            <nav className="flex flex-col items-center gap-3 text-sm font-medium sm:items-start">

              <MagneticEffect>
                <a
                  href="#"
                  className={`group flex items-center gap-2 transition-colors hover:text-current ${mutedText}`}
                >
                  Docs

                  <ExternalLink
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </MagneticEffect>

              <MagneticEffect>
                <a
                  href="#"
                  className={`transition-colors hover:text-current ${mutedText}`}
                >
                  Components
                </a>
              </MagneticEffect>

              
            </nav>
          </div>

          {/* SOCIALS */}
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">
              Socials
            </h4>

            <div className="flex items-center gap-3">

              {/* GITHUB */}
              <MagneticEffect>
                <a
                  href="https://github.com/Ananta-TI"
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent hover:text-black hover:shadow-lg hover:shadow-brand-accent/20 active:scale-95 ${borderSoft} ${surfaceSoft} ${mutedText}`}
                >
                  <GithubIcon />
                </a>
              </MagneticEffect>

              {/* INSTAGRAM */}
              <MagneticEffect>
                <a
                  href="https://instagram.com/ntakunti_14"
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent hover:text-black hover:shadow-lg hover:shadow-brand-accent/20 active:scale-95 ${borderSoft} ${surfaceSoft} ${mutedText}`}
                >
                  <InstaIcon />
                </a>
              </MagneticEffect>
            </div>

            {/* STATUS */}
            <div className="mt-2 flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/5 px-4 py-1.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-accent" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">
                System Operational
              </span>
            </div>
          </div>
        </div>

        {/* =========================
            BOTTOM BAR
        ========================= */}
        <div
          className={`flex flex-col items-center justify-between gap-6 border-t pt-10 md:flex-row ${
            isDarkMode
              ? "border-[#2C3639]/10"
              : "border-[#DCD7C9]/10"
          }`}
        >

          {/* COPYRIGHT */}
          <div className="text-center md:text-left">
            <div
              className={`text-[10px] font-mono font-bold uppercase tracking-[0.35em] ${softText}`}
            >
              © 2026 NTAKIT • POLITEKNIK CALTEX RIAU
            </div>

            <div
              className={`mt-1 text-[9px] uppercase tracking-[0.28em] ${weakText}`}
            >
              PEKANBARU, RIAU, INDONESIA
            </div>
          </div>

          {/* TECH STACK */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["React", "Framer Motion", "Tailwind", "GSAP"].map((tech) => (
              <span
                key={tech}
                className={`rounded-full border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/40 ${
                  isDarkMode
                    ? "border-[#2C3639]/15 bg-[#2C3639]/5 text-[#2C3639]/60 hover:text-[#2C3639]"
                    : "border-[#DCD7C9]/15 bg-[#DCD7C9]/5 text-[#DCD7C9]/60 hover:text-[#DCD7C9]"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}