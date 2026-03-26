"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const { t } = useLanguage();
  
  const galleryItems = [
    {
      id: 1,
      label: t("galerie.item1"),
      sublabel: t("galerie.item1Sub"),
      gradient: "linear-gradient(145deg, #167033 0%, #529627 60%, #2D8A50 100%)",
      emoji: "🌿",
      span: "row-span-2",
    },
    {
      id: 2,
      label: t("galerie.item2"),
      sublabel: t("galerie.item2Sub"),
      gradient: "linear-gradient(145deg, #C5A12A 0%, #E8C547 60%, #895F37 100%)",
      emoji: "🌳",
      span: "",
    },
    {
      id: 3,
      label: t("galerie.item3"),
      sublabel: t("galerie.item3Sub"),
      gradient: "linear-gradient(145deg, #895F37 0%, #C47A1A 60%, #52331E 100%)",
      emoji: "🤝",
      span: "",
    },
    {
      id: 4,
      label: t("galerie.item4"),
      sublabel: t("galerie.item4Sub"),
      gradient: "linear-gradient(145deg, #C47A1A 0%, #E89A3A 60%, #52331E 100%)",
      emoji: "🫙",
      span: "",
    },
    {
      id: 5,
      label: t("galerie.item5"),
      sublabel: t("galerie.item5Sub"),
      gradient: "linear-gradient(145deg, #2D8A50 0%, #529627 60%, #167033 100%)",
      emoji: "🌱",
      span: "",
    },
    {
      id: 6,
      label: t("galerie.item6"),
      sublabel: t("galerie.item6Sub"),
      gradient: "linear-gradient(145deg, #A8506A 0%, #D4849A 60%, #895F37 100%)",
      emoji: "🍯",
      span: "",
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".gallery-item");
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.9, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="galerie"
      ref={sectionRef}
      className="py-28"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14" style={{ opacity: 0 }}>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1A0F08",
            }}
          >
            {t("galerie.secTitle1")}
            <em style={{ color: "#167033" }}>{t("galerie.secTitle2")}</em>
          </h2>
          <p
            className="max-w-lg mx-auto text-base md:text-lg"
            style={{ color: "#6B5744" }}
          >
            {t("galerie.secSub")}
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[220px]"
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item relative rounded-2xl overflow-hidden cursor-pointer group ${
                index === 0 ? "row-span-2" : ""
              }`}
              style={{
                background: item.gradient,
                opacity: 0,
              }}
            >
              {/* Emoji center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl md:text-6xl opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-80">
                  {item.emoji}
                </span>
              </div>

              {/* Overlay on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(14, 61, 28, 0.85) 0%, rgba(14, 61, 28, 0.4) 50%, transparent 100%)",
                }}
              >
                <p
                  className="text-base font-bold text-white leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.label}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(251,247,242,0.7)" }}>
                  {item.sublabel}
                </p>
              </div>

              {/* Subtle shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
