import { TranslationKeys } from "../i18n/en";
import { PictogramName } from "../assets/ui/Pictogram";

export type LoanSlug = keyof TranslationKeys["loans"];

export type LoanCategory = "Property" | "Vehicle" | "Business" | "Personal";

export interface LoanMetadata {
  slug: LoanSlug;
  icon: PictogramName;
  colorClass: string;
  category: LoanCategory;
  popular?: boolean;
  featureKey: string;
  featureKeyGu: string;
}

export const loansData: LoanMetadata[] = [
  {
    slug: "home-loan",
    icon: "home-loan",
    colorClass: "text-brand-600 bg-brand-50 border-brand-100",
    category: "Property",
    popular: true,
    featureKey: "Purchase, construct, or renovate your home with flexible tenures up to 30 years.",
    featureKeyGu: "તમારા ઘરની ખરીદી, બાંધકામ કે નવીનીકરણ માટે 30 વર્ષ સુધીની મુદત સાથેની લોન."
  },
  {
    slug: "loan-against-property",
    icon: "loan-against-property",
    colorClass: "text-brand-700 bg-brand-100/70 border-brand-200",
    category: "Property",
    popular: true,
    featureKey: "Leverage your property's value for substantial funding at competitive mortgage rates.",
    featureKeyGu: "સ્પર્ધાત્મક મોર્ગેજ દરે મોટી રકમનું ભંડોળ મેળવવા તમારી મિલકતનો ઉપયોગ કરો."
  },
  {
    slug: "business-loan",
    icon: "business-loan",
    colorClass: "text-brand-800 bg-brand-50 border-brand-100",
    category: "Business",
    popular: true,
    featureKey: "Unsecured and secured funding to power business expansion, equipment, or working capital.",
    featureKeyGu: "વ્યવસાય વિસ્તરણ, મશીનરી અથવા કાર્યકારી મૂડી માટે સુરક્ષિત અને અસુરક્ષિત લોન."
  },
  {
    slug: "working-capital",
    icon: "working-capital",
    colorClass: "text-emerald-700 bg-emerald-50 border-emerald-100",
    category: "Business",
    featureKey: "Cash credit, overdraft facilities, and short-term lines to optimize daily operational cashflow.",
    featureKeyGu: "દૈનિક કામગીરી અને રોકડ પ્રવાહ સુવ્યવસ્થિત રાખવા કેશ ક્રેડિટ અને ઓવરડ્રાફ્ટ સુવિધા."
  },
  {
    slug: "project-finance",
    icon: "project-finance",
    colorClass: "text-amber-700 bg-amber-50 border-amber-100",
    category: "Business",
    featureKey: "Long-term debt structuring for industrial units, manufacturing setups, and infrastructure projects.",
    featureKeyGu: "ઔદ્યોગિક એકમો, ઉત્પાદન સેટઅપ અને ઈન્ફ્રાસ્ટ્રક્ચર માટે લાંબા ગાળાનું ઋણ આયોજન."
  },
  {
    slug: "commercial-property",
    icon: "commercial-property",
    colorClass: "text-brand-600 bg-brand-50 border-brand-100",
    category: "Property",
    featureKey: "Financing for buying, expanding, or refinancing commercial offices, shops, and retail spaces.",
    featureKeyGu: "વ્યવસાયિક ઓફિસો, દુકાનો અને રિટેલ જગ્યા ખરીદવા કે રીફાઇનાન્સ માટે લોન."
  },
  {
    slug: "auto-loan",
    icon: "auto-loan",
    colorClass: "text-blue-700 bg-blue-50 border-blue-100",
    category: "Vehicle",
    featureKey: "Fast approval loans for new and pre-owned passenger and commercial vehicles.",
    featureKeyGu: "નવા અને જૂના મુસાફર તેમજ કોમર્શિયલ વાહનો માટે ઝડપી મંજૂરી સાથે લોન."
  },
  {
    slug: "education-loan",
    icon: "education-loan",
    colorClass: "text-indigo-700 bg-indigo-50 border-indigo-100",
    category: "Personal",
    featureKey: "Cover tuition fees and living expenses for premier domestic and international universities.",
    featureKeyGu: "પ્રતિષ્ઠિત સ્થાનિક અને આંતરરાષ્ટ્રીય યુનિવર્સિટીઓમાં અભ્યાસ માટે શૈક્ષણિક લોન."
  },
  {
    slug: "personal-loan",
    icon: "personal-loan",
    colorClass: "text-rose-700 bg-rose-50 border-rose-100",
    category: "Personal",
    featureKey: "Quick unsecured loans for emergencies, weddings, medical expenses, or travel.",
    featureKeyGu: "આકસ્મિક જરૂરિયાતો, લગ્નપ્રસંગ, તબીબી ખર્ચ કે પ્રવાસ માટે ઝડપી વ્યક્તિગત લોન."
  },
  {
    slug: "balance-transfer",
    icon: "balance-transfer",
    colorClass: "text-teal-700 bg-teal-50 border-teal-100",
    category: "Personal",
    featureKey: "Switch existing high-interest loans to lower interest rates and reduce your monthly EMI burden.",
    featureKeyGu: "ઊંચા વ્યાજની જૂની લોન ઓછા વ્યાજ દરે બદલી તમારો માસિક હપ્તો ઘટાડો."
  },
  {
    slug: "top-up-loan",
    icon: "top-up-loan",
    colorClass: "text-orange-700 bg-orange-50 border-orange-100",
    category: "Personal",
    featureKey: "Add-on funds at attractive home loan interest rates over and above your existing loan.",
    featureKeyGu: "તમારી ચાલુ લોન ઉપરાંત આકર્ષક હોમ લોન વ્યાજ દરે વધારાનું ભંડોળ મેળવો."
  }
];
