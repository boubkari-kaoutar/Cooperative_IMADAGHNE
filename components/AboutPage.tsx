"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

/* ── util: register scroll reveal ── */
function useReveal(selector: string, from: object = { opacity: 0, y: 50 }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.fromTo(el, { ...from, opacity: 0 }, {
          opacity: 1, y: 0, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, [selector, from]);
}

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const valeursRaw = t("aboutPage.valeurs") as any[] || [];
  const valeurs = [
    { icon: "🌿", title: valeursRaw[0]?.title || "", text: valeursRaw[0]?.text || "", color: "#167033" },
    { icon: "🤝", title: valeursRaw[1]?.title || "", text: valeursRaw[1]?.text || "", color: "#895F37" },
    { icon: "🌱", title: valeursRaw[2]?.title || "", text: valeursRaw[2]?.text || "", color: "#529627" },
    { icon: "💚", title: valeursRaw[3]?.title || "", text: valeursRaw[3]?.text || "", color: "#52331E" },
  ];

  const heroRef = useRef<HTMLDivElement>(null);

  /* hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ap-hero-line",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.13, delay: 0.3 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [lang]);

  /* scroll reveals */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [
        { sel: ".ap-img",          from: { x: -40 } },
        { sel: ".ap-histoire",     from: { x: 40  } },
        { sel: ".ap-mission",        from: { y: 50  } },
        { sel: ".ap-mission-card",  from: { y: 40  }, stagger: true },
        { sel: ".ap-val-header",   from: { y: 40  } },
        { sel: ".ap-val-card",     from: { y: 55, scale: 0.96 }, stagger: true },
        { sel: ".ap-equipe",       from: { x: -40 } },
        { sel: ".ap-equipe-img",   from: { x: 40  } },
        { sel: ".ap-engagement",   from: { y: 50  } },
        { sel: ".ap-quote",        from: { y: 40, scale: 0.97 } },
        { sel: ".ap-cta",         from: { y: 30  } },
      ];
      els.forEach(({ sel, from, stagger }) => {
        const targets = gsap.utils.toArray<HTMLElement>(sel);
        if (stagger) {
          gsap.fromTo(targets, { opacity: 0, ...from },
            { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.65, ease: "back.out(1.1)", stagger: 0.1,
              scrollTrigger: { trigger: targets[0], start: "top 87%" } });
        } else {
          targets.forEach(el => gsap.fromTo(el, { opacity: 0, ...from },
            { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.75, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 87%" } }));
        }
      });
    });
    return () => ctx.revert();
  }, [lang]);

  return (
    <div style={{ backgroundColor: "#FBF7F2", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative overflow-hidden flex flex-col justify-end"
        style={{
          minHeight: "52vh",
          paddingTop: 120,
          paddingBottom: 72,
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
          <source src="/video/IMADAGHNE_about.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(160deg, rgba(82,51,30,0.78) 0%, rgba(14,61,28,0.65) 50%, rgba(26,15,8,0.72) 100%)",
          zIndex: 1,
        }} />

        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          zIndex: 2,
        }} />

        <div className="relative z-10 max-w-5xl">
          {/* Breadcrumb */}
          <div className="ap-hero-line flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
            <Link href="/" className="text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-100 opacity-50"
              style={{ color: "#FBF7F2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("nav.home")}
            </Link>
            <span style={{ color: "rgba(251,247,242,0.3)" }}>/</span>
            <span className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(251,247,242,0.85)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("nav.about")}
            </span>
          </div>

          <h1 className="ap-hero-line font-bold leading-none mb-6" style={{
            fontFamily: "'Playfair Display', serif",
            color: "#FBF7F2",
            fontSize: "clamp(36px,6vw,80px)",
            letterSpacing: "-0.02em",
            opacity: 0,
          }}>
            {t("aboutPage.heroTitle1")}<br />
            <span style={{ color: "#A8D96B", fontStyle: "italic" }}>{t("aboutPage.heroTitle2")}</span>
          </h1>

          <p className="ap-hero-line max-w-2xl text-base md:text-lg leading-relaxed" style={{
            color: "rgba(251,247,242,0.72)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            opacity: 0,
          }}>
            {t("aboutPage.heroSub")}
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0, zIndex: 10 }}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 90 }}>
            <path d="M0,60 C480,100 960,20 1440,60 L1440,90 L0,90 Z" fill="#FBF7F2" />
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          HISTOIRE
      ══════════════════════════════════════════ */}
      <section style={{ padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)", backgroundColor: "#FBF7F2" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image histoire */}
          <div className="ap-img relative rounded-3xl overflow-hidden" style={{
            height: "clamp(280px,40vw,460px)",
            opacity: 0,
          }}>
            <Image
              src="/images/histoire.png"
              alt="Histoire de la Coopérative Imadaghne"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 flex" style={{ zIndex: 1 }}>
              {["#167033","#529627","#895F37","#52331E"].map(c => (
                <div key={c} style={{ flex: 1, backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="ap-histoire" style={{ opacity: 0 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,42px)",
              fontWeight: 700, color: "#1A0F08", letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2 }}>
              {t("aboutPage.histTitle1")}<span style={{ color: "#895F37", fontStyle: "italic" }}>{t("aboutPage.histTitle2")}</span>
            </h2>
            <p style={{ color: "#6B5744", fontSize: 15, lineHeight: 1.8,
              fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 16 }}>
              {t("aboutPage.histP1")}
            </p>
            <p style={{ color: "#6B5744", fontSize: 15, lineHeight: 1.8,
              fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("aboutPage.histP2_1")}<strong style={{ color: "#52331E" }}>{t("aboutPage.histP2_2")}</strong>{t("aboutPage.histP2_3")}
            </p>
            {/* Accent */}
            <div className="flex items-center gap-2 mt-8">
              {["#167033","#529627","#895F37","#52331E"].map(c => (
                <div key={c} style={{ flex: 1, height: 3, borderRadius: 99, backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MISSION
      ══════════════════════════════════════════ */}
      <section style={{ padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)", backgroundColor: "#F3EDE3" }}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="ap-mission text-center mb-16" style={{ opacity: 0 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,42px)",
              fontWeight: 700, color: "#1A0F08", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.2 }}>
              {t("aboutPage.missionTitle1")}<span style={{ color: "#167033" }}>{t("aboutPage.missionTitle2")}</span>
            </h2>
            <p style={{ color: "#6B5744", fontSize: 16, lineHeight: 1.85, maxWidth: 560, margin: "0 auto",
              fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("aboutPage.missionSub")}
            </p>
          </div>

          {/* 3 Cards */}
          {((t("aboutPage.missionCards") as any[]) || []).map((card, i) => {
            const videos = [
              "/video/mission/PRODUIT NATUREL.mp4",
              "/video/mission/PATRIMOINE VIVANT.mp4",
              "/video/mission/MODÈLE COOPÉRATIF.mp4"
            ];
            const accents = ["#167033", "#895F37", "#529627"];
            const borders = ["rgba(22,112,51,0.15)", "rgba(137,95,55,0.15)", "rgba(82,150,39,0.15)"];
            const accent = accents[i];
            const border = borders[i];
            const video = videos[i];
            return (
            <div
              key={i}
              className="ap-mission-card flex flex-col lg:flex-row rounded-3xl overflow-hidden mb-8 last:mb-0"
              style={{
                backgroundColor: "#fff",
                border: `1px solid ${card.border}`,
                boxShadow: "0 4px 24px rgba(26,15,8,0.06)",
                opacity: 0,
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 24px 56px rgba(26,15,8,0.12)`;
                el.style.borderColor = accent;
                const valEl = el.querySelector<HTMLElement>(".card-val");
                if (valEl) valEl.style.transform = "scale(1.15)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 24px rgba(26,15,8,0.06)";
                el.style.borderColor = border;
                const valEl = el.querySelector<HTMLElement>(".card-val");
                if (valEl) valEl.style.transform = "scale(1)";
              }}
            >
              {/* Visual side — video */}
              <div
                className="relative flex-shrink-0 overflow-hidden w-full lg:w-[clamp(160px,22vw,260px)] border-b lg:border-b-0 lg:border-r"
                style={{
                  minHeight: "clamp(220px,28vw,280px)",
                  borderColor: border,
                }}
              >
                <video
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={video} type="video/mp4" />
                </video>
                {/* Dark overlay */}
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(160deg, ${accent}99 0%, rgba(26,15,8,0.55) 100%)`,
                }} />
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-center p-8 flex-1">
                {/* Tag */}
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ width: 28, height: 2, backgroundColor: accent, borderRadius: 99 }} />
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
                    color: accent, fontFamily: "'Plus Jakarta Sans', sans-serif",
                    textTransform: "uppercase" as const,
                  }}>
                    {card.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(20px,2.5vw,28px)",
                  fontWeight: 700, color: "#1A0F08",
                  marginBottom: 12, lineHeight: 1.2,
                }}>
                  {card.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: "#6B5744", fontSize: 14.5, lineHeight: 1.8,
                  fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 16,
                  maxWidth: 540,
                }}>
                  {card.desc}
                </p>

                {/* Points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {card.points?.map((pt: string) => (
                    <div key={pt} className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: accent }}>
                        <svg viewBox="0 0 12 10" width="10" height="10" fill="none">
                          <path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: 13, color: "#1A0F08",
                        fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALEURS
      ══════════════════════════════════════════ */}
      <section style={{ padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)", backgroundColor: "#FBF7F2" }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="ap-val-header text-center mb-14" style={{ opacity: 0 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase" as const, color: "#167033",
              fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12,
            }}>
              {t("aboutPage.valBadge")}
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,42px)",
              fontWeight: 700, color: "#1A0F08", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {t("aboutPage.valTitle1")}<span style={{ color: "#895F37", fontStyle: "italic" }}>{t("aboutPage.valTitle2")}</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0" style={{
            border: "1px solid rgba(26,15,8,0.1)", borderRadius: 16, overflow: "hidden",
          }}>
            {valeurs.map((v, i) => (
              <div
                key={v.title}
                className="ap-val-card flex flex-col p-8"
                style={{
                  backgroundColor: "#FBF7F2",
                  borderRight: i < valeurs.length - 1 ? "1px solid rgba(26,15,8,0.1)" : "none",
                  opacity: 0,
                  transition: "background 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#fff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#FBF7F2";
                }}
              >
                {/* Big faded number */}
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 64, fontWeight: 800,
                  color: "rgba(26,15,8,0.07)",
                  lineHeight: 1, marginBottom: 24,
                  display: "block",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 17, fontWeight: 700,
                  color: "#1A0F08", marginBottom: 12, lineHeight: 1.3,
                }}>
                  {v.title}
                </h3>

                {/* Text */}
                <p style={{
                  color: "#6B5744", fontSize: 13.5, lineHeight: 1.75,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          ÉQUIPE
      ══════════════════════════════════════════ */}
      <section style={{ padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)", backgroundColor: "#F3EDE3" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="ap-equipe" style={{ opacity: 0 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,42px)",
              fontWeight: 700, color: "#1A0F08", letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2 }}>
              {t("aboutPage.eqTitle1")}<span style={{ color: "#529627", fontStyle: "italic" }}>{t("aboutPage.eqTitle2")}</span>
            </h2>
            <p style={{ color: "#6B5744", fontSize: 15, lineHeight: 1.85,
              fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("aboutPage.eqSub")}
            </p>
            {/* Bullet points */}
            <div className="flex flex-col gap-3 mt-8">
              {((t("aboutPage.eqPoints") as string[]) || []).map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#529627", flexShrink: 0 }} />
                  <span style={{ color: "#1A0F08", fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Coopérative Humaine */}
          <div className="ap-equipe-img relative rounded-3xl overflow-hidden" style={{
            height: "clamp(260px,38vw,420px)",
            opacity: 0,
          }}>
            <Image
              src="/images/Coopérative Humaine.png"
              alt="Coopérative Humaine Imadaghne"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1 flex" style={{ zIndex: 1 }}>
              {["#529627","#167033","#895F37","#52331E"].map(c => (
                <div key={c} style={{ flex: 1, backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENGAGEMENT
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{
        background: "linear-gradient(150deg, #52331E 0%, #3A2414 30%, #0E3D1C 65%, #167033 100%)",
        padding: "clamp(60px,9vw,100px) clamp(20px,6vw,80px)",
      }}>
        <div className="absolute top-[-15%] right-[-5%] w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(82,150,39,0.18) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-15%] left-[-5%] w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(137,95,55,0.2) 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="ap-engagement" style={{ opacity: 0 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,42px)",
              fontWeight: 700, color: "#FBF7F2", letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.2 }}>
              {t("aboutPage.engTitle1")}<span style={{ color: "#A8D96B", fontStyle: "italic" }}>{t("aboutPage.engTitle2")}</span>
            </h2>
            <p style={{ color: "rgba(251,247,242,0.72)", fontSize: 16, lineHeight: 1.85, maxWidth: 620,
              margin: "0 auto 48px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("aboutPage.engSub")}
            </p>
          </div>

          {/* Quote impact */}
          <div className="ap-quote relative mx-auto px-8 py-8 rounded-3xl" style={{
            maxWidth: 680,
            backgroundColor: "rgba(251,247,242,0.07)",
            border: "1px solid rgba(251,247,242,0.15)",
            backdropFilter: "blur(12px)",
            opacity: 0,
          }}>
            <span style={{ position: "absolute", top: -16, left: 32, fontSize: 60,
              color: "#529627", fontFamily: "'Playfair Display', serif", lineHeight: 1, opacity: 0.6 }}>
              "
            </span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(17px,2vw,22px)",
              fontStyle: "italic", color: "#FBF7F2", lineHeight: 1.65, margin: 0 }}>
              {t("aboutPage.engQuote")}
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              {["#167033","#529627","#895F37","#52331E"].map(c => (
                <div key={c} style={{ width: 24, height: 3, borderRadius: 99, backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="ap-cta flex flex-wrap items-center justify-center gap-4 mt-12" style={{ opacity: 0 }}>
            <Link href="/"
              className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-300"
              style={{ backgroundColor: "#FBF7F2", color: "#167033",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                const arrow = e.currentTarget.querySelector<HTMLElement>(".btn-arrow");
                if (arrow) arrow.style.transform = "translateX(-4px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                const arrow = e.currentTarget.querySelector<HTMLElement>(".btn-arrow");
                if (arrow) arrow.style.transform = "translateX(0)";
              }}
            >
              <span
                className="btn-arrow"
                style={{ display: "inline-block", transition: "transform 0.3s ease" }}
              >←</span>
              <span>{t("aboutPage.ctaBack")}</span>
            </Link>
            <a
              href={`https://wa.me/212624993274?text=${encodeURIComponent("Bonjour ! Je souhaite en savoir plus sur la Coopérative Imadaghne.")}`}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-300 btn-wa-wrap"
              style={{ backgroundColor: "#25D366", color: "#FBF7F2",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                const icon = e.currentTarget.querySelector<HTMLElement>(".btn-wa-icon");
                if (icon) icon.style.transform = "rotate(15deg) scale(1.2)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                const icon = e.currentTarget.querySelector<HTMLElement>(".btn-wa-icon");
                if (icon) icon.style.transform = "rotate(0deg) scale(1)";
              }}
            >
              <svg className="btn-wa-icon" viewBox="0 0 448 512" width="16" height="16" fill="currentColor"
                style={{ transition: "transform 0.3s ease", flexShrink: 0 }}>
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              <span>{t("aboutPage.ctaContact")}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
