import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { componentRegistry } from "../registry";
import {
  Code2,
  Eye,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBox from "../components/ui/CodeBox";
import { getCleanCode } from "../utils/cleaner";
import generatedProps from "../generated-props.json";
import { extractDependencies } from "../utils/extractDependencies";

export default function ComponentPage() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("preview");
  const [installMethod, setInstallMethod] = useState("cli");
  const [pkgManager, setPkgManager] = useState("npm");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [componentProps, setComponentProps] = useState({});
  const [previewKey, setPreviewKey] = useState(0);

  const componentData = componentRegistry[id];

  const dependencies = useMemo(() => {
    return extractDependencies(componentData?.code || "");
  }, [componentData]);

  const cleanedCode = useMemo(() => {
    return getCleanCode(componentData?.code || "");
  }, [componentData]);

  const propsTable = useMemo(() => {
    if (componentData?.propsTable) return componentData.propsTable;
    return generatedProps[id] || [];
  }, [id, componentData]);

  const installCommands = useMemo(
    () => ({
      npm: `npx jsrepo@latest add github/Ananta-TI/NtaKit/${id}`,
      pnpm: `pnpm dlx jsrepo@latest add github/Ananta-TI/NtaKit/${id}`,
      yarn: `yarn dlx jsrepo@latest add github/Ananta-TI/NtaKit/${id}`,
      bun: `bunx jsrepo@latest add github/Ananta-TI/NtaKit/${id}`,
    }),
    [id]
  );

  useEffect(() => {
    if (componentData?.defaultProps) {
      setComponentProps(componentData.defaultProps);
    } else {
      setComponentProps({});
    }

    setActiveTab("preview");
    setPreviewKey((prev) => prev + 1);
    window.scrollTo(0, 0);
  }, [id, componentData]);

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  if (!componentData) {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-surface/20 p-8 text-sm text-brand-text">
        Component not found.
      </div>
    );
  }

  const SelectedComponent = componentData.component;

  return (
    <div className="flex w-full flex-col">
      {/* ================= HEADER ================= */}
      <div className="mb-10 border-b border-brand-border pb-8">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-accent">
          Components / Preview
        </p>

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="max-w-4xl break-words text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-brand-text">
              {componentData.name}
            </h1>

            {componentData.description && (
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.65] text-brand-text/60">
                {componentData.description}
              </p>
            )}
          </div>

          <button
            onClick={() => copyText(installCommands[pkgManager])}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-brand-border bg-brand-surface px-5 text-xs font-semibold uppercase tracking-[0.08em] text-brand-text/70 transition-all hover:border-brand-accent hover:text-brand-accent"
          >
            {copiedInstall ? (
              <Check size={14} className="text-green-400" />
            ) : (
              <Copy size={14} />
            )}
            {copiedInstall ? "Copied" : "Copy Install"}
          </button>
        </div>
      </div>

      {/* ================= TOP TABS ================= */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex w-fit rounded-2xl border border-brand-border bg-brand-surface/20 p-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
              activeTab === "preview"
                ? "bg-brand-accent text-brand-bg"
                : "text-brand-text/40 hover:text-brand-text"
            }`}
          >
            <Eye size={14} />
            Preview
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
              activeTab === "code"
                ? "bg-brand-accent text-brand-bg"
                : "text-brand-text/40 hover:text-brand-text"
            }`}
          >
            <Code2 size={14} />
            Code
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {dependencies.length > 0 ? (
            dependencies.slice(0, 3).map((dep) => (
              <span
                key={dep}
                className="rounded-full border border-brand-border bg-brand-surface/30 px-3 py-1.5 font-mono text-[11px] text-brand-accent"
              >
                {dep}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-brand-border bg-brand-surface/30 px-3 py-1.5 text-[11px] text-brand-text/45">
              No external dependencies
            </span>
          )}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <AnimatePresence mode="wait">
        {activeTab === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* PREVIEW BOX */}
<div className="relative mb-10 h-[560px] w-full overflow-hidden rounded-3xl border border-brand-border bg-brand-surface/20 sm:h-[620px] lg:h-[680px]">
  <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg/80 px-3 py-2 text-[11px] text-brand-text/50 backdrop-blur-sm">
    <Eye size={13} />
    Live Preview
  </div>

  <button
    onClick={() => setPreviewKey((prev) => prev + 1)}
    className="absolute right-4 top-4 z-20 rounded-xl border border-brand-border bg-brand-bg/80 p-2 text-brand-text/60 backdrop-blur-sm transition-all hover:border-brand-accent hover:bg-brand-accent hover:text-brand-bg active:scale-95"
    title="Re-render component"
  >
    <RotateCcw size={14} />
  </button>

  <div key={previewKey} className="absolute inset-0 overflow-hidden">
    <div className="flex h-full w-full min-w-0 items-center justify-center px-3 pb-6 pt-16 sm:px-5 sm:pb-8 sm:pt-18">
      <div className="flex h-full w-full max-w-full items-center justify-center overflow-hidden">
        <SelectedComponent {...componentProps} preview />
      </div>
    </div>
  </div>
</div>

            {/* CONTROLS */}
            {componentData.controls && componentData.controls.length > 0 && (
              <section className="mb-10 w-full">
                <div className="mb-4 flex items-center gap-2">
                  <SlidersHorizontal size={17} className="text-brand-accent" />
                  <h2 className="text-lg font-semibold tracking-tight">
                    Customize
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 rounded-2xl border border-brand-border bg-brand-surface/15 p-5 sm:grid-cols-2 lg:grid-cols-3">
                  {componentData.controls.map((control) => (
                    <div key={control.name} className="flex min-w-0 flex-col gap-1.5">
                      <label className="truncate text-[10px] font-medium uppercase tracking-wider text-brand-text/35">
                        {control.label}
                      </label>

                      <input
                        className="w-full rounded-xl border border-brand-border bg-brand-bg/50 px-3 py-2.5 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-text/25 focus:border-brand-accent/50"
                        value={componentProps[control.name] || ""}
                        onChange={(e) =>
                          setComponentProps({
                            ...componentProps,
                            [control.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROPS TABLE */}
            <section className="mb-10 w-full overflow-hidden">
              <div className="mb-4 flex items-center gap-2">
                <Package size={17} className="text-brand-accent" />
                <h2 className="text-lg font-semibold tracking-tight">
                  Props
                </h2>
              </div>

              <div className="w-full overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/10">
                <div className="w-full overflow-x-auto custom-scrollbar">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead className="border-b border-brand-border bg-brand-surface/20 text-[10px] font-semibold uppercase tracking-wider text-brand-text/45">
                      <tr>
                        <th className="px-5 py-3.5">Prop</th>
                        <th className="px-5 py-3.5">Type</th>
                        <th className="px-5 py-3.5">Default</th>
                        <th className="px-5 py-3.5">Description</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-brand-border/50">
                      {propsTable.length > 0 ? (
                        propsTable.map((prop) => (
                          <tr
                            key={prop.name}
                            className="transition-colors hover:bg-brand-accent/5"
                          >
                            <td className="px-5 py-3 font-mono text-xs font-medium text-brand-accent">
                              {prop.name}
                            </td>

                            <td className="px-5 py-3 font-mono text-[10px] uppercase text-brand-text/50">
                              {prop.type}
                            </td>

                            <td className="px-5 py-3 font-mono text-[10px]">
                              <code className="whitespace-nowrap rounded bg-brand-bg/40 px-1.5 py-0.5 text-brand-text/50">
                                {prop.default === "--"
                                  ? prop.default
                                  : `"${prop.default}"`}
                              </code>
                            </td>

                            <td className="px-5 py-3 text-[11px] leading-relaxed text-brand-text/40">
                              {prop.desc}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-5 py-10 text-center font-mono text-xs text-brand-text/20"
                          >
                            No props
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* DEPENDENCIES */}
            <section className="mb-10 w-full">
              <h2 className="mb-4 text-lg font-semibold tracking-tight">
                Dependencies
              </h2>

              <div className="flex flex-wrap gap-2">
                {dependencies.length > 0 ? (
                  dependencies.map((dep) => (
                    <div
                      key={dep}
                      className="break-all rounded-xl border border-brand-border bg-brand-surface/15 px-3 py-2 font-mono text-xs text-brand-accent"
                    >
                      {dep}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-brand-text/35">
                    No external dependencies.
                  </p>
                )}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* INSTALLATION */}
            <section className="mb-10 w-full">
              <h2 className="mb-4 text-lg font-semibold tracking-tight">
                Installation
              </h2>

              <div className="mb-4 flex w-fit gap-0.5 rounded-xl border border-brand-border bg-brand-surface/20 p-1">
                {["cli", "manual"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setInstallMethod(method)}
                    className={`rounded-lg px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all ${
                      installMethod === method
                        ? "bg-brand-accent text-brand-bg"
                        : "text-brand-text/35 hover:text-brand-text"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {installMethod === "cli" ? (
                <div className="w-full overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/15">
                  <div className="flex gap-0.5 overflow-x-auto border-b border-brand-border bg-brand-surface/20 px-2 py-2 custom-scrollbar">
                    {["npm", "pnpm", "yarn", "bun"].map((manager) => (
                      <button
                        key={manager}
                        onClick={() => setPkgManager(manager)}
                        className={`shrink-0 rounded-lg px-3 py-1 text-[10px] font-semibold transition-colors ${
                          pkgManager === manager
                            ? "bg-brand-accent text-brand-bg"
                            : "text-brand-text/30 hover:text-brand-text/60"
                        }`}
                      >
                        {manager}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-3 p-4 font-mono text-[12px] sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex min-w-0 w-full items-center gap-3">
                      <Terminal
                        size={14}
                        className="hidden shrink-0 text-brand-text/25 sm:block"
                      />

                      <div className="w-full overflow-x-auto pb-1 custom-scrollbar sm:pb-0">
                        <code className="whitespace-nowrap text-[11px] text-brand-text/75">
                          {installCommands[pkgManager]}
                        </code>
                      </div>
                    </div>

                    <button
                      onClick={() => copyText(installCommands[pkgManager])}
                      className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-brand-border p-2 text-brand-text/40 transition-colors hover:border-brand-accent hover:text-brand-accent sm:w-auto sm:p-1.5"
                    >
                      {copiedInstall ? (
                        <Check size={12} className="text-green-400" />
                      ) : (
                        <Copy size={12} />
                      )}

                      <span className="text-[10px] sm:hidden">
                        {copiedInstall ? "Copied" : "Copy"}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-brand-border bg-brand-surface/15 p-5 text-xs leading-relaxed text-brand-text/45">
                  Copy source code below and save as{" "}
                  <code className="whitespace-nowrap rounded bg-brand-bg/30 px-1.5 py-0.5 font-mono text-brand-accent">
                    {id}.jsx
                  </code>
                </div>
              )}
            </section>

            {/* USAGE */}
            <section className="mb-10 w-full overflow-hidden">
              <h2 className="mb-4 text-lg font-semibold tracking-tight">
                Usage
              </h2>

              <CodeBox code={componentData.usage} hideHeader expandable={false} />
            </section>

            {/* SOURCE */}
            <section className="w-full overflow-hidden">
              <h2 className="mb-4 text-lg font-semibold tracking-tight">
                Source Code
              </h2>

              <CodeBox code={cleanedCode} />
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-20 w-full border-t border-brand-border/40 py-6 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-text/15">
          NtaKit © 2026 · Ananta Firdaus
        </p>
      </footer>
    </div>
  );
}