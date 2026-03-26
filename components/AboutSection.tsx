"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const rawValues = (t("about.values") as unknown as { title: string, desc: string }[]) || [];
  const values = [
    { icon: "🤝", title: rawValues[0]?.title || "Solidarité", desc: rawValues[0]?.desc || "..." },
    { icon: "🌱", title: rawValues[1]?.title || "Agriculture Durable", desc: rawValues[1]?.desc || "..." },
    { icon: "🏺", title: rawValues[2]?.title || "Savoir-Faire Traditionnel", desc: rawValues[2]?.desc || "..." },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark scroll effect
      gsap.fromTo(
        watermarkRef.current,
        { x: "-10%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // H2
      gsap.fromTo(
        h2Ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: h2Ref.current,
            start: "top 85%",
          },
        }
      );

      // Paragraphs
      gsap.fromTo(
        [para1Ref.current, para2Ref.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: para1Ref.current,
            start: "top 85%",
          },
        }
      );

      // Value cards stagger
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll(".value-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "back.out(1.2)",
            stagger: 0.15,
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.92, x: 40 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apropos"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      {/* Background watermark text */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none"
        style={{ opacity: 0 }}
      >
        <span
          className="text-[10vw] lg:text-[12vw] font-bold italic leading-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "rgba(22, 112, 51, 0.055)",
            whiteSpace: "nowrap",
          }}
        >
          IMADAGHNE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            {/* H2 */}
            <h2
              ref={h2Ref}
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1A0F08",
              }}
            >
              {t("about.title1")}
              <br />
              <span style={{ fontSize: "0.72em", fontWeight: 700, color: "#1A0F08" }}>
                {t("about.title2")}
              </span>
              <em style={{ fontSize: "0.72em", color: "#167033" }}>{t("about.title3")}</em>
            </h2>

            {/* Body text */}
            <p
              ref={para1Ref}
              className="text-base md:text-lg leading-relaxed mb-5"
              style={{ color: "#52331E" }}
            >
              {t("about.p1")}
            </p>
            <p
              ref={para2Ref}
              className="text-base md:text-lg leading-relaxed mb-12"
              style={{ color: "#6B5744" }}
            >
              <strong style={{ color: "#167033" }}>{t("about.p2_1")}</strong>
              {t("about.p2_2")}
              <em>{t("about.p2_3")}</em>
              {t("about.p2_4")}
            </p>

            {/* Value cards */}
            <div
              ref={valuesRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {values.map((v) => (
                <div
                  key={v.title}
                  className="value-card p-5 rounded-2xl"
                  style={{
                    backgroundColor: "#F3EDE3",
                    border: "1px solid rgba(82, 51, 30, 0.1)",
                    opacity: 0,
                  }}
                >
                  <h4
                    className="font-bold text-sm mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#1A0F08",
                    }}
                  >
                    {v.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B5744" }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: video */}
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 30px 80px rgba(26, 15, 8, 0.2)" }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/video/histoire.mp4" type="video/mp4" />
              </video>
              {/* Subtle bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/4"
                style={{
                  background: "linear-gradient(0deg, rgba(26,15,8,0.35) 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
