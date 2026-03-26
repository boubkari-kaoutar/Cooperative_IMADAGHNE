"use client";

import Image from "next/image";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const whatsappMsg = encodeURIComponent(
  "Bonjour ! Je souhaite commander des produits de la Coopérative Imadaghne."
);

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "#accueil" },
    { label: t("nav.about"), href: "#apropos" },
    { label: t("nav.products"), href: "#produits" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const rawBS = (t("products.bestSellers") as unknown as any[]) || [];
  const products = [
    rawBS[0]?.name || "Huile d'Argan Pure",
    rawBS[1]?.name || "Miel Naturel",
    rawBS[2]?.name || "Amlou",
    "Plantes Médicinales",
    "Savon Artisanal",
    "Eau de Rose",
  ];

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0E3D1C" }}
    >
      {/* Top grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.06,
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(82,150,39,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src="/logo-blanc.png"
                  alt="Imadaghne"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
              </div>
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#FBF7F2",
                }}
              >
                Imadaghne
              </span>
            </div>

            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(251,247,242,0.6)" }}
            >
              {t("footer.desc")}
            </p>

            {/* Tagline */}
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: "rgba(251,247,242,0.35)" }}
            >
              {t("footer.tagline")}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/212624993274?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "rgba(37, 211, 102, 0.15)",
                  border: "1px solid rgba(37, 211, 102, 0.25)",
                }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} color="#25D366" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "rgba(251,247,242,0.06)",
                  border: "1px solid rgba(251,247,242,0.1)",
                }}
                aria-label="Facebook"
              >
                <Facebook size={18} color="rgba(251,247,242,0.7)" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "rgba(251,247,242,0.06)",
                  border: "1px solid rgba(251,247,242,0.1)",
                }}
                aria-label="Instagram"
              >
                <Instagram size={18} color="rgba(251,247,242,0.7)" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-sm font-semibold tracking-wider uppercase mb-5"
              style={{ color: "rgba(251,247,242,0.4)" }}
            >
              {t("footer.nav")}
            </h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-left transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(251,247,242,0.65)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              className="text-sm font-semibold tracking-wider uppercase mb-5"
              style={{ color: "rgba(251,247,242,0.4)" }}
            >
              {t("footer.products")}
            </h4>
            <div className="flex flex-col gap-3">
              {products.map((p) => (
                <button
                  key={p}
                  onClick={() => handleNavClick("#produits")}
                  className="text-sm text-left transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(251,247,242,0.65)" }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: "rgba(251,247,242,0.35)" }}
          >
            {t("footer.rights")}
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(251,247,242,0.25)" }}
          >
            {t("footer.made")}
          </p>
        </div>
      </div>
    </footer>
  );
}
