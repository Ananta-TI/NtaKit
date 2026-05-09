import { useState, useEffect, useContext } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { createHighlighter } from "shiki";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";

export default function CodeBox({ code, hideHeader = false, language = "jsx", expandable = true }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const MAX_HEIGHT = 240;

  useEffect(() => {
    let mounted = true;
    async function highlight() {
      setIsLoading(true);
      try {
        const activeTheme = isDarkMode ? "monokai" : "github-light";

        const h = await createHighlighter({ 
          themes: ["monokai", "github-light"], 
          langs: ["jsx", "javascript", "typescript", "css"] 
        });

        const html = h.codeToHtml(code || "", { 
          lang: language || "jsx", 
          theme: activeTheme 
        });

        if (mounted) { 
          setHighlightedHtml(html); 
          setIsLoading(false); 
        }
        h.dispose();
      } catch { 
        setIsLoading(false); 
      }
    }
    highlight();

    return () => { mounted = false; };
  }, [code, language, isDarkMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = (code || "").split("\n").length;

  return (
    <div className="relative w-full rounded-xl border border-brand-border overflow-hidden transition-colors bg-brand-bg">
      {!hideHeader && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-brand-border bg-brand-surface/40">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <span className="text-[10px] font-mono text-brand-text/50 uppercase tracking-wider">
              {language} · {lines} lines
            </span>
          </div>
          <button onClick={handleCopy} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium text-brand-text/40 hover:text-brand-accent transition-colors">
            {copied ? <><Check size={12} className="text-green-500" /> Copied</> : <><Copy size={12} /> Copy</>}
          </button>
        </div>
      )}

      <motion.div
        animate={{ height: expandable ? (isExpanded ? "auto" : MAX_HEIGHT) : "auto" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden group"
      >
        {hideHeader && (
          <button onClick={handleCopy} className="absolute top-3 right-3 z-10 p-1.5 bg-brand-surface border border-brand-border rounded-md text-brand-text/40 hover:text-brand-accent opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
            {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
          </button>
        )}

        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-2.5 w-full bg-brand-text/[0.04] rounded-full animate-pulse" />)}
          </div>
        ) : (
          <div
            className="p-4 md:p-6 text-[11px] md:text-[12px] leading-relaxed shiki-container overflow-x-auto custom-scrollbar font-mono text-brand-text"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        )}

        {expandable && !isExpanded && !isLoading && lines > 12 && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-bg via-brand-bg/90 to-transparent flex items-end justify-center pb-4 pointer-events-none">
            <button onClick={() => setIsExpanded(true)} className="pointer-events-auto px-4 py-1.5 bg-brand-surface border border-brand-border rounded-lg text-[10px] font-medium text-brand-text/60 hover:text-brand-accent hover:border-brand-accent/30 transition-all flex items-center gap-1.5 shadow-sm">
              <ChevronDown size={12} /> Expand
            </button>
          </div>
        )}
      </motion.div>

      {expandable && isExpanded && (
        <div className="flex justify-center py-2 border-t border-brand-border bg-brand-surface/20">
          <button onClick={() => setIsExpanded(false)} className="flex items-center gap-1.5 text-[10px] font-medium text-brand-text/50 hover:text-brand-accent transition-colors">
            <ChevronUp size={12} /> Collapse
          </button>
        </div>
      )}
    </div>
  );
}