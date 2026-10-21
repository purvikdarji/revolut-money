// src/config/site.ts
// Single source of truth for all business facts.
// Items marked [CONFIRM] must be verified before going live.

export const SITE_CONFIG = {
  brand: {
    name: "Revolut Money",
    tagline: "Simplify your finances",
    domain: "revolutmoney.com",
    url: "https://www.revolutmoney.com",
    logoFile: "/logo.png", // Place your logo PNG at /public/logo.png (SVG fallback: /logo.svg)
    faviconFile: "/favicon.ico",
  },

  contact: {
    primaryPhone: "+919081645552", // Primary call & WhatsApp
    primaryPhoneDisplay: "+91 90816 45552",
    officePhone: "+919081645552",
    officePhoneDisplay: "+91 90816 45552",
    whatsappNumber: "919081645552",
    emails: {
      info: "info@revolutmoney.com",
      yash: "info@revolutmoney.com",
    },
    relationshipManager: {
      name: "Yash Darji",
      title: "Relationship Manager",
      phone: "+919081645552",
      email: "info@revolutmoney.com",
    },
  },

  address: {
    line1: "113, Ganesh Glory",
    line2: "Nr. BSNL Office, Jagatpur-Chenpur Road",
    city: "Jagatpur, Ahmedabad",
    state: "Gujarat",
    pincode: "382470",
    full: "113, Ganesh Glory, Nr. BSNL Office, Jagatpur-Chenpur Road, Jagatpur, Ahmedabad – 382470, Gujarat",
  },

  workingHours: {
    days: "Monday – Saturday", // [CONFIRM]
    hours: "10:00 AM – 7:00 PM", // [CONFIRM]
    note: "Closed on Sundays and public holidays",
  },

  // Fee model: "unknown" | "free" | "paid" | "varies"
  // NEVER display "free service" or "no fees" unless this equals "free"
  feeModel: "unknown" as "unknown" | "free" | "paid" | "varies",

  // Stats: keep null until verified; null values are hidden everywhere in UI
  stats: {
    yearsExperience: null as number | null,
    loansFacilitated: null as number | null,
    happyCustomers: null as number | null,
  },

  // SEO / Reviews
  googleReviewUrl: null as string | null, // [CONFIRM] – add Google Business profile URL
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.0!2d72.6!3d23.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGanesh+Glory+Jagatpur+Ahmedabad!5e0!3m2!1sen!2sin!4v1000000000000", // [CONFIRM] – replace with real embed URL from Google Maps

  // Indicative rates – September 2026; lender rates subject to change
  ratesAsOf: "September 2026",
  indicativeRates: {
    homeLoanFrom: "7.10%", // [CONFIRM] – verify with lending partners before publishing
    lapFrom: null as string | null, // "Rates on request"
    autoLoanFrom: null as string | null,
    workingCapitalFrom: null as string | null,
    projectFinanceFrom: null as string | null,
    businessLoanFrom: null as string | null,
    educationLoanFrom: null as string | null,
    personalLoanFrom: null as string | null,
    balanceTransferFrom: null as string | null,
    topUpLoanFrom: null as string | null,
    commercialPropertyFrom: null as string | null,
  },

  // Analytics – null = disabled
  analyticsIds: {
    googleAnalytics: null as string | null, // [CONFIRM] – GA4 Measurement ID
    clarityId: null as string | null, // [CONFIRM] – optional Microsoft Clarity
  },

  // Lead submission endpoint (external form processor)
  submitLeadEndpoint: null as string | null, // [CONFIRM] – e.g., Formspree / make.com URL

  // Social links – add URL strings when profiles are created
  socialLinks: {
    facebook: null as string | null, // [CONFIRM]
    instagram: "https://www.instagram.com/revolut__money",
    linkedin: null as string | null, // [CONFIRM]
    youtube: null as string | null, // [CONFIRM]
    twitter: null as string | null, // [CONFIRM]
  },

  // Grievance officer
  grievanceOfficer: {
    name: "Grievance Officer",
    email: "info@revolutmoney.com",
    phone: "+91 90816 45552",
  },

  // Lending partners – neutral alphabetical-ish order, no ranking implied
  lendingPartners: [
    "HDFC Bank",
    "Axis Bank",
    "ICICI Bank",
    "L&T Finance",
    "Bank of India",
    "Bank of Baroda",
    "State Bank of India",
    "Kotak Mahindra Bank",
    "Union Bank of India",
    "Capri Global (Capri Loans)",
    "Aditya Birla Housing Finance",
    "Punjab National Bank",
    "Bajaj Finserv",
    "Hero FinCorp",
    "Yes Bank",
    "Truhome Finance",
    "Tata Capital",
  ] as string[],

  // All loan product slugs and display names
  loanProducts: [
    {
      slug: "home-loan",
      name: "Housing Loan",
      nameGu: "હોમ લોન",
      core: true,
      icon: "Home",
    },
    {
      slug: "loan-against-property",
      name: "Loan Against Property",
      nameGu: "મિલ્કત સામે લોન",
      core: true,
      icon: "Building2",
    },
    {
      slug: "auto-loan",
      name: "Auto / Car Loan",
      nameGu: "ઓટો / કાર લોન",
      core: true,
      icon: "Car",
    },
    {
      slug: "working-capital",
      name: "Working Capital Loan",
      nameGu: "વર્કિંગ કેપિટલ લોન",
      core: true,
      icon: "TrendingUp",
    },
    {
      slug: "project-finance",
      name: "Project Finance Loan",
      nameGu: "પ્રોજેક્ટ ફાઇનાન્સ",
      core: true,
      icon: "BarChart3",
    },
    {
      slug: "commercial-property",
      name: "Commercial Property Loan",
      nameGu: "કોમર્શિયલ પ્રોપર્ટી લોન",
      core: false,
      icon: "Warehouse",
    },
    {
      slug: "business-loan",
      name: "Business Loan",
      nameGu: "બિઝનેસ લોન",
      core: false,
      icon: "Briefcase",
    },
    {
      slug: "education-loan",
      name: "Education Loan",
      nameGu: "એજ્યુકેશન લોન",
      core: false,
      icon: "GraduationCap",
    },
    {
      slug: "personal-loan",
      name: "Personal Loan",
      nameGu: "પર્સનલ લોન",
      core: false,
      icon: "User",
    },
    {
      slug: "balance-transfer",
      name: "Balance Transfer Loan",
      nameGu: "બેલેન્સ ટ્રાન્સફર",
      core: false,
      icon: "ArrowLeftRight",
    },
    {
      slug: "top-up-loan",
      name: "Top-Up Loan",
      nameGu: "ટોપ-અપ લોન",
      core: false,
      icon: "Plus",
    },
  ],

  // Legal disclaimer (exact copy per brief)
  legalDisclaimer:
    "Revolut Money is an independent loan advisory service and is not a bank or NBFC. Loans are sanctioned solely at the discretion of the lending partner, subject to its eligibility criteria, credit policy and documentation. Interest rates, fees and tenures are indicative and may change. Your lender will provide a Key Fact Statement (KFS) before you sign. Bank and NBFC names and logos belong to their respective owners and are shown only to indicate associate partnerships.",

  // Routes
  nav: {
    main: [
      { label: "Loans", labelGu: "લોન", href: "/loans", hasMega: true },
      { label: "Tools", labelGu: "ટૂલ્સ", href: "/tools" },
      { label: "Partners", labelGu: "ભાગીદારો", href: "/partners" },
      { label: "About", labelGu: "અમારા વિશે", href: "/about" },
      { label: "Insights", labelGu: "ઇનસાઇટ્સ", href: "/insights" },
      { label: "Contact", labelGu: "સંપર્ક", href: "/contact" },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
