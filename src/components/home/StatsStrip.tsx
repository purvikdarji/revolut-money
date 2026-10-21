import { useT, useI18n } from "../../i18n";
import { SITE_CONFIG } from "../../config/site";
import { CountUp } from "../motion";

interface StatItemProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  isGold?: boolean;
}

function StatItem({ value, label, prefix = "", suffix = "", isGold = false }: StatItemProps) {
  return (
    <div className={`stat-frame-tile ${isGold ? 'stat-frame-tile--gold' : ''}`}>
      <div className="stat-frame-num">
        <CountUp end={value} prefix={prefix} suffix={suffix} duration={1.8} />
      </div>
      <div className="stat-frame-label">
        {label}
      </div>
    </div>
  );
}

export function StatsStrip() {
  const t = useT();
  const { locale } = useI18n();
  const isGu = locale === "gu";

  // Conditional rendering based on verified SITE_CONFIG facts
  // Null values in SITE_CONFIG.stats are hidden per strict guidelines
  const stats = [
    {
      value: SITE_CONFIG.lendingPartners.length,
      label: t("home.stats.partners"),
      suffix: "+",
    },
    {
      value: SITE_CONFIG.loanProducts.length,
      label: t("home.stats.products"),
      suffix: "+",
    },
    ...(SITE_CONFIG.stats.loansFacilitated != null
      ? [{ value: SITE_CONFIG.stats.loansFacilitated, label: t("home.stats.disbursed"), prefix: "₹", suffix: isGu ? " કરોડ+" : "Cr+" }]
      : []),
    ...(SITE_CONFIG.stats.happyCustomers != null
      ? [{ value: SITE_CONFIG.stats.happyCustomers, label: t("home.stats.customers"), suffix: "+" }]
      : []),
    ...(SITE_CONFIG.stats.yearsExperience != null
      ? [{ value: SITE_CONFIG.stats.yearsExperience, label: t("home.stats.experience"), suffix: isGu ? "+ વર્ષ" : "+ Yrs" }]
      : []),
    // Verified fallback highlights if custom stats are unverified (null)
    ...(SITE_CONFIG.stats.loansFacilitated == null && SITE_CONFIG.stats.happyCustomers == null
      ? [
          { value: 1, label: "Dedicated RM Support", suffix: " SPOC" },
          { value: 100, label: t("home.stats.independent"), suffix: "%" },
        ]
      : []),
  ];

  return (
    <section className="relative py-12 lg:py-16 bg-brand-900 overflow-hidden border-y border-line">
      {/* UI-2 Noise + Glow */}
      <div className="noise-overlay absolute inset-0 z-0" />
      <div className="glow-primary absolute inset-0 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-4 lg:gap-6`}>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              prefix={stat.prefix}
              suffix={stat.suffix}
              isGold={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
