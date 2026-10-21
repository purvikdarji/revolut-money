// src/data/partners.ts
// 17 Associate Banking Partners – neutral order, no ranking implied

export interface Partner {
  name: string;
  type: "Bank" | "NBFC" | "HFC";
  logoSrc: string | null;
}

export const partners: Partner[] = [
  { name: "HDFC Bank", type: "Bank", logoSrc: "/partners/hdfc.jpg" },
  { name: "Axis Bank", type: "Bank", logoSrc: "/partners/axis.jpg" },
  { name: "ICICI Bank", type: "Bank", logoSrc: "/partners/icici.jpg" },
  { name: "State Bank of India", type: "Bank", logoSrc: "/partners/sbi.jpg" },
  { name: "Kotak Mahindra Bank", type: "Bank", logoSrc: "/partners/kotak.jpg" },
  { name: "Bank of Baroda", type: "Bank", logoSrc: "/partners/bank-of-baroda.jpg" },
  { name: "Punjab National Bank", type: "Bank", logoSrc: "/partners/punjab-national-bank.jpg" },
  { name: "Union Bank of India", type: "Bank", logoSrc: "/partners/union-bank-of-india.jpg" },
  { name: "Bank of India", type: "Bank", logoSrc: "/partners/bank-of-india.jpg" },
  { name: "Yes Bank", type: "Bank", logoSrc: "/partners/yes-bank.png" },
  { name: "L&T Finance", type: "NBFC", logoSrc: "/partners/landt-finance.jpg" },
  { name: "Tata Capital", type: "NBFC", logoSrc: "/partners/tata-capital.jpg" },
  { name: "Bajaj Finserv", type: "NBFC", logoSrc: "/partners/bajaj.jpg" },
  { name: "Hero FinCorp", type: "NBFC", logoSrc: "/partners/hero-fincorp.jpg" },
  { name: "Capri Global (Capri Loans)", type: "NBFC", logoSrc: "/partners/capri-loans.jpg" },
  { name: "Aditya Birla Housing Finance", type: "HFC", logoSrc: "/partners/aditya-birla.jpg" },
  { name: "Truhome Finance", type: "HFC", logoSrc: "/partners/truhome-finance.jpg" },
];
