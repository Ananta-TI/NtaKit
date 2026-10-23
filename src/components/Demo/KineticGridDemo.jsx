import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import KineticGrid from "../registry/KineticGrid";

export default function KineticGridDemo({ preview = false, ...props }) {
  const { isDarkMode } = useContext(ThemeContext);

  const rootClass = preview
    ? "flex h-full w-full items-center justify-center bg-transparent px-3 py-4"
    : "flex min-h-[460px] w-full items-center justify-center bg-transparent px-4 py-8 sm:px-6 sm:py-10";

  return (
    <div className={rootClass}>
      <KineticGrid isDarkMode={isDarkMode} {...props} />
    </div>
  );
}
