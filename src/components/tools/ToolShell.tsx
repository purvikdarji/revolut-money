// src/components/tools/ToolShell.tsx
import React, { ReactNode } from "react";
import { useT } from "../../i18n";
import { Reveal } from "../motion";

interface ToolShellProps {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function ToolShell({ id, title, description, children }: ToolShellProps) {
  const t = useT();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24" id={id}>
      <Reveal>
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 p-16 -mr-8 -mt-8 opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-64 h-64 text-brand-deep">
              <rect
                x="10"
                y="10"
                width="80"
                height="80"
                rx="24"
                fill="currentColor"
                transform="rotate(15 50 50)"
              />
            </svg>
          </div>

          <div className="relative z-10 mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-brand-deep mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-gray-600 font-inter max-w-2xl text-lg">
                {description}
              </p>
            )}
          </div>

          <div className="relative z-10">
            {children}
          </div>

          <div className="mt-12 pt-6 border-t border-gray-100 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-gray-400 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs text-gray-500 font-inter italic leading-relaxed">
              {t("tools.disclaimer")}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
