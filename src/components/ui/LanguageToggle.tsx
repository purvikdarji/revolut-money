// src/components/ui/LanguageToggle.tsx
import React from "react";
import { useI18n } from "../../i18n";
import { cn } from "../../lib/cn";

export interface LanguageToggleProps {
  onDark?: boolean;
  className?: string;
}

export function LanguageToggle({ onDark = false, className }: LanguageToggleProps) {
  const { locale, toggleLocale, t } = useI18n();

  const activeGu = locale === "gu";

  return (
    <button
      onClick={toggleLocale}
      aria-label={activeGu ? t("lang.switchToEn") : t("lang.switchTo")}
      title={activeGu ? t("lang.switchToEn") : t("lang.switchTo")}
      className={cn(
        "relative inline-flex items-center h-8 rounded-pill px-1 gap-0.5 border transition-all duration-200 select-none focus-visible:ring-2 focus-visible:ring-brand-600",
        onDark
          ? "border-white/30 bg-white/10 hover:bg-white/20"
          : "border-line bg-mist hover:border-brand-400"
      )}
    >
      <span
        className={cn(
          "h-6 px-3 rounded-pill text-xs font-semibold transition-all duration-200 flex items-center",
          !activeGu
            ? "bg-brand-600 text-white shadow-sm"
            : onDark
            ? "text-white/70 hover:text-white"
            : "text-ink-400"
        )}
      >
        EN
      </span>
      <span
        className={cn(
          "h-6 px-3 rounded-pill text-xs font-semibold transition-all duration-200 flex items-center font-gu",
          activeGu
            ? "bg-brand-600 text-white shadow-sm"
            : onDark
            ? "text-white/70 hover:text-white"
            : "text-ink-400"
        )}
      >
        ગુ
      </span>
    </button>
  );
}
