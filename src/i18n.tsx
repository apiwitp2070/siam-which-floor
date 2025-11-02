import { createContext, useContext, useMemo, useState } from "react";
import type { Locale, LocalizedText } from "./data/siamRoutes";

interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: (current: Locale) => void;
  t: (value: LocalizedText) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export interface I18nProviderProps {
  defaultLocale?: Locale;
  children: React.ReactNode;
}

export function I18nProvider({
  defaultLocale = "en",
  children,
}: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  function toggleLocale(current: Locale) {
    setLocale(current === "en" ? "th" : "en");
  }

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t: (value: LocalizedText) => value[locale] ?? value.en,
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
};
