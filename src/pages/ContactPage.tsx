import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Navigation, 
  ShieldCheck, 
  Building,
  Headphones,
  Users
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/FormFields';
import { Checkbox } from '../components/ui/Checkbox';
import { SITE_CONFIG } from '../config/site';
import { submitLead, LeadPayload } from '../lib/leads';
import { trackEvent } from '../lib/analytics';
import { cn } from '../lib/cn';
import { Link } from 'react-router-dom';
import { MapSkeleton } from '../components/ui/Skeleton';
import { FramedImage } from '../components/image/FramedImage';

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export function ContactPage() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: '',
    consent: false,
    honeypot: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  // Dynamic Open/Closed Status for Ahmedabad IST (Mon-Sat, 10:00 to 19:00)
  const isWorkingHours = () => {
    try {
      const now = new Date();
      // UTC to IST (+5:30)
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const day = istTime.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const hour = istTime.getHours();
      
      // Mon-Sat: 1-6
      const isWorkDay = day >= 1 && day <= 6;
      // 10 AM to 7 PM (19:00)
      const isWorkHour = hour >= 10 && hour < 19;
      
      return isWorkDay && isWorkHour;
    } catch {
      return true; // Default fallback to open
    }
  };

  const isOpenNow = isWorkingHours();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!formData.consent) newErrors.consent = 'You must give consent to be contacted';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      source: 'contact_form',
      name: formData.name,
      mobile: formData.mobile,
      message: formData.message,
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
    } else {
      setErrors({ form: result.message });
    }
  };

  const handleCall = () => {
    trackEvent('call_click', { source: 'contact_page' });
    window.location.href = `tel:${SITE_CONFIG.contact.primaryPhone}`;
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'contact_page' });
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hi%20Revolut%20Money%2C%20I%20would%20like%20to%20connect%20with%20your%20loan%20advisors.`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${SITE_CONFIG.contact.emails.info}?subject=Inquiry%20from%20Website`;
  };

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=Ganesh+Glory+Jagatpur+Chenpur+Road+Ahmedabad', '_blank');
  };

  return (
    <div className="bg-mist min-h-screen pb-24">
      <Helmet>
        <title>Contact Us | {SITE_CONFIG.brand.name} Ahmedabad</title>
        <meta name="description" content={`Connect with ${SITE_CONFIG.brand.name} in Ahmedabad. Office address, working hours, phone, and quick loan consultation.`} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-brand-950 text-white pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500 via-transparent to-transparent" />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-800/80 border border-brand-700/60 text-brand-200 text-xs font-semibold uppercase tracking-wider mb-6">
                <ShieldCheck size={14} className="text-gold-400" />
                Advisory Desk · Ahmedabad, Gujarat
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-jakarta text-white tracking-tight mb-6 leading-tight">
                Get in <span className="text-brand-300">Touch</span>
              </h1>
              <p className="text-base md:text-lg text-brand-100/90 leading-relaxed mb-8">
                Have questions about loan options, eligibility or documentation? Connect directly with our Ahmedabad advisors for a personalized, transparent consultation.
              </p>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="max-w-[420px] ml-auto relative">
                <FramedImage
                  id="p01"
                  ratio="4/3"
                  withFrame={true}
                  sizes="420px"
                  glow={true}
                  alt="Financial advisor consultation"
                  chips={[
                    { icon: <Headphones size={14} />, text: "Direct support" },
                    { icon: <Users size={14} />, text: "Expert guidance" }
                  ]}
                />
                <p className="illustrative-caption mt-2 ml-1 text-white/40" aria-hidden="true">
                  Illustrative image
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Action Grid */}
      <Container className="mt-[-24px] relative z-20 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={handleCall}
            className="p-5 rounded-2xl bg-white border border-line shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center mb-3 group-hover:bg-brand-600 group-hover:text-white transition-colors">
              <Phone size={20} />
            </div>
            <div>
              <span className="text-xs font-semibold text-ink-400 block uppercase tracking-wider">Direct Call</span>
              <span className="text-sm font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                {SITE_CONFIG.contact.primaryPhoneDisplay}
              </span>
            </div>
          </button>

          <button
            onClick={handleWhatsApp}
            className="p-5 rounded-2xl bg-white border border-line shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageSquare size={20} />
            </div>
            <div>
              <span className="text-xs font-semibold text-ink-400 block uppercase tracking-wider">WhatsApp</span>
              <span className="text-sm font-bold text-ink-900 group-hover:text-emerald-700 transition-colors">
                Chat Directly
              </span>
            </div>
          </button>

          <button
            onClick={handleEmail}
            className="p-5 rounded-2xl bg-white border border-line shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Mail size={20} />
            </div>
            <div>
              <span className="text-xs font-semibold text-ink-400 block uppercase tracking-wider">Email</span>
              <span className="text-sm font-bold text-ink-900 group-hover:text-blue-700 transition-colors">
                {SITE_CONFIG.contact.emails.info}
              </span>
            </div>
          </button>

          <button
            onClick={handleDirections}
            className="p-5 rounded-2xl bg-white border border-line shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Navigation size={20} />
            </div>
            <div>
              <span className="text-xs font-semibold text-ink-400 block uppercase tracking-wider">Directions</span>
              <span className="text-sm font-bold text-ink-900 group-hover:text-amber-700 transition-colors">
                Google Maps
              </span>
            </div>
          </button>
        </div>
      </Container>

      {/* Contact Details & Form */}
      <Container className="relative z-20 mb-16">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          
          {/* Left Column: Office & Hours */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-line space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <h2 className="text-xl font-bold font-jakarta text-ink-900">Office Information</h2>
                <span className={cn(
                  "text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5",
                  isOpenNow ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                )}>
                  <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  {isOpenNow ? "Open Now (until 7:00 PM)" : "Closed (Opens 10:00 AM)"}
                </span>
              </div>
              
              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 border border-brand-100">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-900 mb-0.5">Office Address</h3>
                    <p className="text-ink-600 leading-relaxed">
                      {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2},<br />
                      Navrangpura, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} - {SITE_CONFIG.address.pincode}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 border border-brand-100">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-900 mb-0.5">Working Hours</h3>
                    <p className="text-ink-600 font-medium">Monday - Saturday: 10:00 AM – 7:00 PM IST</p>
                    <p className="text-xs text-ink-400 mt-0.5">Closed on Sundays and National Holidays</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 border border-brand-100">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-900 mb-0.5">Advisory Helpline</h3>
                    <a href={`tel:${SITE_CONFIG.contact.primaryPhone}`} className="text-brand-700 font-bold hover:underline">
                      {SITE_CONFIG.contact.primaryPhoneDisplay}
                    </a>
                    <span className="text-xs text-ink-400 block mt-0.5">Direct connection to our senior relationship desk</span>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-100">
                    <InstagramIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-900 mb-0.5">Instagram</h3>
                    <a
                      href={SITE_CONFIG.socialLinks.instagram || "https://www.instagram.com/revolut__money"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 font-bold hover:underline"
                    >
                      @revolut__money
                    </a>
                    <span className="text-xs text-ink-400 block mt-0.5">Follow our loan insights and official announcements</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Us & Landmark Guidance */}
            <div className="bg-brand-900 text-white rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider">
                <Building size={16} />
                Visit Us in Ahmedabad
              </div>
              <h3 className="text-lg font-bold font-jakarta text-white">
                Landmark & Directions
              </h3>
              <p className="text-sm text-brand-100/90 leading-relaxed">
                Ganesh Glory, near BSNL Office, Jagatpur-Chenpur Road, Ahmedabad. Easy connectivity via SG Highway and Sardar Patel Ring Road. Visitor parking is available at the premises.
              </p>
              <div className="pt-2">
                <Button
                  onClick={handleDirections}
                  variant="on-dark"
                  size="sm"
                  className="inline-flex items-center gap-2 text-xs"
                >
                  <Navigation size={14} />
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-card border border-line">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold font-jakarta text-ink-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-ink-600 text-sm mb-6 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our advisor will get in touch with you during our working hours.
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
                    Continue on WhatsApp
                  </Button>
                )}
                <Button onClick={() => setIsSuccess(false)} variant="secondary" className="w-full sm:w-auto">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold font-jakarta text-ink-900 mb-1">Send us a Message</h2>
                  <p className="text-xs text-ink-500">
                    We respond within 2 working hours. We respect your privacy.
                  </p>
                </div>

                {errors.form && (
                  <p className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-semibold">
                    {errors.form}
                  </p>
                )}

                <Input
                  id="contact-name"
                  name="name"
                  label="Full Name *"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  error={errors.name}
                  placeholder="e.g. Sneha Shah"
                  autoComplete="name"
                />
                
                <Input
                  id="contact-mobile"
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
                  error={errors.mobile}
                  placeholder="10-digit number (e.g. 9898989898)"
                  autoComplete="tel"
                />

                <Textarea
                  id="contact-message"
                  name="message"
                  label="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about the loan type, amount, or property questions you have..."
                  rows={3}
                />

                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    value={formData.honeypot}
                    onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                  />
                </div>

                <div className="pt-2">
                  <Checkbox
                    id="contact-consent"
                    checked={formData.consent}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, consent: e.target.checked }));
                      if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
                    }}
                    error={errors.consent}
                    label={
                      <span className="text-xs text-ink-600">
                        I consent to Revolut Money contacting me regarding my inquiry. See{' '}
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>

      {/* Map Section with SVG Fallback */}
      <Container>
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-line overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold font-jakarta text-ink-900">Locate Our Ahmedabad Advisory Desk</h2>
              <p className="text-xs text-ink-500">Ganesh Glory, Jagatpur-Chenpur Road, Ahmedabad</p>
            </div>
            <Button
              onClick={handleDirections}
              variant="secondary"
              size="sm"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Navigation size={14} />
              Get Driving Directions
            </Button>
          </div>

          <div className="w-full h-[360px] rounded-2xl overflow-hidden border border-line bg-mist relative">
            {!isMapLoaded && (
              <div className="absolute inset-0 z-10">
                <MapSkeleton className="h-full rounded-none" />
              </div>
            )}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117462.63945417855!2d72.48512411681283!3d23.078491829621645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              onLoad={() => setIsMapLoaded(true)}
              referrerPolicy="no-referrer-when-downgrade"
              title="Revolut Money Ahmedabad Office"
              className={`w-full h-full transition-opacity duration-500 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
