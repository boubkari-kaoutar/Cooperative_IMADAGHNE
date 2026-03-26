"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import SlideToContact from "@/components/SlideToContact";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage();

  const sections = [
    { label: t("nav.home"),       href: "/",         num: "01", external: true  },
    { label: t("nav.about"),      href: "/about",    num: "02", external: true  },
    { label: t("nav.products"),   href: "/produits", num: "03", external: true  },
    { label: t("nav.whyUs"),      href: "/pourquoi", num: "04", external: true  },
    { label: t("nav.gallery"),    href: "/galerie",  num: "05", external: true  },
    { label: t("nav.contact"),    href: "/contact",  num: "06", external: true },
  ];

  const navRef        = useRef<HTMLElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const overlayBgRef  = useRef<HTMLDivElement>(null);
  const linksRef      = useRef<HTMLDivElement>(null);
  const footerRef     = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── navbar entrance ── */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.8 }
    );
  }, []);

  /* ── body class for menu state ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  /* ── overlay open / close ── */
  useEffect(() => {
    const overlay = overlayRef.current;
    const bg      = overlayBgRef.current;
    const links   = linksRef.current;
    const footer  = footerRef.current;
    if (!overlay || !bg || !links || !footer) return;

    if (menuOpen) {
      // Show overlay
      overlay.style.pointerEvents = "auto";
      const tl = gsap.timeline();
      tl.fromTo(bg,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.65, ease: "power4.inOut" }
      )
      .fromTo(
        links.querySelectorAll(".menu-item"),
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.55, ease: "power3.out", stagger: 0.07 },
        "-=0.25"
      )
      .fromTo(footer,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );
    } else {
      // Hide overlay
      const tl = gsap.timeline({ onComplete: () => { overlay.style.pointerEvents = "none"; } });
      tl.to(links.querySelectorAll(".menu-item"),
        { opacity: 0, y: -30, duration: 0.3, ease: "power2.in", stagger: 0.04 }
      )
      .to(bg,
        { scaleY: 0, transformOrigin: "bottom", duration: 0.55, ease: "power4.inOut" },
        "-=0.1"
      );
    }
  }, [menuOpen]);

  const navTo = (href: string) => {
    const wasOpen = menuOpen;
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, wasOpen ? 700 : 0);
  };

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[300] transition-all duration-500"
        style={{
          opacity: 0, // GSAP will animate in
          backgroundColor: scrolled ? "rgba(251,247,242,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(82,51,30,0.1)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">

          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9">
              <Image
                src={scrolled ? "/logo.png" : "/logo-blanc.png"}
                alt="Imadaghne"
                fill
                className="object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <span
              className="text-base font-bold tracking-wide transition-colors duration-300 hidden sm:block"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: scrolled ? "#167033" : "#FBF7F2",
              }}
            >
              Imadaghne
            </span>
          </Link>

          {/* CENTER — pill group */}
          <div className="hidden md:flex items-center gap-2">

            {/* Slide to contact */}
            <SlideToContact
              scrolled={scrolled}
              onComplete={() => {
                setMenuOpen(false);
                window.location.href = "/contact";
              }}
            />

            {/* Services + Produits — single pill container */}
            <div
              className="flex items-center"
              style={{
                backgroundColor: scrolled ? "rgba(22,112,51,0.08)" : "rgba(251,247,242,0.15)",
                border: scrolled ? "1px solid rgba(22,112,51,0.18)" : "1px solid rgba(251,247,242,0.22)",
                borderRadius: "999px",
                backdropFilter: "blur(8px)",
                overflow: "hidden",
              }}
            >
              <Link
                href="/about"
                style={{
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: scrolled ? "#167033" : "#FBF7F2",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  display: "block",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {t("nav.about")}
              </Link>

              {/* Divider */}
              <span style={{
                width: 1,
                height: 16,
                backgroundColor: scrolled ? "rgba(22,112,51,0.25)" : "rgba(251,247,242,0.3)",
                flexShrink: 0,
              }} />

              <Link
                href="/produits"
                style={{
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: scrolled ? "#167033" : "#FBF7F2",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  display: "block",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {t("nav.products")}
              </Link>
            </div>
          </div>

          {/* RIGHT — Lang Toggle + Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold px-3 py-1.5 rounded-full transition-colors flex-shrink-0"
              style={{
                backgroundColor: scrolled ? "rgba(22,112,51,0.1)" : "rgba(251,247,242,0.15)",
                color: scrolled ? "#167033" : "#FBF7F2",
                border: scrolled ? "1px solid rgba(22,112,51,0.2)" : "1px solid rgba(251,247,242,0.2)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              {lang === "fr" ? "ع" : "FR"}
            </button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 transition-all duration-300 group"
            style={{
              color: menuOpen ? "#FBF7F2" : (scrolled ? "#1A0F08" : "#FBF7F2"),
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              zIndex: 300,
              position: "relative",
              transition: "color 0.3s",
            }}
            aria-label="Menu"
          >
            <span>{menuOpen ? "X" : t("nav.menu")}</span>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-base font-bold"
              style={{
                backgroundColor: menuOpen
                  ? "rgba(251,247,242,0.2)"
                  : (scrolled ? "#167033" : "rgba(251,247,242,0.2)"),
                color: "#FBF7F2",
                transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
              }}
            >
              +
            </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── FULLSCREEN MENU OVERLAY ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200]"
        style={{ pointerEvents: "none" }}
      >
        {/* Animated background */}
        <div
          ref={overlayBgRef}
          className="absolute inset-0"
          style={{
            backgroundColor: "#0E3D1C",
            transformOrigin: "top",
            transform: "scaleY(0)",
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #529627 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #895F37 0%, transparent 70%)" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-8 md:px-16 lg:px-24 pt-24 pb-8 overflow-y-auto">

          {/* Section links */}
          <div ref={linksRef} className="flex flex-col flex-1">
            {sections.map((s) => (
              <button
                key={s.href}
                onClick={() => s.external
                  ? (setMenuOpen(false), window.location.href = s.href)
                  : navTo(s.href)
                }
                className="menu-item group flex items-center gap-5 border-b w-full text-left"
                style={{
                  borderColor: "rgba(251,247,242,0.08)",
                  opacity: 0,
                  padding: "clamp(8px, 1.4vh, 18px) 0",
                }}
              >
                <span
                  className="text-xs font-mono w-6 flex-shrink-0"
                  style={{ color: "rgba(251,247,242,0.35)" }}
                >
                  {s.num}
                </span>
                <span
                  className="font-bold group-hover:translate-x-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#FBF7F2",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    fontSize: "clamp(28px, 5vh, 62px)",
                    transition: "color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#529627")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#FBF7F2")}
                >
                  {s.label}
                </span>
                <svg
                  className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="#529627" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>
            ))}
          </div>

          {/* Footer info */}
          <div
            ref={footerRef}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mt-6 pt-6 flex-shrink-0"
            style={{
              opacity: 0,
              borderTop: "1px solid rgba(251,247,242,0.08)",
            }}
          >
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-2"
                style={{ color: "rgba(251,247,242,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Nous contacter
              </p>
              <a
                href="tel:+212624993274"
                className="text-xl font-semibold transition-colors hover:text-leaf"
                style={{ color: "#FBF7F2", fontFamily: "'Playfair Display', serif" }}
              >
                +212 624 993 274
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/212624993274?text=${encodeURIComponent("Bonjour ! Je souhaite commander des produits Imadaghne.")}`}
                target="_blank" rel="noreferrer"
                className="wa-menu-btn flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "#25D366", color: "#FBF7F2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                onMouseEnter={() => {
                  const icon = document.querySelector(".wa-menu-icon") as HTMLElement;
                  if (!icon) return;
                  gsap.killTweensOf(icon);
                  gsap.to(icon, { rotate: -20, duration: 0.12, ease: "power2.out", onComplete: () => {
                    gsap.to(icon, { rotate: 20, duration: 0.12, ease: "power2.inOut", onComplete: () => {
                      gsap.to(icon, { rotate: -10, duration: 0.1, ease: "power2.inOut", onComplete: () => {
                        gsap.to(icon, { rotate: 0, duration: 0.15, ease: "elastic.out(1,0.5)" });
                      }});
                    }});
                  }});
                }}
              >
                <svg className="wa-menu-icon" viewBox="0 0 448 512" width="17" height="17" fill="currentColor" style={{ transformOrigin: "center", display: "block" }}>
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                WhatsApp
              </a>
              <p className="text-xs"
                style={{ color: "rgba(251,247,242,0.3)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Authenticité · Nature · Confiance
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
