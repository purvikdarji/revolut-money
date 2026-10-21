// src/pages/StyleGuidePage.tsx
// Visual reference for every primitive and token.
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Eyebrow, SectionHeading } from "../components/ui/Eyebrow";
import { Input, Select, Textarea, Slider, SegmentedControl, ToggleSwitch, ChipSelector, Stepper } from "../components/ui/FormFields";
import { Tabs, TabList, Tab, TabPanel } from "../components/ui/Tabs";
import { Accordion, AccordionItem } from "../components/ui/Accordion";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { Reveal } from "../components/motion";
import { Logo } from "../components/brand/Logo";
import { formatINR, formatINRShort, formatNumber } from "../lib/format";
import { calculateEMI } from "../lib/emi";
import { ArrowRight, Zap, Star, Heart } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

// â”€â”€â”€ Section divider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SgSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-12 border-b border-line last:border-0">
      <h2 className="h3 text-ink-900 mb-8 pb-4 border-b border-line">{title}</h2>
      {children}
    </section>
  );
}

// â”€â”€â”€ Color swatch â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Swatch({ bg, name, hex }: { bg: string; name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={`h-14 rounded-xl ${bg} border border-black/5`} />
      <p className="text-xs font-semibold text-ink-900">{name}</p>
      <p className="text-xs font-mono text-ink-400">{hex}</p>
    </div>
  );
}

