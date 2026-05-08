import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

/**
 * Komponen tombol interaktif dengan efek skala dari Framer Motion.
 */
export default function NtaButton({
  /** Teks yang akan ditampilkan di dalam tombol */
  text = "Click Me",
  
  /** Fungsi callback yang dipanggil ketika tombol diklik */
  onClick
}) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      {/* [DOC-ONLY] */}
      <div className="flex items-center justify-center p-12 bg-black/5 rounded-3xl">
      {/* [/DOC-ONLY] */}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="px-8 py-3 rounded-xl border-2 border-brand-accent text-brand-accent font-bold transition-colors hover:bg-brand-accent hover:text-brand-bg"
        >
          {text}
        </motion.button>

      {/* [DOC-ONLY] */}
      </div>
      {/* [/DOC-ONLY] */}
    </>
  );
}