import React, { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Mail, Loader } from "lucide-react";
import emailjs from "emailjs-com";
import supabase from "../../supabaseClient";
import gsap from "gsap";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   INPUT LINE (copy dari Footer kamu)
========================= */
function ContactFormLine({ inputId, hasError, isDarkMode }) {
  return (
    <svg
      viewBox="0 0 300 100"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        `input-line-${inputId}`,
        "pointer-events-none absolute bottom-0 right-0 h-[90px] w-[300%] fill-none stroke-[1.75] transition-colors duration-300 will-change-transform",
        hasError
          ? "stroke-red-500/80"
          : isDarkMode
          ? "stroke-zinc-500/40"
          : "stroke-zinc-400/50"
      )}
      preserveAspectRatio="none"
    >
      <path d="M0 90H100C110 90 120 84 130 78C140 72 160 72 170 78C180 84 190 90 200 90H300" />
    </svg>
  );
}

export default function Contact() {
  const { isDarkMode } = useContext(ThemeContext);
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  /* =========================
     GSAP INPUT ANIMATION
  ========================= */
  const handleFocus = (id) => {
    gsap.fromTo(
      `.input-line-${id}`,
      { xPercent: 0 },
      { xPercent: 65, duration: 1, ease: "power1.inOut" }
    );
  };

  /* =========================
     VALIDATION
  ========================= */
  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Required";
    if (!form.email.trim()) err.email = "Required";
    if (!form.subject.trim()) err.subject = "Required";
    if (!form.message.trim()) err.message = "Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    };

    try {
      const emailPromise = emailjs.sendForm(
        "service_m3pugyl",
        "template_fbyckkg",
        formRef.current,
        "F7OWxXL91oYx48edi"
      );

      const { error } = await supabase
        .from("contacts")
        .insert([payload]);

      await emailPromise;

      if (error) console.log(error);

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-6 transition-colors",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 font-mono font-bold"
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
                  placeholder={field}
                  className={cn(
                    "peer w-full min-h-[120px] bg-transparent outline-none py-3",
                    isDarkMode ? "text-white" : "text-black"
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
                  placeholder={field}
                  className={cn(
                    "peer w-full bg-transparent outline-none py-3",
                    isDarkMode ? "text-white" : "text-black"
                  )}
                />
              )}

              <ContactFormLine
                inputId={index + 1}
                hasError={!!errors[field]}
                isDarkMode={isDarkMode}
              />

              {errors[field] && (
                <p className="text-red-500 text-xs absolute right-0 top-2">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "flex items-center justify-center gap-2 border py-3 rounded-md transition",
              isDarkMode
                ? "hover:bg-white hover:text-black"
                : "hover:bg-black hover:text-white"
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
            <p className="text-green-500 text-sm">
              Message sent successfully.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}