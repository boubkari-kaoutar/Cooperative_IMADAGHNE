"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryGrid() {
  const { t, lang } = useLanguage();

  const labels = {
    amlou: lang === 'ar' ? 'أملو' : 'Amlou',
    argan: lang === 'ar' ? 'زيت الأركان' : "Huile d'Argan",
    miel: lang === 'ar' ? 'عسل طبيعي' : "Miel Naturel",
    imadaghne: lang === 'ar' ? 'إيماضغن' : 'Imadaghne',
    couscous: lang === 'ar' ? 'كسكس الشعير' : "Couscous d'Orge",
    savon: lang === 'ar' ? 'صابون بلدي' : "Savon Artisanal",
    zaatar: lang === 'ar' ? 'زعتر' : "Za'atar",
    plantes: lang === 'ar' ? 'أعشاب طبيعية' : "Plantes",
    amande: lang === 'ar' ? 'زيت اللوز' : "Huile d'Amande",
    rose: lang === 'ar' ? 'ماء الورد' : "Eau de Rose",
    produits: lang === 'ar' ? 'منتجاتنا' : "Produits",
    arganPure: lang === 'ar' ? 'زيت الأركان النقي' : "Huile d'Argan Pure"
  };

  const gallery = [
    { src: "/images/gallerie/Amlou.png",                   label: labels.amlou },
    { src: "/images/gallerie/zit argan.png",               label: labels.argan },
    { src: "/images/best sellers/MIEL NATUREL.png",        label: labels.miel },
    { src: "/images/gallerie/g1.png",                      label: labels.imadaghne },
    { src: "/images/gallerie/couscous chaeiir.png",        label: labels.couscous },
    { src: "/images/best sellers/Savon Artisanal.png",     label: labels.savon },
    { src: "/images/gallerie/ze3ter.png",                  label: labels.zaatar },
    { src: "/images/gallerie/g2.png",                      label: labels.imadaghne },
    { src: "/images/best sellers/Plantes Médicinales.png", label: labels.plantes },
    { src: "/images/gallerie/zit louz.png",                label: labels.amande },
    { src: "/images/gallerie/g3.png",                      label: labels.imadaghne },
    { src: "/images/best sellers/Eau de Rose.png",         label: labels.rose },
    { src: "/images/gallerie/g4.png",                      label: labels.imadaghne },
    { src: "/images/gallerie/nbg.png",                     label: labels.produits },
    { src: "/images/best sellers/Huile d'Argan Pure.png",  label: labels.arganPure },
  ];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gal-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".gal-header", start: "top 88%" } }
      );

      /* stagger with clip-path reveal */
      gsap.utils.toArray<HTMLElement>(".gal-item").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, clipPath: "inset(15% 15% 15% 15% round 16px)", scale: 0.95 },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ backgroundColor: "#F3EDE3", padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="gal-header text-center mb-12" style={{ opacity: 0 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase" as const, color: "#167033",
            fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12,
          }}>
            {t("galerie.enImages")}
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px,3.5vw,44px)",
            fontWeight: 700, color: "#1A0F08",
            letterSpacing: "-0.02em", lineHeight: 1.15,
          }}>
            {t("galerie.gridTitle1")} <span style={{ color: "#529627", fontStyle: "italic" }}>{t("galerie.gridTitle2")}</span>
          </h2>
        </div>

        {/* Masonry via CSS columns */}
        <div
          className="gal-grid"
          style={{
            columns: "4 220px",
            gap: "12px",
          }}
        >
          {gallery.map((g, i) => (
            <div
              key={i}
              className="gal-item group relative overflow-hidden rounded-2xl"
              style={{
                breakInside: "avoid",
                marginBottom: 12,
                opacity: 0,
                cursor: "default",
              }}
            >
              <Image
                src={g.src}
                alt={g.label}
                width={600}
                height={400}
                className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ display: "block" }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(26,15,8,0.5) 0%, transparent 55%)",
              }} />

              {/* Hover tint */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: "rgba(22,112,51,0.22)" }} />

              {/* Top accent line reveal */}
              <div className="absolute top-0 left-0 right-0 h-[3px] origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
                style={{ background: "#A8D96B" }} />

              {/* Label slides up */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span
                  className="text-xs font-bold uppercase tracking-[0.18em] text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {g.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
