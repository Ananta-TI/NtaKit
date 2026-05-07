import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function NtaButton() {
  const { isDarkMode } = useContext(ThemeContext);

return (
  <>{/* [DOC-ONLY] */}
    <div className="flex items-center justify-center p-12 bg-zinc-900/10 rounded-3xl">
    {/* [/DOC-ONLY] */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="px-8 py-3 rounded-xl border-2 border-brand-accent text-brand-accent font-bold"
      >
        Click Me
      </motion.button>{/* [DOC-ONLY] */}
    </div>{/* [/DOC-ONLY] */}
  </>
);
}