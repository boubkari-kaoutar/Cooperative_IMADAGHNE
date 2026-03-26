"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  onComplete: () => void;
  scrolled: boolean;
}

export default function SlideToContact({ onComplete, scrolled }: Props) {
  const { t } = useLanguage();
  const trackRef   = useRef<HTMLDivElement>(null);
  const handleRef  = useRef<HTMLDivElement>(null);
  const fillRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const checkRef   = useRef<HTMLSpanElement>(null);

  const dragging     = useRef(false);
  const startX       = useRef(0);
  const currentX     = useRef(0);
  const maxDrag      = useRef(0);
  const [done, setDone] = useState(false);

  /* ── compute max drag distance ── */
  const calcMax = useCallback(() => {
    if (!trackRef.current || !handleRef.current) return;
    const trackW  = trackRef.current.offsetWidth;
    const handleW = handleRef.current.offsetWidth;
    maxDrag.current = trackW - handleW - 8; // 8 = left padding * 2
  }, []);

  useEffect(() => {
    calcMax();
    window.addEventListener("resize", calcMax);
    return () => window.removeEventListener("resize", calcMax);
  }, [calcMax]);

  /* ── pointer down ── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (done) return;
    dragging.current = true;
    startX.current   = e.clientX;
    currentX.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    // Kill any running snap-back
    gsap.killTweensOf(handleRef.current);
    gsap.killTweensOf(fillRef.current);
  }, [done]);

  /* ── pointer move ── */
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || done) return;
    const dx = Math.min(Math.max(e.clientX - startX.current, 0), maxDrag.current);
    currentX.current = dx;
    const progress = dx / maxDrag.current; // 0 → 1

    // Move handle
    gsap.set(handleRef.current, { x: dx });
    // Fill track
    gsap.set(fillRef.current, { scaleX: progress, transformOrigin: "left" });
    // Fade label
    if (labelRef.current) {
      labelRef.current.style.opacity = String(1 - progress * 1.4);
    }
  }, [done]);

  /* ── pointer up ── */
  const onPointerUp = useCallback(() => {
    if (!dragging.current || done) return;
    dragging.current = false;

    const progress = currentX.current / maxDrag.current;

    if (progress >= 0.75) {
      /* ── SUCCESS ── */
      const handleW  = handleRef.current?.offsetWidth ?? 36;
      const trackW   = trackRef.current?.offsetWidth  ?? 200;
      const finalX   = trackW - handleW - 8;

      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete();
          // Reset after 1.2s
          setTimeout(() => {
            setDone(false);
            gsap.set(handleRef.current, { x: 0 });
            gsap.set(fillRef.current,  { scaleX: 0 });
            if (labelRef.current) labelRef.current.style.opacity = "1";
            if (checkRef.current)  checkRef.current.style.opacity = "0";
          }, 1200);
        },
      });

      tl.to(handleRef.current, { x: finalX, duration: 0.25, ease: "power2.out" })
        .to(fillRef.current,   { scaleX: 1,  duration: 0.25, ease: "power2.out" }, "<")
        .to(checkRef.current,  { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });

    } else {
      /* ── SNAP BACK ── */
      gsap.to(handleRef.current, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.6)" });
      gsap.to(fillRef.current,   { scaleX: 0, duration: 0.4, ease: "power2.out" });
      if (labelRef.current) {
        gsap.to(labelRef.current, { opacity: 1, duration: 0.3 });
      }
    }
  }, [done, onComplete]);

  /* ── colors ── */
  const bgTrack    = scrolled ? "#1A0F08"              : "rgba(251,247,242,0.15)";
  const bgHandle   = scrolled ? "#FBF7F2"              : "#1A0F08";
  const fillColor  = "#167033";
  const arrowColor = scrolled ? "#1A0F08"              : "#FBF7F2";
  const labelColor = scrolled ? "rgba(251,247,242,0.7)" : "rgba(26,15,8,0.6)";
  const border     = scrolled ? "none" : "1px solid rgba(251,247,242,0.25)";

  return (
    <div
      ref={trackRef}
      className="relative flex items-center select-none overflow-hidden"
      style={{
        width: 175,
        height: 48,
        borderRadius: 999,
        backgroundColor: bgTrack,
        border,
        padding: "4px",
        cursor: done ? "default" : "grab",
        backdropFilter: "blur(8px)",
        flexShrink: 0,
      }}
    >
      {/* Fill bar */}
      <div
        ref={fillRef}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          backgroundColor: fillColor,
          transform: "scaleX(0)",
          transformOrigin: "left",
          opacity: 0.85,
        }}
      />

      {/* Draggable handle */}
      <div
        ref={handleRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative z-10 flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: 40,
          height: 40,
          backgroundColor: bgHandle,
          cursor: done ? "default" : "grab",
          touchAction: "none",
          userSelect: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          transition: "background-color 0.3s",
        }}
      >
        {/* Arrow icon */}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke={arrowColor} strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute" }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>

        {/* Check icon (success) */}
        <span
          ref={checkRef}
          style={{
            position: "absolute",
            opacity: 0,
            scale: "0.5",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ✓
        </span>
      </div>

      {/* Label */}
      <span
        ref={labelRef}
        className="absolute left-14 right-3 text-center pointer-events-none"
        style={{
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: labelColor,
          whiteSpace: "nowrap",
          letterSpacing: "0.03em",
          transition: "color 0.3s",
        }}
      >
        {done ? t("contact.redirecting") : t("contact.slideToContact")}
      </span>
    </div>
  );
}
