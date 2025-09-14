import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext.js";
import translations from "../data/translations.js";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem('roundLanguage');
    return stored ? JSON.parse(stored) : "english";
  });

  useEffect(() => {
    localStorage.setItem("roundLanguage", JSON.stringify(language));
  }, [language]);

  const langKey = language === "english" ? "en" : language === "bosnian" ? "bs" : "de";
  const t = translations[langKey];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}