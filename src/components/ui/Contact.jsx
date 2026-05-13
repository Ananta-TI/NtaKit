import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import MagneticEffect from "../../context/MagneticEffect";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Loader,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import supabase from "../../supabaseClient";
import gsap from "gsap";

import Footer from "./Footer";
import Button from "./ProjectButton";


function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   CONFIG
========================= */
const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_m3pugyl";

const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_fbyckkg";

const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "F7OWxXL91oYx48edi";

const PROFILE_IMAGE = "/image/m3.png";

const fields = [
  {
    id: "name",
    num: "01",
    label: "What's your name?",
    placeholder: "Ananta Firdaus *",
    type: "text",
  },
  {
    id: "email",
    num: "02",
    label: "What's your email?",
    placeholder: "ananta@email.com *",
    type: "email",
  },
  {
    id: "organization",
    num: "03",
    label: "What's the name of your organization?",
    placeholder: "Your company / personal project",
    type: "text",
  },
  {
    id: "services",
    num: "04",
    label: "What services are you looking for?",
    placeholder: "Web design, frontend, UI motion, component system...",
    type: "text",
  },
  {
    id: "message",
    num: "05",
    label: "Your message",
    placeholder: "Hello Ananta, I want to build...",
    type: "textarea",
  },
];

const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com/ntakunti_14",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ananta-firdaus-93448328b/",
  },
  {
    name: "GitHub",
    url: "https://github.com/Ananta-TI",
  },
];

/* =========================
   ANIMATION
========================= */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =========================
   LOCAL TIME
========================= */
function useLocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setTime(formatter.format(new Date()));
    };

    update();

    const interval = setInterval(update, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  return time;
}

/* =========================
   INPUT LINE
========================= */
function ContactFormLine({ inputId, hasError }) {
  return (
    <svg
      viewBox="0 0 300 100"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="none"
      className={cn(
        `input-line-${inputId}`,
        "pointer-events-none absolute bottom-0 right-0 h-[56px] w-[300%] fill-none stroke-[1.5] transition-colors duration-500 will-change-transform md:h-[72px]",
        hasError
          ? "stroke-red-500/80"
          : "stroke-brand-border peer-focus:stroke-brand-accent"
      )}
    >
      <path d="M0 90H100C110 90 120 84 130 78C140 72 160 72 170 78C180 84 190 90 200 90H300" />
    </svg>
  );
}

/* =========================
   MAGNETIC TEXT LINK
========================= */
function TextLink({ href, children }) {
  const isMail = href.startsWith("mailto:");

  return (
    <MagneticEffect>
      <a
        href={href}
        target={isMail ? undefined : "_blank"}
        rel={isMail ? undefined : "noreferrer"}
        className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-text transition-colors duration-300 hover:text-brand-accent sm:text-base"
      >
        {children}
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </MagneticEffect>
  );
}

/* =========================
   SIDE SECTION
========================= */
function SideBlock({ title, children }) {
  return (
    <div className="border-t border-brand-border pt-7">
      <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand-text/35">
        {title}
      </p>

      <div>{children}</div>
    </div>
  );
}

