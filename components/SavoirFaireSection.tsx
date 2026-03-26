"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useLanguage } from "@/context/LanguageContext";

export default function SavoirFaireSection() {
  const { t, lang } = useLanguage();
  const rawCards = (t("savoirFaire.cards") as unknown as { tag: string, title: string, text: string }[]) || [];
  const cards = [
    {
      image: "/images/savoir_faire_recolte_1774532918665.png",
      title: rawCards[0]?.title || "", text: rawCards[0]?.text || "", tag: rawCards[0]?.tag || "",
      color: "#167033", border: "rgba(22,112,51,0.2)"
    },
    {
      image: "/images/savoir_faire_transformation_1774532938367.png",
      title: rawCards[1]?.title || "", text: rawCards[1]?.text || "", tag: rawCards[1]?.tag || "",
      color: "#895F37", border: "rgba(137,95,55,0.2)"
    },
    {
      image: "/images/savoir_faire_travail_1774532959710.png",
      title: rawCards[2]?.title || "", text: rawCards[2]?.text || "", tag: rawCards[2]?.tag || "",
      color: "#529627", border: "rgba(82,150,39,0.2)"
    },
    {
      image: "/images/savoir_faire_qualite_1774532978332.png",
      title: rawCards[3]?.title || "", text: rawCards[3]?.text || "", tag: rawCards[3]?.tag || "",
      color: "#52331E", border: "rgba(82,51,30,0.2)"
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reset opacity before re-animating (language switch)
    document.querySelectorAll<HTMLElement>(".sf-card").forEach(el => {
      el.style.opacity = "0";
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(".sf-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".sf-header", start: "top 88%" } }
      );
      gsap.fromTo(".sf-card",
        { opacity: 0, y: 55, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.2)",
          stagger: 0.1,
          scrollTrigger: { trigger: ".sf-grid", start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#FBF7F2",
        padding: "clamp(60px,9vw,110px) clamp(20px,6vw,80px)",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="sf-header text-center mb-16" style={{ opacity: 0 }}>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 700,
            color: "#1A0F08",
            letterSpacing: "-0.02em",
            marginBottom: 16,
            lineHeight: 1.15,
          }}>
            {t("savoirFaire.title1")}
            <span style={{ color: "#167033" }}>{t("savoirFaire.title2")}</span>
            <span style={{ color: "#895F37", fontStyle: "italic" }}>{t("savoirFaire.title3")}</span>
          </h2>

          <p style={{
            maxWidth: 560, margin: "0 auto",
            color: "#6B5744", fontSize: 16, lineHeight: 1.75,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {t("savoirFaire.sub")}
          </p>

          {/* Decorative divider — 4 color dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {["#167033", "#529627", "#895F37", "#52331E"].map((c) => (
              <span key={c} style={{
                display: "block", width: 8, height: 8, borderRadius: "50%",
                backgroundColor: c,
              }} />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="sf-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="sf-card group flex flex-col rounded-2xl overflow-hidden cursor-default"
              style={{
                backgroundColor: "#fff",
                border: `1px solid ${c.border}`,
                boxShadow: "0 4px 18px rgba(26,15,8,0.05)",
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
                opacity: 0,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-8px)";
                el.style.boxShadow = "0 22px 48px rgba(26,15,8,0.12)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 18px rgba(26,15,8,0.05)";
              }}
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FBF7F2]">
                <Image src={c.image} alt={c.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold shadow-sm" style={{ backgroundColor: "rgba(251,247,242,0.95)", color: c.color, backdropFilter: "blur(4px)" }}>
                    {c.tag}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20, fontWeight: 700,
                  color: "#1A0F08", marginBottom: 10, lineHeight: 1.3,
                }}>
                  {c.title}
                </h3>

                <p style={{
                  color: "#6B5744", fontSize: 13.5, lineHeight: 1.7,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  flex: 1,
                }}>
                  {c.text}
                </p>

                {/* Bottom accent */}
                <div style={{
                  marginTop: 18, paddingTop: 14,
                  borderTop: `1px solid ${c.border}`,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <div style={{ width: 20, height: 2, borderRadius: 99, backgroundColor: c.color }} />
                  <div style={{ width: 8, height: 2, borderRadius: 99, backgroundColor: c.color, opacity: 0.4 }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
