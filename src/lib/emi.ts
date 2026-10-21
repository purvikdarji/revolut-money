// src/lib/emi.ts
// EMI calculation and amortization schedule utilities.

export interface EMIResult {
  emi: number; // monthly EMI in ₹
  totalPayment: number; // total amount paid
  totalInterest: number; // total interest paid
  principal: number; // original principal
  ratePercent: number; // annual rate %
  tenureMonths: number; // tenure in months
}

export interface AmortizationRow {
  month: number;
  openingBalance: number;
  emi: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

/**
 * Calculate EMI using standard reducing-balance formula.
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 *
 * @param principal   Loan amount in ₹
 * @param annualRate  Annual interest rate as percentage (e.g. 8.5 for 8.5%)
 * @param tenureMonths Loan tenure in months
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMIResult {
  if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
    return {
      emi: 0,
      totalPayment: 0,
      totalInterest: 0,
      principal,
      ratePercent: annualRate,
      tenureMonths,
    };
  }

  const r = annualRate / 12 / 100; // monthly rate
  const n = tenureMonths;
  const factor = Math.pow(1 + r, n);
  const emi = Math.round((principal * r * factor) / (factor - 1));
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return {
    emi,
    totalPayment,
    totalInterest,
    principal,
    ratePercent: annualRate,
    tenureMonths,
  };
}

/**
 * Generate month-by-month amortization schedule.
 */
export function generateAmortization(
  principal: number,
  annualRate: number,
  tenureMonths: number
): AmortizationRow[] {
  const { emi } = calculateEMI(principal, annualRate, tenureMonths);
  const r = annualRate / 12 / 100;
  const rows: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interestComponent = Math.round(balance * r);
    const principalComponent = Math.min(emi - interestComponent, balance);
    const closingBalance = Math.max(0, balance - principalComponent);

    rows.push({
      month,
      openingBalance: Math.round(balance),
      emi,
      principal: principalComponent,
      interest: interestComponent,
      closingBalance: Math.round(closingBalance),
    });

    balance = closingBalance;
    if (balance <= 0) break;
  }

  return rows;
}
