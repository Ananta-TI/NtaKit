import { motion } from "framer-motion";
import { Copy, Check, Terminal, Package, Sparkles } from "lucide-react";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-2 rounded-lg border border-brand-border bg-brand-surface/40 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-text/60 transition-all duration-300 hover:border-brand-accent/40 hover:text-brand-accent"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ code }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-[#1B1F20] shadow-2xl shadow-black/10">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>

        <CopyButton text={code} />
      </div>

      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-[#DCD7C9]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function InstallationPage() {
  const { isDarkMode } = useContext(ThemeContext);

  const npmInstall = `npm install framer-motion gsap lucide-react`;

  const tailwindInstall = `npm install tailwindcss @tailwindcss/vite`;

  const registryExample = `export const componentRegistry = {
  "github-isometric": {
    name: "Github Isometric",
    component: GithubIsometric,
  },
};`;

  const importExample = `import GithubIsometric from "./components/GithubIsometric";

export default function App() {
  return <GithubIsometric />;
}`;

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-brand-bg text-brand-text"
          : "bg-[#F8F6F1] text-[#2C3639]"
      }`}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-brand-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-brand-accent/10 blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-32 sm:px-8 lg:px-10">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-accent backdrop-blur-sm">
            <Sparkles size={12} />
            Installation Guide
          </div>

          <h1 className="mb-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            SETUP YOUR
            <span className="block bg-gradient-to-b from-[#D6B08B] to-[#A27B5C] bg-clip-text text-transparent">
              COMPONENT SYSTEM
            </span>
          </h1>

          <p
            className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
              isDarkMode ? "text-brand-text/60" : "text-[#2C3639]/65"
            }`}
          >
            Install dependency utama, register komponen, lalu mulai pakai.
            Karena umat frontend modern tampaknya tidak bisa hidup tanpa 14
            library animasi dan sedikit trauma konfigurasi.
          </p>
        </motion.div>

        {/* STEP 1 */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent text-black shadow-lg shadow-brand-accent/20">
              <Terminal size={20} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent">
                Step 01
              </p>

              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Install Dependencies
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p
                className={`mb-4 text-sm leading-relaxed ${
                  isDarkMode ? "text-brand-text/60" : "text-[#2C3639]/60"
                }`}
              >
                Install package utama yang dipakai hampir seluruh komponen.
              </p>

              <CodeBlock code={npmInstall} />
            </div>

            <div>
              <p
                className={`mb-4 text-sm leading-relaxed ${
                  isDarkMode ? "text-brand-text/60" : "text-[#2C3639]/60"
                }`}
              >
                Kalau belum setup Tailwind v4:
              </p>

              <CodeBlock code={tailwindInstall} />
            </div>
          </div>
        </section>

        {/* STEP 2 */}
        {/* <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent text-black shadow-lg shadow-brand-accent/20">
              <Package size={20} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent">
                Step 02
              </p>

              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Register Components
              </h2>
            </div>
          </div>

          <p
            className={`mb-6 max-w-2xl text-sm leading-relaxed ${
              isDarkMode ? "text-brand-text/60" : "text-[#2C3639]/60"
            }`}
          >
            Tambahkan komponen ke registry supaya otomatis muncul di sidebar.
            Sedikit seperti membuat altar kecil untuk dependency baru.
          </p>

          <CodeBlock code={registryExample} />
        </section> */}

        {/* STEP 2 */}
        <section className="mb-24">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent text-black shadow-lg shadow-brand-accent/20">
              <Sparkles size={20} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent">
                Step 02
              </p>

              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Use Components
              </h2>
            </div>
          </div>

          <p
            className={`mb-6 max-w-2xl text-sm leading-relaxed ${
              isDarkMode ? "text-brand-text/60" : "text-[#2C3639]/60"
            }`}
          >
            Import dan gunakan seperti komponen React biasa. Tidak perlu ritual tambahan. Untuk sekarang.
          </p>

          <CodeBlock code={importExample} />
        </section>

        {/* EXTRA INFO */}
        <section
          className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur-xl ${
            isDarkMode
              ? "border-brand-border bg-brand-surface/20"
              : "border-[#D7D0BE] bg-white/60"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-accent">
                Recommended Stack
              </p>

              <h3 className="mb-3 text-2xl font-black tracking-tight">
                React + Tailwind + Motion
              </h3>

              <p
                className={`max-w-2xl text-sm leading-relaxed ${
                  isDarkMode ? "text-brand-text/60" : "text-[#2C3639]/60"
                }`}
              >
                Semua komponen di NtaKit dirancang untuk environment React modern.
                Bisa dipakai di Vite, Next.js, atau project yang hidupnya sudah cukup rumit tanpa webpack error tambahan.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "React 19",
                "Tailwind v4",
                "Framer Motion",
                "GSAP",
              ].map((item) => (
                <div
                  key={item}
                  className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    isDarkMode
                      ? "border-brand-border bg-brand-surface/30 text-brand-text/70"
                      : "border-[#D7D0BE] bg-white text-[#2C3639]/70"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}