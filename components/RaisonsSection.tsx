"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useLanguage } from "@/context/LanguageContext";

export default function RaisonsSection() {
  const { t, lang } = useLanguage();
  const rawReasons = (t("raisons.cards") as unknown as { title: string, desc: string }[]) || [];
  const reasons = [
    { num: "01", title: rawReasons[0]?.title || "", desc: rawReasons[0]?.desc || "", accent: "#529627" },
    { num: "02", title: rawReasons[1]?.title || "", desc: rawReasons[1]?.desc || "", accent: "#167033" },
    { num: "03", title: rawReasons[2]?.title || "", desc: rawReasons[2]?.desc || "", accent: "#895F37" },
    { num: "04", title: rawReasons[3]?.title || "", desc: rawReasons[3]?.desc || "", accent: "#C5A12A" },
  ];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".rs-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".rs-header", start: "top 88%" } }
      );
      gsap.fromTo(".rs-card",
        { opacity: 0, y: 55, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.1)", stagger: 0.12,
          scrollTrigger: { trigger: ".rs-grid", start: "top 85%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={ref} style={{ backgroundColor: "#FBF7F2", padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="rs-header text-center mb-14" style={{ opacity: 0 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase" as const, color: "#167033",
            fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 14,
          }}>
            {t("raisons.badge")}
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px,3.5vw,48px)",
            fontWeight: 700, color: "#1A0F08",
            letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16,
          }}>
            {t("raisons.title1")}
            <span style={{ color: "#167033", fontStyle: "italic" }}>{t("raisons.title2")}</span>
          </h2>
          <p style={{
            maxWidth: 560, margin: "0 auto",
            color: "#6B5744", fontSize: 15.5, lineHeight: 1.75,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {t("raisons.sub")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="rs-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reasons.map((r) => (
            <div
              key={r.num}
              className="rs-card group relative overflow-hidden rounded-2xl p-8"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgba(26,15,8,0.07)",
                boxShadow: "0 2px 16px rgba(26,15,8,0.05)",
                opacity: 0,
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s, border-color 0.3s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 24px 52px rgba(26,15,8,0.1)";
                el.style.borderColor = `${r.accent}55`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 16px rgba(26,15,8,0.05)";
                el.style.borderColor = "rgba(26,15,8,0.07)";
              }}
            >
              {/* Top accent bar reveal on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: r.accent }}
              />

              {/* Large faded number */}
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 72, fontWeight: 800,
                color: "rgba(26,15,8,0.05)",
                lineHeight: 1,
                position: "absolute",
                top: 16, right: 24,
                userSelect: "none",
              }}>
                {r.num}
              </span>

              {/* Accent line */}
              <div style={{ width: 32, height: 3, borderRadius: 99, backgroundColor: r.accent, marginBottom: 20 }} />

              {/* Title */}
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(20px,2.2vw,26px)",
                fontWeight: 700, color: "#1A0F08",
                marginBottom: 14, lineHeight: 1.2,
              }}>
                {r.title}
              </h3>

              {/* Desc */}
              <p style={{
                color: "#6B5744", fontSize: 14.5, lineHeight: 1.85,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                maxWidth: 420,
              }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
