import { useRef, useState, useContext } from "react";
import { Mail, Loader } from "lucide-react";
import gsap from "gsap";
import { ThemeContext } from "../../context/ThemeContext.jsx";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ContactFormLine({ inputId, hasError }) {
  return (
    <svg
      viewBox="0 0 300 100"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        `input-line-${inputId}`,
        "pointer-events-none absolute bottom-0 right-0 h-[48px] w-[300%] fill-none stroke-[1.75] transition-colors duration-300 will-change-transform",
        "sm:h-[56px]",
        hasError
          ? "stroke-red-500/80"
          : "stroke-brand-border peer-focus:stroke-brand-text"
      )}
      preserveAspectRatio="none"
    >
      <path d="M0 90H100C110 90 120 84 130 78C140 72 160 72 170 78C180 84 190 90 200 90H300" />
    </svg>
  );
}

export default function ContactForm({
  onSubmit,
  title = "Get in Touch",
  successMessage = "Message sent successfully.",
  preview = false,
}) {
  const themeCtx = useContext(ThemeContext);
  const isDarkMode = themeCtx?.isDarkMode ?? true;

  const rootRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFocus = (id) => {
    if (!rootRef.current) return;

    const line = rootRef.current.querySelector(`.input-line-${id}`);
    if (!line) return;

    gsap.fromTo(
      line,
      { xPercent: 0 },
      { xPercent: 65, duration: 1, ease: "power1.inOut" }
    );
  };

  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Required";

    if (!form.email.trim()) {
      err.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email";
    }

    if (!form.subject.trim()) err.subject = "Required";
    if (!form.message.trim()) err.message = "Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSent(false);

    try {
      if (onSubmit) await onSubmit(form);

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("Form submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const rootClass = preview
    ? "flex h-full w-full items-center justify-center bg-transparent px-2 py-2"
    : "flex min-h-[460px] w-full items-center justify-center bg-transparent px-4 py-8 sm:px-6 sm:py-10";

  const cardClass = preview
    ? "w-full max-w-xl rounded-2xl border p-4 shadow-xl transition-colors duration-300 sm:p-5"
    : "w-full max-w-2xl rounded-3xl border p-5 shadow-xl transition-colors duration-300 sm:p-8 md:p-10";

  const titleClass = preview
    ? "text-[clamp(1.6rem,4vw,2.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-brand-text"
    : "text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-brand-text";

  const formGapClass = preview
    ? "flex flex-col gap-3 font-mono font-medium"
    : "flex flex-col gap-5 font-mono font-medium sm:gap-6";

  const inputClass = preview
    ? "peer w-full bg-transparent py-1.5 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-text/40"
    : "peer w-full bg-transparent py-2 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-text/40 sm:text-base";

  const textareaClass = preview
    ? "peer min-h-[76px] w-full resize-none bg-transparent py-1.5 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-text/40"
    : "peer min-h-[110px] w-full resize-none bg-transparent py-2 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-text/40 sm:min-h-[130px] sm:text-base";

  return (
    <div className={rootClass}>
      <div
        ref={rootRef}
        className={cn(
          cardClass,
          "border-brand-border bg-brand-surface/30 text-brand-text"
        )}
      >
        <div className="mx-auto w-full max-w-xl">
          {title && (
            <div className={preview ? "mb-4 text-center" : "mb-8 text-center"}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-accent sm:text-[11px]">
                Contact Form
              </p>

              <h1 className={titleClass}>{title}</h1>
            </div>
          )}

          <form onSubmit={handleSubmit} className={formGapClass}>
            {["name", "email", "subject", "message"].map((field, index) => {
              const label = field.charAt(0).toUpperCase() + field.slice(1);
              const hasError = Boolean(errors[field]);

              return (
                <div key={field} className="relative overflow-hidden pb-2">
                  {field === "message" ? (
                    <textarea
                      name={field}
                      value={form[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      onFocus={() => handleFocus(index + 1)}
                      placeholder={label}
                      className={textareaClass}
                    />
                  ) : (
                    <input
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      onFocus={() => handleFocus(index + 1)}
                      placeholder={label}
                      className={inputClass}
                    />
                  )}

                  <ContactFormLine
                    inputId={index + 1}
                    hasError={hasError}
                    isDarkMode={isDarkMode}
                  />

                  {hasError && (
                    <span className="absolute right-0 top-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500">
                      {errors[field]}
                    </span>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "mt-1 flex items-center justify-center gap-2 rounded-xl border text-sm font-bold tracking-wide transition-all",
                preview ? "py-2.5" : "py-3 sm:py-4 sm:text-base",
                "border-brand-border bg-brand-bg text-brand-text hover:border-brand-accent hover:bg-brand-accent hover:text-brand-bg",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Send Message
                </>
              )}
            </button>

            {sent && (
              <div className="mt-2 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-center text-xs text-green-500">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}