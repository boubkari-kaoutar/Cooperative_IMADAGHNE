"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: "🌿",
    title: "100% Naturel",
    desc: "Aucun additif chimique, aucun conservateur. Nos produits sont purs, tels que la nature les offre.",
  },
  {
    icon: "🏡",
    title: "Production Locale",
    desc: "De nos terres à votre table : chaque produit est cultivé, récolté et transformé au Maroc.",
  },
  {
    icon: "🌱",
    title: "Éco-Responsable",
    desc: "Nous respectons la biodiversité locale et cultivons selon des pratiques qui préservent l'écosystème.",
  },
  {
    icon: "🤝",
    title: "Coopératif",
    desc: "Chaque achat soutient directement des familles rurales marocaines et leur autonomie économique.",
  },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".why-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="pourquoi"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0E3D1C 0%, #167033 50%, #0E3D1C 100%)",
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(82, 150, 39, 0.15) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(137, 95, 55, 0.12) 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.07,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <div
            className="section-tag mb-5 mx-auto"
            style={{
              backgroundColor: "rgba(251, 247, 242, 0.12)",
              color: "rgba(251, 247, 242, 0.85)",
              border: "1px solid rgba(251, 247, 242, 0.2)",
            }}
          >
            <span>⭐</span>
            <span>Pourquoi Nous</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FBF7F2",
            }}
          >
            Pourquoi choisir{" "}
            <em style={{ color: "#A8D66E" }}>Imadaghne ?</em>
          </h2>
          <p
            className="max-w-xl mx-auto text-base md:text-lg"
            style={{ color: "rgba(251, 247, 242, 0.65)" }}
          >
            Notre engagement va au-delà de la qualité — c&apos;est une promesse
            de nature, de tradition et d&apos;authenticité.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((r) => (
            <div
              key={r.title}
              className="why-card p-8 rounded-3xl flex flex-col items-start gap-4 transition-transform duration-300 hover:-translate-y-2"
              style={{
                backgroundColor: "rgba(251, 247, 242, 0.06)",
                border: "1px solid rgba(251, 247, 242, 0.12)",
                backdropFilter: "blur(8px)",
                opacity: 0,
              }}
            >
              <div
                className="text-4xl w-16 h-16 flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: "rgba(251, 247, 242, 0.1)" }}
              >
                {r.icon}
              </div>
              <div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#FBF7F2",
                  }}
                >
                  {r.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(251, 247, 242, 0.65)" }}
                >
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "100%", label: "Naturel" },
            { value: "6+", label: "Produits" },
            { value: "∞", label: "Amour du Terroir" },
            { value: "🌍", label: "Made in Morocco" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#A8D66E",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm tracking-wide"
                style={{ color: "rgba(251, 247, 242, 0.55)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
