import React, { useRef, useState, useContext } from "react";
import { Mail, Loader } from "lucide-react";
import gsap from "gsap";
import { ThemeContext } from "../../context/ThemeContext.jsx";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ContactFormLine({ inputId, hasError, isDarkMode }) {
  return (
    <svg
      viewBox="0 0 300 100"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        `input-line-${inputId}`,
        "pointer-events-none absolute bottom-0 right-0 h-[60px] md:h-[80px] w-[300%] fill-none stroke-[1.75] transition-colors duration-300 will-change-transform",
        hasError
          ? "stroke-red-500/80"
          : isDarkMode
          // PERBAIKAN: Garis bawah dibikin lebih kelihatan (dari zinc-600/40 jadi zinc-500/60)
          ? "stroke-zinc-500/60 peer-focus:stroke-zinc-200"
          : "stroke-zinc-300 peer-focus:stroke-zinc-800"
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
}) {
  const { isDarkMode } = useContext(ThemeContext);

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
    gsap.fromTo(
      `.input-line-${id}`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSent(false);

    try {
      if (onSubmit) {
        await onSubmit(form);
      }

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

  return (
    <div
      className={cn(
        "w-full px-6 py-8 sm:p-10 md:p-12 rounded-2xl md:rounded-3xl transition-colors duration-300",
        isDarkMode 
          ? "bg-transparent text-white border border-zinc-700/60 shadow-xl" 
          : "bg-transparent text-zinc-900 border border-zinc-200/60 shadow-xl"
      )}
    >
      <div className="w-full max-w-xl mx-auto">
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-10 text-center tracking-tight">
            {title}
          </h1>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 md:gap-7 font-mono font-medium"
        >
          {["name", "email", "subject", "message"].map((field, index) => (
            <div key={field} className="relative overflow-hidden">
              {field === "message" ? (
                <textarea
                  name={field}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  onFocus={() => handleFocus(index + 1)}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className={cn(
                    "peer w-full min-h-[100px] md:min-h-[120px] bg-transparent outline-none py-2 md:py-3 resize-none text-sm md:text-base transition-colors",
                    // PERBAIKAN: Mengganti text-zinc-600 menjadi text-zinc-400 agar lebih terang
                    isDarkMode ? "text-white placeholder:text-zinc-400" : "text-zinc-900 placeholder:text-zinc-500"
                  )}
                />
              ) : (
                <input
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  onFocus={() => handleFocus(index + 1)}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className={cn(
                    "peer w-full bg-transparent outline-none py-2 md:py-3 text-sm md:text-base transition-colors",
                    // PERBAIKAN: Mengganti text-zinc-600 menjadi text-zinc-400 agar lebih terang
                    isDarkMode ? "text-white placeholder:text-zinc-400" : "text-zinc-900 placeholder:text-zinc-500"
                  )}
                />
              )}

              <ContactFormLine
                inputId={index + 1}
                hasError={!!errors[field]}
                isDarkMode={isDarkMode}
              />

              {errors[field] && (
                <span className="text-red-500 text-[10px] md:text-xs absolute right-0 top-3 uppercase tracking-wider font-bold">
                  {errors[field]}
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "flex items-center justify-center gap-2 border py-3 md:py-4 rounded-xl transition-all mt-3 text-sm md:text-base font-sans font-bold tracking-wide",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isDarkMode
                ? "border-zinc-700/50 bg-zinc-800/50 hover:bg-white hover:text-black"
                : "border-zinc-300 bg-zinc-50 hover:bg-zinc-900 hover:text-white"
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
            <div className="text-green-500 text-xs md:text-sm mt-2 text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}