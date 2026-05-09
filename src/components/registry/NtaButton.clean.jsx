import { motion } from "framer-motion";

export default function NtaButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#A27B5C", color: "#fff" }}
      whileTap={{ scale: 0.95 }}
      initial={{ backgroundColor: "transparent" }}
      className="px-8 py-3 rounded-xl border-2 border-[#A27B5C] text-[#A27B5C] font-bold uppercase transition-all"
    >
      Explore More
    </motion.button>
  );
}