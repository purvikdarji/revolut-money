// src/components/tools/EligibilityEstimator.tsx
import React, { useState, useMemo } from "react";
import { useT } from "../../i18n";
import { ToolShell } from "./ToolShell";
import { SliderInput } from "../ui/SliderInput";
import { formatINR, formatNumber } from "../../lib/format";
import { Button } from "../ui/Button";
import { SITE_CONFIG } from "../../config/site";

export function EligibilityEstimator() {
  const t = useT();
  const [income, setIncome] = useState(100000);
  const [existingEmis, setExistingEmis] = useState(15000);
  const [tenureYears, setTenureYears] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [profile, setProfile] = useState<"salaried" | "selfEmployed">("salaried");

  // FOIR cap: Salaried (50%), Self-Employed (60%)
  const foirCap = profile === "salaried" ? 0.50 : 0.60;

  const { maxEligibleAmount, maxAffordableEmi, foirPercent, statusLevel } = useMemo(() => {
    const maxTotalEmiAllowed = income * foirCap;
    const availableForNewEmi = Math.max(0, maxTotalEmiAllowed - existingEmis);

    let maxLoan = 0;
    if (availableForNewEmi > 0) {
      const r = rate / 12 / 100;
      const n = tenureYears * 12;
      const factor = Math.pow(1 + r, n);
      maxLoan = Math.round((availableForNewEmi * (factor - 1)) / (r * factor));
    }

    const currentFoir = income > 0 ? (existingEmis / income) * 100 : 0;
    
    let level: "safe" | "moderate" | "high" = "safe";
    if (currentFoir > (foirCap * 100)) {
      level = "high";
    } else if (currentFoir > 40) {
      level = "moderate";
    }

    return {
      maxEligibleAmount: maxLoan,
      maxAffordableEmi: Math.round(availableForNewEmi),
      foirPercent: currentFoir,
      statusLevel: level,
    };
  }, [income, existingEmis, tenureYears, rate, foirCap]);

  const handleConsult = () => {
    const message = `Hi Revolut Money, I estimated my loan eligibility on your website: Monthly income ₹${formatNumber(income)}, existing EMIs ₹${formatNumber(existingEmis)}, desired tenure ${tenureYears} years. Estimated eligible loan is ₹${formatNumber(maxEligibleAmount)}. Could we check options with your partner banks?`;
    const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <ToolShell title={t("tools.eligibility.title")}>
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Inputs */}
        <div className="lg:col-span-7">
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setProfile("salaried")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${
                profile === "salaried"
                  ? "border-brand-green bg-brand-green/10 text-brand-deep shadow-sm"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t("tools.eligibility.salaried")} (50% FOIR)
            </button>
            <button
              onClick={() => setProfile("selfEmployed")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${
                profile === "selfEmployed"
                  ? "border-brand-green bg-brand-green/10 text-brand-deep shadow-sm"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t("tools.eligibility.selfEmployed")} (60% FOIR)
            </button>
          </div>

          <SliderInput
            label={profile === "salaried" ? t("tools.eligibility.income") : "Monthly Net Business Profit"}
            value={income}
            min={20000}
            max={1000000}
            step={5000}
            onChange={setIncome}
            formatValue={(v) => `₹${formatNumber(v)}`}
          />

          <SliderInput
            label={t("tools.eligibility.existingEmis")}
            value={existingEmis}
            min={0}
            max={500000}
            step={1000}
            onChange={setExistingEmis}
            formatValue={(v) => `₹${formatNumber(v)}`}
          />

          <SliderInput
            label={t("tools.eligibility.desiredTenure")}
            value={tenureYears}
            min={1}
            max={30}
            step={1}
            onChange={setTenureYears}
            formatValue={(v) => `${v} ${t("tools.emi.years")}`}
          />

          <SliderInput
            label={t("tools.eligibility.expectedRate")}
            value={rate}
            min={5}
            max={20}
            step={0.05}
            onChange={setRate}
            formatValue={(v) => `${v.toFixed(2)}%`}
          />
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-5">
          <div className="bg-brand-deep rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="relative z-10">
              <p className="text-white/80 font-medium mb-1 uppercase tracking-wider text-xs">
                {t("tools.eligibility.maxEligible")}
              </p>
              <h3
                className="text-4xl md:text-5xl font-bold font-jakarta text-brand-400 mb-6"
                aria-live="polite"
              >
                {formatINR(maxEligibleAmount)}
              </h3>

              <div className="p-4 bg-white/10 rounded-xl mb-6">
                <span className="text-white/70 text-xs block mb-1">Max Affordable Monthly EMI</span>
                <span className="text-2xl font-bold font-jakarta text-white">
                  {formatINR(maxAffordableEmi)}
                </span>
              </div>

              {/* FOIR Meter */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-white/80">FOIR Obligation Meter</span>
                  <span
                    className={
                      statusLevel === "safe"
                        ? "text-brand-400"
                        : statusLevel === "moderate"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }
                  >
                    {foirPercent.toFixed(1)}% (
                    {statusLevel === "safe"
                      ? "Safe"
                      : statusLevel === "moderate"
                      ? "Moderate"
                      : "High Obligation"}
                    )
                  </span>
                </div>

                <div className="h-2.5 rounded-full bg-white/20 overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      statusLevel === "safe"
                        ? "bg-brand-400"
                        : statusLevel === "moderate"
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(100, (foirPercent / (foirCap * 100)) * 100)}%` }}
                  />
                </div>

                {statusLevel === "high" && (
                  <p className="text-xs text-red-300 font-inter mt-1.5 leading-snug">
                    Existing EMIs exceed standard policy cap ({Math.round(foirCap * 100)}%). A co-applicant or loan consolidation may help.
                  </p>
                )}
                {statusLevel !== "high" && (
                  <p className="text-[11px] text-white/60 italic font-inter pt-1">
                    Based on {Math.round(foirCap * 100)}% FOIR cap assumption for {profile} profile.
                  </p>
                )}
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <Button
                variant="primary"
                className="w-full justify-center bg-brand-400 hover:bg-brand-500 text-brand-950 font-bold"
                onClick={handleConsult}
              >
                Check with advisors
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
