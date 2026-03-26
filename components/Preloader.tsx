"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadySeen = sessionStorage.getItem("imadaghne_preloader");
    if (alreadySeen) {
      setVisible(false);
      return;
    }

    const tl = gsap.timeline();

    // Entrance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 30, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      // Animate progress bar to full
      .to(
        progressBarRef.current,
        { width: "100%", duration: 1.6, ease: "power2.inOut" },
        0.2
      )
      // Exit
      .to(
        [logoRef.current, textRef.current, taglineRef.current],
        { opacity: 0, y: -20, duration: 0.5, ease: "power2.in", stagger: 0.05 },
        "+=0.1"
      )
      .to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => {
            setVisible(false);
            sessionStorage.setItem("imadaghne_preloader", "1");
          },
        },
        "-=0.1"
      );
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0E3D1C" }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #529627 0%, transparent 70%)",
          transform: "translate(-40%, -40%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #895F37 0%, transparent 70%)",
          transform: "translate(40%, 40%)",
        }}
      />

      {/* Floating leaf shapes */}
      <div
        className="leaf-float absolute top-1/4 left-1/6 text-5xl opacity-20 select-none pointer-events-none"
        style={{ animationDelay: "0s" }}
      >
        🌿
      </div>
      <div
        className="leaf-float absolute bottom-1/3 right-1/5 text-4xl opacity-15 select-none pointer-events-none"
        style={{ animationDelay: "2s" }}
      >
        🍃
      </div>
      <div
        className="leaf-float absolute top-1/3 right-1/4 text-3xl opacity-10 select-none pointer-events-none"
        style={{ animationDelay: "4s" }}
      >
        🌱
      </div>

      {/* Logo */}
      <div ref={logoRef} className="relative mb-6" style={{ opacity: 0 }}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Image
            src="/logo-blanc.png"
            alt="Imadaghne"
            width={72}
            height={72}
            className="object-contain"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
              if (el.parentElement) {
                el.parentElement.innerHTML =
                  '<span style="font-size:2.5rem;">🌿</span>';
              }
            }}
          />
        </div>
      </div>

      {/* Brand name */}
      <div ref={textRef} style={{ opacity: 0, textAlign: "center" }}>
        <h1
          className="text-5xl font-bold tracking-wide"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#FBF7F2",
            letterSpacing: "0.06em",
          }}
        >
          Imadaghne
        </h1>
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="mt-2 text-sm tracking-[0.25em] uppercase"
        style={{ color: "rgba(251,247,242,0.55)", opacity: 0 }}
      >
        Terroir Marocain Authentique
      </p>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <div
          ref={progressBarRef}
          className="h-full"
          style={{
            width: "0%",
            background: "linear-gradient(90deg, #529627, #FBF7F2)",
          }}
        />
      </div>
    </div>
  );
}
