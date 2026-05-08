import { useState, useContext, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { componentRegistry } from "../registry";
import { Code2, Eye, RotateCcw, Heart, Copy, Check, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBox from "../components/ui/CodeBox";
import Sidebar from "../components/ui/Sidebar";
import PromoSidebar from "../components/ui/PromoSidebar";
import { getCleanCode } from "../utils/cleaner";
import generatedProps from "../generated-props.json";

// Helper Fungsi untuk Auto-Generate Props dari Source Code
const extractPropsFromCode = (code) => {
  if (!code) return [];
  try {
    // Regex baru yang lebih pintar: mencari pola destructuring props ({ ... }) 
    // pada function component tanpa memedulikan nama fungsinya.
    const regex = /(?:function\s+\w*\s*|const\s+\w+\s*=\s*(?:async\s*)?(?:\([^)]*\)\s*=>\s*)?)\(\s*\{([^}]+)\}\s*\)/;
    const match = code.match(regex);
    
    if (match && match[1]) {
      // Memisahkan berdasarkan koma, lalu membersihkan spasi
      const rawProps = match[1].split(',').map(s => s.trim()).filter(Boolean);
      
      return rawProps.map(propStr => {
        const parts = propStr.split('=');
        const name = parts[0].replace(/[^a-zA-Z0-9_]/g, '').trim();
        let defVal = parts.length > 1 ? parts.slice(1).join('=').trim() : '--';
        
        // Membersihkan tanda kutip dari default value jika ada
        let cleanDefVal = defVal;
        if (cleanDefVal.startsWith('"') && cleanDefVal.endsWith('"')) cleanDefVal = cleanDefVal.slice(1, -1);
        else if (cleanDefVal.startsWith("'") && cleanDefVal.endsWith("'")) cleanDefVal = cleanDefVal.slice(1, -1);
        
        // Deteksi Tipe Data Kasar
        let type = 'string';
        if (defVal === '--' || defVal === 'undefined') type = 'any';
        else if (!isNaN(Number(defVal))) type = 'number';
        else if (defVal === 'true' || defVal === 'false') type = 'boolean';
        else if (defVal.includes('=>') || defVal.startsWith('(')) type = 'function';
        else if (defVal.startsWith('{') || defVal.startsWith('[')) type = 'object';

        return { name, type, default: cleanDefVal, desc: "Auto-detected property" };
      }).filter(p => p.name);
    }
  } catch (e) {
    console.error("Failed to parse auto-props", e);
  }
  return [];
};

