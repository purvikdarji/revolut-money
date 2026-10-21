// src/data/insights.ts
// Knowledge insights and educational articles

export interface Insight {
  id: string;
  slug: string;
  title: string;
  titleGu?: string;
  excerpt: string;
  excerptGu?: string;
  category: string;
  categoryGu?: string;
  readTime: string;
  readTimeGu?: string;
  date: string;
  theme: "green" | "gold" | "deep";
}

export const insights: Insight[] = [
  {
    id: "insight-1",
    slug: "home-loan-balance-transfer-savings",
    title: "Home loan balance transfer: when does it actually save you money?",
    titleGu: "હોમ લોન બેલેન્સ ટ્રાન્સફર: તે ખરેખર ક્યારે તમારા પૈસા બચાવે છે?",
    excerpt:
      "Lower interest rates look tempting, but factor in processing charges, legal fees, and remaining tenure before switching lenders.",
    excerptGu:
      "નીચા વ્યાજ દર આકર્ષક લાગે છે, પરંતુ ધિરાણકર્તા બદલતા પહેલા પ્રોસેસિંગ ચાર્જ, કાનૂની ફી અને બાકીની મુદત ધ્યાનમાં લો.",
    category: "Home Loans",
    categoryGu: "હોમ લોન",
    readTime: "5 min read",
    readTimeGu: "5 મિનિટ",
    date: "Sep 2026",
    theme: "green",
  },
  {
    id: "insight-2",
    slug: "loan-against-property-vs-personal-loan",
    title: "Loan against property vs personal loan: how to choose",
    titleGu: "મિલકત સામે લોન વિરુદ્ધ પર્સનલ લોન: કેવી રીતે પસંદ કરવું",
    excerpt:
      "Comparing interest rates, loan limits, collateral requirements, and processing timelines to help you pick the right borrowing route.",
    excerptGu:
      "યોગ્ય લોન વિકલ્પ પસંદ કરવા માટે વ્યાજ દરો, લોનની મર્યાદા, ગીરો જરૂરિયાતો અને પ્રોસેસિંગ સમયગાળાની તુલના.",
    category: "Advisory",
    categoryGu: "સલાહ",
    readTime: "4 min read",
    readTimeGu: "4 મિનિટ",
    date: "Sep 2026",
    theme: "gold",
  },
  {
    id: "insight-3",
    slug: "documents-to-keep-ready-before-loan-application",
    title: "Documents to keep ready before you apply for a loan",
    titleGu: "લોન અરજી કરતા પહેલા તૈયાર રાખવાના આવશ્યક દસ્તાવેજો",
    excerpt:
      "A proactive documentation checklist for salaried and business applicants to prevent approval delays and avoid back-and-forth.",
    excerptGu:
      "મંજૂરીમાં વિલંબ ટાળવા અને ઝડપી પ્રક્રિયા માટે પગારદાર અને વ્યવસાયી અરજદારો માટે સક્રિય દસ્તાવેજીકરણ ચેકલિસ્ટ.",
    category: "Checklists",
    categoryGu: "ચેકલિસ્ટ",
    readTime: "6 min read",
    readTimeGu: "6 મિનિટ",
    date: "Sep 2026",
    theme: "deep",
  },
  {
    id: "insight-4",
    slug: "how-cibil-score-affects-your-loan-options",
    title: "How your CIBIL score affects loan options and interest rates",
    titleGu: "CIBIL સ્કોર કઈ રીતે તમારી લોન વિકલ્પો અને વ્યાજ દર પ્રભાવિત કરે છે",
    excerpt:
      "Understanding the range, factors that move it, and practical steps to improve your creditworthiness over time.",
    excerptGu:
      "CIBIL સ્કોરની રેન્જ, તેને અસર કરતા પરિબળો અને ક્રેડિટ-વર્ધિ ઉન્નત કરવા માટે વ્યવહારિક પગલાં.",
    category: "Credit",
    categoryGu: "ક્રેડિટ",
    readTime: "5 min read",
    readTimeGu: "5 મિનિટ",
    date: "Oct 2026",
    theme: "gold",
  },
  {
    id: "insight-5",
    slug: "msme-business-loan-what-you-should-know",
    title: "MSME business loan: what every small business owner should know",
    titleGu: "MSME બિઝનેસ લોન: દરેક નાના વ્યવસાય માલિકે શું જાણવું જોઈએ",
    excerpt:
      "Government schemes, documentation tips, and how an advisory helps you navigate the crowded MSME lending landscape.",
    excerptGu:
      "સરકારી યોજનાઓ, દસ્તાવેજ ટિપ્સ, અને MSME ધિરાણ ક્ષેત્રમાં નેવિગેટ કરવામાં સલાહ કઈ રીતે મદદ કરે છે.",
    category: "Business Loans",
    categoryGu: "બિઝનેસ લોન",
    readTime: "7 min read",
    readTimeGu: "7 મિનિટ",
    date: "Oct 2026",
    theme: "deep",
  },
];
