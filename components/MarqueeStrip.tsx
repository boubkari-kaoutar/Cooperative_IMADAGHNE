"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function MarqueeStrip() {
  const { t } = useLanguage();
  const rawItems = (t("marquee") as unknown as string[]) || [];
  const items = Array.isArray(rawItems) ? rawItems : [];
  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-5 select-none"
      style={{ backgroundColor: "#167033" }}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #167033 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(-90deg, #167033 0%, transparent 100%)",
        }}
      />

      {/* Track */}
      <div
        className="marquee-track flex items-center gap-0 whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="text-sm font-semibold tracking-widest uppercase px-8"
              style={{
                color: "rgba(251, 247, 242, 0.9)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "rgba(251, 247, 242, 0.3)",
                fontSize: "0.5rem",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
