import { useRef, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";

const spotlightItems = [
  {
    title: "Web Development",
    desc: "React.js, Laravel, Node.js & Tailwind CSS. Selalu mencari cara paling efisien untuk hasil berkualitas.",
    spotlightColor: "rgba(57, 211, 83, 0.25)",
    spotlightSize: 360,
  },
  {
    title: "Cyber Operations",
    desc: "Bug bounty hunting, reverse engineering, dan OSINT tracking architecture.",
    spotlightColor: "rgba(168, 85, 247, 0.25)",
    spotlightSize: 340,
  },
  {
    title: "Digital Artworks",
    desc: "Wildstyle graffiti sketching, typography exploration, dan character design.",
    spotlightColor: "rgba(251, 191, 36, 0.25)",
    spotlightSize: 320,
  },
];

export default function SpotlightGridDemo({ preview = false }) {
  const containerRef = useRef(null);

  const themeCtx = useContext(ThemeContext);
  const isDarkMode = themeCtx?.isDarkMode ?? true;

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".spotlight-card");

    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const rootClass = preview
    ? "flex h-full w-full flex-col items-center justify-center overflow-hidden bg-transparent px-3 py-4 font-sans"
    : "flex min-h-[460px] w-full flex-col items-center justify-center bg-transparent px-4 py-8 font-sans sm:px-6 sm:py-10";

  const headerClass = preview
    ? "mx-auto mb-5 flex max-w-xl flex-col gap-2 text-center"
    : "mx-auto mb-8 flex max-w-2xl flex-col gap-3 text-center sm:mb-10";

  const titleClass = preview
    ? "text-[clamp(1.8rem,5vw,3rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-brand-text"
    : "text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-brand-text";

  const gridClass = preview
    ? "group grid w-full max-w-4xl grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-3"
    : "group grid w-full max-w-5xl grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4 sm:gap-5 lg:gap-6";

  const cardClass = preview
    ? "spotlight-card relative min-h-[185px] overflow-hidden rounded-2xl p-[1px]"
    : "spotlight-card relative min-h-[245px] overflow-hidden rounded-3xl p-[1px]";

  const cardInnerClass = preview
    ? "relative flex h-full flex-col gap-3 overflow-hidden rounded-[15px] border border-brand-border/40 bg-brand-bg/95 p-4 backdrop-blur-xl"
    : "relative flex h-full flex-col gap-5 overflow-hidden rounded-[23px] border border-brand-border/40 bg-brand-bg/95 p-6 backdrop-blur-xl sm:p-7";

  const iconClass = preview
    ? "relative z-10 mb-1 flex h-9 w-9 items-center justify-center rounded-full border border-brand-border bg-brand-surface/50 font-mono text-xs text-brand-text/55"
    : "relative z-10 mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-brand-surface/50 font-mono text-sm text-brand-text/55";

  const cardTitleClass = preview
    ? "mb-2 text-lg font-semibold tracking-[-0.04em] text-brand-text"
    : "mb-3 text-2xl font-semibold tracking-[-0.04em] text-brand-text";

  const descClass = preview
    ? "text-xs leading-relaxed text-brand-text/60"
    : "text-sm leading-relaxed text-brand-text/60 sm:text-[15px]";

  return (
    <div className={rootClass}>
      <div className={headerClass}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-accent sm:text-[11px]">
          Spotlight Cards
        </p>

        <h1 className={titleClass}>Hover the cards.</h1>
      </div>

      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        className={gridClass}
      >
        {spotlightItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: preview ? 10 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className={`
              ${cardClass}
              ${isDarkMode ? "bg-brand-border/70" : "bg-brand-border"}
            `}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(${
                  preview ? item.spotlightSize * 0.75 : item.spotlightSize
                }px circle at var(--mouse-x) var(--mouse-y), ${
                  item.spotlightColor
                }, transparent 42%)`,
              }}
            />

            <div className={cardInnerClass}>
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(${
                    preview ? item.spotlightSize * 0.75 : item.spotlightSize
                  }px circle at var(--mouse-x) var(--mouse-y), ${item.spotlightColor.replace(
                    "0.25",
                    "0.06"
                  )}, transparent 42%)`,
                }}
              />

              <div className={iconClass}>0{index + 1}</div>

              <div className="relative z-10 flex flex-1 flex-col">
                <h3 className={cardTitleClass}>{item.title}</h3>

                <p className={descClass}>{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}