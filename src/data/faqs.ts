// src/data/faqs.ts
import { SITE_CONFIG } from "../config/site";

export interface FAQItem {
  id: string;
  question: string;
  questionGu: string;
  answer: string;
  answerGu: string;
}

export function getFaqs(): FAQItem[] {
  const feeAnswer = (() => {
    switch (SITE_CONFIG.feeModel) {
      case "free":
        return "Our loan advisory service is free of charge for borrowers; we receive compensation directly from partner lending institutions upon loan disbursal.";
      case "paid":
        return "We charge a clear, transparent advisory fee. All charges are shared and agreed upon upfront before any paperwork is started.";
      case "varies":
        return "Our fee structure depends on the loan category and complexity of the case. We will be upfront about any charges before you proceed.";
      case "unknown":
      default:
        return "Please ask us – we will be upfront about any charges before you proceed.";
    }
  })();

  const feeAnswerGu = (() => {
    switch (SITE_CONFIG.feeModel) {
      case "free":
        return "અમારી લોન સલાહ સેવા ઋણ લેનારાઓ માટે વિનામૂલ્યે છે; ધિરાણ સંસ્થાઓ તરફથી અમને મહેનતાણું મળે છે.";
      default:
        return "કૃપા કરીને અમને પૂછો – તમે આગળ વધો તે પહેલાં અમે કોઈપણ શુલ્ક વિશે અગાઉથી સ્પષ્ટ જણાવીશું.";
    }
  })();

  return [
    {
      id: "faq-1",
      question: "Are you a bank or NBFC?",
      questionGu: "શું તમે બેંક કે NBFC છો?",
      answer:
        "No. Revolut Money is an independent loan advisory based in Ahmedabad. We do not lend our own funds. We help you compare, apply for, and coordinate loans across 17 partner banks and NBFCs, while lending and approval decisions remain solely with the lending institutions.",
      answerGu:
        "ના. Revolut Money અમદાવાદ સ્થિત એક સ્વતંત્ર લોન સલાહકાર છે. અમે અમારા પોતાના નાણાં ધીરતા નથી. અમે 17 ભાગીદાર બેંકો અને NBFCs માંથી લોનની તુલના, અરજી અને સંકલન કરવામાં તમારી સહાય કરીએ છીએ; ધિરાણ અને મંજૂરીના તમામ નિર્ણયો માત્ર ધિરાણ સંસ્થાઓના વિવેકાધિકાર પર રહે છે.",
    },
    {
      id: "faq-2",
      question: "Do I have to pay you?",
      questionGu: "શું મારે તમને ફી ચૂકવવી પડશે?",
      answer: feeAnswer,
      answerGu: feeAnswerGu,
    },
    {
      id: "faq-3",
      question: "What documents do I need for a home loan?",
      questionGu: "હોમ લોન માટે કયા દસ્તાવેજોની જરૂર પડે છે?",
      answer:
        "Typically you need: 1) Identity proof (Aadhaar, PAN, Passport); 2) Address proof; 3) Income proof (salary slips & Form 16 for salaried, or ITR with financials for self-employed); 4) Bank statements for the last 6 months; and 5) Property documents (chain deed, title clearance, sanctioned plan). Exact requirements vary by lender and profile.",
      answerGu:
        "સામાન્ય રીતે જરૂરી છે: ૧) ઓળખનો પુરાવો (આધાર, પાન, પાસપોર્ટ); ૨) સરનામાનો પુરાવો; ૩) આવકનો પુરાવો (પગાર સ્લિપ અને ફોર્મ 16 અથવા સ્વ-રોજગારી માટે ITR); ૪) છેલ્લા ૬ મહિનાનું બેંક સ્ટેટમેન્ટ; અને ૫) મિલકતના દસ્તાવેજો. ચોક્કસ શરતો ધિરાણકર્તા અને પ્રોફાઇલ અનુસાર બદલાઈ શકે છે.",
    },
    {
      id: "faq-4",
      question: "How long does approval take?",
      questionGu: "લોન મંજૂર થવામાં કેટલો સમય લાગે છે?",
      answer:
        "Timelines vary depending on the lender, loan category, and profile complexity. While we work proactively to expedite every step, final processing depends on bank credit policies and property legal verification. We keep you updated at every stage.",
      answerGu:
        "સમયગાળો ધિરાણકર્તા, લોનનો પ્રકાર અને પ્રોફાઇલ પર આધારિત છે. અમે દરેક પગલાને ઝડપી બનાવવા માટે સક્રિયપણે કામ કરીએ છીએ, તેમ છતાં અંતિમ પ્રક્રિયા બેંકની ક્રેડિટ નીતિઓ અને પ્રોપર્ટી વેરિફિકેશન પર આધાર રાખે છે. અમે તમને દરેક તબક્કે માહિતગાર રાખીએ છીએ.",
    },
    {
      id: "faq-5",
      question: "Can you help if I was rejected before or have a lower credit score?",
      questionGu: "જો મારી અરજી અગાઉ નકારાઈ હોય કે ક્રેડિટ સ્કોર ઓછો હોય તો શું મદદ મળી શકે?",
      answer:
        "Yes, we can evaluate your overall credit profile, understand why previous applications were declined, and direct your application to partner lenders whose eligibility criteria may be more accommodating. However, loan approval remains subject to lender's discretion.",
      answerGu:
        "હા, અમે તમારી પ્રોફાઇલની સંપૂર્ણ સમીક્ષા કરીએ છીએ, અગાઉની અરજી નકારવાના કારણો સમજીએ છીએ અને એવી ભાગીદાર સંસ્થાઓ સાથે વિકલ્પો શોધીએ છીએ જેમના માપદંડ અનુકૂળ હોય. જોકે, મંજૂરીની ખાતરી ક્યારેય આપી શકાતી નથી.",
    },
    {
      id: "faq-6",
      question: "Can I transfer my existing loan to a lower rate?",
      questionGu: "શું હું મારી હાલની લોન નીચા વ્યાજ દરે ટ્રાન્સફર કરી શકું?",
      answer:
        "Yes. A Balance Transfer allows you to move your outstanding loan balance to a lender offering more favorable rates or terms. We help you calculate whether the long-term interest savings outweigh the processing fees and foreclosure charges.",
      answerGu:
        "હા. બેલેન્સ ટ્રાન્સફર દ્વારા તમે તમારી બાકી લોન અન્ય બેંકમાં ઓછા વ્યાજ દરે ટ્રાન્સફર કરી શકો છો. અમે તમને ગણતરી કરવામાં મદદ કરીએ છીએ કે લાંબા ગાળાની વ્યાજની બચત પ્રોસેસિંગ ફી અને અન્ય ખર્ચાઓ કરતાં વધુ ફાયદાકારક છે કે નહીં.",
    },
    {
      id: "faq-7",
      question: "What is a top-up loan?",
      questionGu: "ટોપ-અપ લોન શું છે?",
      answer:
        "A top-up loan is an additional loan sanctioned over and above your existing home loan or loan against property. It offers attractive interest rates compared to personal loans and can be utilized for home renovation, business expansion, education, or other personal financial requirements.",
      answerGu:
        "ટોપ-અપ લોન એ તમારી હાલની હોમ લોન અથવા પ્રોપર્ટી લોન પર વધારાની લોન છે. તે પર્સનલ લોનની તુલનામાં આકર્ષક વ્યાજ દર આપે છે અને તેનો ઉપયોગ મકાન નવીનીકરણ, વ્યવસાય વૃદ્ધિ કે અન્ય જરૂરિયાતો માટે થઈ શકે છે.",
    },
    {
      id: "faq-8",
      question: "Can NRIs apply for a car loan?",
      questionGu: "શું NRI કાર લોન માટે અરજી કરી શકે છે?",
      answer:
        "Yes. Non-Resident Indians (NRIs) are eligible to apply for vehicle loans with select partner lenders in India, subject to lender-specific policies, a resident Indian co-applicant/guarantor, and standard NRI KYC and income documentation.",
      answerGu:
        "હા. બિન-નિવાસી ભારતીયો (NRIs) ભારતમાં પસંદગીના ભાગીદાર ધિરાણકર્તાઓ સાથે વાહન લોન માટે અરજી કરી શકે છે, જે બેંકની ચોક્કસ નીતિઓ, ભારતીય નિવાસી સહ-અરજદાર/જામીનદાર અને માનક દસ્તાવેજોને આધીન છે.",
    },
  ];
}
