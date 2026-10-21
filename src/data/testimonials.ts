// src/data/testimonials.ts
// Testimonial entries. Real verified reviews will replace placeholders once collected.

export interface Testimonial {
  id: string;
  name: string;
  nameGu?: string;
  location?: string;
  locationGu?: string;
  loanType?: string;
  loanTypeGu?: string;
  quote: string;
  quoteGu?: string;
  isPlaceholder: boolean;
  rating?: number; // Only display if real data is provided
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh",
    nameGu: "રાજેશ",
    location: "Ahmedabad",
    locationGu: "અમદાવાદ",
    loanType: "Housing Loan",
    loanTypeGu: "હોમ લોન",
    quote: "Smooth process and helpful team throughout our home loan journey. They coordinated directly with the bank to resolve paperwork.",
    quoteGu: "અમારી હોમ લોન પ્રક્રિયા દરમિયાન સરળ પ્રક્રિયા અને મદદરૂપ ટીમ. તેમણે કાગળની કામગીરી ઉકેલવા બેંક સાથે સીધું સંકલન કર્યું.",
    isPlaceholder: true,
  },
  {
    id: "test-2",
    name: "Sneha",
    nameGu: "સ્નેહા",
    location: "Ahmedabad",
    locationGu: "અમદાવાદ",
    loanType: "Loan Against Property",
    loanTypeGu: "પ્રોપર્ટી પર લોન",
    quote: "Transparent guidance and clear communication from the start. Helped us compare multiple lenders before making a final decision.",
    quoteGu: "શરૂઆતથી જ પારદર્શક માર્ગદર્શન અને સ્પષ્ટ સંવાદ. અંતિમ નિર્ણય લેતા પહેલા બહુવિધ ધિરાણકર્તાઓની તુલના કરવામાં અમને મદદ કરી.",
    isPlaceholder: true,
  },
  {
    id: "test-3",
    name: "Amit",
    nameGu: "અમિત",
    location: "Ahmedabad",
    locationGu: "અમદાવાદ",
    loanType: "Working Capital Loan",
    loanTypeGu: "વર્કિંગ કેપિટલ લોન",
    quote: "Focused on quick processing and responsive support. Appreciated the clear explanation of terms and requirements.",
    quoteGu: "ઝડપી પ્રક્રિયા અને પ્રતિભાવશીલ સમર્થન પર ધ્યાન કેન્દ્રિત કર્યું. શરતો અને જરૂરિયાતોની સ્પષ્ટ સમજૂતી બદલ આભાર.",
    isPlaceholder: true,
  },
];
