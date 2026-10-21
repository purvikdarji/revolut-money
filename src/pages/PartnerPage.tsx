import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Input, Select, Textarea } from '../components/ui/FormFields';
import { Checkbox } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import { submitLead, LeadPayload } from '../lib/leads';
import { trackEvent } from '../lib/analytics';
import { SITE_CONFIG } from '../config/site';
import { Handshake, UserCheck, ShieldCheck, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const PARTNER_PROFESSIONS = [
  { value: 'Chartered Accountant (CA)', label: 'Chartered Accountant (CA)' },
  { value: 'Real Estate Builder / Developer', label: 'Real Estate Builder / Developer' },
  { value: 'Real Estate Agent / Broker', label: 'Real Estate Agent / Broker' },
  { value: 'Financial Advisor / Wealth Manager', label: 'Financial Advisor / Wealth Manager' },
  { value: 'Direct Selling Agent (DSA)', label: 'Direct Selling Agent (DSA)' },
  { value: 'Car Dealer / Showroom Associate', label: 'Car Dealer / Showroom Associate' },
  { value: 'Other Professional', label: 'Other Professional' },
];

export function PartnerPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    profession: 'Chartered Accountant (CA)',
    city: 'Ahmedabad',
    message: '',
    consent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!formData.profession) newErrors.profession = 'Please select your profession';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.consent) newErrors.consent = 'Consent is required to submit your partner inquiry';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    const payload: LeadPayload = {
      source: 'partner',
      name: formData.name,
      mobile: formData.mobile,
      city: formData.city,
      profile: formData.profession,
      message: formData.message || `Partner Application from ${formData.profession} in ${formData.city}`,
      consent: formData.consent,
      honeypot: formData.honeypot
    };

    const result = await submitLead(payload);
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      if (result.fallbackUrl) {
        setFallbackUrl(result.fallbackUrl);
      }
      trackEvent('lead_submit', { source: 'partner', profession: formData.profession });
    } else {
      setErrors({ form: result.message });
    }
  };

  return (
    <div className="bg-mist min-h-screen pb-24">
      <Helmet>
        <title>Partner With Us | {SITE_CONFIG.brand.name} Ahmedabad</title>
        <meta
          name="description"
          content="Referral partnership with Revolut Money for CAs, real-estate builders, brokers, and financial advisors in Gujarat."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-brand-950 text-white pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500 via-transparent to-transparent" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-800/80 border border-brand-700/60 text-brand-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Handshake size={14} className="text-gold-400" />
            Institutional & Referral Network
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-jakarta text-white tracking-tight mb-3">
            Partner With <span className="text-brand-300">{SITE_CONFIG.brand.name}</span>
          </h1>
          <p className="text-sm md:text-base text-brand-100/90 max-w-2xl mx-auto">
            Collaborate with Ahmedabad's trusted loan advisory desk. We assist your clients with multi-bank loan comparison and smooth disbursement coordination.
          </p>
        </Container>
      </section>

      {/* Content & Form */}
      <Container className="mt-[-28px] relative z-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          
          {/* Left Column: 3 Cautiously Written Benefit Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-line">
              <h2 className="text-xl font-bold font-jakarta text-ink-900 mb-2">How Partnership Works</h2>
              <p className="text-xs text-ink-500 mb-6">
                Designed for CAs, builders, real-estate agents, and financial advisors seeking reliable lending support for their clients.
              </p>
              
              <div className="space-y-6 text-sm">
                {/* Benefit 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 border border-brand-100">
                    <UserCheck size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink-900 mb-1">Dedicated Loan Coordination</h3>
                    <p className="text-ink-600 leading-relaxed text-xs">
                      We coordinate file login, documentation checks, and multi-bank options so your clients experience a hassle-free loan process.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 border border-brand-100">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink-900 mb-1">Transparent Case Tracking</h3>
                    <p className="text-ink-600 leading-relaxed text-xs">
                      Talk to us about how the partnership works. We provide prompt updates on every stage of your referred cases from login to disbursement.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 border border-brand-100">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink-900 mb-1">Quick Turnaround Support</h3>
                    <p className="text-ink-600 leading-relaxed text-xs">
                      Our experienced advisors understand lender credit policies and help structure proposals to avoid preventable rejections or delays.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note Panel */}
            <div className="bg-brand-900 text-white rounded-3xl p-6 shadow-card space-y-2 text-xs">
              <span className="font-bold text-brand-300 uppercase tracking-wider block">Advisory Note</span>
              <p className="text-brand-100/90 leading-relaxed">
                Revolut Money is a loan advisory firm and loan distributor in Ahmedabad, NOT a bank or NBFC. All loan sanctions are strictly subject to lender credit policies.
              </p>
            </div>
          </div>
          
          {/* Right Column: Partner Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-card border border-line">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold font-jakarta text-ink-900 mb-2">Partnership Request Received!</h3>
                <p className="text-ink-600 text-sm mb-6 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our senior advisory desk will review your details and reach out to discuss partnership terms.
                </p>
                {fallbackUrl && (
                  <Button
                    as="a"
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 w-full sm:w-auto flex items-center gap-2"
                  >
                    <MessageSquare size={18} />
                    Connect on WhatsApp
                  </Button>
                )}
                <Button onClick={() => setIsSuccess(false)} variant="secondary" className="w-full sm:w-auto">
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold font-jakarta text-ink-900 mb-1">Join as a Partner</h2>
                  <p className="text-xs text-ink-500">
                    Fill out the form below. We will schedule a discussion about our partnership framework.
                  </p>
                </div>

                {errors.form && (
                  <p className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-semibold">
                    {errors.form}
                  </p>
                )}

                <Input
                  id="name"
                  name="name"
                  label="Your Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="e.g. Amit Trivedi"
                  autoComplete="name"
                />

                <Input
                  id="mobile"
                  name="mobile"
                  label="Mobile Number *"
                  type="tel"
                  inputMode="tel"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleChange}
                  error={errors.mobile}
                  placeholder="10-digit number (e.g. 9825098250)"
                  autoComplete="tel"
                />

                <Select
                  id="profession"
                  label="Your Profession / Category *"
                  value={formData.profession}
                  onChange={handleChange}
                  options={PARTNER_PROFESSIONS}
                  error={errors.profession}
                />

                <Input
                  id="city"
                  name="city"
                  label="Operating City *"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  placeholder="e.g. Ahmedabad, Gandhinagar"
                />

                <Textarea
                  id="message"
                  name="message"
                  label="Brief Notes / Client Base (Optional)"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about the primary loan products or client segment you cater to..."
                  rows={2}
                />

                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    value={formData.honeypot}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    error={errors.consent}
                    label={
                      <span className="text-xs text-ink-600">
                        I confirm the information is accurate and I agree to be contacted by Revolut Money. See{' '}
                        <Link to="/privacy" target="_blank" className="text-brand-600 underline">
                          Privacy Policy
                        </Link>.
                      </span>
                    }
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base mt-2" 
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Partner Inquiry'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
