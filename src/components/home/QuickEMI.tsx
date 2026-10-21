import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, CheckCircle2, ArrowRight } from "lucide-react";
import { useT, useI18n } from "../../i18n";
import { formatINR } from "../../lib/format";

type EmiType = "home" | "personal" | "business";

export function QuickEMI() {
  const t = useT();
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const [activeTab, setActiveTab] = useState<EmiType>("home");

  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(15);

  const tabs: { id: EmiType; label: string }[] = [
    { id: "home", label: isGu ? "હોમ" : "Home" },
    { id: "personal", label: isGu ? "વ્યક્તિગત" : "Personal" },
    { id: "business", label: isGu ? "વ્યવસાય" : "Business" },
  ];

  const handleTabChange = (id: EmiType) => {
    setActiveTab(id);
    if (id === "home") {
      setAmount(2500000);
      setRate(8.5);
      setTenure(15);
    } else if (id === "personal") {
      setAmount(500000);
      setRate(11.5);
      setTenure(3);
    } else {
      setAmount(5000000);
      setRate(10.5);
      setTenure(5);
    }
  };

  const emi = useMemo(() => {
    const p = amount;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (p === 0 || r === 0 || n === 0) return 0;
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [amount, rate, tenure]);

  return (
    <div className="bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.3)] rounded-[28px] p-6 sm:p-7 relative overflow-hidden">
      {/* Decorative gradient glow in corner */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <motion.div
            className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center shrink-0 shadow-xs"
            whileHover={{ rotate: 15 }}
          >
            <Coins className="w-5 h-5 text-brand-600" />
          </motion.div>
          <div>
            <h3 className="font-display font-bold text-lg text-ink-900 leading-tight">
              {t("home.quickEmi.title")}
            </h3>
            <p className="text-xs sm:text-sm text-ink-600">
              {t("home.quickEmi.subtitle")}
            </p>
          </div>
        </div>

        {/* Loan Type Tabs */}
        <div className="flex p-1 bg-mist rounded-xl mb-6 border border-line">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative flex-1 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === tab.id ? "text-brand-700" : "text-ink-600 hover:text-ink-900"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="quick-emi-active-tab"
                  className="absolute inset-0 bg-white rounded-lg shadow-xs border border-line/50"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Sliders */}
        <div className="space-y-4 mb-6">
          {/* Amount */}
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label className="text-[11px] font-bold text-ink-600 uppercase tracking-wider">
                {t("home.quickEmi.amount")}
              </label>
              <span className="font-display font-bold text-sm sm:text-base text-brand-700">
                {formatINR(amount)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={10000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label={t("home.quickEmi.amount")}
              className="w-full h-2 bg-mist border border-line rounded-pill appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          {/* Rate */}
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label className="text-[11px] font-bold text-ink-600 uppercase tracking-wider">
                {t("home.quickEmi.rate")}
              </label>
              <span className="font-display font-bold text-sm sm:text-base text-brand-700">
                {rate}%
              </span>
            </div>
            <input
              type="range"
              min={7}
              max={20}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label={t("home.quickEmi.rate")}
              className="w-full h-2 bg-mist border border-line rounded-pill appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label className="text-[11px] font-bold text-ink-600 uppercase tracking-wider">
                {t("home.quickEmi.tenure")}
              </label>
              <span className="font-display font-bold text-sm sm:text-base text-brand-700">
                {tenure} {isGu ? "વર્ષ" : "Yrs"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              aria-label={t("home.quickEmi.tenure")}
              className="w-full h-2 bg-mist border border-line rounded-pill appearance-none cursor-pointer accent-brand-600"
            />
          </div>
        </div>

        {/* Calculated Monthly EMI Result Card */}
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-2xl p-4 sm:p-5 text-white shadow-card relative overflow-hidden group">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-brand-100 text-xs sm:text-sm font-medium mb-1">
                {t("home.quickEmi.monthlyEmi")}
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={emi}
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gold-300 drop-shadow-sm"
                >
                  {formatINR(emi)}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-300">
              <CheckCircle2 className="w-6 h-6 text-gold-400" />
            </div>
          </div>
        </div>

        {/* CTA to Apply */}
        <div className="mt-4">
          <Link
            to={`/apply?loan=${activeTab === 'home' ? 'home-loan' : activeTab === 'personal' ? 'personal-loan' : 'business-loan'}&amount=${amount}`}
            className="w-full h-11 px-4 rounded-pill bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span>Apply for this Loan</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
