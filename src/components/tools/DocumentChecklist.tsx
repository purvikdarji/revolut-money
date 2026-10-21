// src/components/tools/DocumentChecklist.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useT, useI18n } from "../../i18n";
import { ToolShell } from "./ToolShell";
import { Button } from "../ui/Button";
import { SITE_CONFIG } from "../../config/site";
import { useToast } from "../ui/Toast";
import { AnimatedRing } from "../motion/AnimatedRing";

type Profile = "salaried" | "selfEmployed" | "nri" | "property";

interface DocItem {
  id: string;
  name: string;
  nameGu?: string;
  format: "Original & Copy" | "PDF / Scan" | "Original for Verification";
  formatGu?: string;
  why: string;
  whyGu?: string;
}

interface DocSection {
  category: string;
  categoryGu?: string;
  items: DocItem[];
}

const CHECKLIST_DATA: Record<Profile, DocSection[]> = {
  salaried: [
    {
      category: "Identity & Address Proof",
      categoryGu: "ઓળખ અને સરનામાનો પુરાવો",
      items: [
        { id: "pan", name: "PAN Card", nameGu: "PAN Card", format: "Original & Copy", formatGu: "અસલ અને નકલ", why: "Mandatory for tax and credit verification", whyGu: "કરવેરા અને ક્રેડિટ ચકાસણી માટે ફરજિયાત" },
        { id: "aadhaar", name: "Aadhaar Card", nameGu: "Aadhaar Card", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Proof of identity and address verification", whyGu: "ઓળખ અને સરનામાની ચકાસણીનો પુરાવો" },
        { id: "address_util", name: "Current Address Proof (if diff from Aadhaar)", nameGu: "વર્તમાન સરનામાનો પુરાવો (જો આધારથી અલગ હોય)", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Electricity, gas or rent agreement", whyGu: "વીજળી, ગેસ અથવા ભાડા કરાર" },
      ],
    },
    {
      category: "Income Proof",
      categoryGu: "આવકનો પુરાવો",
      items: [
        { id: "salary_slips", name: "Latest 3 Months Salary Slips", nameGu: "છેલ્લા 3 મહિનાની પગાર સ્લિપ", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Confirms steady monthly take-home salary", whyGu: "સ્થિર માસિક ટેક-હોમ પગારની પુષ્ટિ કરે છે" },
        { id: "bank_stmt", name: "Latest 6 Months Salary Bank Statement", nameGu: "છેલ્લા 6 મહિનાનું પગાર ખાતાનું બેંક સ્ટેટમેન્ટ", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Verifies salary credits and active deductions", whyGu: "પગાર જમા અને સક્રિય કપાતની ચકાસણી કરે છે" },
        { id: "form_16", name: "Latest 2 Years Form 16 (Part A & B)", nameGu: "છેલ્લા 2 વર્ષનું ફોર્મ 16 (ભાગ A અને B)", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Tax compliance and employer stability record", whyGu: "કર અનુપાલન અને નોકરીદાતાની સ્થિરતાનો રેકોર્ડ" },
      ],
    },
    {
      category: "Employment Proof",
      categoryGu: "રોજગારનો પુરાવો",
      items: [
        { id: "emp_id", name: "Company ID Card / Appointment Letter", nameGu: "કંપનીનું ID કાર્ડ / નિમણૂક પત્ર", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Verifies current employer and job tenure", whyGu: "વર્તમાન નોકરીદાતા અને નોકરીની મુદતની ચકાસણી કરે છે" },
      ],
    },
  ],
  selfEmployed: [
    {
      category: "Identity & Business KYC",
      categoryGu: "ઓળખ અને વ્યવસાય KYC",
      items: [
        { id: "pan", name: "PAN Card (Individual & Entity)", nameGu: "PAN Card (વ્યક્તિગત અને સંસ્થા)", format: "Original & Copy", formatGu: "અસલ અને નકલ", why: "Legal identity for borrowing entity", whyGu: "ઉધાર લેનાર સંસ્થા માટે કાનૂની ઓળખ" },
        { id: "aadhaar", name: "Aadhaar Card of Promoters/Proprietor", nameGu: "પ્રમોટર્સ/માલિકનું Aadhaar Card", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "KYC compliance", whyGu: "KYC અનુપાલન" },
        { id: "gst_cert", name: "GST Registration Certificate", nameGu: "GST નોંધણી પ્રમાણપત્ર", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Proof of business existence and registration", whyGu: "વ્યવસાયના અસ્તિત્વ અને નોંધણીનો પુરાવો" },
        { id: "business_address", name: "Proof of Business Address", nameGu: "વ્યવસાયના સરનામાનો પુરાવો", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Utility bill, rent agreement or ownership deed", whyGu: "યુટિલિટી બિલ, ભાડા કરાર અથવા માલિકી દસ્તાવેજ" },
      ],
    },
    {
      category: "Financials & Tax Filings",
      categoryGu: "નાણાકીય અને ટેક્સ ફાઇલિંગ",
      items: [
        { id: "itr_3yr", name: "Latest 2-3 Years ITR with Computation", nameGu: "કોમ્પ્યુટેશન સાથે છેલ્લા 2-3 વર્ષનું ITR", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Audited profit and loss, balance sheets", whyGu: "ઓડિટ કરેલ નફો અને નુકસાન, બેલેન્સ શીટ" },
        { id: "bank_current", name: "Latest 12 Months Current Account Statement", nameGu: "છેલ્લા 12 મહિનાનું કરંટ એકાઉન્ટ સ્ટેટમેન્ટ", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Demonstrates true business cash flows and turnover", whyGu: "સાચા વ્યવસાયિક રોકડ પ્રવાહ અને ટર્નઓવર દર્શાવે છે" },
        { id: "gst_3b", name: "Latest 12 Months GST Returns (GSTR-3B)", nameGu: "છેલ્લા 12 મહિનાના GST રિટર્ન (GSTR-3B)", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Validates monthly reported turnover", whyGu: "માસિક નોંધાયેલા ટર્નઓવરને માન્ય કરે છે" },
      ],
    },
  ],
  nri: [
    {
      category: "KYC & Overseas Proof",
      categoryGu: "KYC અને વિદેશી પુરાવા",
      items: [
        { id: "passport", name: "Valid Passport & Overseas Visa", nameGu: "માન્ય પાસપોર્ટ અને વિદેશી વિઝા", format: "Original & Copy", formatGu: "અસલ અને નકલ", why: "Proof of Indian nationality and NRI status", whyGu: "ભારતીય રાષ્ટ્રીયતા અને NRI દરજ્જાનો પુરાવો" },
        { id: "pan", name: "PAN Card", nameGu: "PAN Card", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Tax assessment in India", whyGu: "ભારતમાં કર આકારણી" },
        { id: "work_permit", name: "Overseas Work Permit / Employment Contract", nameGu: "વિદેશી વર્ક પરમિટ / રોજગાર કરાર", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Validates lawful foreign employment", whyGu: "કાયદેસરની વિદેશી રોજગારીને માન્ય કરે છે" },
      ],
    },
    {
      category: "Income & Banking",
      categoryGu: "આવક અને બેંકિંગ",
      items: [
        { id: "nri_salary", name: "Latest 6 Months Overseas Salary Slips", nameGu: "છેલ્લા 6 મહિનાની વિદેશી પગાર સ્લિપ", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Validates foreign currency earnings", whyGu: "વિદેશી ચલણની કમાણીને માન્ય કરે છે" },
        { id: "nre_nro", name: "Latest 6 Months NRE/NRO Bank Statement", nameGu: "છેલ્લા 6 મહિનાનું NRE/NRO બેંક સ્ટેટમેન્ટ", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Tracks repatriation and Indian banking ties", whyGu: "ભારતીય બેંકિંગ સંબંધોને ટ્રેક કરે છે" },
        { id: "credit_report", name: "Overseas Credit Report (Equifax/Experian/CIBIL)", nameGu: "ઓવરસીઝ ક્રેડિટ રિપોર્ટ", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Assesses international repayment history", whyGu: "આંતરરાષ્ટ્રીય ચુકવણી ઇતિહાસનું મૂલ્યાંકન કરે છે" },
      ],
    },
    {
      category: "Power of Attorney (POA)",
      categoryGu: "પાવર ઓફ એટર્ની (POA)",
      items: [
        { id: "poa", name: "Registered Power of Attorney (if applicable)", nameGu: "નોંધાયેલ પાવર ઓફ એટર્ની (જો લાગુ હોય તો)", format: "Original for Verification", formatGu: "ચકાસણી માટે અસલ", why: "Authorises local representative to execute papers", whyGu: "કાગળો માટે સ્થાનિક પ્રતિનિધિને અધિકૃત કરે છે" },
      ],
    },
  ],
  property: [
    {
      category: "Applicant KYC & Income",
      categoryGu: "અરજદાર KYC અને આવક",
      items: [
        { id: "pan", name: "PAN & Aadhaar Card", nameGu: "PAN અને Aadhaar Card", format: "Original & Copy", formatGu: "અસલ અને નકલ", why: "Basic KYC for all co-borrowers", whyGu: "તમામ સહ-ઉધાર લેનારાઓ માટે મૂળભૂત KYC" },
        { id: "income_proof", name: "Salary Slips / 3 Yrs ITR", nameGu: "પગાર સ્લિપ / 3 વર્ષનું ITR", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Income verification", whyGu: "આવકની ચકાસણી" },
      ],
    },
    {
      category: "Property Chain of Title",
      categoryGu: "પ્રોપર્ટી ચેઈન ઓફ ટાઈટલ",
      items: [
        { id: "sale_agreement", name: "Registered Agreement to Sale / Allotment Letter", nameGu: "નોંધાયેલ વેચાણ કરાર / ફાળવણી પત્ર", format: "Original & Copy", formatGu: "અસલ અને નકલ", why: "Establishes transaction details & purchase cost", whyGu: "વ્યવહારની વિગતો અને ખરીદી કિંમત સ્થાપિત કરે છે" },
        { id: "title_deed", name: "Complete Chain of Title Deeds (13-30 Years)", nameGu: "શીર્ષક દસ્તાવેજોની સંપૂર્ણ સાંકળ (13-30 વર્ષ)", format: "Original for Verification", formatGu: "ચકાસણી માટે અસલ", why: "Legal verification of unencumbered ownership", whyGu: "બોજામુક્ત માલિકીની કાનૂની ચકાસણી" },
        { id: "approved_plan", name: "Approved Sanctioned Building Plan & NOC", nameGu: "મંજૂર બિલ્ડીંગ પ્લાન અને NOC", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Ensures municipal and regulatory approval", whyGu: "મ્યુનિસિપલ અને નિયમનકારી મંજૂરીની ખાતરી કરે છે" },
        { id: "tax_receipts", name: "Latest Property Tax Paid Receipts", nameGu: "નવીનતમ પ્રોપર્ટી ટેક્સ ચૂકવ્યાની રસીદો", format: "PDF / Scan", formatGu: "પીડીએફ / સ્કેન", why: "Confirms no municipal tax arrears", whyGu: "મ્યુનિસિપલ ટેક્સની કોઈ બાકી રકમ નથી તેની પુષ્ટિ કરે છે" },
      ],
    },
  ],
};

export function DocumentChecklist() {
  const { t, locale } = useI18n();
  const isGu = locale === "gu";
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>("salaried");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`rm_docs_${profile}`);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      } else {
        setCheckedItems({});
      }
    } catch {
      setCheckedItems({});
    }
  }, [profile]);

  const handleCheck = (id: string) => {
    const nextState = !checkedItems[id];
    const newChecked = { ...checkedItems, [id]: nextState };
    setCheckedItems(newChecked);
    try {
      localStorage.setItem(`rm_docs_${profile}`, JSON.stringify(newChecked));
    } catch {
      // Storage unavailable
    }
  };

  const currentSections = useMemo(() => CHECKLIST_DATA[profile] || [], [profile]);

  const allItems = useMemo(
    () => currentSections.flatMap((s) => s.items),
    [currentSections]
  );

  const totalCount = allItems.length;
  const completedCount = allItems.filter((item) => checkedItems[item.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("profile", profile);

    if (navigator.share) {
      navigator
        .share({
          title: `Revolut Money - ${profile.toUpperCase()} Document Checklist`,
          text: `Check out the required documents for loan approval at Revolut Money.`,
          url: url.toString(),
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url.toString());
      toast({ type: "success", title: "Checklist link copied to clipboard!" });
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi Revolut Money, I am reviewing the document checklist for a ${profile} loan profile (${completedCount}/${totalCount} ready). Could you guide me on the next steps?`;
    const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURI(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <ToolShell title={t("tools.documents.title")}>
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Controls & Profile Selector */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 font-inter block mb-3">
              {t("tools.documents.profile")}
            </label>
            <div className="flex flex-col gap-2.5">
              {[
                { id: "salaried", label: t("tools.documents.salaried") },
                { id: "selfEmployed", label: t("tools.documents.selfEmployed") },
                { id: "nri", label: t("tools.documents.nri") },
                { id: "property", label: isGu ? "પ્રોપર્ટી / મોર્ગેજ લોન" : "Property / Mortgage Loan" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProfile(p.id as Profile)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${
                    profile === p.id
                      ? "border-brand-green bg-brand-green/10 text-brand-deep shadow-sm"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{p.label}</span>
                    {profile === p.id && (
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-brand-deep text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-white/70 font-semibold font-jakarta">
                {isGu ? "ચેકલિસ્ટની તૈયારી" : "Checklist Readiness"}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4 tabular-nums">
              <AnimatedRing 
                progress={progressPercent / 100} 
                size={56} 
                strokeWidth={5} 
                color="var(--color-brand-400)" 
                trackColor="rgba(255,255,255,0.15)"
              />
              <div>
                <div className="text-lg font-bold font-jakarta mb-1">
                  {isGu ? `કુલ ${totalCount} માંથી ${completedCount} એકત્રિત` : `${completedCount} of ${totalCount} collected`}
                </div>
                <div className="text-sm font-bold text-brand-green">
                  {progressPercent}% Complete
                </div>
              </div>
            </div>
            <p className="text-xs text-white/75 font-inter">
              {isGu ? "વસ્તુઓ આ બ્રાઉઝર પર આપમેળે સ્થાનિક રૂપે સાચવવામાં આવે છે." : "Items are automatically saved locally on this browser."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={handlePrint}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              {t("tools.documents.print")} {isGu ? "ચેકલિસ્ટ" : "Checklist"}
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={handleShare}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              {isGu ? "ચેકલિસ્ટ શેર કરો" : "Share Checklist"}
            </Button>

            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={handleWhatsApp}
            >
              <svg
                className="w-4 h-4 mr-2 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.07-1.745-.391-1.418-.588-2.338-2.029-2.408-2.123-.072-.093-.578-.77-0.578-1.469 0-.698.366-1.042.497-1.185.131-.144.286-.18.381-.18.096 0 .191.002.274.006.088.005.206-.033.323.249.12.289.41 1.002.446 1.076.036.073.06.159.012.255s-.072.156-.144.241c-.072.084-.152.188-.217.253-.072.072-.148.151-.064.296.084.144.373.616.8 1 .552.497 1.018.65 1.162.723.144.072.229.06.313-.036.084-.096.36-0.42.457-.564.096-.144.192-.12.324-.072.132.048.838.395.982.467.144.072.24.108.276.168.036.06.036.349-.108.754z" />
              </svg>
              {isGu ? "સલાહકારને WhatsApp કરો" : "WhatsApp to Advisor"}
            </Button>
          </div>
        </div>

        {/* Right: Document Sections */}
        <div className="lg:col-span-8">
          <div
            className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm print:shadow-none print:border-none print:p-0"
            id="printable-checklist"
          >
            <div className="mb-8 pb-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-bold font-jakarta text-brand-deep">
                    {isGu ? "જરૂરી દસ્તાવેજોની ચેકલિસ્ટ" : "Required Documents Checklist"}
                  </h3>
                  <p className="text-gray-500 mt-1 capitalize font-inter text-sm">
                    {isGu ? `પ્રોફાઇલ: ${profile.replace(/([A-Z])/g, " $1").trim()} અરજદારો` : `Profile: ${profile.replace(/([A-Z])/g, " $1").trim()} Applicants`}
                  </p>
                </div>
                <div className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
                  {isGu ? `${completedCount}/${totalCount} તૈયાર` : `${completedCount}/${totalCount} Ready`}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {currentSections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-base font-bold font-jakarta text-brand-deep mb-3 uppercase tracking-wider text-xs bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                    {isGu && section.categoryGu ? section.categoryGu : section.category}
                  </h4>
                  <ul className="space-y-3">
                    {section.items.map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <li
                          key={item.id}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isChecked
                              ? "bg-brand-green/5 border-brand-green/30"
                              : "bg-white border-gray-150 hover:border-gray-300"
                          }`}
                        >
                          <label className="flex items-start gap-3.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={isChecked}
                              onChange={() => handleCheck(item.id)}
                              aria-label={item.name}
                            />
                            <div
                              className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center border transition-all mt-0.5 print:border-black ${
                                isChecked
                                  ? "bg-brand-green border-brand-green text-white"
                                  : "bg-white border-gray-300 text-transparent hover:border-brand-green"
                              }`}
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span
                                  className={`text-sm font-semibold font-jakarta transition-colors ${
                                    isChecked
                                      ? "line-through text-gray-400"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {isGu && item.nameGu ? item.nameGu : item.name}
                                </span>
                                <span className="text-[11px] font-medium font-inter px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                  {isGu && item.formatGu ? item.formatGu : item.format}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 font-inter mt-1">
                                {isGu && item.whyGu ? item.whyGu : item.why}
                              </p>
                            </div>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
