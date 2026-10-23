import React, { useRef } from "react";
import gsap from "gsap";

/**
 * Submit button with circle reveal effect and loading state.
 * Used on NtaKit contact page.
 */
export function SubmitButton({
  /** When true, button is disabled and displays 'Sending' text */
  loading = false,

  /** Button width in pixels or CSS value */
  width,

  /** Button height in pixels or CSS value */
  height,

  /** Border radius in pixels */
  borderRadius,
}) {
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
    <button
        ref={buttonRef}
        type="submit"
        disabled={loading}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="
          relative inline-flex items-center justify-center
          overflow-hidden border border-brand-text/45
          bg-transparent font-medium uppercase text-brand-text
          disabled:cursor-not-allowed disabled:opacity-60
        "
        style={{
          width: width || "220px",
          height: height || "64px",
          borderRadius: borderRadius ? `${borderRadius}px` : "9999px",
          padding: width || height ? undefined : "16px 29px",
        }}
      >
        <span
          ref={circleRef}
          className="
            pointer-events-none absolute z-0 aspect-square w-[300%]
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
  );
}
