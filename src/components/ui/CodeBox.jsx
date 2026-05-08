import { useState, useEffect, useContext } from "react";
import { Check, Copy, ChevronUp, ChevronDown } from "lucide-react";
import { createHighlighter } from "shiki";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";

// 👇 Tambahkan expandable = true
export default function CodeBox({ code, hideHeader = false, language = "jsx", expandable = true }) {
    const { isDarkMode } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const MAX_HEIGHT = 250;

useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function highlight() {
      try {
        const highlighter = await createHighlighter({
          themes: ["tokyo-night"],
          langs: ["jsx", "javascript", "typescript", "css"],
        });
        
        const html = highlighter.codeToHtml(code, {
          lang: language || "jsx",
          theme: "tokyo-night",
          // 👇 INI RAHASIANYA: Menambahkan line numbers via Shiki transformer
          transformers: [
            {
              line(node, line) {
                node.properties['data-line'] = line;
              }
            }
          ]
        });

        if (isMounted) {
          setHighlightedHtml(html);
          setIsLoading(false);
        }
        highlighter.dispose();
      } catch (err) {
        console.error("Shiki Error:", err);
        setIsLoading(false);
      }
    }

    highlight();
    return () => { isMounted = false; };
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const codeLines = code.split('\n').length;

  return (
    <div className={`relative w-full rounded-2xl font-bold border border-brand-border bg-brand-surface/30 overflow-hidden transition-all duration-500 ${
      isDarkMode ? "bg-[#0d1117]/30" : "bg-zinc-50/30"
    }`}>
      
      {/* HEADER */}
      {!hideHeader && (
        <div className="flex justify-between items-center px-6 py-3 border-b border-brand-border bg-black/10">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-text/30 font-mono">
              {language.toUpperCase()} • {codeLines} lines
            </span>
          </div>

          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2 py-1 text-brand-text/40 hover:text-brand-accent transition-colors text-xs font-semibold"
          >
            {copied ? (
              <><Check size={14} className="text-green-500" /> COPIED</>
            ) : (
              <><Copy size={14} /> COPY</>
            )}
          </button>
        </div>
      )}
      
      {/* CODE CONTAINER */}
      <motion.div 
        // 👇 Logika berubah: Jika tidak expandable, tinggi otomatis full ("auto")
        animate={{ height: expandable ? (isExpanded ? "auto" : MAX_HEIGHT) : "auto" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden group"
      >
        {/* Tombol Copy Khusus kalau Header disembunyikan (Usage) */}
        {hideHeader && (
          <button 
            onClick={copyToClipboard} 
            className="absolute top-4 right-4 z-10 p-2 bg-brand-surface border border-brand-border rounded-lg text-brand-text/30 hover:text-brand-accent opacity-0 group-hover:opacity-100 transition-all shadow-xl"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        )}

        {isLoading ? (
          <div className="p-8 space-y-3">
            <div className="h-2.5 w-full bg-brand-text/5 rounded animate-pulse" />
            <div className="h-2.5 w-5/6 bg-brand-text/5 rounded animate-pulse" />
            <div className="h-2.5 w-4/5 bg-brand-text/5 rounded animate-pulse" />
          </div>
        ) : (
          <div 
            className="p-8 text-[13px] leading-relaxed shiki-container overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }} 
          />
        )}

        {/* GRADIENT OVERLAY + EXPAND BUTTON (Hanya muncul jika expandable = true) */}
        {expandable && !isExpanded && !isLoading && (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-bg via-brand-bg/85 to-transparent flex items-end justify-center pb-4 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(true)}
              className="pointer-events-auto px-5 py-2 bg-brand-surface border border-brand-border rounded-xl text-[11px] font-bold uppercase tracking-wider text-brand-text/70 hover:text-brand-accent hover:border-brand-accent transition-all shadow-lg flex items-center gap-2"
            >
              <ChevronDown size={14} />
              Expand Code ({codeLines} lines)
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* COLLAPSE FOOTER (Hanya muncul jika expandable = true) */}
      {expandable && isExpanded && !isLoading && (
        <div className="flex justify-center p-4 border-t border-brand-border bg-black/5 backdrop-blur-sm">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-2 text-[11px] font-bold text-brand-text/50 hover:text-brand-accent transition-colors uppercase"
          >
            <ChevronUp size={14} />
            Collapse Code
          </motion.button>
        </div>
      )}
    </div>
  );
}