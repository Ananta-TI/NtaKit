import React, { useRef, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import MagneticEffect from "../../context/MagneticEffect";
import { Mail, Loader, ArrowUpRight } from "lucide-react";
import emailjs from "emailjs-com";
import supabase from "../../supabaseClient";
import gsap from "gsap";
import Footer from "../../components/ui/Footer";


function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   INPUT LINE (GSAP SVG Line)
========================= */
function ContactFormLine({ inputId, hasError }) {
  return (
    <svg
      viewBox="0 0 300 100"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        `input-line-${inputId}`,
        "pointer-events-none absolute bottom-0 right-0 h-[60px] md:h-[80px] w-[300%] fill-none stroke-[1.75] transition-colors duration-500 will-change-transform",
        hasError
          ? "stroke-red-500/80"
          : "stroke-brand-border peer-focus:stroke-brand-accent"
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

  const buttonRef = useRef(null);
  const circleRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleMouseEnter = (e) => {
    const bounds = buttonRef.current.getBoundingClientRect();

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    gsap.set(circleRef.current, {
      x,
      y,
      scale: 0,
      opacity: 1,
    });

    gsap.to(circleRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(circleRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };


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
    if (!form.email.trim()) err.email = "Required";
    if (!form.subject.trim()) err.subject = "Required";
    if (!form.message.trim()) err.message = "Required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

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

      const { error } = await supabase.from("contacts").insert([payload]);
      await emailPromise;

      if (error) console.log(error);

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: "name", label: "What's your name?", type: "text", num: "01", placeholder: "John Doe *" },
    { id: "email", label: "What's your email?", type: "email", num: "02", placeholder: "john@doe.com *" },
    { id: "subject", label: "What's the subject?", type: "text", num: "03", placeholder: "Web Design, Development ..." },
    { id: "message", label: "Your message", type: "textarea", num: "04", placeholder: "Hello Sir, can you help me with ... *" },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center transition-colors duration-500 overflow-x-hidden bg-brand-bg text-brand-text">
      
      {/* Tambahkan pt-28 di mobile agar tidak ketimpa header, pt-40 di desktop */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-8 pt-28 md:pt-40 pb-20">
        
        {/* ===================== ROW 1: HEADING & AVATAR ===================== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 lg:mb-32 gap-8 md:gap-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
            <span className="flex items-center gap-3 md:gap-5">
              {/* Avatar di dalam teks - muncul di tablet ke atas */}
              <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden  grayscale hover:grayscale-0 transition-all duration-500 hidden md:block flex-shrink-0">
                <img src={isDarkMode ? "/image/logo1.png" : "/image/logo2.png"} alt="Ananta" className="w-full h-full object-cover" />
              </div>
              Let's start a
            </span>
            <span className="block">project together</span>
          </h1>
          
          {/* Avatar & Arrow di kanan bawah */}
          <div className="flex items-center gap-4 md:gap-6 pb-2 md:pb-6">
            {/* FIX: Ganti w-50 (tidak valid) ke w-40 (160px) / md:w-52 (208px) */}
            <div className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden grayscale ">
              <img
                src="/image/m3.png"
                alt="Ananta"
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full  flex items-center justify-center text-brand-accent flex-shrink-0">
              <ArrowUpRight size={24} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* ===================== ROW 2: FORM & DETAILS ===================== */}
        {/* Gap disesuaikan: gap-12 di mobile, lg:gap-24 di desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-0"
            >
              {fields.map((field, index) => (
                <div key={field.id} className="relative overflow-hidden group  py-5 md:py-8">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 md:gap-8">
                    {/* Nomor urut */}
                    <span className="text-brand-text/30 font-mono text-xs sm:text-sm md:text-base pt-1.5">
                      {field.num}
                    </span>
                    
                    <div className="flex-1 w-full relative">
                      <label className="text-xs sm:text-sm text-brand-text/40 mb-2 md:mb-3 block font-medium">
                        {field.label}
                      </label>
                      
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.id}
                          value={form[field.id]}
                          onChange={(e) =>
                            setForm({ ...form, [field.id]: e.target.value })
                          }
                          onFocus={() => handleFocus(index + 1)}
                          placeholder={field.placeholder}
                          rows={4}
                          className="peer w-full min-h-[100px] bg-transparent outline-none py-2 text-base sm:text-lg md:text-xl text-brand-text placeholder:text-brand-text/20 resize-none transition-colors"
                        />
                      ) : (
                        <input
                          name={field.id}
                          type={field.type}
                          value={form[field.id]}
                          onChange={(e) =>
                            setForm({ ...form, [field.id]: e.target.value })
                          }
                          onFocus={() => handleFocus(index + 1)}
                          placeholder={field.placeholder}
                          className="peer w-full bg-transparent outline-none py-2 text-base sm:text-lg md:text-xl text-brand-text placeholder:text-brand-text/20 transition-colors"
                        />
                      )}

                      <ContactFormLine
                        inputId={index + 1}
                        hasError={!!errors[field.id]}
                      />

                      {errors[field.id] && (
                        <p className="text-red-400 text-[10px] sm:text-xs absolute right-0 top-1 font-mono font-bold">
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Submit Button - Full width di mobile, auto di desktop */}
              <div className="pt-8 md:pt-14 flex flex-col sm:flex-row items-start gap-6">

              <MagneticEffect>
  <button
    ref={buttonRef}
    type="submit"
    disabled={loading}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className={cn(
      "group relative w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden border transition-all duration-300",
      "border-brand-accent bg-transparent",
      "hover:shadow-xl hover:shadow-brand-accent/20",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    )}
  >
    {/* Animated Fill */}
    <span
      ref={circleRef}
      className="absolute top-0 left-0 w-[250%] aspect-square rounded-full bg-brand-accent pointer-events-none"
      style={{
        transform: "translate(-50%, -50%) scale(0)",
        opacity: 0,
      }}
    />

    {/* Content */}
    <span className="relative z-10 flex items-center gap-3 font-bold text-base sm:text-lg text-brand-accent transition-colors duration-300 group-hover:text-brand-bg">
      {loading ? (
        <>
          <Loader className="animate-spin" size={20} />
          Sending...
        </>
      ) : (
        <>
          Send it!

          <div className="bg-brand-accent text-brand-bg rounded-full p-1.5 transition-all duration-300 group-hover:bg-brand-bg group-hover:text-brand-accent group-hover:scale-110 group-hover:rotate-0 -rotate-12">
            <ArrowUpRight size={16} strokeWidth={3} />
          </div>
        </>
      )}
    </span>
  </button>
</MagneticEffect>

                {sent && (
                  <p className="text-brand-accent font-mono font-bold text-sm flex items-center gap-2 animate-pulse">
                    ✅ Message sent successfully.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: CONTACT INFO */}
          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-12 pt-0 lg:pt-0">
            
            {/* Contact Details */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h5 className="text-brand-text/40 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">
                Contact Details
              </h5>
              <ul className="flex flex-col gap-2 md:gap-3">
                <li className="group">
                <MagneticEffect>

                  <a 
                    href="mailto:ananta23ti@mahasiswa.pcr.ac.id" 
                    // Break-all supaya email panjang tidak overflow di mobile
                    className="text-base sm:text-lg md:text-xl font-medium hover:text-brand-accent hover:underline transition-colors inline-flex items-center gap-2 w-fit break-all"
                  >
                    ananta23ti@mahasiswa.pcr.ac.id
                    {/* <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent flex-shrink-0" /> */}
                  </a>
                </MagneticEffect>
                </li>
                <li>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-brand-text/70">
                    Pekanbaru, Riau, Indonesia
                  </p>
                </li>
              </ul>
            </div>

            {/* Business Details */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h5 className="text-brand-text/40 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">
                Business Details
              </h5>
              <ul className="flex flex-col gap-1.5 md:gap-2 text-base sm:text-lg md:text-xl font-medium text-brand-text/70">
                <li><p>Ananta Firdaus</p></li>
                <li><p>Role: Frontend Developer</p></li>
                <li><p>Focus: UI/UX & Web3</p></li>
              </ul>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h5 className="text-brand-text/40 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">
                Socials
              </h5>
              <ul className="flex flex-col gap-2 md:gap-3">
                {[
                  { name: "Instagram", url: "https://instagram.com/ntakunti_14" },
                  { name: "LinkedIn", url: "https://www.linkedin.com/in/ananta-firdaus-93448328b/" },
                  { name: "GitHub", url: "https://github.com/Ananta-TI" },
                ].map((social) => (
          
                  <li key={social.name} className="group">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base sm:text-lg md:text-xl font-medium hover:text-brand-accent transition-colors inline-flex items-center gap-2 w-fit"
                    >
                      {social.name}
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent" />
                    </a>
                  </li>
            
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}