export default function ComponentPage() {
  const { id } = useParams();
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("preview"); // Tab Utama
  const [installMethod, setInstallMethod] = useState("cli");
  const [pkgManager, setPkgManager] = useState("npm");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  
  const componentData = componentRegistry[id];
  const [componentProps, setComponentProps] = useState({});

  useEffect(() => {
    if (componentData?.defaultProps) setComponentProps(componentData.defaultProps);
    setActiveTab("preview");
    window.scrollTo(0, 0);
  }, [id, componentData]);

  const cleanedCode = useMemo(() => getCleanCode(componentData?.code || ""), [componentData]);
  
  // LOGIKA AUTO-GENERATE PROPS
// LOGIKA AUTO-GENERATE PROPS
// LOGIKA BACA PROPS DARI HASIL REACT-DOCGEN
  const finalPropsTable = useMemo(() => {
    // 1. Prioritas utama: jika di registry ada propsTable manual, pakai itu
    if (componentData?.propsTable && componentData.propsTable.length > 0) {
      return componentData.propsTable;
    }
    // 2. Jika tidak ada, pakai hasil generate otomatis dari JSDoc
    if (generatedProps[id]) {
      return generatedProps[id];
    }
    // 3. Fallback jika kosong
    return [];
  }, [id, componentData]);

  if (!componentData) return <div className="p-10 text-brand-text">Component not found.</div>;

  const SelectedComponent = componentData.component;

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(`npx jsrepo@latest add ${id}`);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-text transition-colors duration-500">
      <Sidebar />

      {/* 1. Kurangi padding horizontal di layar besar biar konten bisa lebih melebar */}
      <main className="flex-1 px-4 md:px-8 lg:px-12 py-10 overflow-y-auto">
        
        {/* 2. LEBARKAN KONTEN: Ganti max-w-4xl menjadi max-w-6xl w-full */}
        <div className="max-w-6xl mx-auto w-full">
          
          {/* --- HEADER ALA REACT BITS --- */}
          <div className="mb-8">
            {/* Judul Sendirian di Atas */}
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic mb-6">
              {componentData.name}
            </h1>
            
            {/* Baris Tabs dan Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              
              {/* Kiri: Pill Tabs */}
              <div className="flex p-1 bg-black/10 rounded-xl border border-brand-border w-full sm:w-auto">
                <button onClick={() => setActiveTab("preview")} className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-bold uppercase tracking-wider transition-all ${activeTab === 'preview' ? 'bg-brand-surface text-brand-accent shadow-md' : 'text-brand-text/50 hover:text-brand-text'}`}>
                  <Eye size={16} /> Preview
                </button>
                <button onClick={() => setActiveTab("code")} className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-bold uppercase tracking-wider transition-all ${activeTab === 'code' ? 'bg-brand-surface text-brand-accent shadow-md' : 'text-brand-text/50 hover:text-brand-text'}`}>
                  <Code2 size={16} /> Code
                </button>
              </div>

              {/* Kanan: Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="p-3 bg-brand-surface/30 border border-brand-border rounded-xl text-brand-text/50 hover:text-red-400 transition-all flex-shrink-0">
                  <Heart size={18} />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`Create a component named ${componentData.name}...`);
                    setCopiedPrompt(true);
                    setTimeout(() => setCopiedPrompt(false), 2000);
                  }}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-6 py-3 bg-brand-surface/30 border border-brand-border rounded-xl text-[13px] font-bold hover:bg-brand-surface transition-all whitespace-nowrap"
                >
                  {copiedPrompt ? <Check size={16} className="text-green-500" /> : <Copy size={16} />} 
                  {copiedPrompt ? "COPIED" : "COPY PROMPT"}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "preview" ? (
              /* =======================
                 LAYOUT PREVIEW 
                 ======================= */
              <motion.div key="preview-layout" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                
                {/* 3. PREVIEW BOX: Diperlebar (w-full) dan Ditinggikan (lg:min-h-[600px]) */}
                <div className="relative w-full rounded-[32px] md:rounded-[40px] border border-brand-border bg-brand-surface/30 overflow-hidden mb-12 shadow-2xl min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
                  
                  {/* Tombol Reload ditaruh agak masuk ke dalam agar elegan */}
                  <button className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 bg-brand-bg/80 border border-brand-border hover:bg-brand-accent hover:text-brand-bg rounded-full text-brand-text transition-all shadow-xl backdrop-blur-md">
                    <RotateCcw size={18} />
                  </button>
                  
                  {/* Kontainer untuk Komponen (Bisa full height/width) */}
                  <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
                    <SelectedComponent {...componentProps} />
                  </div>
                </div>

                {/* --- CUSTOMIZE SECTION --- */}
                {componentData.controls && componentData.controls.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-black mb-6 tracking-tight">Customize</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6 md:p-8 bg-brand-surface/30 border border-brand-border rounded-[24px]">
                      {componentData.controls.map((control) => (
                        <div key={control.name} className="flex flex-col gap-2.5">
                          <label className="text-[11px] font-bold uppercase text-brand-text/50 tracking-widest">{control.label}</label>
                          <input className="bg-black/10 border border-brand-border rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-accent text-brand-text transition-colors" value={componentProps[control.name] || ""} onChange={(e) => setComponentProps({...componentProps, [control.name]: e.target.value})} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* --- PROPS TABLE SECTION (Kode Responsif yang sebelumnya) --- */}
                <section className="mb-12">
                  <h2 className="text-2xl font-black mb-6 tracking-tight">Props</h2>
                  <div className="border border-brand-border rounded-[24px] bg-brand-surface/20 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left text-sm min-w-[700px]">
                        <thead className="bg-black/20 border-b border-brand-border text-brand-text/50 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
                          <tr>
                            <th className="px-6 py-5 w-[20%]">Property</th>
                            <th className="px-6 py-5 w-[20%]">Type</th>
                            <th className="px-6 py-5 w-[20%]">Default</th>
                            <th className="px-6 py-5 w-[40%]">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border">
                          {finalPropsTable.length > 0 ? (
                            finalPropsTable.map((p) => (
                              <tr key={p.name} className="hover:bg-brand-accent/5 transition-colors duration-200">
                                <td className="px-6 py-4 text-brand-accent font-mono font-semibold whitespace-nowrap">{p.name}</td>
                                <td className="px-6 py-4 text-brand-text/70 font-mono text-[11px] whitespace-nowrap">{p.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <code className="bg-black/30 px-2 py-1 rounded-md text-[11px] font-mono border border-brand-border/50 text-brand-text/80">
                                    {p.default === "--" ? p.default : `"${p.default}"`}
                                  </code>
                                </td>
                                <td className="px-6 py-4 text-xs text-brand-text/50 leading-relaxed min-w-[250px]">{p.desc}</td>
                              </tr>
                            ))
                          ) : (
                            <tr><td colSpan="4" className="px-6 py-12 text-center text-brand-text/30 text-xs font-mono">No props detected.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </motion.div>
            ) : (
              /* =======================
                 LAYOUT CODE 
                 ======================= */
              <motion.div key="code-layout" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                
                {/* Install Section */}
                <section className="mb-12">
                  <h2 className="text-2xl font-black mb-6 tracking-tight">Install</h2>
                  <div className="flex gap-1 p-1 bg-black/10 border border-brand-border rounded-xl w-fit mb-5">
                    {['cli', 'manual'].map(m => (
                      <button key={m} onClick={() => setInstallMethod(m)} className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${installMethod === m ? 'bg-brand-surface text-brand-accent shadow-sm' : 'text-brand-text/50 hover:text-brand-text'}`}>
                        {m}
                      </button>
                    ))}
                  </div>

                  {installMethod === 'cli' ? (
                    <div className="bg-brand-surface/20 border border-brand-border rounded-[24px] overflow-hidden shadow-lg">
                      <div className="flex bg-black/20 px-3 py-3 gap-1 border-b border-brand-border">
                         {['pnpm', 'npm', 'yarn', 'bun'].map(p => (
                           <button key={p} onClick={() => setPkgManager(p)} className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase transition-colors ${pkgManager === p ? 'bg-brand-surface/50 text-brand-accent' : 'text-brand-text/40 hover:text-brand-text'}`}>
                             {p}
                           </button>
                         ))}
                      </div>
                      <div className="p-6 font-mono text-[13px] flex justify-between items-center group bg-black/5">
                         <div className="flex items-center gap-4">
                           <Terminal size={16} className="text-brand-text/30" />
                           <code className="text-brand-text/90">{pkgManager} <span className="text-brand-accent">jsrepo@latest</span> add github/Ananta-TI/NtaKit/components/{id}</code>
                         </div>
                         <button onClick={handleCopyInstall} className="p-2.5 bg-brand-surface/50 border border-brand-border rounded-lg text-brand-text/50 hover:text-brand-accent transition-colors">
                           {copiedInstall ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                         </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 bg-brand-surface/20 border border-brand-border rounded-[24px] text-sm text-brand-text/60 leading-relaxed">
                      Copy the source code from the <b className="text-brand-text">Source Code</b> section below and paste it into a new file named <code className="text-brand-accent font-mono bg-black/20 px-2 py-1 rounded border border-brand-border">{componentData.name}.jsx</code> in your components folder.
                    </div>
                  )}
                </section>

                {/* Usage Section */}
                <section className="mb-12">
                  <h2 className="text-2xl font-black mb-6 tracking-tight">Usage</h2>
                  <CodeBox 
                    code={componentData.usage || `import ${componentData.name} from "@/components/${componentData.name}";\n\n<${componentData.name} />`} 
                    hideHeader={true} 
                    expandable={false}
                  />
                </section>

                {/* Source Code Section */}
                <section>
                  <h2 className="text-2xl font-black mb-6 tracking-tight">Source Code</h2>
                  <CodeBox code={cleanedCode} />
                </section>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="mt-24 py-10 border-t border-brand-border text-center">
             <p className="text-xs font-mono text-brand-text/30">NtaKit Library © 2026 • Crafted by Ananta Firdaus</p>
          </footer>
        </div>
      </main>

      <PromoSidebar />
    </div>
  );
}