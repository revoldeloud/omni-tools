import { useEffect, useState } from "react";
import { getUiLanguage, setUiLanguage, startUiTranslation, type UiLanguage } from "../i18n/ui-language";

export const LanguageSelector: React.FC<{ placement?: "corner" | "inline" }> = ({ placement = "corner" }) => {
  const [language, setLanguage] = useState<UiLanguage>(getUiLanguage);

  useEffect(() => startUiTranslation(), []);
  useEffect(() => {
    const syncLanguage = (event: Event) => setLanguage((event as CustomEvent<UiLanguage>).detail);
    window.addEventListener("utitools-language-change", syncLanguage);
    return () => window.removeEventListener("utitools-language-change", syncLanguage);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value === "en" ? "en" : "pt-BR";
    setUiLanguage(next);
    setLanguage(next);
  };

  return (
    <label
      data-language-selector
      className={`${placement === "corner" ? "fixed right-3 top-3 z-[100] shadow-lg sm:right-4 sm:top-4" : "relative shrink-0"} flex items-center gap-1.5 rounded-lg border border-border bg-bg-1/95 px-2.5 py-1.5 text-xs text-fg backdrop-blur`}
    >
      <span aria-hidden="true">🌐</span>
      <span className="sr-only">Idioma / Language</span>
      <select
        aria-label="Idioma / Language"
        value={language}
        onChange={handleChange}
        className="cursor-pointer bg-transparent font-medium text-inherit outline-none"
      >
        <option value="pt-BR">Português</option>
        <option value="en">English</option>
      </select>
    </label>
  );
};
