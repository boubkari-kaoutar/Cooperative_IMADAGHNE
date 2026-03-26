"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fr } from "@/dictionaries/fr";
import { ar } from "@/dictionaries/ar";

type Language = "fr" | "ar";

interface LanguageContextType {
  lang: Language;
  t: (key: string) => any;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  t: () => "",
  toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");

  useEffect(() => {
    // Load from local storage
    const stored = localStorage.getItem("lang") as Language;
    if (stored === "ar" || stored === "fr") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    // Sync to local storage and document HTML tag
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "fr" ? "ar" : "fr"));
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc: any, part: string) => acc && acc[part], obj);
  };

  const t = (key: string): any => {
    const dict = lang === "ar" ? ar : fr;
    const val = getNestedValue(dict, key);
    return val !== undefined ? val : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
