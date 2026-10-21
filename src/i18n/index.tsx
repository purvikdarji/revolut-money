// src/i18n/index.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { en } from "./en";
import { gu } from "./gu";

export type Locale = "en" | "gu";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

const dictionaries: Record<Locale, typeof en> = {
  en,
  gu, // gu must be structurally identical to en
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
  toggleLocale: () => {},
});

// Helper for pseudo-locale
const pseudoTransform = (text: string): string => {
  if (!text) return text;
  const accentMap: Record<string, string> = {
    a: 'à', c: 'ç', e: 'é', i: 'î', n: 'ñ', o: 'ö', u: 'ü', y: 'ÿ',
    A: 'À', C: 'Ç', E: 'É', I: 'Î', N: 'Ñ', O: 'Ö', U: 'Ü', Y: 'Ÿ'
  };
  const accented = text.replace(/[aceinouyACEINOUY]/g, (char) => accentMap[char] || char);
  const extraLen = Math.ceil(text.length * 0.4);
  const padding = Array(extraLen).fill('~').join('');
  return `[${accented} ${padding}]`;
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [isPseudo, setIsPseudo] = useState(false);

  // Run once on mount
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang") as Locale | "pseudo";
    
    let targetLocale = locale;
    
    if (urlLang === "pseudo") {
      setIsPseudo(true);
    } else if (urlLang === "en" || urlLang === "gu") {
      targetLocale = urlLang;
    } else {
      const saved = localStorage.getItem("app_locale") as Locale;
      if (saved === "en" || saved === "gu") {
        targetLocale = saved;
      }
    }
    
    setLocale(targetLocale);
    document.documentElement.lang = targetLocale;
    
    if (targetLocale !== locale) {
      try {
        localStorage.setItem("app_locale", targetLocale);
      } catch(e) {}
    }
  }, []);

  const handleSetLocale = useCallback((l: Locale) => {
    setLocale(l);
    try {
      localStorage.setItem("app_locale", l);
    } catch(e) {}
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = dictionaries[locale];
      const parts = key.split(".");
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let node: any = dict;
      let found = true;
      let isEmpty = false;

      for (const part of parts) {
        if (node && typeof node === "object" && part in node) {
          node = node[part];
        } else {
          found = false;
          break;
        }
      }

      if (found && typeof node === "string" && node.trim() === "") {
         isEmpty = true;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = en;
      for (const p of parts) {
        fallback = fallback?.[p];
      }
      const fallbackStr = typeof fallback === "string" ? fallback : key;

      if (!found || isEmpty) {
        // @ts-ignore
        declare const process: any;
        const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
        const isProd = typeof process !== 'undefined' && process.env.NODE_ENV === 'production';
        if (!isProd) {
          console.warn(`[i18n missing] ${key} (${locale})`);
        }
        if (isTest) {
          throw new Error(`[i18n missing] ${key} (${locale}) is missing or empty`);
        }
        node = fallbackStr;
      }

      let result = typeof node === "string" ? node : fallbackStr;
      
      if (isPseudo) {
        result = pseudoTransform(result);
      }
      return result;
    },
    [locale, isPseudo]
  );

  const toggleLocale = useCallback(() => {
    handleSetLocale(locale === "en" ? "gu" : "en");
  }, [locale, handleSetLocale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}

/** Convenience hook: just the t() function */
export function useT() {
  return useContext(I18nContext).t;
}

/** Alias for compatibility */
export const useTranslation = useI18n;
