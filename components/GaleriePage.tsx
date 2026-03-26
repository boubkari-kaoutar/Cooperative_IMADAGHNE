"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import GalleryGrid from "@/components/GalleryGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function GaleriePage() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gal-hero-line",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.13, delay: 0.3 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ backgroundColor: "#FBF7F2", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative flex flex-col justify-end overflow-hidden"
        style={{
          minHeight: "52vh",
          paddingTop: 120,
          paddingBottom: 72,
          paddingLeft: "clamp(24px,8vw,120px)",
          paddingRight: "clamp(24px,8vw,120px)",
          background: "linear-gradient(150deg, #1A0F08 0%, #0E3D1C 45%, #167033 100%)",
        }}
      >
        {/* Blobs */}
        <div className="absolute pointer-events-none" style={{
          top: "-10%", right: "-5%", width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(82,150,39,0.18) 0%, transparent 70%)",
        }} />
        <div className="absolute pointer-events-none" style={{
          bottom: "-15%", left: "-6%", width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(137,95,55,0.2) 0%, transparent 70%)",
        }} />
        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />

        <div className="relative z-10 max-w-5xl">
          {/* Breadcrumb */}
          <div className="gal-hero-line flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
            <Link href="/" className="text-xs tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: "#FBF7F2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("nav.home")}
            </Link>
            <span style={{ color: "rgba(251,247,242,0.3)" }}>/</span>
            <span className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(251,247,242,0.85)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("nav.gallery")}
            </span>
          </div>

          <h1 className="gal-hero-line font-bold leading-none mb-6" style={{
            opacity: 0,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px,6vw,80px)",
            color: "#FBF7F2",
            letterSpacing: "-0.02em",
          }}>
            {t("galerie.heroTitle1")}<br />
            <span style={{ color: "#A8D96B", fontStyle: "italic" }}>{t("galerie.heroTitle2")}</span>
          </h1>

          <p className="gal-hero-line max-w-xl text-base md:text-lg leading-relaxed" style={{
            opacity: 0,
            color: "rgba(251,247,242,0.65)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {t("galerie.heroSub")}
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60 }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#FBF7F2" />
          </svg>
        </div>
      </div>

      {/* ── GALLERY GRID ── */}
      <GalleryGrid />

    </div>
  );
}
