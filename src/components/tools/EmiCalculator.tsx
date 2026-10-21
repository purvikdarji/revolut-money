// src/components/tools/EmiCalculator.tsx
import React, { useState, useMemo } from "react";
import { useT } from "../../i18n";
import { ToolShell } from "./ToolShell";
import { SliderInput } from "../ui/SliderInput";
import { formatINR, formatNumber } from "../../lib/format";
import { calculateEMI, generateAmortization } from "../../lib/emi";
import { Button } from "../ui/Button";
import { CountUp } from "../motion/CountUp";
import { DonutChart, StackedAreaChart } from "../ui/Charts";

export function EmiCalculator() {
  const t = useT();
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [showAmortization, setShowAmortization] = useState(false);
  const [extraPayment, setExtraPayment] = useState(0);

  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");

  const tenureMonthsValue = tenureUnit === "years" ? tenureYears * 12 : tenureYears;

  const emiResult = useMemo(
    () => calculateEMI(amount, rate, tenureMonthsValue),
    [amount, rate, tenureMonthsValue]
  );

  const tenureSaved = useMemo(() => {
    if (extraPayment <= 0 || emiResult.emi <= 0) return 0;
    const r = rate / 12 / 100;
    const newEmi = emiResult.emi + extraPayment;
    
    // P * r must be less than newEmi for the loan to be paid off
    if (amount * r >= newEmi) return 0;
    
    // Formula for new tenure: n = -log(1 - P*r/EMI) / log(1+r)
    const newTenureMonths = -Math.log(1 - (amount * r) / newEmi) / Math.log(1 + r);
    const monthsSaved = tenureMonthsValue - Math.ceil(newTenureMonths);
    return Math.max(0, monthsSaved);
  }, [amount, rate, tenureMonthsValue, extraPayment, emiResult.emi]);

  const amortization = useMemo(
    () => generateAmortization(amount, rate, tenureMonthsValue),
    [amount, rate, tenureMonthsValue]
  );

  // Group amortization by year for display
  const yearlyAmortization = useMemo(() => {
    const yearly = [];
    const maxYears = Math.ceil(tenureMonthsValue / 12);
    for (let i = 0; i < maxYears; i++) {
      const yearRows = amortization.slice(i * 12, (i + 1) * 12);
      if (yearRows.length === 0) break;
      
      const principalPaid = yearRows.reduce((sum, row) => sum + row.principal, 0);
      const interestPaid = yearRows.reduce((sum, row) => sum + row.interest, 0);
      const balance = yearRows[yearRows.length - 1].closingBalance;

      yearly.push({
        year: i + 1,
        principalPaid,
        interestPaid,
        balance,
      });
    }
    return yearly;
  }, [amortization, tenureYears]);

  const principalPercent = (amount / emiResult.totalPayment) * 100 || 0;
  const interestPercent = 100 - principalPercent;

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("amount", amount.toString());
    url.searchParams.set("rate", rate.toString());
    url.searchParams.set("tenure", tenureYears.toString());
    
    if (navigator.share) {
      navigator.share({
        title: "My EMI Calculation - Revolut Money",
        url: url.toString(),
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url.toString());
      alert("Link copied to clipboard!");
    }
  };

  return (
    <ToolShell
      title={t("tools.emi.title")}
    >
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Inputs */}
        <div className="lg:col-span-7">
          <SliderInput
            label={t("tools.emi.amount")}
            value={amount}
            min={100000}
            max={100000000} // 10 Cr
            step={10000}
            onChange={setAmount}
            formatValue={(v) => {
              if (v >= 10000000) return `₹${formatNumber(v / 10000000)} Cr`;
              if (v >= 100000) return `₹${formatNumber(v / 100000)} L`;
              return `₹${formatNumber(v)}`;
            }}
          />

          <SliderInput
            label={t("tools.emi.rate")}
            value={rate}
            min={5}
            max={25}
            step={0.05}
            onChange={setRate}
            formatValue={(v) => `${v.toFixed(2)}%`}
          />

          <div className="relative mb-2">
            <div className="flex justify-between items-center absolute right-0 -top-8">
              <div className="flex bg-gray-100 rounded-md p-0.5">
                <button
                  className={`px-3 py-1 text-xs font-semibold rounded-sm transition-colors ${tenureUnit === "years" ? "bg-white text-brand-deep shadow-sm" : "text-gray-500 hover:text-brand-deep"}`}
                  onClick={() => {
                    setTenureUnit("years");
                    setTenureYears(Math.round(tenureYears / 12) || 1);
                  }}
                >
                  {t("tools.emi.years")}
                </button>
                <button
                  className={`px-3 py-1 text-xs font-semibold rounded-sm transition-colors ${tenureUnit === "months" ? "bg-white text-brand-deep shadow-sm" : "text-gray-500 hover:text-brand-deep"}`}
                  onClick={() => {
                    setTenureUnit("months");
                    setTenureYears(tenureYears * 12);
                  }}
                >
                  {t("tools.emi.months")}
                </button>
              </div>
            </div>
            <SliderInput
              label={t("tools.emi.tenure")}
              value={tenureYears}
              min={1}
              max={tenureUnit === "years" ? 30 : 360}
              step={1}
              onChange={setTenureYears}
              formatValue={(v) => `${v} ${t(tenureUnit === "years" ? "tools.emi.years" : "tools.emi.months")}`}
            />
          </div>

            {/* Simple Prepayment toggle for demo */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-brand-deep mb-4">{t("tools.emi.prepaymentTitle")}</h4>
            <SliderInput
              label={t("tools.emi.extraPerMonth")}
              value={extraPayment}
              min={0}
              max={100000}
              step={1000}
              onChange={setExtraPayment}
              formatValue={(v) => `₹${formatNumber(v)}`}
            />
            {tenureSaved > 0 && (
              <p className="text-sm text-brand-green font-semibold mt-2">
                {t("tools.emi.tenureSaved")}: {Math.floor(tenureSaved / 12)} {t("tools.emi.years")} {tenureSaved % 12} {t("tools.emi.months")}
              </p>
            )}
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-5">
          <div className="bg-brand-deep rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10">
              <p className="text-white/80 font-medium mb-2">{t("tools.emi.monthlyEmi")}</p>
              <h3 className="text-4xl md:text-5xl font-bold font-jakarta text-brand-400 mb-8" aria-live="polite">
                <CountUp end={emiResult.emi} prefix="₹" />
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-white/70">{t("tools.emi.principal")}</span>
                  <span className="font-semibold text-white"><CountUp end={amount} prefix="₹" /></span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-white/70">{t("tools.emi.totalInterest")}</span>
                  <span className="font-semibold text-white"><CountUp end={emiResult.totalInterest} prefix="₹" /></span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-white/70">{t("tools.emi.totalPayable")}</span>
                  <span className="font-semibold text-white"><CountUp end={emiResult.totalPayment} prefix="₹" /></span>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="flex items-center gap-6 mb-8">
                <DonutChart 
                  value1={principalPercent} 
                  value2={interestPercent} 
                  color1="#34C27A" 
                  color2="rgba(255,255,255,0.15)"
                  className="w-24 h-24 shrink-0"
                  label={`Donut chart showing ${principalPercent.toFixed(1)}% principal and ${interestPercent.toFixed(1)}% interest`}
                />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-brand-400" />
                    <span className="text-white/90">{t("tools.emi.principal")} ({principalPercent.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white/30" />
                    <span className="text-white/70">{t("tools.emi.interest")} ({interestPercent.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  className="w-full justify-center"
                  onClick={() => {
                    window.location.href = `/apply?amount=${amount}&rate=${rate}&tenure=${tenureYears}`;
                  }}
                >
                  Apply with these numbers
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-center text-white border-white/20 hover:bg-white/10" 
                  onClick={handleShare}
                >
                  {t("tools.emi.shareCalc")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setShowAmortization(!showAmortization)}
          className="text-brand-deep font-semibold underline underline-offset-4 hover:text-brand-green transition-colors"
        >
          {t("tools.emi.showAmortization")}
        </button>
      </div>

      {showAmortization && (
        <div className="mt-8 space-y-6">
          <StackedAreaChart 
            data={yearlyAmortization} 
            label="Stacked area chart showing principal and interest paid over the tenure" 
          />
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse tabular-nums">
            <thead>
              <tr className="bg-gray-50 text-brand-deep text-sm">
                <th className="py-3 px-4 font-semibold border-b border-gray-200">{t("tools.emi.year")}</th>
                <th className="py-3 px-4 font-semibold border-b border-gray-200 text-right">{t("tools.emi.principalPaid")}</th>
                <th className="py-3 px-4 font-semibold border-b border-gray-200 text-right">{t("tools.emi.interestPaid")}</th>
                <th className="py-3 px-4 font-semibold border-b border-gray-200 text-right">{t("tools.emi.balance")}</th>
              </tr>
            </thead>
            <tbody>
              {yearlyAmortization.map((row) => (
                <tr key={row.year} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 text-gray-600">{row.year}</td>
                  <td className="py-3 px-4 text-right font-medium text-brand-deep">{formatINR(row.principalPaid)}</td>
                  <td className="py-3 px-4 text-right text-gray-500">{formatINR(row.interestPaid)}</td>
                  <td className="py-3 px-4 text-right font-semibold text-brand-deep">{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </ToolShell>
  );
}