/* =========================
   SUBMIT BUTTON
========================= */
function SubmitButton({ loading }) {
  const buttonRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  const getPointerPosition = (event) => {
    if (!buttonRef.current) return { x: 0, y: 0 };

    const rect = buttonRef.current.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const moveCircle = (event, immediate = false) => {
    if (!circleRef.current) return;

    const { x, y } = getPointerPosition(event);

    if (immediate) {
      gsap.set(circleRef.current, {
        left: x,
        top: y,
        xPercent: -50,
        yPercent: -50,
      });

      return;
    }

    gsap.to(circleRef.current, {
      left: x,
      top: y,
      duration: 0.18,
      ease: "power3.out",
    });
  };

  const handleEnter = (event) => {
    if (loading) return;

    gsap.killTweensOf(circleRef.current);
    gsap.killTweensOf(textRef.current);

    moveCircle(event, true);

    gsap.set(circleRef.current, {
      scale: 0,
      opacity: 1,
    });

    // Teks langsung berubah saat hover masuk
    gsap.set(textRef.current, {
      color: "var(--color-brand-bg)",
    });

    gsap.to(circleRef.current, {
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  const handleMove = (event) => {
    if (loading) return;
    moveCircle(event);
  };

  const handleLeave = (event) => {
    if (!circleRef.current || !textRef.current) return;

    gsap.killTweensOf(circleRef.current);
    gsap.killTweensOf(textRef.current);

    moveCircle(event, true);

    // Teks langsung balik saat mouse keluar, tidak nunggu circle selesai
    gsap.set(textRef.current, {
      color: "var(--color-brand-text)",
    });

    gsap.to(circleRef.current, {
      scale: 0,
      opacity: 1,
      duration: 0.48,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(circleRef.current, {
          opacity: 0,
        });
      },
    });
  };

  return (
    <MagneticEffect>
      <button
        ref={buttonRef}
        type="submit"
        disabled={loading}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="
          relative inline-flex w-fit items-center justify-center
          overflow-hidden rounded-full border border-brand-text/45
          bg-transparent px-9 py-5
          font-medium uppercase text-brand-text
          disabled:cursor-not-allowed disabled:opacity-60
          sm:px-11 sm:py-6
        "
      >
        <span
          ref={circleRef}
          className="
            pointer-events-none absolute z-0 aspect-square w-[260%]
            rounded-full bg-brand-text opacity-0
          "
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) scale(0)",
          }}
        />

        <span
          ref={textRef}
          className="
            relative z-10 block font-mono text-xs font-bold
            uppercase tracking-[0.24em] text-brand-text
            sm:text-sm
          "
        >
          {loading ? "Sending" : "Send it"}
        </span>
      </button>
    </MagneticEffect>
  );
}
/* =========================
   CONTACT PAGE
========================= */
export default function Contact() {
  const { isDarkMode } = useContext(ThemeContext);
  const localTime = useLocalTime();

  const formRef = useRef(null);
  const sentTimeoutRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    return () => {
      if (sentTimeoutRef.current) clearTimeout(sentTimeoutRef.current);
    };
  }, []);

  const handleFocus = (id) => {
    if (!formRef.current) return;

    const line = formRef.current.querySelector(`.input-line-${id}`);
    if (!line) return;

    gsap.fromTo(
      line,
      { xPercent: 0 },
      { xPercent: 65, duration: 1, ease: "power1.inOut" }
    );
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Invalid email";
    }

    if (!form.services.trim()) {
      nextErrors.services = "Required";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Required";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setSent(false);
    setSubmitError("");

    const subject = form.services || "New project inquiry";

    const message = [
      `Organization: ${form.organization || "-"}`,
      `Services: ${form.services || "-"}`,
      "",
      form.message,
    ].join("\n");

    const payload = {
      name: form.name,
      email: form.email,
      subject,
      message,
    };

    try {
      const emailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        payload,
        EMAILJS_PUBLIC_KEY
      );

      const { error: supabaseError } = await supabase
        .from("contacts")
        .insert([payload]);

      if (supabaseError) {
        throw supabaseError;
      }

      await emailPromise;

      setSent(true);
      setForm({
        name: "",
        email: "",
        organization: "",
        services: "",
        message: "",
      });
      setErrors({});

      if (sentTimeoutRef.current) clearTimeout(sentTimeoutRef.current);

      sentTimeoutRef.current = setTimeout(() => {
        setSent(false);
      }, 5000);
    } catch (error) {
      console.error("Contact submit failed:", error);
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-brand-bg text-brand-text transition-colors duration-500">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-brand-accent)_14%,transparent),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--color-brand-bg)_82%)]" />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-brand-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-border) 1px, transparent 1px)",
            backgroundSize: "86px 86px",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-24 pt-28 sm:px-8 md:pt-36 lg:px-10 lg:pt-40">
        {/* ================= HERO ================= */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className=" pb-16 md:pb-20"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
            <div>
              <motion.div
                variants={fadeUp}
                className="mb-8 flex flex-wrap items-center gap-3"
              >
                <div className="inline-flex items-center gap-3 rounded-full border border-brand-border bg-brand-bg/55 px-4 py-2 backdrop-blur-xl">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-accent" />
                  </span>

                  <span className="text-xs font-medium text-brand-text/60">
                    Available for selected projects
                  </span>
                </div>

                <TextLink href="mailto:ananta23ti@mahasiswa.pcr.ac.id">
                  contact channel
                </TextLink>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-5xl text-[clamp(4rem,11vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-brand-text"
              >
                Let’s start a project together
              </motion.h1>
            </div>

            <motion.div
  variants={fadeUp}
  className="
    relative mx-auto mt-8 flex justify-center
    lg:mt-0 lg:justify-self-end
  "
>
  <div className="absolute -inset-5 rounded-full bg-brand-accent/15 blur-3xl" />

  <div
    className="
      relative h-[132px] w-[132px] overflow-hidden rounded-full
      
      sm:h-[160px] sm:w-[160px]
      md:h-[180px] md:w-[180px]
      lg:h-[216px] lg:w-[216px]
    "
  >
    <img
      src={PROFILE_IMAGE}
      alt="Ananta Firdaus"
      className={cn(
        "h-full w-full rounded-full object-cover object-top",
        isDarkMode ? "grayscale " : "grayscale"
      )}
    />
  </div>

  <div
    className="
      absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center
      rounded-full bg-brand-accent text-brand-bg
      shadow-[0_18px_50px_color-mix(in_srgb,var(--color-brand-accent)_28%,transparent)]
      sm:h-10 sm:w-10
    "
  >
    <ArrowUpRight size={18} />
  </div>
</motion.div>
          </div>
        </motion.section>

        {/* ================= FORM + DETAILS ================= */}
        <section className="grid gap-12 border-b border-brand-border py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          {/* FORM */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="flex flex-col gap-1">
              {fields.map((field, index) => {
                const error = errors[field.id];

                return (
                  <div
                    key={field.id}
                    className="grid gap-5  py-7 sm:grid-cols-[64px_minmax(0,1fr)] md:py-9"
                  >
                    <div className="font-mono text-xs font-bold text-brand-text/35 sm:pt-2">
                      {field.num}
                    </div>

                    <div className="relative overflow-hidden">
                      <label className="mb-4 block text-xl font-semibold tracking-[-0.04em] text-brand-text sm:text-2xl">
                        {field.label}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          name={field.id}
                          value={form[field.id]}
                          onChange={(event) =>
                            handleChange(field.id, event.target.value)
                          }
                          onFocus={() => handleFocus(index + 1)}
                          placeholder={field.placeholder}
                          rows={4}
                          className="peer min-h-[120px] w-full resize-none bg-transparent pb-5 text-base text-brand-text outline-none placeholder:text-brand-text/25 sm:text-lg"
                        />
                      ) : (
                        <input
                          name={field.id}
                          type={field.type}
                          value={form[field.id]}
                          onChange={(event) =>
                            handleChange(field.id, event.target.value)
                          }
                          onFocus={() => handleFocus(index + 1)}
                          placeholder={field.placeholder}
                          className="peer w-full bg-transparent pb-5 text-base text-brand-text outline-none placeholder:text-brand-text/25 sm:text-lg"
                        />
                      )}

                      <ContactFormLine
                        inputId={index + 1}
                        hasError={Boolean(error)}
                      />

                      {error && (
                        <p className="absolute right-0 top-1 font-mono text-[10px] font-bold uppercase tracking-wider text-red-400 sm:text-xs">
                          {error}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <SubmitButton loading={loading} />

              <div className="min-h-10">
                {sent && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-accent/10 px-4 py-2 text-sm font-semibold text-brand-accent">
                    <CheckCircle2 size={16} />
                    Message sent successfully.
                  </div>
                )}

                {submitError && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400">
                    <AlertCircle size={16} />
                    {submitError}
                  </div>
                )}
              </div>
            </div>
          </motion.form>

          {/* DETAILS */}
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-9 lg:sticky lg:top-28 lg:self-start"
          >
            <SideBlock title="Contact Details">
              <div className="flex flex-col gap-3">
                <TextLink href="mailto:ananta23ti@mahasiswa.pcr.ac.id">
                  <Mail size={15} />
                  ananta23ti@mahasiswa.pcr.ac.id
                </TextLink>

                <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text/65">
                  <MapPin size={15} className="text-brand-accent" />
                  Pekanbaru, Riau, Indonesia
                </p>
              </div>
            </SideBlock>

            <SideBlock title="Business Details">
              <div className="flex flex-col gap-2 text-sm font-semibold text-brand-text/65">
                <p>Ananta Firdaus</p>
                <p>Frontend Developer</p>
                <p>UI Motion / Component Systems</p>
              </div>
            </SideBlock>

            <SideBlock title="Socials">
              <div className="flex flex-col gap-3">
                {socials.map((social) => (
                  <TextLink key={social.name} href={social.url}>
                    {social.name}
                  </TextLink>
                ))}
              </div>
            </SideBlock>

            <SideBlock title="Version">
              <p className="text-sm font-semibold text-brand-text/65">
                2026 © Edition
              </p>
            </SideBlock>

            <SideBlock title="Local Time">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text/65">
                <Clock3 size={15} className="text-brand-accent" />
                {localTime} WIB
              </p>
            </SideBlock>
          </motion.aside>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}