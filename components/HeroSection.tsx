"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.5 });

      tl.fromTo(
          line1Ref.current,
          { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        ;

      // Parallax on scroll
      gsap.to(sectionRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNavTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-bg.jpg"
      >
        <source src="/video/Moroccan_cooperative_video.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(14,61,28,0.82) 0%, rgba(14,61,28,0.55) 40%, rgba(26,15,8,0.7) 100%)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.08,
          mixBlendMode: "multiply",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center pt-20">
        {/* H1 line 1 */}
        <h1
          ref={line1Ref}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#FBF7F2",
            opacity: 0,
          }}
        >
          {t("hero.line1")}
        </h1>

        {/* H1 line 2 */}
        <div className="overflow-hidden mb-6">
          <span
            ref={line2Ref}
            className="block text-4xl md:text-5xl lg:text-6xl font-bold italic leading-snug"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #E8DDD0 0%, #FBF7F2 50%, #C5A97A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0,
            }}
          >
            {t("hero.line2")}
          </span>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-8"
          style={{
            color: "rgba(251, 247, 242, 0.75)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            opacity: 0,
          }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => handleNavTo("#produits")}
            className="group cta-glow px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 flex items-center gap-2"
            style={{
              backgroundColor: "#167033",
              color: "#FBF7F2",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span>{t("hero.btnProducts")}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </button>

          <button
            onClick={() => handleNavTo("#apropos")}
            className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300"
            style={{
              backgroundColor: "transparent",
              border: "1.5px solid rgba(251, 247, 242, 0.45)",
              color: "#FBF7F2",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#52331E";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#895F37";
              (e.currentTarget as HTMLButtonElement).style.color = "#FBF7F2";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(251, 247, 242, 0.45)";
            }}
          >
            {t("hero.btnStory")}
          </button>
        </div>
      </div>

    </section>
  );
}
