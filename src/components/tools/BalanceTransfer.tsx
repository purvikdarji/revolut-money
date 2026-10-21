// src/components/tools/BalanceTransfer.tsx
import React, { useState, useMemo } from "react";
import { useT, useI18n } from "../../i18n";
import { ToolShell } from "./ToolShell";
import { SliderInput } from "../ui/SliderInput";
import { formatINR, formatNumber } from "../../lib/format";
import { calculateEMI } from "../../lib/emi";
import { Button } from "../ui/Button";
import { SITE_CONFIG } from "../../config/site";
import { BarChart } from "../ui/Charts";

export function BalanceTransfer() {
  const t = useT();
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const [outstanding, setOutstanding] = useState(2500000); // 25 Lakhs
  const [currentRate, setCurrentRate] = useState(10.5); // 10.5%
  const [remainingMonths, setRemainingMonths] = useState(120); // 10 Years
  const [newRate, setNewRate] = useState(8.5); // 8.5%

  const btResult = useMemo(() => {
    const { emi: currentEmi } = calculateEMI(outstanding, currentRate, remainingMonths);
    const { emi: newEmi } = calculateEMI(outstanding, newRate, remainingMonths);

    const oldTotal = currentEmi * remainingMonths;
    const newTotal = newEmi * remainingMonths;
    const totalSaved = Math.max(0, oldTotal - newTotal);
    const monthlySavings = Math.max(0, currentEmi - newEmi);

    // Standard transfer fee assumption: 0.5% of outstanding
    const processingFee = Math.round(outstanding * 0.005);
    let breakEven = 0;
    if (monthlySavings > 0) {
      breakEven = Math.ceil(processingFee / monthlySavings);
    }

    const netSavings = Math.max(0, totalSaved - processingFee);

    return {
      currentEmi,
      newEmi,
      monthlySavings,
      oldTotal,
      newTotal,
      totalSaved,
      processingFee,
      breakEven,
      netSavings,
    };
  }, [outstanding, currentRate, remainingMonths, newRate]);

  const handleExplore = () => {
    const message = `Hi Revolut Money, I checked the Balance Transfer calculator on your website: Outstanding loan ₹${formatNumber(outstanding)} at ${currentRate.toFixed(2)}% with ${remainingMonths} months left. Transferring to ${newRate.toFixed(2)}% shows monthly savings of ${formatINR(btResult.monthlySavings)} (Total: ${formatINR(btResult.totalSaved)}). Could you check transfer eligibility with partner banks?`;
    const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <ToolShell title={t("tools.balanceTransfer.title")}>
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Inputs */}
        <div className="lg:col-span-7">
          <SliderInput
            label={t("tools.balanceTransfer.currentOutstanding")}
            value={outstanding}
            min={100000}
            max={50000000} // up to 5 Cr
            step={50000}
            onChange={setOutstanding}
            formatValue={(v) => {
              if (v >= 10000000) return `₹${formatNumber(v / 10000000)} Cr`;
              if (v >= 100000) return `₹${formatNumber(v / 100000)} L`;
              return `₹${formatNumber(v)}`;
            }}
          />

          <SliderInput
            label={isGu ? "હાલનો વ્યાજ દર (%)" : "Current Interest Rate (%)"}
            value={currentRate}
            min={6}
            max={20}
            step={0.05}
            onChange={setCurrentRate}
            formatValue={(v) => `${v.toFixed(2)}%`}
          />

          <SliderInput
            label={t("tools.balanceTransfer.remainingTenure")}
            value={remainingMonths}
            min={12}
            max={360}
            step={6}
            onChange={setRemainingMonths}
            formatValue={(v) => `${Math.floor(v / 12)} ${isGu ? "વર્ષ" : "Yrs"} ${v % 12 > 0 ? `${v % 12} ${isGu ? "મહિના" : "Mos"}` : ""}`}
          />

          <SliderInput
            label={t("tools.balanceTransfer.newRate")}
            value={newRate}
            min={5}
            max={18}
            step={0.05}
            onChange={setNewRate}
            formatValue={(v) => `${v.toFixed(2)}%`}
          />
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-5">
          <div className="bg-brand-deep rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="relative z-10">
              <p className="text-white/80 font-medium mb-1 uppercase tracking-wider text-xs">
                Estimated Monthly Savings
              </p>
              <h3
                className="text-4xl md:text-5xl font-bold font-jakarta text-brand-400 mb-6"
                aria-live="polite"
              >
                {formatINR(btResult.monthlySavings)}
                <span className="text-sm font-normal text-white/70 block mt-1">
                  New EMI: {formatINR(btResult.newEmi)} (was {formatINR(btResult.currentEmi)})
                </span>
              </h3>

              {/* Total Saved Card */}
              <div className="p-4 bg-white/10 rounded-xl mb-6">
                <span className="text-white/70 text-xs block mb-1">
                  {t("tools.balanceTransfer.interestSaved")}
                </span>
                <span className="text-3xl font-bold font-jakarta text-white">
                  {formatINR(btResult.totalSaved)}
                </span>
                <span className="text-xs text-brand-400 block mt-1">
                  Net savings after fee: ~{formatINR(btResult.netSavings)}
                </span>
              </div>

              {/* Comparison Visual */}
              <div className="mb-6 tabular-nums">
                <div className="flex justify-between text-xs font-semibold text-white/80 mb-2">
                  <span>Old Total: {formatINR(btResult.oldTotal)}</span>
                  <span className="text-brand-400">New Total: {formatINR(btResult.newTotal)}</span>
                </div>
                <BarChart 
                  val1={btResult.oldTotal} 
                  val2={btResult.newTotal}
                  color1="rgba(248, 113, 113, 0.8)" 
                  color2="var(--color-brand-400)"
                  label="Bar chart comparing old total payable with new total payable"
                />
              </div>

              {/* Breakeven Info */}
              {btResult.breakEven > 0 && (
                <div className="text-xs text-white/80 bg-black/25 p-3.5 rounded-xl flex items-start gap-2.5 mb-6">
                  <svg
                    className="w-4 h-4 text-brand-400 shrink-0 mt-0.5"
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
                  <div>
                    <span className="font-semibold text-white block">
                      Breakeven in {btResult.breakEven} {t("tools.emi.months")}
                    </span>
                    Estimated processing fee ~{formatINR(btResult.processingFee)} (0.5% assumed) recovered via monthly savings.
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-10 pt-2">
              <Button
                variant="primary"
                className="w-full justify-center bg-brand-400 hover:bg-brand-500 text-brand-950 font-bold"
                onClick={handleExplore}
              >
                Explore transfer options
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
