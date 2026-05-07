import { useState, useEffect } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
// Ganti getHighlighter menjadi createHighlighter
import { createHighlighter } from "shiki";

export default function CodeBox({ code }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const MAX_HEIGHT = 300;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function highlight() {
      try {
        // Gunakan createHighlighter sebagai pengganti getHighlighter
        const highlighter = await createHighlighter({
          themes: ["monokai"],
          langs: ["jsx", "javascript", "typescript"],
        });
        
        // Versi terbaru menggunakan highlighter.codeToHtml secara langsung
        const html = highlighter.codeToHtml(code, {
          lang: "jsx",
          theme: "monokai",
        });

        if (isMounted) {
          setHighlightedHtml(html);
          setIsLoading(false);
        }

        // Penting: Bersihkan highlighter setelah digunakan untuk menghemat memori
        highlighter.dispose(); 
      } catch (err) {
        console.error("Shiki modern error:", err);
      }
    }

    highlight();
    return () => { isMounted = false; };
  }, [code]);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-col h-full bg-[#0d1117] border border-brand-border rounded-b-[24px] overflow-hidden">
      {/* HEADER (Titik macOS & Copy Button) */}
      <div className="flex justify-between items-center px-5 py-3 bg-zinc-900/80 border-b border-brand-border">
      
        <div className="flex items-center gap-2">
        
          <div className="flex gap-1.5">
          
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
          </div>
          
          <span className="ml-2 text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Source Code (Shiki)</span>
          <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-6 py-2 bg-brand-surface/40 hover:bg-brand-accent text-brand-text hover:text-brand-bg rounded-full text-xs font-bold transition-all border border-brand-border active:scale-95 group shadow-xl"
        >
          {isExpanded ? <>COLLAPSE <ChevronUp size={14} /></> : <>SHOW FULL CODE <ChevronDown size={14} /></>}
        </button>
        </div>
        {/* EXPAND BUTTON */}
        
        <button onClick={copyToClipboard} className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all text-zinc-400 hover:text-brand-accent">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="text-[10px] font-bold">{copied ? "COPIED" : "COPY"}</span>
        </button>
        
      </div>
      
      {/* CODE AREA */}
      <div 
        className="relative overflow-hidden transition-[max-height] duration-700 ease-in-out"
        style={{ maxHeight: isExpanded ? "500000px" : `${MAX_HEIGHT}px` }}
      >
        {isLoading ? (
          <div className="p-8 text-zinc-600 font-mono text-xs animate-pulse">Rendering syntax...</div>
        ) : (
          <div 
            className="p-6 text-[13px] leading-relaxed shiki-container"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }} 
          />
        )}

        {!isExpanded && !isLoading && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/95 to-transparent pointer-events-none" />
        )}
      </div>

      
    </div>
  );
}