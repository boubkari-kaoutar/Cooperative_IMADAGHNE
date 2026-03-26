"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GalleryGrid from "@/components/GalleryGrid";

gsap.registerPlugin(ScrollTrigger);

import { useLanguage } from "@/context/LanguageContext";

/* ── Component ─────────────────────────────────────────────────── */
export default function ProductsSection() {
  const { t } = useLanguage();
  
  const rawBS = (t("products.bestSellers") as unknown as any[]) || [];
  const bestSellers = [
    { image: "/images/best sellers/Huile d'Argan Pure.png", accent: "#C5A12A", tag: rawBS[0]?.tag, name: rawBS[0]?.name, tagline: rawBS[0]?.tagline, desc: rawBS[0]?.desc },
    { image: "/images/best sellers/amalou.png", accent: "#895F37", tag: rawBS[1]?.tag, name: rawBS[1]?.name, tagline: rawBS[1]?.tagline, desc: rawBS[1]?.desc },
    { image: "/images/best sellers/MIEL NATUREL.png", accent: "#C47A1A", tag: rawBS[2]?.tag, name: rawBS[2]?.name, tagline: rawBS[2]?.tagline, desc: rawBS[2]?.desc }
  ];

  const rawCol = (t("products.collection") as unknown as any[]) || [];
  const collection = [
    { image: "/images/best sellers/Huile d'Argan Pure.png", accent: "#C5A12A", tag: rawCol[0]?.tag, name: rawCol[0]?.name, desc: rawCol[0]?.desc, meta: rawCol[0]?.meta },
    { image: "/images/best sellers/MIEL NATUREL.png", accent: "#C47A1A", tag: rawCol[1]?.tag, name: rawCol[1]?.name, desc: rawCol[1]?.desc, meta: rawCol[1]?.meta },
    { image: "/images/best sellers/amalou.png", accent: "#895F37", tag: rawCol[2]?.tag, name: rawCol[2]?.name, desc: rawCol[2]?.desc, meta: rawCol[2]?.meta },
    { image: "/images/best sellers/Plantes Médicinales.png", accent: "#529627", tag: rawCol[3]?.tag, name: rawCol[3]?.name, desc: rawCol[3]?.desc, meta: rawCol[3]?.meta },
    { image: "/images/best sellers/Savon Artisanal.png", accent: "#4A7C7A", tag: rawCol[4]?.tag, name: rawCol[4]?.name, desc: rawCol[4]?.desc, meta: rawCol[4]?.meta },
    { image: "/images/best sellers/Eau de Rose.png", accent: "#A8506A", tag: rawCol[5]?.tag, name: rawCol[5]?.name, desc: rawCol[5]?.desc, meta: rawCol[5]?.meta },
  ];

  const heroRef    = useRef<HTMLDivElement>(null);
  const bsRef      = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* hero entrance */
    const ctxHero = gsap.context(() => {
      gsap.fromTo(".prod-hero-line",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.2 }
      );
    }, heroRef);

    /* best seller cards */
    const ctxBs = gsap.context(() => {
      gsap.fromTo(".bs-header", { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".bs-header", start: "top 88%" } });
      gsap.fromTo(".bs-card",
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.1)", stagger: 0.12,
          scrollTrigger: { trigger: ".bs-grid", start: "top 85%" } });
    }, bsRef);

    /* horizontal scroll — desktop only */
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const wrap  = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const scrollDist = () => track.scrollWidth - wrap.offsetWidth;
      const tween = gsap.to(track, {
        x: () => -scrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollDist()}`,
          invalidateOnRefresh: true,
        },
      });
      return () => { tween.kill(); };
    });

    return () => {
      ctxHero.revert();
      ctxBs.revert();
      mm.revert();
    };
  }, []);

  return (
    <div id="produits">

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: "72vh",
          background: "linear-gradient(150deg, #1A0F08 0%, #0E3D1C 45%, #167033 100%)",
          padding: "clamp(80px,12vw,140px) clamp(24px,6vw,80px) clamp(60px,8vw,100px)",
        }}
      >
        {/* Blobs */}
        <div className="absolute pointer-events-none" style={{
          top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(82,150,39,0.15) 0%, transparent 70%)",
        }} />
        <div className="absolute pointer-events-none" style={{
          bottom: "-15%", left: "-6%", width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(137,95,55,0.18) 0%, transparent 70%)",
        }} />
        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow */}
          <p className="prod-hero-line" style={{
            opacity: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#A8D96B",
            fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 20,
          }}>
            {t("hero.coop")}
          </p>

          {/* Title */}
          <h2 className="prod-hero-line" style={{
            opacity: 0,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px,6vw,74px)",
            fontWeight: 700, color: "#FBF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 24,
          }}>
            {t("products.heroTitle1")} <span style={{ color: "#A8D96B", fontStyle: "italic" }}>{t("products.heroTitle2")}</span><br />{t("products.heroTitle3")}
          </h2>

          {/* Subtitle */}
          <p className="prod-hero-line" style={{
            opacity: 0, color: "rgba(251,247,242,0.65)", fontSize: 16, lineHeight: 1.8,
            fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 40, maxWidth: 520, margin: "0 auto 40px",
          }}>
            {t("products.heroSub")}
          </p>

          {/* CTA */}
          <a
            className="prod-hero-line"
            href={`https://wa.me/212624993274?text=${encodeURIComponent("Bonjour ! Je souhaite passer une commande de produits Imadaghne.")}`}
            target="_blank" rel="noreferrer"
            style={{
              opacity: 0, display: "inline-flex", alignItems: "center", gap: 10,
              backgroundColor: "#25D366", color: "#FBF7F2",
              padding: "16px 36px", borderRadius: 999,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14, fontWeight: 700,
              boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 16px 40px rgba(37,211,102,0.45)";
              const icon = el.querySelector<HTMLElement>(".wa-icon");
              if (icon) icon.style.transform = "rotate(15deg) scale(1.2)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 8px 32px rgba(37,211,102,0.35)";
              const icon = el.querySelector<HTMLElement>(".wa-icon");
              if (icon) icon.style.transform = "rotate(0deg) scale(1)";
            }}
          >
            <svg className="wa-icon" viewBox="0 0 448 512" width="18" height="18" fill="currentColor"
              style={{ transition: "transform 0.3s ease", flexShrink: 0 }}>
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            {t("products.heroBtn")}
          </a>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60 }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#FBF7F2" />
          </svg>
        </div>
      </div>

      {/* ════════════════════════════════════
          BEST SELLERS
      ════════════════════════════════════ */}
      <div ref={bsRef} style={{ backgroundColor: "#FBF7F2", padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)" }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="bs-header text-center mb-14" style={{ opacity: 0 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase" as const, color: "#C5A12A",
              fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12,
            }}>
              {t("products.bsHeader1")}
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px,3.5vw,44px)",
              fontWeight: 700, color: "#1A0F08",
              letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>
              {t("products.bsHeader2")} <span style={{ color: "#C5A12A", fontStyle: "italic" }}>{t("products.bsHeader3")}</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="bs-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestSellers.map((p, i) => (
              <div
                key={i}
                className="bs-card group relative rounded-2xl overflow-hidden"
                style={{
                  height: "clamp(340px,42vw,440px)",
                  opacity: 0,
                  cursor: "default",
                }}
              >
                {/* Image bg */}
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(26,15,8,0.82) 35%, rgba(26,15,8,0.05) 100%)",
                }} />

                {/* Top accent border reveal */}
                <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: p.accent }} />

                {/* Content */}
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  {/* Tag */}
                  <span className="inline-block self-start px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-full"
                    style={{ background: `${p.accent}99`, backdropFilter: "blur(4px)" }}>
                    {p.tag}
                  </span>

                  <div className="flex-1" />

                  {/* Bottom */}
                  <div>
                    <p style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                      color: p.accent, textTransform: "uppercase" as const,
                      fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 6,
                    }}>
                      {p.tagline}
                    </p>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(18px,2vw,22px)",
                      fontWeight: 700, color: "#FBF7F2", marginBottom: 8, lineHeight: 1.2,
                    }}>
                      {p.name}
                    </h3>
                    <p style={{
                      color: "rgba(251,247,242,0.62)", fontSize: 13, lineHeight: 1.65,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          COLLECTION — horizontal scroll
      ════════════════════════════════════ */}
      <div style={{ backgroundColor: "#1A0F08" }}>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase" as const, color: "#A8D96B",
              fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12,
            }}>
              {t("products.gammeHeader1")}
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px,4vw,52px)",
              fontWeight: 700, color: "#FBF7F2",
              letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>
              {t("products.gammeHeader2")} <span style={{ color: "#A8D96B", fontStyle: "italic" }}>{t("products.gammeHeader3")}</span>
            </h2>
          </div>
          <p style={{
            color: "rgba(251,247,242,0.45)", fontSize: 14, lineHeight: 1.7,
            fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 300,
          }}>
            {t("products.gammeSub")}
          </p>
        </div>

        {/* Desktop — horizontal scroll */}
        <div ref={wrapRef} className="hidden lg:block overflow-hidden" style={{ height: "100vh" }}>
          <div ref={trackRef} className="flex gap-4 h-full"
            style={{ paddingLeft: "clamp(16px,4vw,48px)", paddingRight: 40, width: "max-content" }}>
            {collection.map((p, i) => (
              <div
                key={i}
                className="group relative overflow-hidden shrink-0 rounded-2xl"
                style={{ width: "clamp(280px,32vw,460px)", height: "100%" }}
              >
                {/* Image bg */}
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 32vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(7,7,10,0.72) 30%, rgba(7,7,10,0.05) 100%)",
                }} />

                {/* Top accent border reveal */}
                <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: p.accent }} />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <span className="inline-block self-start px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-full"
                    style={{ background: `${p.accent}88`, backdropFilter: "blur(4px)" }}>
                    {p.tag}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(20px,2.2vw,28px)",
                      fontWeight: 700, color: "#FBF7F2", marginBottom: 10, lineHeight: 1.2,
                    }}>
                      {p.name}
                    </h3>
                    <p style={{
                      color: "rgba(251,247,242,0.62)", fontSize: 14, lineHeight: 1.7,
                      fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 14,
                    }}>
                      {p.desc}
                    </p>
                    <p style={{
                      fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
                      color: "rgba(251,247,242,0.32)", textTransform: "uppercase" as const,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      {p.meta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical grid fallback */}
        <div className="lg:hidden max-w-7xl mx-auto px-6 pb-16">
          <div className="grid sm:grid-cols-2 gap-5">
            {collection.map((p, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl" style={{ height: 280 }}>
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: p.accent + "33" }} />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(7,7,10,0.72) 30%, transparent 100%)",
                }} />
                <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: p.accent }} />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <span className="inline-block self-start px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-full"
                    style={{ background: `${p.accent}88` }}>
                    {p.tag}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20,
                      fontWeight: 700, color: "#FBF7F2", marginBottom: 6 }}>{p.name}</h3>
                    <p style={{ fontSize: 11, color: "rgba(251,247,242,0.38)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.1em",
                      textTransform: "uppercase" as const }}>{p.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <GalleryGrid />

    </div>
  );
}
