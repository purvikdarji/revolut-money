import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fireCoinBurst } from '../components/motion';
import {
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  ArrowRight,
  ArrowLeft,
  User,
  Building,
  Briefcase,
  Layers,
  ChevronRight,
  Check,
  FileCheck2,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/FormFields';
import { Checkbox } from '../components/ui/Checkbox';
import { SITE_CONFIG } from '../config/site';
import { submitLead, LeadPayload } from '../lib/leads';
import { trackEvent } from '../lib/analytics';
import { loansData, LoanSlug } from '../data/loans';
import { useTranslation } from '../i18n';
import { formatINR } from '../lib/format';
import { Pictogram } from '../assets/ui/Pictogram';

const EMPLOYMENT_PROFILES = [
  {
    id: 'salaried',
    title: 'Salaried Individual',
    subtitle: 'Private Ltd, MNC, Govt or PSU employee',
    icon: User,
  },
  {
    id: 'self_employed_professional',
    title: 'Self-Employed Professional',
    subtitle: 'Doctors, CAs, Lawyers, Architects, Consultants',
    icon: Briefcase,
  },
  {
    id: 'business_owner',
    title: 'Business Owner / Trader',
    subtitle: 'Proprietorship, retail, wholesale, MSME',
    icon: Building,
  },
  {
    id: 'company_firm',
    title: 'Company / Partnership Firm',
    subtitle: 'Pvt Ltd, LLP, Partnership entities',
    icon: Layers,
  },
];

const INCOME_BANDS = [
  { value: 'under_50k', label: 'Below ₹50,000 / month' },
  { value: '50k_to_1lakh', label: '₹50,000 - ₹1,00,000 / month' },
  { value: '1lakh_to_3lakh', label: '₹1,00,000 - ₹3,00,000 / month' },
  { value: 'above_3lakh', label: 'Above ₹3,00,000 / month' },
];

const GUJARAT_CITIES = [
  { value: 'Ahmedabad', label: 'Ahmedabad' },
  { value: 'Gandhinagar', label: 'Gandhinagar' },
  { value: 'Vadodara', label: 'Vadodara' },
  { value: 'Surat', label: 'Surat' },
  { value: 'Rajkot', label: 'Rajkot' },
  { value: 'Bhavnagar', label: 'Bhavnagar' },
  { value: 'Other Gujarat', label: 'Other Gujarat City' },
];

const CALLBACK_TIMES = [
  { id: 'Morning (9 AM - 12 PM)', label: 'Morning (9 AM - 12 PM)' },
  { id: 'Afternoon (12 PM - 4 PM)', label: 'Afternoon (12 PM - 4 PM)' },
  { id: 'Evening (4 PM - 7 PM)', label: 'Evening (4 PM - 7 PM)' },
];

export function ApplyPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryLoan = searchParams.get('loan') as LoanSlug | null;
  const queryAmount = searchParams.get('amount');

  // Step state: 1 to 5
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    loanType: queryLoan || 'home-loan',
    amount: queryAmount ? Number(queryAmount) : 2500000,
    city: 'Ahmedabad',
    profile: 'salaried',
    incomeBand: '50k_to_1lakh',
    name: '',
    mobile: '',
    email: '',
    preferredTime: 'Morning (9 AM - 12 PM)',
    consent: false,
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  // Auto-restore draft from session storage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('rm_apply_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          loanType: queryLoan || parsed.loanType || prev.loanType,
          amount: queryAmount ? Number(queryAmount) : (parsed.amount || prev.amount),
        }));
      }
    } catch {
      // Ignore sessionStorage errors
    }
    trackEvent('apply_start', { initialLoan: queryLoan || 'home-loan' });
  }, [queryLoan, queryAmount]);

  // Save changes to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem('rm_apply_draft', JSON.stringify(formData));
    } catch {
      // Ignore
    }
  }, [formData]);

  // Set loanType from query param if changed
  useEffect(() => {
    if (queryLoan) {
      setFormData((prev) => ({ ...prev, loanType: queryLoan }));
    }
  }, [queryLoan]);

  // Step Validation
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.loanType) errs.loanType = 'Please select a loan type';
    } else if (step === 2) {
      if (!formData.amount || formData.amount < 50000) {
        errs.amount = 'Please enter a loan amount of at least ₹50,000';
      }
      if (!formData.city) errs.city = 'Please select your city';
    } else if (step === 3) {
      if (!formData.profile) errs.profile = 'Please select your employment profile';
    } else if (step === 4) {
      if (!formData.name.trim()) errs.name = 'Full name is required';
      const cleanMobile = formData.mobile.replace(/\D/g, '');
      if (!cleanMobile) {
        errs.mobile = 'Mobile number is required';
      } else if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
        errs.mobile = 'Enter a valid 10-digit mobile number';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = 'Enter a valid email address';
      }
      if (!formData.consent) {
        errs.consent = 'You must give consent to be contacted regarding this inquiry';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      trackEvent('apply_step', { step: currentStep + 1 });
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) {
      setCurrentStep(4);
      return;
    }

    setIsSubmitting(true);

    const payload: LeadPayload = {
      source: 'apply_form',
      loanType: formData.loanType,
      amount: formData.amount,
      city: formData.city,
      profile: formData.profile,
      incomeBand: formData.incomeBand,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      preferredTime: formData.preferredTime,
      message: formData.message,
      consent: formData.consent,
      honeypot: formData.honeypot,
    };

    const result = await submitLead(payload);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      if (result.fallbackUrl) {
        setFallbackUrl(result.fallbackUrl);
      }
      try {
        sessionStorage.removeItem('rm_apply_draft');
      } catch {
        // Ignore
      }
      window.scrollTo({ top: 100, behavior: 'smooth' });
      // Trigger festive celebration confetti
      fireCoinBurst({ origin: { y: 0.6 } });
    } else {
      setErrors({ form: result.message });
    }
  };

  const selectedLoanMeta = loansData.find((l) => l.slug === formData.loanType) || loansData[0];

  return (
    <div className="bg-mist min-h-screen pb-24">
      <Helmet>
        <title>Apply for a Loan | {SITE_CONFIG.brand.name} Ahmedabad</title>
        <meta
          name="description"
          content="Apply online for home loans, business loans, and mortgage solutions in Ahmedabad. Quick advisor callback with zero spam."
        />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-brand-950 text-white pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500 via-transparent to-transparent" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-800/80 border border-brand-700/60 text-brand-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} className="text-gold-400" />
            Ahmedabad Advisory · Minimal Data Required
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-jakarta text-white tracking-tight mb-3">
            Apply for a <span className="text-brand-300">Loan</span>
          </h1>
          <p className="text-sm md:text-base text-brand-100/90 max-w-xl mx-auto">
            Tell us about your requirement. Our advisor will compare partner lenders and connect with you directly.
          </p>
        </Container>
      </section>

      {/* Main Container */}
      <Container className="mt-[-28px] relative z-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          
          {/* Left Column: Form & Steps */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-card border border-line">
            
            {/* Step Progress Bar (Hidden on success) */}
            {!isSuccess && (
              <div className="mb-8 pb-6 border-b border-line">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-500 mb-3">
                  <span>Step {currentStep} of 5</span>
                  <span className="text-brand-700 font-bold">
                    {currentStep === 1 && 'Loan Type'}
                    {currentStep === 2 && 'Amount & City'}
                    {currentStep === 3 && 'Employment Profile'}
                    {currentStep === 4 && 'Contact & Time'}
                    {currentStep === 5 && 'Review & Submit'}
                  </span>
                </div>
                
                {/* Visual Step Bar */}
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        s < currentStep
                          ? 'bg-brand-600'
                          : s === currentStep
                          ? 'bg-brand-500 shadow-xs'
                          : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Error Banner */}
            {errors.form && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {errors.form}
              </div>
            )}

            {/* SUCCESS STATE */}
            {isSuccess ? (
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <CheckCircle2 size={44} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-jakarta text-ink-900 mb-2">
                  Application Received!
                </h2>
                <p className="text-ink-600 text-sm md:text-base max-w-md mx-auto mb-8">
                  Thank you, <strong className="text-ink-900">{formData.name}</strong>. Your inquiry for a{' '}
                  <strong className="text-brand-700">{t(`loans.${formData.loanType as LoanSlug}`)}</strong> has been registered with our team.
                </p>

                {/* Summary Card */}
                <div className="bg-mist rounded-2xl p-6 text-left max-w-lg mx-auto mb-8 border border-line space-y-3 text-sm">
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-500">Loan Type:</span>
                    <span className="font-bold text-ink-900">{t(`loans.${formData.loanType as LoanSlug}`)}</span>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-500">Amount:</span>
                    <span className="font-bold text-ink-900">₹{formatINR(formData.amount)}</span>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-500">City:</span>
                    <span className="font-bold text-ink-900">{formData.city}</span>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-500">Preferred Callback:</span>
                    <span className="font-bold text-brand-700">{formData.preferredTime}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-ink-500">Assigned To:</span>
                    <span className="font-bold text-ink-900">Revolut Money Advisory Desk</span>
                  </div>
                </div>

                {/* What Happens Next 3-Step Timeline */}
                <div className="max-w-lg mx-auto text-left mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink-500 mb-4">
                    What Happens Next?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink-900">Call within 2 working hours</h4>
                        <p className="text-xs text-ink-500">
                          Our advisor reviews your profile and calls during your preferred window to understand your goals.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink-900">Document checklist on WhatsApp</h4>
                        <p className="text-xs text-ink-500">
                          Receive a concise, tailored document checklist without needing physical branch visits.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink-900">Lender matching & quotes</h4>
                        <p className="text-xs text-ink-500">
                          We compare policies across multiple banks and NBFC partners to match your eligibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {fallbackUrl && (
                    <Button
                      as="a"
                      href={fallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto h-12 flex items-center gap-2"
                    >
                      <MessageSquare size={18} />
                      Track on WhatsApp
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate('/')}
                    variant="secondary"
                    className="w-full sm:w-auto h-12"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            ) : (
              /* FORM STEPS */
              <form onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter' && currentStep < 5) e.preventDefault(); }}>
                
                {/* STEP 1: Select Loan Type (all 11 loans) */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold font-jakarta text-ink-900 mb-1">
                        Select Your Loan Requirement
                      </h2>
                      <p className="text-sm text-ink-500">
                        Choose the loan category that fits your financing goal.
                      </p>
                    </div>

                    {errors.loanType && (
                      <p className="text-xs text-red-600 font-semibold">{errors.loanType}</p>
                    )}

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {loansData.map((loan) => {
                        const isSelected = formData.loanType === loan.slug;
                        const title = t(`loans.${loan.slug}`);

                        return (
                          <button
                            type="button"
                            key={loan.slug}
                            data-loan-slug={loan.slug}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, loanType: loan.slug }));
                              if (errors.loanType) setErrors((prev) => ({ ...prev, loanType: '' }));
                            }}
                            className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-brand-50/70 border-brand-600 ring-2 ring-brand-600 shadow-sm'
                                : 'bg-white border-line hover:border-brand-300 hover:bg-mist/50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  isSelected ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700'
                                }`}
                              >
                                <Pictogram name={loan.icon as any} className="w-5 h-5 opacity-90" accent={isSelected ? "gold" : "brand"} />
                              </div>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-ink-900 leading-snug mb-1">
                                {title}
                              </h3>
                              <p className="text-[11px] text-ink-500 line-clamp-2">
                                {loan.featureKey}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Amount & City */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold font-jakarta text-ink-900 mb-1">
                        Loan Amount & Location
                      </h2>
                      <p className="text-sm text-ink-500">
                        Specify how much funding you anticipate and where the property/business is located.
                      </p>
                    </div>

                    <div className="bg-mist/60 border border-line rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <label htmlFor="amount-input" className="text-sm font-semibold text-ink-800">
                          Approximate Loan Amount (₹) *
                        </label>
                        <span className="text-base font-bold font-jakarta text-brand-700">
                          ₹{formatINR(formData.amount)}
                        </span>
                      </div>

                      <input
                        id="amount-slider"
                        type="range"
                        min="100000"
                        max="50000000"
                        step="50000"
                        value={formData.amount}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, amount: Number(e.target.value) }));
                          if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
                        }}
                        className="w-full accent-brand-600 cursor-pointer h-2 bg-stone-200 rounded-lg"
                      />

                      <div className="flex items-center gap-3">
                        <Input
                          id="amount-input"
                          label="Custom Loan Amount (₹)"
                          type="number"
                          value={formData.amount || ''}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, amount: Number(e.target.value) }));
                            if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
                          }}
                          placeholder="e.g. 2500000"
                          error={errors.amount}
                          hint="Slide or enter custom amount (Min ₹50,000)"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Select
                        id="city-select"
                        label="Location / City *"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, city: e.target.value }));
                          if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                        }}
                        options={GUJARAT_CITIES}
                        error={errors.city}
                      />
                      <p className="text-xs text-ink-400">
                        We currently specialize in Gujarat financing with our primary hub in Ahmedabad.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 3: Employment Profile */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold font-jakarta text-ink-900 mb-1">
                        Employment Profile & Income
                      </h2>
                      <p className="text-sm text-ink-500">
                        Lenders evaluate eligibility based on occupation type and monthly cash flow.
                      </p>
                    </div>

                    {errors.profile && (
                      <p className="text-xs text-red-600 font-semibold">{errors.profile}</p>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      {EMPLOYMENT_PROFILES.map((prof) => {
                        const Icon = prof.icon;
                        const isSelected = formData.profile === prof.id;

                        return (
                          <button
                            type="button"
                            key={prof.id}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, profile: prof.id }));
                              if (errors.profile) setErrors((prev) => ({ ...prev, profile: '' }));
                            }}
                            className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-brand-50/70 border-brand-600 ring-2 ring-brand-600 shadow-sm'
                                : 'bg-white border-line hover:border-brand-300'
                            }`}
                          >
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700'
                              }`}
                            >
                              <Icon size={22} />
                            </div>
                            <div>
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-ink-900">{prof.title}</h3>
                                {isSelected && <Check size={16} className="text-brand-600" />}
                              </div>
                              <p className="text-xs text-ink-500 mt-1">{prof.subtitle}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      <Select
                        id="incomeBand-select"
                        label="Monthly Net Income Band (Optional)"
                        value={formData.incomeBand}
                        onChange={(e) => setFormData((prev) => ({ ...prev, incomeBand: e.target.value }))}
                        options={INCOME_BANDS}
                        hint="Helps us assess eligibility across conservative vs flexible bank policies"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Contact & Consent */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold font-jakarta text-ink-900 mb-1">
                        Contact Details & Preferred Time
                      </h2>
                      <p className="text-sm text-ink-500">
                        We never ask for PAN, Aadhaar or OTPs online. Only your name and number for a callback.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        id="lead-name"
                        name="name"
                        label="Full Name *"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Rajesh Patel"
                        error={errors.name}
                        autoComplete="name"
                      />

                      <Input
                        id="lead-mobile"
                        name="mobile"
                        label="Mobile Number *"
                        type="tel"
                        inputMode="tel"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, mobile: e.target.value }));
                          if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                        }}
                        placeholder="10-digit number (e.g. 9876543210)"
                        error={errors.mobile}
                        autoComplete="tel"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        id="lead-email"
                        name="email"
                        label="Email Address (Optional)"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="e.g. rajesh@example.com"
                        error={errors.email}
                        autoComplete="email"
                      />

                      <div>
                        <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-2">
                          Preferred Callback Window
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {CALLBACK_TIMES.map((time) => (
                            <button
                              type="button"
                              key={time.id}
                              onClick={() => setFormData((prev) => ({ ...prev, preferredTime: time.id }))}
                              className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                                formData.preferredTime === time.id
                                  ? 'bg-brand-50 border-brand-600 text-brand-700 ring-1 ring-brand-600'
                                  : 'bg-white border-line text-ink-700 hover:border-brand-200'
                              }`}
                            >
                              {time.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Honeypot field (hidden) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="honeypot"
                        tabIndex={-1}
                        value={formData.honeypot}
                        onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                      />
                    </div>

                    {/* Consent Checkbox */}
                    <div className="pt-2 border-t border-line">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, consent: e.target.checked }));
                          if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
                        }}
                        error={errors.consent}
                        label={
                          <span className="text-xs text-ink-600 leading-relaxed">
                            I consent to {SITE_CONFIG.brand.name} contacting me via phone, WhatsApp, or email regarding my loan inquiry. I agree to the{' '}
                            <Link to="/privacy" target="_blank" className="text-brand-600 underline font-medium">
                              Privacy Policy
                            </Link>.
                          </span>
                        }
                      />
                    </div>
                  </div>
                )}

                {/* STEP 5: Review & Submit */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold font-jakarta text-ink-900 mb-1">
                        Review Your Application
                      </h2>
                      <p className="text-sm text-ink-500">
                        Please review your details before submitting. You can click Edit to change any section.
                      </p>
                    </div>

                    <div className="bg-mist rounded-2xl p-6 border border-line space-y-4">
                      {/* Section 1 */}
                      <div className="flex items-center justify-between border-b border-line pb-3">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-ink-400 font-semibold block">Loan Category</span>
                          <span className="text-base font-bold text-ink-900">{t(`loans.${formData.loanType as LoanSlug}`)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-xs font-semibold text-brand-600 hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Section 2 */}
                      <div className="flex items-center justify-between border-b border-line pb-3">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-ink-400 font-semibold block">Requirement & City</span>
                          <span className="text-base font-bold text-ink-900">
                            ₹{formatINR(formData.amount)} · {formData.city}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-xs font-semibold text-brand-600 hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Section 3 */}
                      <div className="flex items-center justify-between border-b border-line pb-3">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-ink-400 font-semibold block">Profile</span>
                          <span className="text-base font-bold text-ink-900 capitalize">
                            {formData.profile.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-xs font-semibold text-brand-600 hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Section 4 */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-ink-400 font-semibold block">Applicant Contact</span>
                          <span className="text-base font-bold text-ink-900">
                            {formData.name} · +91 {formData.mobile}
                          </span>
                          <span className="text-xs text-brand-700 block mt-0.5">
                            Window: {formData.preferredTime}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(4)}
                          className="text-xs font-semibold text-brand-600 hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-brand-50 border border-brand-100 flex items-start gap-3">
                      <FileCheck2 size={20} className="text-brand-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-ink-700 leading-relaxed">
                        Ready to connect? By clicking Submit, our relationship manager will receive your request and initiate lender comparison.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form Navigation Controls */}
                <div className="mt-8 pt-6 border-t border-line flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="secondary"
                      className="h-11 px-5 flex items-center gap-1.5"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 5 ? (
                    <Button
                      key={`step-next-${currentStep}`}
                      type="button"
                      onClick={handleNext}
                      className="h-11 px-6 flex items-center gap-2"
                    >
                      {currentStep === 1 && 'Continue to Requirements'}
                      {currentStep === 2 && 'Continue to Profile'}
                      {currentStep === 3 && 'Continue to Contact'}
                      {currentStep === 4 && 'Review Details'}
                      <ArrowRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      key="step-submit-btn"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      className="h-12 px-8 text-base shadow-glow flex items-center gap-2"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Loan Request'}
                      <CheckCircle2 size={18} />
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Sticky Trust & Relationship Manager Panel */}
          <div className="space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Loan Highlight */}
            {selectedLoanMeta && (
              <div className="bg-mist border border-line rounded-2xl p-5 text-xs text-ink-600 space-y-1.5">
                <span className="font-bold text-ink-900 block">Selected: {t(`loans.${selectedLoanMeta.slug}`)}</span>
                <p className="text-ink-500 leading-relaxed">{selectedLoanMeta.featureKey}</p>
              </div>
            )}

            {/* Contact Support Card */}
            <div className="bg-white rounded-3xl p-6 shadow-card border border-line">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-mist text-brand-600 flex items-center justify-center border border-line shadow-xs">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-ink-900">Need Help?</h3>
                  <p className="text-xs font-semibold text-brand-600">Contact Support</p>
                  <p className="text-[11px] text-ink-400">Revolut Money Advisory</p>
                </div>
              </div>

              <p className="text-xs text-ink-600 leading-relaxed mb-5">
                Reach out to our advisory desk for any queries regarding loan options, eligibility, or documentation.
              </p>

              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${SITE_CONFIG.contact.primaryPhone}`}
                    className="inline-flex items-center justify-center gap-2 h-10 px-3 rounded-xl border border-line bg-mist text-ink-800 text-xs font-semibold hover:border-brand-300 hover:text-brand-700 transition-colors"
                  >
                    <Phone size={14} className="text-brand-600" />
                    Call Us
                  </a>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hi%20Revolut%20Money%2C%20I%20have%20a%20loan%20query.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 px-3 rounded-xl border border-line bg-mist text-ink-800 text-xs font-semibold hover:border-brand-300 hover:text-brand-700 transition-colors"
                  >
                    <MessageSquare size={14} className="text-brand-600" />
                    WhatsApp
                  </a>
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.contact.emails.info}`}
                  className="inline-flex items-center justify-center gap-2 h-10 px-3 rounded-xl border border-line bg-mist text-ink-800 text-xs font-semibold hover:border-brand-300 hover:text-brand-700 transition-colors"
                >
                  <MessageSquare size={14} className="text-brand-600" />
                  Email Support
                </a>
              </div>
            </div>

            {/* Advisory Promise */}
            <div className="bg-brand-900 text-white rounded-3xl p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2.5 text-brand-300 text-xs font-bold uppercase tracking-wider">
                <Clock size={16} />
                Our Advisory Promise
              </div>
              <p className="text-xs text-brand-100/90 leading-relaxed">
                We'll call you back strictly during working hours (Mon - Sat, 10:00 AM - 7:00 PM).
              </p>

              <div className="pt-3 border-t border-brand-800 space-y-2 text-xs text-brand-200">
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-brand-400 shrink-0 mt-0.5" />
                  <span>No spam calls or third-party data selling.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-brand-400 shrink-0 mt-0.5" />
                  <span>0 CIBIL score hit for asking questions.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-brand-400 shrink-0 mt-0.5" />
                  <span>We never ask for PAN, Aadhaar or OTPs online.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
