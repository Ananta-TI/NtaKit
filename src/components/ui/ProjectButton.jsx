import React, { forwardRef, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MagneticEffect from "../../context/MagneticEffect";
import { ThemeContext } from "../../context/ThemeContext";
/* =========================
   UTILS
========================= */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   BUTTON VARIANTS
========================= */
const buttonVariants = {
  base:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg disabled:pointer-events-none disabled:opacity-50",

  variant: {
    default:
      "bg-brand-accent text-brand-bg hover:bg-brand-accent/90",
    destructive:
      "bg-red-500 text-white hover:bg-red-500/90",
    outline:
      "border border-brand-border bg-transparent text-brand-text hover:border-brand-accent hover:bg-brand-accent hover:text-brand-bg",
    secondary:
      "bg-brand-surface text-brand-text hover:bg-brand-surface/80",
    ghost:
      "text-brand-text hover:bg-brand-surface hover:text-brand-accent",
    link:
      "text-brand-accent underline-offset-4 hover:underline",
  },

  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

/* =========================
   BUTTON COMPONENT
========================= */
const Button = forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonVariants.base,
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

/* =========================
   ANIMATION
========================= */
const projectCardAnimation = {
  hidden: {
    opacity: 0,
    y: 150,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 1.1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

/* =========================
   PROJECT BUTTON
========================= */
export default function ProjectButton() {
  const navigate = useNavigate();

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={projectCardAnimation}
      className="mb-10 flex flex-col items-center justify-center gap-4"
    >
      <h2 className="text-center text-2xl font-bold tracking-[-0.04em] text-brand-text md:text-3xl lg:text-5xl">
        See other projects
      </h2>

      <MagneticEffect>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/projects")}
          className="rounded-full px-8 transition-all duration-300 hover:shadow-[0_18px_60px_color-mix(in_srgb,var(--color-brand-accent)_25%,transparent)]"
        >
          Load More
        </Button>
      </MagneticEffect>
    </motion.div>
  );
}