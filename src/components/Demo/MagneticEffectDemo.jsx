import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Magnet from "../registry/Magnet";

export default function MagneticEffectDemo({ preview = false, ...props }) {
  const { isDarkMode } = useContext(ThemeContext);

  const rootClass = preview
    ? "flex h-full w-full items-center justify-center bg-transparent px-3 py-4"
    : "flex min-h-[460px] w-full items-center justify-center bg-transparent px-4 py-8 sm:px-6 sm:py-10";

  return (
    <div className={rootClass}>
      

      <div className="mt-12 flex flex-col items-center gap-8">
        <Magnet {...props}>
          <button
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-brand-text/45 bg-brand-accent text-brand-bg font-semibold uppercase tracking-[0.12em] text-sm hover:bg-brand-accent/90 transition-colors active:scale-95 sm:px-10 sm:py-4"
          >
            Star on GitHub
          </button>
        </Magnet>

        <Magnet {...props} tilt={10} scale={1.1} padding={140}>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-border bg-brand-surface/20 text-brand-text/50 hover:border-brand-accent hover:text-brand-accent transition-all cursor-pointer">
            ?
          </div>
        </Magnet>
      </div>
    </div>
  );
}
