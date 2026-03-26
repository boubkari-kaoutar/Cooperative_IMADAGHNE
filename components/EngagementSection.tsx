"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useLanguage } from "@/context/LanguageContext";

export default function EngagementSection() {
  const { t, lang } = useLanguage();
  const rawCards = (t("engagement.cards") as unknown as { title: string, text: string }[]) || [];
  const cards = [
    { num: "01", title: rawCards[0]?.title || "", text: rawCards[0]?.text || "", accent: "#529627", glow: "rgba(82,150,39,0.3)" },
    { num: "02", title: rawCards[1]?.title || "", text: rawCards[1]?.text || "", accent: "#895F37", glow: "rgba(137,95,55,0.3)" },
    { num: "03", title: rawCards[2]?.title || "", text: rawCards[2]?.text || "", accent: "#167033", glow: "rgba(22,112,51,0.3)" },
    { num: "04", title: rawCards[3]?.title || "", text: rawCards[3]?.text || "", accent: "#52331E", glow: "rgba(82,51,30,0.3)" },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reset opacity before re-animating (language switch)
    document.querySelectorAll<HTMLElement>(".eng-card, .eng-num").forEach(el => {
      el.style.opacity = "0";
    });

    const ctx = gsap.context(() => {
      /* Header fade-up */
      gsap.fromTo(".eng-header",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".eng-header", start: "top 88%" } }
      );

      /* Cards stagger */
      gsap.utils.toArray<HTMLElement>(".eng-card").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1, y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.13,
            scrollTrigger: { trigger: ".eng-grid", start: "top 85%" },
          }
        );
      });

      /* Number pop */
      gsap.utils.toArray<HTMLElement>(".eng-num").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1, scale: 1,
            duration: 0.5, ease: "back.out(2)",
            delay: i * 0.13 + 0.35,
            scrollTrigger: { trigger: ".eng-grid", start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(150deg, #52331E 0%, #3A2414 30%, #0E3D1C 60%, #167033 100%)",
        padding: "clamp(60px,9vw,110px) clamp(20px,6vw,80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blobs */}
      <div style={{
        position: "absolute", top: "-15%", right: "-6%",
        width: 480, height: 480, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(82,150,39,0.18) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", left: "-6%",
        width: 420, height: 420, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(137,95,55,0.2) 0%, transparent 70%)",
      }} />
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.045,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header — no pill */}
        <div className="eng-header text-center mb-16" style={{ opacity: 0 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 700,
            color: "#FBF7F2",
            letterSpacing: "-0.02em",
            marginBottom: 16,
            lineHeight: 1.15,
          }}>
            {t("engagement.title1")}
            <span style={{ color: "#A8D96B" }}>{t("engagement.title2")}</span>
          </h2>

          <p style={{
            maxWidth: 560, margin: "0 auto",
            color: "rgba(251,247,242,0.65)", fontSize: 16, lineHeight: 1.75,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {t("engagement.sub")}
          </p>

          {/* 4-color bar */}
          <div className="flex items-center justify-center mt-8 overflow-hidden rounded-full mx-auto"
            style={{ width: 120, height: 4 }}>
            {["#167033", "#529627", "#895F37", "#52331E"].map((c) => (
              <div key={c} style={{ flex: 1, height: "100%", backgroundColor: c }} />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="eng-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="eng-card group flex flex-col rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "rgba(251,247,242,0.05)",
                border: "1px solid rgba(251,247,242,0.1)",
                backdropFilter: "blur(12px)",
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s, box-shadow 0.4s, border-color 0.3s",
                opacity: 0,
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-8px)";
                el.style.backgroundColor = "rgba(251,247,242,0.1)";
                el.style.boxShadow = `0 24px 56px ${c.glow}`;
                el.style.borderColor = `${c.accent}55`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.backgroundColor = "rgba(251,247,242,0.05)";
                el.style.boxShadow = "none";
                el.style.borderColor = "rgba(251,247,242,0.1)";
              }}
            >
              {/* Top bar — reveals fully on hover */}
              <div
                className="origin-left transition-all duration-500 group-hover:scale-x-100"
                style={{
                  height: 3,
                  backgroundColor: c.accent,
                  flexShrink: 0,
                  transform: "scaleX(0.35)",
                  transformOrigin: "left",
                  transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                ref={el => {
                  if (el) {
                    el.closest(".eng-card")?.addEventListener("mouseenter", () => {
                      el.style.transform = "scaleX(1)";
                    });
                    el.closest(".eng-card")?.addEventListener("mouseleave", () => {
                      el.style.transform = "scaleX(0.35)";
                    });
                  }
                }}
              />

              <div className="flex flex-col flex-1 p-7">
                {/* Large faded number */}
                <span
                  className="eng-num block mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 56, fontWeight: 800,
                    color: `${c.accent}22`,
                    lineHeight: 1,
                    opacity: 0,
                    userSelect: "none",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {c.num}
                </span>

                {/* Accent line */}
                <div style={{
                  width: 32, height: 3, borderRadius: 99,
                  backgroundColor: c.accent, marginBottom: 16,
                  transition: "width 0.4s ease",
                }}
                  ref={el => {
                    if (el) {
                      el.closest(".eng-card")?.addEventListener("mouseenter", () => {
                        el.style.width = "56px";
                      });
                      el.closest(".eng-card")?.addEventListener("mouseleave", () => {
                        el.style.width = "32px";
                      });
                    }
                  }}
                />

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(15px,1.4vw,18px)", fontWeight: 700,
                  color: "#FBF7F2", marginBottom: 12, lineHeight: 1.3,
                }}>
                  {c.title}
                </h3>

                <p style={{
                  color: "rgba(251,247,242,0.58)", fontSize: 13.5, lineHeight: 1.75,
                  fontFamily: "'Plus Jakarta Sans', sans-serif", flex: 1,
                }}>
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
