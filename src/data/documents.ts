// src/data/documents.ts
// Standard checklist items for loan processing

export interface DocumentCategory {
  title: string;
  items: string[];
}

export interface ProfileDocuments {
  identityProof: string[];
  addressProof: string[];
  incomeProof: string[];
  sampleChecklist: string[];
  identityProofGu?: string[];
  addressProofGu?: string[];
  incomeProofGu?: string[];
  sampleChecklistGu?: string[];
}

export const documentsData = {
  identityProof: [
    "Aadhaar Card",
    "PAN Card",
    "Passport",
    "Voter ID",
    "Driving License",
  ],
  identityProofGu: [
    "Aadhaar Card (આધાર કાર્ડ)",
    "PAN Card (પાન કાર્ડ)",
    "પાસપોર્ટ",
    "મતદાર આઈડી (Voter ID)",
    "ડ્રાઇવિંગ લાયસન્સ",
  ],
  addressProof: [
    "Aadhaar Card",
    "Passport",
    "Voter ID",
    "Driving License",
    "Recent Utility Bill (Electricity / Water / Gas)",
  ],
  addressProofGu: [
    "Aadhaar Card (આધાર કાર્ડ)",
    "પાસપોર્ટ",
    "મતદાર આઈડી (Voter ID)",
    "ડ્રાઇવિંગ લાયસન્સ",
    "તાજેતરનું યુટિલિટી બિલ (વીજળી / પાણી / ગેસ)",
  ],
  salariedIncome: [
    "Latest 3 months salary slips",
    "Latest 2 years Form 16",
    "Latest 6 months bank statement (salary account)",
  ],
  salariedIncomeGu: [
    "છેલ્લા 3 મહિનાની પગાર સ્લિપ",
    "છેલ્લા 2 વર્ષનું ફોર્મ 16",
    "છેલ્લા 6 મહિનાનું બેંક સ્ટેટમેન્ટ (પગાર ખાતું)",
  ],
  selfEmployedIncome: [
    "Latest 2-3 years Income Tax Returns (ITR) with computation",
    "Audited financial statements (Balance Sheet, P&L)",
    "Latest 6-12 months bank statements (current and savings)",
    "GST registration certificate and filings (if applicable)",
  ],
  selfEmployedIncomeGu: [
    "કોમ્પ્યુટેશન સાથે છેલ્લા 2-3 વર્ષના આવકવેરા રિટર્ન (ITR)",
    "ઓડિટ કરેલા નાણાકીય નિવેદનો (બેલેન્સ શીટ, P&L)",
    "છેલ્લા 6-12 મહિનાના બેંક સ્ટેટમેન્ટ (કરંટ અને સેવિંગ્સ)",
    "GST નોંધણી પ્રમાણપત્ર અને ફાઇલિંગ (જો લાગુ પડે તો)",
  ],
  samples: {
    salaried: [
      "PAN Card (Identity proof)",
      "Aadhaar Card (Address proof)",
      "Latest 3 months salary slips",
      "Form 16 (Part A & B)",
      "6 months salary bank statement",
    ],
    salariedGu: [
      "PAN Card (ઓળખ પુરાવો)",
      "Aadhaar Card (સરનામાનો પુરાવો)",
      "છેલ્લા 3 મહિનાની પગાર સ્લિપ",
      "ફોર્મ 16 (ભાગ A અને B)",
      "6 મહિનાનું પગાર ખાતાનું બેંક સ્ટેટમેન્ટ",
    ],
    selfEmployed: [
      "PAN Card & Aadhaar Card",
      "Latest 2-3 years ITR with computation",
      "Audited balance sheet & P&L statements",
      "12 months current account bank statement",
      "GST registration certificate",
    ],
    selfEmployedGu: [
      "PAN Card અને Aadhaar Card",
      "કોમ્પ્યુટેશન સાથે છેલ્લા 2-3 વર્ષના ITR",
      "ઓડિટ કરેલી બેલેન્સ શીટ અને P&L સ્ટેટમેન્ટ",
      "12 મહિનાનું કરંટ એકાઉન્ટ બેંક સ્ટેટમેન્ટ",
      "GST નોંધણી પ્રમાણપત્ર",
    ],
  },
  disclaimer: "Exact requirements vary by lender and profile.",
  disclaimerGu: "ચોક્કસ જરૂરિયાતો ધિરાણકર્તા અને પ્રોફાઇલ મુજબ બદલાય છે.",
};

