import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Input, Select } from './ui/FormFields';
import { Checkbox } from './ui/Checkbox';
import { Button } from './ui/Button';
import { SITE_CONFIG } from '../config/site';
import { submitLead } from '../lib/leads';
import { loansData } from '../data/loans';
import { useTranslation } from '../i18n';
import { CheckCircle2, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLoan?: string;
  source?: string;
}

export function LeadModal({ isOpen, onClose, defaultLoan, source = 'lead_modal' }: LeadModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loanType, setLoanType] = useState(defaultLoan || 'home-loan');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const loanOptions = [
    { value: '', label: 'Select Loan Type' },
    ...loansData.map((loan) => ({
      value: loan.slug,
      label: t(`loans.${loan.slug}`),
    })),
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      errs.mobile = 'Mobile number is required';
    } else if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!consent) errs.consent = 'Consent is required to receive a callback';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const res = await submitLead({
      source,
      loanType,
      name,
      mobile,
      consent,
      honeypot,
    });
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrors({ form: res.message });
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setMobile('');
    setConsent(false);
    setIsSuccess(false);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleResetAndClose} title="Request a Free Callback" size="md">
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-bold font-jakarta text-ink-900">Inquiry Received!</h3>
          <p className="text-sm text-ink-600 max-w-sm mx-auto">
            Thank you, {name}. Our loan advisor will contact you during working hours (Mon-Sat, 10 AM - 7 PM).
          </p>
          <div className="pt-3">
            <Button onClick={handleResetAndClose} variant="secondary">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-100 rounded-xl p-3 mb-2">
            <PhoneCall size={16} className="shrink-0 text-brand-600" />
            <span>Connect with our Ahmedabad loan advisor with 0 spam and 0 CIBIL hit.</span>
          </div>

          {errors.form && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 form-error-message">
              {errors.form}
            </p>
          )}

          <Input
            id="modal-name"
            label="Full Name *"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            placeholder="e.g. Rahul Patel"
            error={errors.name}
            autoComplete="name"
          />

          <Input
            id="modal-mobile"
            label="Mobile Number *"
            type="tel"
            inputMode="tel"
            maxLength={10}
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
            }}
            placeholder="10-digit mobile number"
            error={errors.mobile}
            autoComplete="tel"
          />

          <Select
            id="modal-loanType"
            label="Loan Requirement"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            options={loanOptions}
          />

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <Checkbox
            id="modal-consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
            }}
            error={errors.consent}
            label={
              <span className="text-xs text-ink-600">
                I agree to receive a callback regarding my loan inquiry. See{' '}
                <Link to="/privacy" target="_blank" className="text-brand-600 underline">
                  Privacy Policy
                </Link>.
              </span>
            }
          />

          <Button
            type="submit"
            className="w-full h-12 text-base mt-2"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Request Callback'}
          </Button>
        </form>
      )}
    </Modal>
  );
}
