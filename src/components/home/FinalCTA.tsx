import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, PhoneCall, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion";
import { useToast } from "../ui/Toast";
import { SITE_CONFIG } from "../../config/site";
import { useI18n } from "../../i18n";
import { submitLead, LeadPayload } from "../../lib/leads";

export function FinalCTA() {
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loanType, setLoanType] = useState("home-loan");
  const [city, setCity] = useState("Ahmedabad");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isFeeFree = SITE_CONFIG.feeModel === "free";
  const consultButtonLabel = isFeeFree 
    ? (isGu ? "મફત પરામર્શ મેળવો" : "Free Consultation") 
    : (isGu ? "પરામર્શ બુક કરો" : "Book a Consultation");

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Revolut Money team, I would like to get loan assistance."
  )}`;

  const handleLeadSubmit = async (intent: "apply" | "consult") => {
    setErrorMsg("");

    // Validate Indian 10-digit mobile
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobile.trim())) {
      setErrorMsg(isGu ? "કૃપા કરીને માન્ય 10-અંકનો ભારતીય મોબાઇલ નંબર દાખલ કરો." : "Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!name.trim()) {
      setErrorMsg(isGu ? "કૃપા કરીને તમારું પૂરું નામ દાખલ કરો." : "Please enter your full name.");
      return;
    }

    if (!consent) {
      setErrorMsg(isGu ? "કૃપા કરીને આગળ વધવા માટે સંમતિ ચેકબોક્સ પસંદ કરો." : "Please check the consent box to proceed.");
      return;
    }

    setSubmitting(true);

    const payload: LeadPayload = {
      source: 'home_final_cta',
      loanType,
      name,
      mobile,
      city,
      message: intent === 'consult' ? 'Requested a consultation' : undefined,
      consent,
    };

    const result = await submitLead(payload);

    setSubmitting(false);
    
    if (result.success) {
      toast({
        type: "success",
        title: isGu ? "વિનંતી પ્રાપ્ત થઈ!" : "Inquiry received!",
        message: isGu 
          ? "Revolut Money ના રિલેશનશિપ મેનેજર 1 કાર્યકારી દિવસમાં તમારો સંપર્ક કરશે." 
          : "A Revolut Money relationship manager will contact you within 1 business day.",
      });

      // Reset form fields
      setName("");
      setMobile("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLeadSubmit("apply");
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white" aria-labelledby="cta-heading">
      
      {/* Decorative Brand Ambient Radiance */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <Container className="relative z-10">
        
        {/* Frame-shaped glass container */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/5 backdrop-blur-md border border-white/15 p-8 sm:p-12 lg:p-14 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and Subtitle */}
            <div className="lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-accent-300 text-xs font-bold uppercase tracking-wider mb-5">
                  <ShieldCheck size={14} className="text-accent-400" />
                  <span>{isGu ? "સ્વતંત્ર લોન સલાહ" : "EXPERT LOAN ADVISORY"}</span>
                </div>

                <h2 id="cta-heading" className="h1 text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                  {isGu ? "આજે જ નિષ્ણાત લોન સહાય મેળવો" : "Get expert loan assistance today"}
                </h2>

                <p className="text-brand-100 text-base sm:text-lg leading-relaxed mb-8">
                  {isGu 
                    ? "તમે ઘર ખરીદતા હોવ, વ્યવસાયનો વિસ્તાર કરતા હોવ, વાહન ખરીદતા હોવ કે મિલકતનું મૂલ્ય અનલૉક કરતા હોવ, અમારા નિષ્ણાતો અહીં મદદ માટે હાજર છે." 
                    : "Whether you're buying a home, expanding your business, purchasing a vehicle, or unlocking property value, our experts are here to help."}
                </p>

                {/* Quick Trust Highlights */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-brand-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-accent-400 shrink-0" />
                    <span>17 associate banks &amp; NBFCs — independent, not a lender</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-accent-400 shrink-0" />
                    <span>Local Ahmedabad office at Ganesh Glory, Jagatpur</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Compact Lead Form */}
            <div className="lg:col-span-6">
              <Reveal delay={0.15}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-ink-900 shadow-xl border border-line">
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {errorMsg && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
                        {errorMsg}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                        {isGu ? "પૂરું નામ *" : "Full Name *"}
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-line text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>

                    {/* Mobile with Indian validation */}
                    <div>
                      <label htmlFor="lead-mobile" className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                        {isGu ? "મોબાઇલ નંબર *" : "Mobile Number (10 Digits) *"}
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-line bg-mist text-ink-600 font-semibold text-sm">
                          +91
                        </span>
                        <input
                          id="lead-mobile"
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                          className="w-full px-4 py-2.5 rounded-r-xl border border-line text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* Loan Type Select */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="lead-loan-type" className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                          {isGu ? "લોનનો પ્રકાર" : "Loan Type"}
                        </label>
                        <select
                          id="lead-loan-type"
                          value={loanType}
                          onChange={(e) => setLoanType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-line text-sm text-ink-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          {SITE_CONFIG.loanProducts.map((p) => (
                            <option key={p.slug} value={p.slug}>
                              {isGu ? p.nameGu : p.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="lead-city" className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
                          {isGu ? "શહેર" : "City"}
                        </label>
                        <input
                          id="lead-city"
                          type="text"
                          required
                          placeholder="e.g. Ahmedabad"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-line text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Consent checkbox linking to /privacy */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-ink-600 leading-snug">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 rounded border-line text-brand-600 focus:ring-brand-500"
                        />
                        <span>
                          {isGu 
                            ? "હું Revolut Money ને મારી લોન જરૂરિયાત અંગે મારો સંપર્ક કરવા સંમતિ આપું છું. " 
                            : "I consent to Revolut Money contacting me regarding my loan inquiry. Read our "}
                          <Link to="/privacy" className="text-brand-600 font-bold hover:underline">
                            {isGu ? "ગોપનીયતા નીતિ" : "Privacy Policy"}
                          </Link>.
                        </span>
                      </label>
                    </div>

                    {/* Action Buttons: Apply Now, Book a Consultation, WhatsApp Us */}
                    <div className="pt-4 space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm transition-all disabled:opacity-70 cursor-pointer"
                        >
                          <span>{submitting ? "Submitting..." : (isGu ? "હમણાં અરજી કરો" : "Apply Now")}</span>
                          <ArrowRight size={15} />
                        </button>

                        <button
                          type="button"
                          disabled={submitting}
                          onClick={() => handleLeadSubmit("consult")}
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-mist hover:bg-brand-50 text-ink-800 border border-line font-bold text-sm transition-all disabled:opacity-70 cursor-pointer"
                        >
                          <PhoneCall size={14} className="text-brand-600" />
                          <span>{consultButtonLabel}</span>
                        </button>
                      </div>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs tracking-wide transition-all border border-[#25D366]/30"
                      >
                        <MessageSquare size={14} className="text-[#25D366]" />
                        <span>{isGu ? "WhatsApp પર વાત કરો" : "WhatsApp Us"}</span>
                      </a>
                    </div>

                  </form>

                </div>
              </Reveal>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
