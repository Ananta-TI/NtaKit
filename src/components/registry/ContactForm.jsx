import { useEffect, useRef, useState } from "react";
import { Mail, Loader } from "lucide-react";
import gsap from "gsap";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fields = ["name", "email", "subject", "message"];

function ContactFormLine({ inputId, hasError }) {
  return (
    <svg
      viewBox="0 0 300 100"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="none"
      className={cn(
        `contact-form-line-${inputId}`,
        "pointer-events-none absolute bottom-0 right-0 h-[56px] w-[300%] fill-none stroke-[1.75] transition-colors duration-300 will-change-transform sm:h-[72px]",
        hasError
          ? "stroke-red-500/80"
          : "stroke-zinc-300 peer-focus:stroke-zinc-900 dark:stroke-zinc-600 dark:peer-focus:stroke-zinc-100",
      )}
    >
      <path d="M0 90H100C110 90 120 84 130 78C140 72 160 72 170 78C180 84 190 90 200 90H300" />
    </svg>
  );
}
/* =========================
   MAIN CONTACT COMPONENT
========================= */

/**
 * Komponen Form Kontak interaktif dengan animasi GSAP,
 * validasi form, loading state, success feedback, dan error handling.
 */
export default function ContactForm({
  /** Handler async/sync untuk menangani submit form. Menerima data name, email, subject, message. */
  onSubmit,

  /** Judul yang ditampilkan di atas form. Isi string kosong untuk menyembunyikan judul. */
  title = "Get in Touch",

  /** Pesan yang ditampilkan saat form berhasil dikirim. */
  successMessage = "Message sent successfully.",

  /** Pesan yang ditampilkan saat proses submit gagal atau onSubmit menghasilkan error. */
  errorMessage = "Something went wrong. Please try again.",

  /** Teks yang ditampilkan pada tombol submit saat form dalam keadaan idle. */
  buttonText = "Send Message",

  /** Teks yang ditampilkan pada tombol submit saat form sedang mengirim data. */
  loadingText = "Sending...",

  /** Durasi pesan sukses ditampilkan sebelum hilang otomatis dalam satuan milidetik. */
  successDuration = 5000,

  /** Mengaktifkan layout lebih kecil untuk preview, modal, card, atau container sempit. */
  compact = false,

  /** Class tambahan untuk mengubah atau menambah styling wrapper utama. */
  className = "",
}) {
  const rootRef = useRef(null);
  const timeoutRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleFocus = (id) => {
    if (!rootRef.current) return;

    const line = rootRef.current.querySelector(`.contact-form-line-${id}`);
    if (!line) return;

    gsap.fromTo(
      line,
      { xPercent: 0 },
      { xPercent: 65, duration: 1, ease: "power1.inOut" },
    );
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

    if (!form.subject.trim()) {
      nextErrors.subject = "Required";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[field];
        return nextErrors;
      });
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setSent(false);
    setSubmitError("");

    try {
      if (onSubmit) {
        await onSubmit(form);
      }

      resetForm();
      setSent(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setSent(false);
      }, successDuration);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const wrapperClass = compact
    ? "w-full px-4 py-5"
    : "w-full px-6 py-8 sm:p-10 md:p-12";

  const titleClass = compact
    ? "mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl"
    : "mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl md:mb-10 md:text-5xl";

  const formClass = compact
    ? "flex flex-col gap-4 font-mono font-medium"
    : "flex flex-col gap-6 font-mono font-medium md:gap-7";

  const inputClass = compact
    ? "peer w-full bg-transparent py-2 text-sm outline-none transition-colors"
    : "peer w-full bg-transparent py-2 text-sm outline-none transition-colors md:py-3 md:text-base";

  const textareaClass = compact
    ? "peer min-h-[84px] w-full resize-none bg-transparent py-2 text-sm outline-none transition-colors"
    : "peer min-h-[100px] w-full resize-none bg-transparent py-2 text-sm outline-none transition-colors md:min-h-[120px] md:py-3 md:text-base";

  return (
    <div
      ref={rootRef}
      className={cn(
        wrapperClass,
        "rounded-2xl border border-zinc-200/70 bg-white/70 text-zinc-900 shadow-xl backdrop-blur-md transition-colors duration-300",
        "dark:border-zinc-700/70 dark:bg-zinc-950/40 dark:text-white",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-xl">
        {title && <h1 className={titleClass}>{title}</h1>}

        <form onSubmit={handleSubmit} className={formClass}>
          {fields.map((field, index) => {
            const inputId = index + 1;
            const label = field.charAt(0).toUpperCase() + field.slice(1);
            const hasError = Boolean(errors[field]);
            const sharedInputClass = cn(
              field === "message" ? textareaClass : inputClass,
              "text-zinc-900 placeholder:text-zinc-500",
              "dark:text-white dark:placeholder:text-zinc-400",
            );

            return (
              <div key={field} className="relative overflow-hidden pb-2">
                {field === "message" ? (
                  <textarea
                    name={field}
                    value={form[field]}
                    placeholder={label}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onFocus={() => handleFocus(inputId)}
                    className={sharedInputClass}
                  />
                ) : (
                  <input
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    placeholder={label}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onFocus={() => handleFocus(inputId)}
                    className={sharedInputClass}
                  />
                )}

                <ContactFormLine inputId={inputId} hasError={hasError} />

                {hasError && (
                  <span className="absolute right-0 top-2 text-[10px] font-bold uppercase tracking-wider text-red-500 md:text-xs">
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
              "mt-3 flex items-center justify-center gap-2 rounded-xl border font-sans font-bold tracking-wide transition-all",
              "disabled:cursor-not-allowed disabled:opacity-50",
              compact ? "py-3 text-sm" : "py-3 text-sm md:py-4 md:text-base",
              "border-zinc-300 bg-zinc-50 text-zinc-900 hover:bg-zinc-900 hover:text-white",
              "dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-white dark:hover:bg-white dark:hover:text-black",
            )}
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={18} />
                {loadingText}
              </>
            ) : (
              <>
                <Mail size={18} />
                {buttonText}
              </>
            )}
          </button>

          {sent && (
            <div className="mt-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-center text-xs text-green-500 md:text-sm">
              {successMessage}
            </div>
          )}

          {submitError && (
            <div className="mt-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-xs text-red-500 md:text-sm">
              {submitError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