export function StyleGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sliderVal, setSliderVal] = useState(2500000);
  const [segVal, setSegVal] = useState("home");
  const [toggleVal, setToggleVal] = useState(false);
  const [chipVal, setChipVal] = useState<string | string[]>([]);
  const [stepperVal, setStepperVal] = useState(1);
  const { toast } = useToast();

  const accordionItems: AccordionItem[] = [
    { id: "a1", question: "What is an indicative interest rate?", answer: "It is an approximate rate provided for reference. Your lender will confirm the exact rate based on your profile and the Key Fact Statement (KFS)." },
    { id: "a2", question: "Does Revolut Money lend its own money?", answer: "No. Revolut Money is an independent loan advisory and sources loans from partner banks and NBFCs. We do not lend our own funds." },
    { id: "a3", question: "How long does loan processing take?", answer: "Processing timelines vary by lender and loan type. Reach out to us for guidance specific to your requirement." },
  ];

  const emiResult = calculateEMI(5000000, 8.5, 240);

  return (
    <>
      <Helmet>
        <title>{`Style Guide | ${SITE_CONFIG.brand.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Header */}
      <div className="bg-brand-900 pt-32 pb-12">
        <Container>
          <span className="eyebrow text-brand-400 block mb-3">{SITE_CONFIG.brand.name}</span>
          <h1 className="h1 text-white">Design System & Style Guide</h1>
          <p className="text-brand-100/70 mt-3">
            Every primitive, token and component used across the site.
          </p>
        </Container>
      </div>

      <Container className="py-10">

        {/* â”€â”€â”€ Colour tokens â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Colour Tokens">
          <div className="mb-6">
            <p className="text-sm font-semibold text-ink-600 mb-3">Brand Greens</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <Swatch bg="bg-brand-50" name="brand-50" hex="#F1F8F4" />
              <Swatch bg="bg-brand-100" name="brand-100" hex="#DFEEE7" />
              <Swatch bg="bg-brand-400" name="brand-400" hex="#34C27A" />
              <Swatch bg="bg-brand-500" name="brand-500" hex="#0E9A55" />
              <Swatch bg="bg-brand-600" name="brand-600" hex="#00773E" />
              <Swatch bg="bg-brand-700" name="brand-700" hex="#005F31" />
            </div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold text-ink-600 mb-3">Gold Accents (use sparingly)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Swatch bg="bg-gold-300" name="gold-300" hex="#E6CC8A" />
              <Swatch bg="bg-gold-500" name="gold-500" hex="#C9A24B" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-600 mb-3">Ink & Surfaces</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <Swatch bg="bg-ink-900" name="ink-900" hex="#0A1F16" />
              <Swatch bg="bg-ink-600" name="ink-600" hex="#3F5A4C" />
              <Swatch bg="bg-ink-400" name="ink-400" hex="#6E8578" />
              <Swatch bg="bg-[#DCE8E1]" name="line" hex="#DCE8E1" />
              <Swatch bg="bg-mist" name="mist" hex="#F6FAF7" />
              <Swatch bg="bg-white border" name="white" hex="#FFFFFF" />
            </div>
          </div>
        </SgSection>

        {/* â”€â”€â”€ Typography â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Typography">
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs text-ink-400 font-mono">.h1 Â· Plus Jakarta Sans 800 Â· clamp(2.25rem, 5vw+1rem, 4.5rem)</span>
              <p className="h1">The Quick Brown Fox</p>
            </div>
            <div>
              <span className="text-xs text-ink-400 font-mono">.h2 Â· clamp(1.75rem, 3.5vw+.5rem, 3rem)</span>
              <p className="h2">Simplify Your Finances</p>
            </div>
            <div>
              <span className="text-xs text-ink-400 font-mono">.h3</span>
              <p className="h3">Housing Loan Solutions</p>
            </div>
            <div>
              <span className="text-xs text-ink-400 font-mono">.h4</span>
              <p className="h4">Working Capital Loan</p>
            </div>
            <div>
              <span className="text-xs text-ink-400 font-mono">Body Â· Inter 400/1.7</span>
              <p>Revolut Money is an independent loan advisory that sources loans from partner banks and NBFCs. We simplify the borrowing process so you can focus on your goals.</p>
            </div>
            <div>
              <span className="text-xs text-ink-400 font-mono">Eyebrow Â· uppercase 0.28em tracking</span>
              <Eyebrow>Our Services</Eyebrow>
            </div>
            <div>
              <span className="text-xs text-ink-400 font-mono">Gradient text</span>
              <p className="h2 gradient-text">Revolut Money</p>
            </div>
            <div className="bg-brand-900 p-5 rounded-card">
              <span className="text-xs text-brand-400 font-mono">Gujarati (Noto Sans Gujarati)</span>
              <p className="font-gu text-xl text-white mt-1">àª¸àª°àª³ àª§àª¿àª°àª¾àª£, àª¸à«àª®àª¾àª°à«àªŸ àª­àªµàª¿àª·à«àª¯</p>
            </div>
          </div>
        </SgSection>

        {/* â”€â”€â”€ Logo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Logo">
          <div className="flex flex-wrap items-center gap-8">
            <div className="p-4 border border-line rounded-xl">
              <Logo variant="horizontal" tone="color" height={32} />
              <p className="text-xs text-ink-400 mt-2">sm (32px)</p>
            </div>
            <div className="p-4 border border-line rounded-xl">
              <Logo variant="horizontal" tone="color" height={44} />
              <p className="text-xs text-ink-400 mt-2">md (44px)</p>
            </div>
            <div className="p-4 border border-line rounded-xl">
              <Logo variant="horizontal" tone="color" height={56} />
              <p className="text-xs text-ink-400 mt-2">lg (56px)</p>
            </div>
            <div className="p-4 bg-brand-900 rounded-xl">
              <Logo variant="horizontal" tone="white" height={44} />
              <p className="text-xs text-brand-400 mt-2">white tone</p>
            </div>
          </div>
        </SgSection>

        {/* â”€â”€â”€ Buttons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Buttons">
          <div className="flex flex-wrap gap-3 mb-6">
            <Button variant="primary" size="lg">Primary Large</Button>
            <Button variant="primary" size="md">Primary Medium</Button>
            <Button variant="primary" size="sm">Primary Small</Button>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button variant="secondary" size="lg">Secondary Large</Button>
            <Button variant="secondary" size="md">Secondary Medium</Button>
            <Button variant="secondary" size="sm">Secondary Small</Button>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" loading>Loading…</Button>
            <Button variant="primary" success>Success</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" leftIcon={<Zap size={16} />}>With Icon</Button>
            <Button variant="primary" rightIcon={<ArrowRight size={16} />}>Next Step</Button>
            <Button variant="primary" magnetic>Magnetic Hover</Button>
          </div>
          <div className="bg-brand-900 p-5 rounded-card flex flex-wrap gap-3">
            <Button variant="on-dark">On Dark</Button>
            <Button variant="on-dark" leftIcon={<Star size={16} />}>Favourite</Button>
          </div>
        </SgSection>

        {/* â”€â”€â”€ Cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Cards">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Card padding="md" hover elevation={1}>
              <h3 className="h4 text-ink-900 mb-2">Standard Card</h3>
              <p className="text-sm text-ink-600">With hover lift effect enabled. 28px radius echoes the logo frame.</p>
            </Card>
            <Card padding="md" glass elevation={2} className="bg-brand-50">
              <h3 className="h4 text-ink-900 mb-2">Glass Card</h3>
              <p className="text-sm text-ink-600">60% white + backdrop-blur-16px + elev-2 shadow.</p>
            </Card>
            <Card
              padding="lg"
              spotlight
              elevation={3}
              media={<div className="w-full h-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold uppercase tracking-widest">Media Slot</div>}
            >
              <h3 className="h4 text-ink-900 mb-2">Media & Spotlight</h3>
              <p className="text-sm text-ink-600">Card with an image slot, elev-3 shadow, and pointer-following spotlight effect.</p>
              <Badge variant="gold" className="mt-3">Gold Badge</Badge>
            </Card>
          </div>
        </SgSection>

        {/* â”€â”€â”€ Badges â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="brand">Brand</Badge>
            <Badge variant="brand" live>Live Brand</Badge>
            <Badge variant="gold">Gold Accent</Badge>
            <Badge variant="gold" live>Live Gold</Badge>
            <Badge variant="muted">Muted</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="brand"><Star size={10} /> With Icon</Badge>
          </div>
        </SgSection>

        {/* â”€â”€â”€ Section Heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Section Heading">
          <SectionHeading
            eyebrow="Our Services"
            title="Everything you need to <span class='gradient-text'>simplify your loan</span>"
            subtitle="From home loans to working capital â€” we source the right product from 17 partner lenders."
          />
          <div className="bg-brand-900 rounded-card p-8 mt-6">
            <SectionHeading
              eyebrow="Our Services"
              title="Section Heading on Dark"
              subtitle="Supporting text in muted brand-100 tone."
              dark
              centered
            />
          </div>
        </SgSection>

        {/* â”€â”€â”€ Form Fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Form Fields">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            <Input label="Full Name" placeholder=" " value="John Doe" readOnly />
            <Input label="Phone Number" type="tel" error="Enter a valid 10-digit number" prefix="+91" />
            <Input label="Email Address" type="email" suffix="@gmail.com" />
            <Select
              label="Loan Type"
              options={SITE_CONFIG.loanProducts.map((l) => ({ value: l.slug, label: l.name }))}
            />
            <Textarea label="Message" containerClassName="sm:col-span-2" />
          </div>

          <div className="mt-8 flex flex-wrap gap-8 items-start">
            <div>
              <p className="text-sm font-semibold text-ink-900 mb-3">Segmented Control</p>
              <SegmentedControl
                options={[{ label: "Home Loan", value: "home" }, { label: "Business", value: "biz" }]}
                value={segVal}
                onChange={setSegVal}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900 mb-3">Toggle Switch</p>
              <ToggleSwitch checked={toggleVal} onChange={setToggleVal} label="Enable Notifications" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900 mb-3">Stepper</p>
              <Stepper value={stepperVal} onChange={setStepperVal} min={1} max={10} />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-ink-900 mb-3">Chip Selector</p>
            <ChipSelector
              multiple
              options={[{ label: "Employed", value: "emp" }, { label: "Self-Employed", value: "self" }, { label: "NRI", value: "nri" }]}
              value={chipVal}
              onChange={setChipVal}
            />
          </div>

          <div className="mt-8 max-w-lg">
            <Slider
              label="Loan Amount"
              min={100000}
              max={10000000}
              step={100000}
              value={sliderVal}
              onChange={setSliderVal}
              formatValue={(v) => `â‚¹ ${formatINRShort(v)}`}
            />
          </div>
        </SgSection>

        {/* â”€â”€â”€ Tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Tabs">
          <Tabs defaultTab="emi">
            <TabList>
              <Tab id="emi" label="EMI Calculator" />
              <Tab id="eligibility" label="Eligibility" />
              <Tab id="compare" label="Compare" />
            </TabList>
            <TabPanel id="emi" className="mt-4">
              <Card padding="md" className="max-w-md">
                <p className="text-sm text-ink-600 mb-3">Sample EMI for â‚¹50 Lakh @ 8.5% for 20 years:</p>
                <p className="h3 text-brand-600">{formatINR(emiResult.emi)}<span className="text-base text-ink-400 font-normal"> / month</span></p>
                <p className="text-xs text-ink-400 mt-1">Total payment: {formatINR(emiResult.totalPayment)} Â· Interest: {formatINR(emiResult.totalInterest)}</p>
              </Card>
            </TabPanel>
            <TabPanel id="eligibility" className="mt-4">
              <p className="text-ink-600">Eligibility tool â€” coming in a later phase.</p>
            </TabPanel>
            <TabPanel id="compare" className="mt-4">
              <p className="text-ink-600">Comparison tool â€” coming in a later phase.</p>
            </TabPanel>
          </Tabs>
        </SgSection>

        {/* â”€â”€â”€ Accordion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Accordion">
          <div className="max-w-2xl border border-line rounded-card p-4">
            <Accordion items={accordionItems} />
          </div>
        </SgSection>

        {/* â”€â”€â”€ Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Modal">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Sample Modal">
            <p className="text-ink-600 leading-relaxed">
              This is a sample modal component. It supports ESC-to-close, backdrop click, spring entrance animation, and a focus-trapped accessible implementation.
            </p>
            <div className="mt-5 flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </SgSection>

        {/* â”€â”€â”€ Toast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Toast Notifications">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => toast({ type: "success", title: "Enquiry submitted!", message: "We'll contact you within 1 business day." })}
            >
              Success Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast({ type: "error", title: "Something went wrong", message: "Please try again or call us." })}
            >
              Error Toast
            </Button>
            <Button
              variant="ghost"
              onClick={() => toast({ type: "info", title: "Note", message: "Rates are indicative and subject to change." })}
            >
              Info Toast
            </Button>
          </div>
        </SgSection>

        {/* â”€â”€â”€ Language Toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Language Toggle">
          <div className="flex flex-wrap items-center gap-5">
            <div>
              <p className="text-xs text-ink-400 mb-2">Light</p>
              <LanguageToggle />
            </div>
            <div className="bg-brand-900 p-4 rounded-xl">
              <p className="text-xs text-brand-400 mb-2">Dark</p>
              <LanguageToggle onDark />
            </div>
          </div>
        </SgSection>

        {/* â”€â”€â”€ Format utilities â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Format Utilities (src/lib/format.ts)">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {[
              { label: "formatINR(2500000)", value: formatINR(2500000) },
              { label: "formatINRShort(2500000)", value: formatINRShort(2500000) },
              { label: "formatINRShort(15000000)", value: formatINRShort(15000000) },
              { label: "formatNumber(2500000)", value: formatNumber(2500000) },
            ].map((item) => (
              <Card key={item.label} padding="sm">
                <p className="text-xs font-mono text-ink-400 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-brand-600">{item.value}</p>
              </Card>
            ))}
          </div>
        </SgSection>

        {/* â”€â”€â”€ Reveal animations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Reveal Animations">
          <p className="text-sm text-ink-400 mb-6">Scroll down to trigger â€” respects prefers-reduced-motion.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {["Fade Up 1", "Fade Up 2", "Fade Up 3"].map((label, i) => (
              <Reveal delay={i * 0.08} key={label}>
                <Card padding="md" className="text-center">
                  <p className="font-semibold text-ink-900">{label}</p>
                  <p className="text-sm text-ink-400 mt-1">Stagger delay {i * 80}ms</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </SgSection>

        {/* â”€â”€â”€ Gradients â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <SgSection title="Gradients & Shadow">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="h-24 rounded-card" style={{ background: "var(--gradient-cta)" }}>
              <p className="text-white font-semibold text-sm p-4">CTA Gradient</p>
            </div>
            <div className="h-24 rounded-card" style={{ background: "var(--gradient-hero)", minHeight: "96px" }}>
              <p className="text-white font-semibold text-sm p-4">Hero Mesh</p>
            </div>
            <div className="h-24 rounded-card bg-white" style={{ boxShadow: "var(--shadow-card)" }}>
              <p className="text-ink-600 font-semibold text-sm p-4">Card Shadow</p>
            </div>
          </div>
        </SgSection>
        {/* UI-2: Elevation Scale */}
        <SgSection title="UI-2 · Elevation Scale">
          <p className="text-sm text-ink-400 mb-6">4 levels: flat → raised → floating → overlay. Shadows tinted from brand-900.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Flat (0)", shadow: "var(--elev-0)", note: "Page surface" },
              { label: "Raised (1)", shadow: "var(--elev-1)", note: "Card at rest" },
              { label: "Floating (2)", shadow: "var(--elev-2)", note: "Card hover" },
              { label: "Overlay (3)", shadow: "var(--elev-3)", note: "Modal" },
            ].map(({ label, shadow, note }) => (
              <div key={label} className="bg-white rounded-card p-5 flex flex-col gap-2" style={{ boxShadow: shadow, border: "1px solid var(--line)" }}>
                <p className="font-semibold text-sm text-ink-900">{label}</p>
                <p className="text-xs text-ink-400">{note}</p>
              </div>
            ))}
          </div>
        </SgSection>

        {/* UI-2: Surface Roles */}
        <SgSection title="UI-2 · Surface Roles">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {([
              ["surf-card", "surf-card", "Raised + inner highlight", false],
              ["surf-floating", "surf-floating", "Deeper shadow", false],
              ["surf-mist border border-line", "surf-mist", "F6FAF7 bg", false],
              ["surf-glass", "surf-glass", "Backdrop blur + fallback", false],
              ["surf-inverse", "surf-inverse", "brand-900 bg", true],
              ["surf-inverse surf-glass-dark", "surf-glass-dark", "Glass on dark", true],
            ] as [string,string,string,boolean][]).map(([cls, label, note, dark]) => (
              <div key={label} className={cls + " rounded-card p-5"}>
                <p className={"font-semibold text-sm " + (dark ? "text-white" : "text-ink-900")}>{label}</p>
                <p className={"text-xs mt-1 " + (dark ? "text-brand-100" : "text-ink-400")}>{note}</p>
              </div>
            ))}
          </div>
        </SgSection>

        {/* UI-2: Gradient Hairline Borders */}
        <SgSection title="UI-2 · Gradient Hairline Borders">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="border-gradient p-6 bg-white">
              <p className="font-semibold text-sm text-ink-900">border-gradient (light card)</p>
              <p className="text-xs text-ink-400 mt-1">135° white to line to brand-600/20%</p>
            </div>
            <div className="border-gradient-dark p-6 bg-brand-900 rounded-card">
              <p className="font-semibold text-sm text-white">border-gradient-dark</p>
              <p className="text-xs text-brand-100 mt-1">white/18% to white/4%</p>
            </div>
          </div>
        </SgSection>

        {/* UI-2: Typography Refinements */}
        <SgSection title="UI-2 · Typography Refinements">
          <div className="space-y-8 max-w-2xl">
            <div>
              <p className="caption mb-2">lead paragraph</p>
              <p className="lead">Revolut Money helps you compare and secure the right loan from associate banks and NBFCs — independently, without bias.</p>
            </div>
            <div>
              <p className="caption mb-2">tabular-nums — money, rates, counters</p>
              <p className="num text-3xl font-bold text-ink-900">₹ 52,50,000 @ 8.75% p.a.</p>
            </div>
            <div>
              <p className="caption mb-2">highlight-gold (sparingly — one per section)</p>
              <p className="text-2xl font-bold text-ink-900">Compare loans across <span className="highlight-gold">17</span> partner lenders.</p>
            </div>
            <div>
              <p className="caption mb-2">underline-gold</p>
              <p className="text-xl font-semibold text-ink-900">Truly <span className="underline-gold">independent</span> advisory.</p>
            </div>
            <div>
              <p className="caption mb-2">eyebrow-dot variant</p>
              <span className="eyebrow eyebrow-dot">Why Choose Us</span>
            </div>
            <div>
              <p className="caption mb-2">Gujarati safety (line-height 1.7, no tracking, no uppercase)</p>
              <p className="font-gu text-lg text-ink-900">Revolut Money અમદાવાદ સ્થિત એક સ્વતંત્ર લોન સલાહ­કાર છે. અમે ભાગીદાર બેંકો અને NBFCs સાથે મળીને તમારી સહાય કરીએ છીએ.</p>
            </div>
          </div>
        </SgSection>

        {/* UI-2: Background Patterns */}
        <SgSection title="UI-2 · Subtle Background Patterns">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="pattern-dots h-32 rounded-card border border-line flex items-center justify-center">
              <p className="font-semibold text-sm text-ink-600 bg-white/80 px-3 py-1 rounded-pill">pattern-dots</p>
            </div>
            <div className="pattern-lines h-32 rounded-card border border-line bg-mist flex items-center justify-center">
              <p className="font-semibold text-sm text-ink-600 bg-white/80 px-3 py-1 rounded-pill">pattern-lines</p>
            </div>
          </div>
        </SgSection>

        {/* UI-2: Noise + Glow */}
        <SgSection title="UI-2 · Noise and Glow">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="noise-overlay bg-brand-900 h-36 rounded-card flex items-center justify-center">
              <p className="text-white font-semibold text-sm relative z-10">noise-overlay (3%)</p>
            </div>
            <div className="glow-primary bg-brand-900 h-36 rounded-card overflow-hidden flex items-center justify-center">
              <p className="text-white font-semibold text-sm relative z-10">glow-primary</p>
            </div>
            <div className="glow-both bg-brand-900 h-36 rounded-card overflow-hidden flex items-center justify-center">
              <p className="text-white font-semibold text-sm relative z-10">glow-both</p>
            </div>
          </div>
        </SgSection>
      </Container>
    </>
  );
}

