import { Link } from "react-router-dom";
import {
  ArrowRight,
  Box,
  Layers,
  Zap,
  Palette,
  Code2,
  Sparkles,
  LayoutDashboard,
  Wand2,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import MagneticEffect from "../context/MagneticEffect";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import gsap from "gsap";

import Footer from "../components/ui/Footer";

/* =========================
   GITHUB ICON
========================= */
function GithubIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/* =========================
   ANIMATION VARIANTS
========================= */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================
   SHADOW
========================= */
const softShadow =
  "0 84px 24px rgba(0,0,0,0), 0 54px 22px rgba(0,0,0,0.01), 0 30px 18px rgba(0,0,0,0.04), 0 13px 13px rgba(0,0,0,0.08), 0 3px 7px rgba(0,0,0,0.09)";

/* =========================
   PREMIUM BUTTON
========================= */
function PremiumButton({
  children,
  href,
  to,
  primary = false,
  isDarkMode,
}) {
  const buttonRef = useRef(null);
  const circleRef = useRef(null);

  const handleMouseEnter = (e) => {
    if (!buttonRef.current || !circleRef.current) return;

    const bounds = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    gsap.set(circleRef.current, {
      x,
      y,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 1,
    });

    gsap.to(circleRef.current, {
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!circleRef.current) return;

    gsap.to(circleRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const baseClass = `
    group relative inline-flex min-h-[50px] items-center justify-center
    overflow-hidden rounded-[4px] border px-5 py-3
    text-[16px] font-medium leading-[25.6px] tracking-[-0.16px]
    transition-all duration-300 active:translate-y-[1px]
  `;

  const primaryClass = `
    border-brand-accent bg-brand-accent text-brand-bg
    shadow-[0_16px_45px_rgba(0,0,0,0.16)]
  `;

  const secondaryClass = `
    border-brand-border bg-brand-surface text-brand-text
    hover:border-brand-accent
  `;

  const content = (
    <MagneticEffect>
      <div
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${baseClass} ${primary ? primaryClass : secondaryClass}`}
      >
        <span
          ref={circleRef}
          className={`
            pointer-events-none absolute left-0 top-0 aspect-square w-[260%]
            rounded-full
            ${primary ? "bg-brand-text" : "bg-brand-accent"}
          `}
          style={{ opacity: 0 }}
        />

        <span
          className={`
            relative z-10 flex items-center gap-2 transition-colors duration-300
            ${
              primary
                ? "group-hover:text-brand-bg"
                : isDarkMode
                ? "group-hover:text-brand-bg"
                : "group-hover:text-brand-bg"
            }
          `}
        >
          {children}
        </span>
      </div>
    </MagneticEffect>
  );

  if (to) return <Link to={to}>{content}</Link>;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

/* =========================
   CATEGORY CARD
========================= */
function CategoryCard({
  icon,
  eyebrow,
  title,
  desc,
  variant = "surface",
  large = false,
}) {
  const variants = {
    surface: "bg-brand-surface text-brand-text border-brand-border",
    accent: "bg-brand-accent text-brand-bg border-brand-accent",
    dark: "bg-brand-text text-brand-bg border-brand-text",
    ghost: "bg-brand-bg text-brand-text border-brand-border",
  };

  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -6,
        boxShadow: softShadow,
      }}
      className={`
        rounded-[8px] border p-8 transition-all duration-300
        ${variants[variant]}
        ${large ? "lg:col-span-2" : ""}
      `}
    >
      <div
        className={`
          mb-10 flex h-11 w-11 items-center justify-center rounded-full
          ${
            variant === "accent" || variant === "dark"
              ? "bg-brand-bg/15"
              : "bg-brand-accent/15 text-brand-accent"
          }
        `}
      >
        {icon}
      </div>

      <p className="mb-3 text-[12px] font-medium uppercase leading-3 tracking-[0.6px] opacity-75">
        {eyebrow}
      </p>

      <h3 className="mb-4 max-w-sm text-[32px] font-medium leading-[41.6px] tracking-[-0.4px]">
        {title}
      </h3>

      <p className="max-w-md text-[16px] leading-[25.6px] tracking-[-0.16px] opacity-80">
        {desc}
      </p>
    </motion.div>
  );
}

/* =========================
   FEATURE CARD
========================= */
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -4,
        boxShadow: softShadow,
      }}
      className="
        rounded-[8px] border border-brand-border bg-brand-surface p-8
        transition-all duration-300
      "
    >
      <div
        className="
          mb-8 flex h-10 w-10 items-center justify-center rounded-full
          border border-brand-border bg-brand-bg text-brand-accent
        "
      >
        {icon}
      </div>

      <h3 className="mb-3 text-[24px] font-medium leading-[31.2px] tracking-[-0.2px] text-brand-text">
        {title}
      </h3>

      <p className="text-[16px] leading-[25.6px] tracking-[-0.16px] text-brand-text/70">
        {desc}
      </p>
    </motion.div>
  );
}

/* =========================
   INTERFACE MOCKUP
========================= */
function InterfaceMockup() {
  return (
    <motion.div
      variants={item}
      className="relative rounded-[8px] border border-brand-border bg-brand-surface p-4"
      style={{ boxShadow: softShadow }}
    >
      <div className="mb-4 flex items-center justify-between border-b border-brand-border pb-4">
        <div>
          <p className="text-[12px] font-medium uppercase leading-3 tracking-[0.6px] text-brand-text/55">
            Visual Canvas
          </p>

          <h3 className="mt-2 text-[20px] font-medium leading-7 text-brand-text">
            Component System
          </h3>
        </div>

        <span className="rounded-[4px] bg-brand-accent px-2 py-1 text-[12.8px] font-semibold leading-[15.36px] text-brand-bg">
          Beta
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[170px_1fr]">
        <div className="rounded-[8px] bg-brand-bg p-4 text-brand-text">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-brand-accent" />
            <div className="h-3 w-3 rounded-full bg-brand-border" />
            <div className="h-3 w-3 rounded-full bg-brand-text" />
          </div>

          {["Install", "Preview", "Props", "Export"].map((label, index) => (
            <div
              key={label}
              className={`
                mb-2 rounded-[4px] px-3 py-2 text-[14px] leading-[22.4px]
                ${
                  index === 1
                    ? "bg-brand-accent text-brand-bg"
                    : "text-brand-text/60"
                }
              `}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="rounded-[8px] border border-brand-border bg-brand-bg p-6">
            <div className="mb-5 h-4 w-32 rounded-[2px] bg-brand-text" />
            <div className="mb-3 h-3 w-full rounded-[2px] bg-brand-border" />
            <div className="mb-6 h-3 w-2/3 rounded-[2px] bg-brand-border" />

            <div className="grid grid-cols-3 gap-3">
              <div className="h-24 rounded-[8px] bg-brand-accent" />
              <div className="h-24 rounded-[8px] bg-brand-surface" />
              <div className="h-24 rounded-[8px] border border-brand-border bg-brand-bg" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[8px] border border-brand-border bg-brand-bg p-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.6px] text-brand-text/55">
                Components
              </p>

              <p className="mt-2 text-[32px] font-medium leading-[41.6px] text-brand-text">
                10+
              </p>
            </div>

            <div className="rounded-[8px] border border-brand-border bg-brand-bg p-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.6px] text-brand-text/55">
                Motion
              </p>

              <p className="mt-2 text-[32px] font-medium leading-[41.6px] text-brand-text">
                60fps
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   LANDING PAGE
========================= */
export default function LandingPage() {
  const { isDarkMode } = useContext(ThemeContext);

  const categories = [
    {
      icon: <Palette size={22} />,
      eyebrow: "Design",
      title: "Build polished interfaces with a controlled visual system.",
      desc: "A component collection with consistent surface, spacing, border, and interaction patterns.",
      variant: "accent",
      large: true,
    },
    {
      icon: <Sparkles size={22} />,
      eyebrow: "Interaction",
      title: "Motion that supports the UI.",
      desc: "Framer Motion and GSAP are used for feedback, not for turning the page into a carnival.",
      variant: "surface",
    },
    {
      icon: <LayoutDashboard size={22} />,
      eyebrow: "Structure",
      title: "A landing page that explains the product clearly.",
      desc: "Hero, preview, category cards, features, and CTA are arranged with actual hierarchy.",
      variant: "dark",
    },
    {
      icon: <Code2 size={22} />,
      eyebrow: "Stack",
      title: "Built for React and Tailwind CSS.",
      desc: "Designed to fit your existing routing, component registry, and install-preview flow.",
      variant: "surface",
    },
    {
      icon: <Wand2 size={22} />,
      eyebrow: "Library",
      title: "Reusable components without visual chaos.",
      desc: "Every section uses the same brand tokens, because apparently consistency is still illegal in most student projects.",
      variant: "ghost",
      large: true,
    },
  ];

  const features = [
    {
      icon: <Zap size={19} />,
      title: "Fast by default",
      desc: "The page avoids unnecessary background noise and keeps animation focused on meaningful interactions.",
    },
    {
      icon: <Layers size={19} />,
      title: "Component-first layout",
      desc: "The landing page sells the library through preview, categories, features, and direct navigation.",
    },
    {
      icon: <Box size={19} />,
      title: "Brand-token driven",
      desc: "Colors come from your Tailwind theme variables, so dark and light mode stay consistent.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-bg text-brand-text transition-colors duration-500">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, var(--color-brand-text) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: isDarkMode ? [0.18, 0.3, 0.18] : [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-10%] top-[-15%] h-[520px] w-[520px] rounded-full bg-brand-accent blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: isDarkMode ? [0.1, 0.2, 0.1] : [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
          className="absolute bottom-[5%] right-[-10%] h-[460px] w-[460px] rounded-full bg-brand-border blur-[110px]"
        />
      </div>

      {/* ================= HERO ================= */}
      <motion.main
        variants={container}
        initial="hidden"
        animate="visible"
        className="
          relative z-10 mx-auto grid w-full max-w-[1440px] gap-14
          px-5 pb-24 pt-28
          sm:px-8 sm:pt-36
          lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:pb-32
        "
      >
        <section>
          <motion.div variants={item} className="mb-8">
            <span className="inline-flex rounded-[4px] bg-brand-accent px-2 py-1 text-[12.8px] font-semibold leading-[15.36px] text-brand-bg">
              Beta v1.0
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="
              mb-5 text-[15px] font-medium uppercase leading-[19.5px]
              tracking-[1.5px] text-brand-text/65
            "
          >
            React Component Library
          </motion.p>

          <motion.h1
            variants={item}
            className="
              max-w-5xl text-[46px] font-semibold leading-[48px]
              tracking-[-0.8px] text-brand-text
              sm:text-[64px] sm:leading-[67px]
              lg:text-[80px] lg:leading-[83.2px]
            "
          >
            Design systems for people who are tired of rebuilding the same UI.
          </motion.h1>

          <motion.p
            variants={item}
            className="
              mt-8 max-w-2xl text-[18px] font-normal leading-[30px]
              tracking-[-0.2px] text-brand-text/75
              sm:text-[28.8px] sm:leading-[46.08px]
            "
          >
            A polished React component collection built with Tailwind CSS,
            Framer Motion, and GSAP. Clean structure, sharp hierarchy, and
            enough animation to feel premium without begging for applause.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <PremiumButton
              to="/components/github-isometric"
              primary
              isDarkMode={isDarkMode}
            >
              Explore Components
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </PremiumButton>

            <PremiumButton
              href="https://github.com/Ananta-TI"
              isDarkMode={isDarkMode}
            >
              <GithubIcon size={16} />
              Source Code
            </PremiumButton>
          </motion.div>
        </section>

        <InterfaceMockup />
      </motion.main>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >
          <motion.p
            variants={item}
            className="
              mb-5 text-[15px] font-medium uppercase leading-[19.5px]
              tracking-[1.5px] text-brand-text/65
            "
          >
            Product Surfaces
          </motion.p>

          <motion.div
            variants={item}
            className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <h2 className="text-[38px] font-semibold leading-[42px] tracking-[-0.4px] text-brand-text sm:text-[44.8px] sm:leading-[46.6px]">
              Your color system now leads the visual identity instead of being
              buried under random decoration.
            </h2>

            <p className="text-[16px] leading-[25.6px] tracking-[-0.16px] text-brand-text/75">
              The page keeps the Webflow-inspired structure: large display
              heading, tight radius, clear card hierarchy, section eyebrows,
              and strong CTA placement. But the visual identity now uses your
              own brand tokens: background, surface, accent, text, and border.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((card) => (
              <CategoryCard key={card.title} {...card} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURE SECTION ================= */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >
          <motion.p
            variants={item}
            className="
              mb-5 text-[15px] font-medium uppercase leading-[19.5px]
              tracking-[1.5px] text-brand-text/65
            "
          >
            Why This Works
          </motion.p>

          <motion.h2
            variants={item}
            className="
              mb-12 max-w-4xl text-[38px] font-semibold leading-[42px]
              tracking-[-0.4px] text-brand-text
              sm:text-[44.8px] sm:leading-[46.6px]
            "
          >
            The page now has hierarchy, identity, and interaction in one system.
          </motion.h2>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= CTA BAND ================= */}
      <section className="relative z-10 mx-4 my-20 rounded-[8px] border border-brand-border bg-brand-surface px-5 py-20 sm:px-8 lg:mx-8 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="mx-auto grid max-w-[1376px] gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end"
        >
          <div>
            <motion.p
              variants={item}
              className="
                mb-5 text-[15px] font-medium uppercase leading-[19.5px]
                tracking-[1.5px] text-brand-text/60
              "
            >
              Built for JSX
            </motion.p>

            <motion.h2
              variants={item}
              className="
                max-w-4xl text-[38px] font-semibold leading-[42px]
                tracking-[-0.4px] text-brand-text
                sm:text-[44.8px] sm:leading-[46.6px]
              "
            >
              Start with clean components. Add motion only when it improves the
              experience.
            </motion.h2>
          </div>

          <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[8px] border border-brand-border bg-brand-bg p-6">
              <Code2 className="mb-8 text-brand-accent" size={22} />

              <p className="text-[32px] font-medium leading-[41.6px] text-brand-text">
                React
              </p>

              <p className="mt-3 text-[14px] leading-[22.4px] text-brand-text/65">
                Component-based structure for reusable UI sections.
              </p>
            </div>

            <div className="rounded-[8px] border border-brand-border bg-brand-bg p-6">
              <Layers className="mb-8 text-brand-accent" size={22} />

              <p className="text-[32px] font-medium leading-[41.6px] text-brand-text">
                Tailwind
              </p>

              <p className="mt-3 text-[14px] leading-[22.4px] text-brand-text/65">
                Token-based styling using your custom brand theme.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}