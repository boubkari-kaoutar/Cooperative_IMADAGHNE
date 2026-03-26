"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

import { useLanguage } from "@/context/LanguageContext";

const DEFAULT_BORDER_COLOR = "rgba(137, 95, 55, 0.2)";
const IS: React.CSSProperties = {
  width: "100%", background: "rgba(251,247,242,0.6)",
  borderWidth: "1px", borderStyle: "solid", borderColor: DEFAULT_BORDER_COLOR,
  color: "#2B2B2B",
  padding: "16px 20px", fontSize: 15, outline: "none",
  borderRadius: "12px", appearance: "none", fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: "all 0.3s ease",
};

export default function ContactSection() {
  const { t } = useLanguage();
  
  const l = {
    badge: t("contact.badge"),
    formTitle: t("contact.formTitle"),
    name: t("contact.name"), 
    email: t("contact.email"),
    phone: t("contact.phone"), 
    service: t("contact.service"),
    serviceDefault: t("contact.serviceDefault"),
    msg: t("contact.msg"),
    msgHint: t("contact.msgHint"),
    submit: t("contact.submit"), 
    sending: t("contact.sending"),
    success: t("contact.success"),
    error: t("contact.error"),
    faqTitle: t("contact.faqTitle"),
    services: (t("contact.services") as unknown as string[]) || ["Commande en gros", "Service client", "Partenariat", "Autre"],
    faqs: (t("contact.faqs") as unknown as { q: string, a: string }[]) || []
  };

  const infoObj = (t("contact.info") as unknown as any) || {};
  const INFO_CARDS = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z" />
        </svg>
      ),
      label: infoObj.call || "Appelez-nous",
      value: "+212 624 993 274",
      sub: infoObj.callSub || "Lun – Sam · 9h – 18h",
      link: "tel:+212624993274",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: infoObj.email || "Écrivez-nous",
      value: "contact@imadaghne.ma",
      sub: infoObj.emailSub || "Réponse sous 24h garantie",
      link: "mailto:contact@imadaghne.ma",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      label: infoObj.wa || "WhatsApp",
      value: "+212 624 993 274",
      sub: infoObj.waSub || "Réponse instantanée",
      link: "https://wa.me/212624993274",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: infoObj.coop || "Notre Coopérative",
      value: infoObj.coopValue || "Maroc",
      sub: infoObj.coopSub || "Produits 100% naturels",
      link: null,
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef  = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLFormElement>(null);
  const faqRef    = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const field = (k: keyof typeof form) => (v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    if(errors[k as keyof typeof errors]) setErrors(p => ({...p, [k]: undefined}));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStyle = (fieldObj: "name" | "email" | "message" | "other"): any => ({
    ...IS,
    borderColor: (fieldObj !== "other" && errors[fieldObj]) ? "#E02424" : DEFAULT_BORDER_COLOR,
  });

  const focus = (e: React.FocusEvent<Element>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#167033";
    (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
  };
  const blur = (e: React.FocusEvent<Element>, fieldName: "name" | "email" | "message" | "other" = "other") => {
    if (fieldName !== "other" && errors[fieldName]) {
      (e.currentTarget as HTMLElement).style.borderColor = "#E02424";
    } else {
      (e.currentTarget as HTMLElement).style.borderColor = DEFAULT_BORDER_COLOR;
    }
    (e.currentTarget as HTMLElement).style.background = "rgba(251,247,242,0.6)";
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Le nom complet est requis.";
    if (!form.email.trim()) {
      newErrors.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "L'adresse email n'est pas valide.";
    }
    if (!form.message.trim()) newErrors.message = "Le message est requis.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });

      // Info cards
      gsap.fromTo(".info-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%" } });

      // Form
      const fields = formRef.current?.querySelectorAll(".ff");
      if (fields) gsap.fromTo(fields,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" } });

      // FAQ
      gsap.fromTo(".faq-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: faqRef.current, start: "top 82%" } });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} style={{ background: "#FBF7F2", color: "#2B2B2B", fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="py-24">
      
      {/* ══ Header ═════════════════════════════════════ */}
      <div ref={headerRef} className="text-center mb-16 px-6" style={{ opacity: 0 }}>
        <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1A0F08",
            }}
          >
            {t("contact.title1")}
            <em style={{ color: "#167033" }}>{t("contact.title2")}</em>
        </h2>
        <p
            className="max-w-xl mx-auto text-base md:text-lg"
            style={{ color: "#6B5744" }}
          >
            {t("contact.sub")}
        </p>
      </div>

      {/* ══ INFO CARDS ═════════════════════════════════════ */}
      <div ref={cardsRef} className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {INFO_CARDS.map((card, i) => (
            <div
              key={i}
              className="info-card group relative p-6 md:p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 rounded-2xl"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(137, 95, 55, 0.15)",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)",
                cursor: card.link ? "pointer" : "default",
                opacity: 0,
              }}
              onClick={() => card.link && window.open(card.link, "_blank")}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[rgba(22,112,51,0.05)] text-[#167033] group-hover:bg-[#167033] group-hover:text-white transition-colors duration-300">
                {card.icon}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1 text-[#895F37]">
                  {card.label}
                </div>
                <div className="text-base font-bold text-[#2B2B2B] leading-tight mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {card.value}
                </div>
                <div className="text-sm font-medium opacity-60">
                  {card.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FORM + FAQ ═════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Form (Left) ─────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#529627] block mb-3">
                {t("contact.formBadge") || "Formulaire"}
              </span>
              <h3 className="font-black tracking-tight text-[#0E3D1C]" style={{ fontSize: "clamp(30px, 4vw, 46px)", fontFamily: "'Playfair Display', serif" }}>
                {l.formTitle}
              </h3>
            </div>

            {status === "success" && (
              <div className="flex items-start gap-3 p-5 mb-8 rounded-xl text-sm font-medium"
                style={{ background: "rgba(22,112,51,0.1)", border: "1px solid rgba(22,112,51,0.2)", color: "#167033" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {l.success}
              </div>
            )}

            {status !== "success" && (
              <form ref={formRef} onSubmit={submit} className="flex flex-col gap-5">
                <div className="ff grid grid-cols-1 md:grid-cols-2 gap-5" style={{ opacity: 0 }}>
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#895F37] ml-2">
                      {l.name} <span className="text-[#167033]">*</span>
                    </label>
                    <input type="text" value={form.name} onChange={e => field("name")(e.target.value)}
                      placeholder="Ex: Amine Benali" style={getStyle("name")} onFocus={focus} onBlur={e => blur(e, "name")} />
                    {errors.name && <span className="text-[#E02424] text-xs font-semibold ml-2 -mt-1">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#895F37] ml-2">
                      {l.email} <span className="text-[#167033]">*</span>
                    </label>
                    <input type="email" value={form.email} onChange={e => field("email")(e.target.value)}
                      placeholder="email@exemple.com" style={getStyle("email")} onFocus={focus} onBlur={e => blur(e, "email")} />
                    {errors.email && <span className="text-[#E02424] text-xs font-semibold ml-2 -mt-1">{errors.email}</span>}
                  </div>
                </div>

                <div className="ff grid grid-cols-1 md:grid-cols-2 gap-5" style={{ opacity: 0 }}>
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#895F37] ml-2">
                      {l.phone}
                    </label>
                    <input type="tel" value={form.phone} onChange={e => field("phone")(e.target.value)}
                      placeholder="+212 6 00 00 00 00" style={getStyle("other")} onFocus={focus} onBlur={e => blur(e, "other")} />
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#895F37] ml-2">
                      {l.service}
                    </label>
                    <div className="relative">
                      <select value={form.service} onChange={e => field("service")(e.target.value)}
                        style={{ ...getStyle("other"), paddingRight: 36, cursor: "pointer" }} onFocus={focus} onBlur={e => blur(e, "other")}>
                        <option value="">{l.serviceDefault}</option>
                        {l.services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#895F37" strokeWidth="2.5"
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="ff flex flex-col gap-2 relative" style={{ opacity: 0 }}>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#895F37] ml-2">
                    {l.msg} <span className="text-[#167033]">*</span>
                  </label>
                  <textarea rows={6} value={form.message} onChange={e => field("message")(e.target.value)}
                    placeholder={l.msgHint}
                    style={{ ...getStyle("message"), resize: "vertical", minHeight: 140 }} onFocus={focus} onBlur={e => blur(e, "message")} />
                  {errors.message && <span className="text-[#E02424] text-xs font-semibold ml-2 -mt-1">{errors.message}</span>}
                </div>

                <div className="ff mt-2" style={{ opacity: 0 }}>
                  <button type="submit" disabled={status === "sending"}
                    className="group w-full md:w-auto px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm tracking-wide transition-all"
                    style={{
                      background: status === "sending" ? "rgba(22,112,51,0.6)" : "#167033",
                      color: "#FFFFFF",
                      cursor: status === "sending" ? "wait" : "pointer",
                    }}
                    onMouseEnter={e => { if (status !== "sending") { (e.currentTarget as HTMLElement).style.background = "#0E3D1C"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; } }}
                    onMouseLeave={e => { if (status !== "sending") { (e.currentTarget as HTMLElement).style.background = "#167033"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; } }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                          style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        {l.sending}
                      </>
                    ) : (
                      <>
                        {l.submit}
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300 ease-out flex items-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="mt-4 text-sm font-semibold" style={{ color: "#E02424" }}>
                      {l.error}
                    </p>
                  )}

                  <p className="mt-5 text-xs font-medium opacity-60 leading-relaxed">
                    {t("contact.terms") || "En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour répondre à votre demande."}
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── FAQ (Right) ──────────────────────────────────────── */}
          <div className="lg:col-span-5" ref={faqRef as React.RefObject<HTMLDivElement>}>
            <div className="mb-10">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#529627] block mb-3">
                {t("contact.faqBadge") || "Informations"}
              </span>
              <h3 className="font-black tracking-tight text-[#0E3D1C]" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontFamily: "'Playfair Display', serif" }}>
                {l.faqTitle}
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {l.faqs.map((faq, i) => (
                <div key={i} className="faq-item border transition-colors duration-300 rounded-xl overflow-hidden"
                  style={{ 
                    opacity: 0,
                    background: openFaq === i ? "#FFFFFF" : "rgba(251,247,242,0.4)", 
                    borderColor: openFaq === i ? "rgba(22,112,51,0.3)" : "rgba(137, 95, 55, 0.15)",
                    boxShadow: openFaq === i ? "0 4px 20px -5px rgba(0,0,0,0.05)" : "none"
                  }}>
                  <button
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm md:text-base font-bold text-[#0E3D1C] leading-snug">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ 
                        background: openFaq === i ? "rgba(22,112,51,0.1)" : "rgba(137, 95, 55, 0.05)",
                        color: openFaq === i ? "#167033" : "#895F37", 
                        transform: openFaq === i ? "rotate(180deg)" : "none" 
                      }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-6">
                      <p className="text-sm font-medium leading-relaxed opacity-70">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
