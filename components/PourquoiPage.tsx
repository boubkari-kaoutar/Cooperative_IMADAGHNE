"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import RaisonsSection from "@/components/RaisonsSection";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function PourquoiPage() {
  const { t, lang } = useLanguage();
  
  const stats = [
    { value: "100", suffix: "%",  label: t("pourquoi.stat1"),          accent: "#529627" },
    { value: "6",   suffix: "+",  label: t("pourquoi.stat2"),         accent: "#167033" },
    { value: "∞",   suffix: "",   label: t("pourquoi.stat3"), accent: "#895F37" },
  ];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* hero */
    const ctxHero = gsap.context(() => {
      gsap.fromTo(".pq-hero-line",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.13, delay: 0.3 }
      );
    }, heroRef);

    /* scroll reveals */
    const ctx = gsap.context(() => {
      gsap.fromTo(".pq-stat",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".pq-stats", start: "top 88%" } }
      );
      gsap.fromTo(".pq-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".pq-cta", start: "top 90%" } }
      );
    });

    return () => { ctxHero.revert(); ctx.revert(); };
  }, [lang]);

  return (
    <div style={{ backgroundColor: "#FBF7F2", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative flex flex-col justify-end overflow-hidden"
        style={{
          minHeight: "70vh",
          paddingTop: 140,
          paddingBottom: 100,
          paddingLeft: "clamp(24px,8vw,120px)",
          paddingRight: "clamp(24px,8vw,120px)",
        }}
      >
        {/* Video background */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/video/pourquoi nous.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(160deg, rgba(14,61,28,0.52) 0%, rgba(22,112,51,0.38) 50%, rgba(26,15,8,0.45) 100%)",
          zIndex: 1,
        }} />

        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          zIndex: 2,
        }} />

        <div className="relative max-w-5xl" style={{ zIndex: 10 }}>
          {/* Breadcrumb */}
          <div className="pq-hero-line flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
            <Link href="/" className="text-xs tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: "#FBF7F2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("nav.home")}
            </Link>
            <span style={{ color: "rgba(251,247,242,0.3)" }}>/</span>
            <span className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(251,247,242,0.85)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("nav.whyUs")}
            </span>
          </div>

          <h1 className="pq-hero-line font-bold leading-none mb-6" style={{
            opacity: 0,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px,6vw,80px)",
            color: "#FBF7F2",
            letterSpacing: "-0.02em",
          }}>
            {t("pourquoi.heroTitle1")}<br />
            <span style={{ color: "#A8D96B", fontStyle: "italic" }}>{t("pourquoi.heroTitle2")}</span>
          </h1>

          <p className="pq-hero-line max-w-2xl text-base md:text-lg leading-relaxed" style={{
            opacity: 0,
            color: "rgba(251,247,242,0.68)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {t("pourquoi.heroSub")}
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 90 }}>
            <path d="M0,60 C480,100 960,20 1440,60 L1440,90 L0,90 Z" fill="#FBF7F2" />
          </svg>
        </div>
      </div>

      {/* ── RAISONS ── */}
      <RaisonsSection />

      {/* ── STATS ── */}
      <section style={{ padding: "clamp(50px,7vw,80px) clamp(20px,6vw,80px)", backgroundColor: "#FBF7F2" }}>
        <div className="max-w-5xl mx-auto">
          <div
            className="pq-stats"
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              border: "1.5px solid rgba(26,15,8,0.10)",
              borderRadius: 20,
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 4px 32px rgba(26,15,8,0.06)",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="pq-stat"
                style={{
                  flex: "1 1 0",
                  minWidth: 160,
                  padding: "clamp(28px,4vw,48px) clamp(20px,3vw,40px)",
                  textAlign: "center" as const,
                  opacity: 0,
                  borderLeft: i > 0 ? "1.5px solid rgba(26,15,8,0.08)" : "none",
                  position: "relative" as const,
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: "absolute" as const,
                  top: 0, left: 0, right: 0,
                  height: 3,
                  backgroundColor: s.accent,
                }} />

                {/* Big number */}
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(44px,5.5vw,72px)",
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: 10,
                  color: "#1A0F08",
                }}>
                  {s.value}
                  <span style={{ color: s.accent, fontSize: "0.65em" }}>{s.suffix}</span>
                </p>

                {/* Label */}
                <p style={{
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase" as const,
                  color: "#6B5744",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)",
        backgroundColor: "#F3EDE3",
        textAlign: "center",
      }}>
        <div className="max-w-2xl mx-auto">
          <div className="pq-cta" style={{ opacity: 0 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px,3.5vw,44px)",
              fontWeight: 700, color: "#1A0F08",
              letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2,
            }}>
              {t("pourquoi.ctaTitle1")} <span style={{ color: "#167033", fontStyle: "italic" }}>{t("pourquoi.ctaTitle2")}</span>
            </h2>
            <p style={{
              color: "#6B5744", fontSize: 15, lineHeight: 1.8,
              fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 36,
            }}>
              {t("pourquoi.ctaSub")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "#25D366", color: "#FBF7F2",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 8px 28px rgba(37,211,102,0.3)",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  overflow: "hidden",
                  position: "relative",
                  display: "inline-flex",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "0 14px 36px rgba(37,211,102,0.4)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 8px 28px rgba(37,211,102,0.3)";
                }}
              >
                <span>{t("pourquoi.ctaBtn1")}</span>
                {/* Arrow wrapper — slides right on hover */}
                <span
                  className="group-hover:translate-x-1 transition-transform duration-300 ease-out"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="#FBF7F2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>

              <Link
                href="/produits"
                className="px-8 py-4 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "#fff", color: "#167033",
                  border: "1.5px solid rgba(22,112,51,0.2)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 4px 16px rgba(26,15,8,0.06)",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.backgroundColor = "#52331E";
                  el.style.color = "#FBF7F2";
                  el.style.borderColor = "#895F37";
                  el.style.boxShadow = "0 14px 36px rgba(82,51,30,0.25)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(0)";
                  el.style.backgroundColor = "#fff";
                  el.style.color = "#167033";
                  el.style.borderColor = "rgba(22,112,51,0.2)";
                  el.style.boxShadow = "0 4px 16px rgba(26,15,8,0.06)";
                }}
              >
                {t("pourquoi.ctaBtn2")}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
