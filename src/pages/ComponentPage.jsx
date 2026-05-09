import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { componentRegistry } from "../registry";
import { Code2, Eye, RotateCcw, Heart, Copy, Check, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBox from "../components/ui/CodeBox";
import Sidebar from "../components/ui/Sidebar";
import PromoSidebar from "../components/ui/PromoSidebar";
import { getCleanCode } from "../utils/cleaner";
import generatedProps from "../generated-props.json";

export default function ComponentPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("preview");
  const [installMethod, setInstallMethod] = useState("cli");
  const [pkgManager, setPkgManager] = useState("npm");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [componentProps, setComponentProps] = useState({});

  const componentData = componentRegistry[id];

  useEffect(() => {
    if (componentData?.defaultProps) setComponentProps(componentData.defaultProps);
    setActiveTab("preview");
    window.scrollTo(0, 0);
  }, [id, componentData]);

  const cleanedCode = useMemo(() => getCleanCode(componentData?.code || ""), [componentData]);

  const propsTable = useMemo(() => {
    if (componentData?.propsTable) return componentData.propsTable;
    return generatedProps[id] || [];
  }, [id, componentData]);

  if (!componentData) return <div className="p-10 text-brand-text text-sm">Component not found.</div>;

  const SelectedComponent = componentData.component;
const installCommands = useMemo(() => ({
  npm: `npx jsrepo@latest add github/Ananta-TI/NtaKit/${id}`,
  pnpm: `pnpm dlx jsrepo@latest add github/Ananta-TI/NtaKit/${id}`,
  yarn: `yarn dlx jsrepo@latest add github/Ananta-TI/NtaKit/${id}`,
  bun: `bunx jsrepo@latest add github/Ananta-TI/NtaKit/${id}`,
}), [id]);
  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-text">
      <Sidebar />

      <main className="flex-1 px-4 md:px-8 lg:px-10 py-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">{componentData.name}</h1>
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <div className="flex p-0.5 bg-brand-surface/20 rounded-lg border border-brand-border w-fit">
                <button onClick={() => setActiveTab("preview")} className={`flex items-center gap-1.5 px-5 py-2 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all ${activeTab === "preview" ? "bg-brand-surface text-brand-accent" : "text-brand-text/35 hover:text-brand-text"}`}>
                  <Eye size={13} /> Preview
                </button>
                <button onClick={() => setActiveTab("code")} className={`flex items-center gap-1.5 px-5 py-2 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all ${activeTab === "code" ? "bg-brand-surface text-brand-accent" : "text-brand-text/35 hover:text-brand-text"}`}>
                  <Code2 size={13} /> Code
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-lg border border-brand-border text-brand-text/30 hover:text-red-400 transition-all">
                  <Heart size={16} />
                </button>
                <button
  onClick={() => {
    navigator.clipboard.writeText(installCommands[pkgManager]);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  }} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-brand-border text-[10px] font-semibold hover:bg-brand-surface/30 transition-all">
                  {copiedInstall ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  {copiedInstall ? "Copied" : "Copy Install Command"}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <AnimatePresence mode="wait">
            {activeTab === "preview" ? (
              <motion.div key="p" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                {/* Preview */}
                <div className="relative w-full rounded-xl border border-brand-border bg-brand-surface/20 overflow-hidden mb-10 min-h-[300px] sm:min-h-[450px] flex items-center justify-center">
                  <button className="absolute top-3 right-3 z-20 p-2 bg-brand-bg/70 border border-brand-border rounded-lg hover:bg-brand-accent hover:text-brand-bg transition-all backdrop-blur-sm">
                    <RotateCcw size={14} />
                  </button>
                  <div className="w-full h-full flex items-center justify-center p-4 md:p-10 scale-90 sm:scale-100">
                    <SelectedComponent {...componentProps} />
                  </div>
                </div>

                {/* Controls */}
                {componentData.controls && componentData.controls.length > 0 && (
                  <section className="mb-10">
                    <h2 className="text-lg font-bold mb-4 tracking-tight">Customize</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 bg-brand-surface/15 border border-brand-border rounded-xl">
                      {componentData.controls.map((c) => (
                        <div key={c.name} className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-medium uppercase text-brand-text/30 tracking-wider">{c.label}</label>
                          <input className="bg-brand-bg/50 border border-brand-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-accent/30 transition-colors" value={componentProps[c.name] || ""} onChange={(e) => setComponentProps({ ...componentProps, [c.name]: e.target.value })} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Props Table */}
                <section className="mb-10">
                  <h2 className="text-lg font-bold mb-4 tracking-tight">Props</h2>
                  <div className="border border-brand-border rounded-xl bg-brand-surface/10 overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left text-sm min-w-[600px]">
                        <thead className="bg-brand-surface/20 border-b border-brand-border text-brand-text/40 text-[10px] font-semibold uppercase tracking-wider">
                          <tr>
                            <th className="px-5 py-3.5">Prop</th>
                            <th className="px-5 py-3.5">Type</th>
                            <th className="px-5 py-3.5">Default</th>
                            <th className="px-5 py-3.5">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border/50">
                          {propsTable.length > 0 ? propsTable.map((p) => (
                            <tr key={p.name} className="hover:bg-brand-accent/3 transition-colors">
                              <td className="px-5 py-3 text-brand-accent font-mono text-xs font-medium">{p.name}</td>
                              <td className="px-5 py-3 text-brand-text/50 font-mono text-[10px] uppercase">{p.type}</td>
                              <td className="px-5 py-3 font-mono text-[10px]">
                                <code className="bg-brand-bg/40 px-1.5 py-0.5 rounded text-brand-text/50">{p.default === "--" ? p.default : `"${p.default}"`}</code>
                              </td>
                              <td className="px-5 py-3 text-[11px] text-brand-text/35 leading-relaxed">{p.desc}</td>
                            </tr>
                          )) : (
                            <tr><td colSpan="4" className="px-5 py-10 text-center text-brand-text/20 text-xs font-mono">No props</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div key="c" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                {/* Install */}
                <section className="mb-10">
                  <h2 className="text-lg font-bold mb-4 tracking-tight">Installation</h2>
                  <div className="flex gap-0.5 p-0.5 bg-brand-surface/20 border border-brand-border rounded-lg w-fit mb-4">
                    {["cli", "manual"].map((m) => (
                      <button key={m} onClick={() => setInstallMethod(m)} className={`px-4 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all ${installMethod === m ? "bg-brand-surface text-brand-accent" : "text-brand-text/35 hover:text-brand-text"}`}>{m}</button>
                    ))}
                  </div>
                  {installMethod === "cli" ? (
                    <div className="bg-brand-surface/15 border border-brand-border rounded-xl overflow-hidden">
                      <div className="flex bg-brand-surface/20 px-2 py-2 gap-0.5 border-b border-brand-border">
                        {["npm", "pnpm", "yarn", "bun"].map((p) => (
                          <button key={p} onClick={() => setPkgManager(p)} className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-colors ${pkgManager === p ? "bg-brand-surface text-brand-accent" : "text-brand-text/25 hover:text-brand-text/50"}`}>{p}</button>
                        ))}
                      </div>
                      <div className="p-4 font-mono text-[12px] flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <Terminal size={14} className="text-brand-text/20 flex-shrink-0" />
<code className="text-brand-text/70 text-[11px] truncate">
  {installCommands[pkgManager]}
</code>                        </div>
                        <button onClick={() => { navigator.clipboard.writeText(installCommands[pkgManager]); setCopiedInstall(true); setTimeout(() => setCopiedInstall(false), 2000); }} className="p-1.5 rounded-md border border-brand-border text-brand-text/30 hover:text-brand-accent transition-colors flex-shrink-0">
                          {copiedInstall ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-brand-surface/15 border border-brand-border rounded-xl text-xs text-brand-text/40 leading-relaxed">
                      Copy source code below and save as <code className="text-brand-accent font-mono bg-brand-bg/30 px-1.5 py-0.5 rounded">{id}.jsx</code>
                    </div>
                  )}
                </section>

                {/* Usage */}
                <section className="mb-10">
                  <h2 className="text-lg font-bold mb-4 tracking-tight">Usage</h2>
                  <CodeBox code={componentData.usage} hideHeader expandable={false} />
                </section>

                {/* Source */}
                <section>
                  <h2 className="text-lg font-bold mb-4 tracking-tight">Source Code</h2>
                  <CodeBox code={cleanedCode} />
                </section>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="mt-20 py-6 border-t border-brand-border/40 text-center">
            <p className="text-[9px] font-mono text-brand-text/15 uppercase tracking-[0.3em]">NtaKit © 2026 · Ananta Firdaus</p>
          </footer>
        </div>
      </main>

      <PromoSidebar />
    </div>
  );
}