import { useState, useContext, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { componentRegistry } from "../registry";
import { Code2, Eye } from "lucide-react";
import CodeBox from "../components/ui/CodeBox";
import Sidebar from "../components/ui/Sidebar"; // Import Komponen Baru
import { getCleanCode } from "../utils/cleaner";
import { Search, Moon, Sun, Box, LayoutGrid } from "lucide-react";


export default function ComponentPage() {
  const { id } = useParams();
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("preview");
  const [showCode, setShowCode] = useState(false);
  
  const componentData = componentRegistry[id];

  useEffect(() => {
    setActiveTab("preview");
    window.scrollTo(0, 0);
  }, [id]);

  const cleanedCode = useMemo(() => {
    return getCleanCode(componentData?.code || "");
  }, [componentData]);

  useEffect(() => {
    if (activeTab === "code") {
      const timer = setTimeout(() => setShowCode(true), 250);
      return () => clearTimeout(timer);
    } else {
      setShowCode(false);
    }
  }, [activeTab]);

  if (!componentData) return <div className="p-10 text-brand-text font-mono">Component not found.</div>;

  const SelectedComponent = componentData.component;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-brand-bg text-brand-text" : "bg-white text-zinc-900"}`}>
      <div className="flex">
        {/* Panggil Sidebar yang sudah dipisah */}
        <Sidebar />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-black mb-3 tracking-tighter italic">
              {componentData.name}
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              {componentData.description}
            </p>
            
          </header>

          {/* TAB SELECTOR */}
          <div className="flex gap-1 mb-6 p-1 bg-zinc-900/50 rounded-2xl w-fit border border-brand-border">
            <button 
              onClick={() => setActiveTab("preview")} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "preview" ? "bg-brand-accent text-brand-bg shadow-lg" : "text-zinc-500 hover:text-white"}`}
            >
              <Eye size={18} /> Preview
            </button>
            <button 
              onClick={() => setActiveTab("code")} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "code" ? "bg-brand-accent text-brand-bg shadow-lg" : "text-zinc-500 hover:text-white"}`}
            >
              <Code2 size={18} /> Code
            </button>
          </div>

          {/* RENDER AREA */}
          <div className="rounded-[32px] border border-brand-border overflow-hidden bg-black/20 shadow-2xl min-h-[450px] relative">
            {activeTab === "preview" ? (
              <div className="animate-in fade-in zoom-in-95 duration-500 p-8">
                <SelectedComponent />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                {showCode ? (
                  <CodeBox code={cleanedCode} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-zinc-600 font-mono text-xs">
                    <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent animate-spin rounded-full mb-4"></div>
                    PREPARING SOURCE CODE...
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}