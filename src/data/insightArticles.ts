// src/data/insightArticles.ts
// Full article content for /insights/:slug pages.
// Each article should be 500–700 words, plain English, non-promissory.
// All figures are illustrative; no guarantees of rates or timelines.

export interface InsightArticle {
  slug: string;
  title: string;
  titleGu?: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  theme: "green" | "gold" | "deep";
  body: string; // HTML string with <h2>, <p>, <ul>, <li> allowed
  bodyGu?: string;
  relatedSlugs?: string[];
}

export const insightArticles: InsightArticle[] = [
  {
    slug: "home-loan-balance-transfer-savings",
    title: "Home loan balance transfer: when does it actually save you money?",
    excerpt:
      "Lower interest rates look tempting, but factor in processing charges, legal fees, and remaining tenure before switching lenders.",
    category: "Home Loans",
    readTime: "5 min read",
    date: "Sep 2026",
    theme: "green",
    relatedSlugs: [
      "loan-against-property-vs-personal-loan",
      "documents-to-keep-ready-before-loan-application",
    ],
    body: `
<p>Balance transfers are one of the most talked-about moves in home loan management. You see a lender advertising a rate that is meaningfully lower than what you are currently paying, and naturally, you wonder whether switching makes sense. The honest answer is: sometimes yes, often it depends — and the maths matters more than the headline rate.</p>

<h2>What is a home loan balance transfer?</h2>
<p>A balance transfer (BT) lets you move your outstanding home loan principal from your current lender to a new one that offers better terms — usually a lower interest rate, a longer tenure, or both. The new lender pays off your old loan, and you begin servicing the new one. Critically, it is not free: you typically pay a processing fee to the new lender and possibly a foreclosure charge to the existing one.</p>

<h2>The real saving formula</h2>
<p>Your net saving is the difference in total interest paid over the remaining loan life, minus the cost of switching. Consider an illustrative example: if your remaining principal is ₹50 lakhs with 15 years left, reducing your interest rate by even 0.5% can lower your EMI noticeably — but pay close attention to:</p>
<ul>
  <li><strong>Processing fee</strong>: Typically 0.5–1% of the outstanding amount, depending on the lender's policy at the time of application.</li>
  <li><strong>Legal and technical charges</strong>: Title verification and mortgage creation for the new lender can add to the cost.</li>
  <li><strong>Stamp duty on the new mortgage deed</strong>: This varies by state.</li>
  <li><strong>Foreclosure charges</strong>: For floating-rate loans from scheduled banks, RBI guidelines generally prohibit prepayment penalties for individual borrowers — but always verify this with your existing lender before proceeding.</li>
</ul>

<h2>When does a BT make clear sense?</h2>
<p>A balance transfer tends to be financially worthwhile when:</p>
<ul>
  <li>Your remaining tenure is long — at least 8–10 years — so interest savings have time to compound.</li>
  <li>The rate differential is meaningful — generally 0.5% or more, though this depends on your loan size and tenure.</li>
  <li>Your outstanding principal is large enough that even a small rate cut produces a significant absolute saving.</li>
</ul>

<h2>When to pause and reconsider</h2>
<p>If you have only a few years left on your loan, the total interest you will pay in the remaining term may already be small. Switching at this stage may cost more in fees than you save. Similarly, if your current lender offers to match the new rate (lenders often do when you signal you are exploring a BT), a rate reset may be simpler and cheaper than a full transfer.</p>

<h2>Break-even point</h2>
<p>Divide your total switching cost by the monthly EMI saving under the new rate. The result is the number of months you need to stay with the new lender to recover the expense. If you plan to prepay and close early before that point, the transfer may not benefit you.</p>

<h2>How we help</h2>
<p>At Revolut Money, we run the numbers across our partner lenders' current offerings so you can see the realistic saving before committing. We also coordinate the documentation — NOC and foreclosure letter from your existing bank, fresh legal report, and new mortgage — so the process does not become a paperwork burden on you. Reach out to discuss whether a balance transfer is the right move for your specific loan.</p>

<p><em>All calculations are illustrative. Actual savings depend on the lender's rate, processing charges, your credit profile, and prevailing policies at the time of application. Consult us for a personalised assessment.</em></p>
    `.trim(),
  },
  {
    slug: "loan-against-property-vs-personal-loan",
    title: "Loan against property vs personal loan: how to choose",
    excerpt:
      "Comparing interest rates, loan limits, collateral requirements, and processing timelines to help you pick the right borrowing route.",
    category: "Advisory",
    readTime: "4 min read",
    date: "Sep 2026",
    theme: "gold",
    relatedSlugs: [
      "home-loan-balance-transfer-savings",
      "documents-to-keep-ready-before-loan-application",
    ],
    body: `
<p>When you need a large sum of money — for business expansion, a child's education, a medical event, or home renovation — two options frequently come up: a loan against property (LAP) and a personal loan. They serve similar needs but are structurally very different. Choosing the right one depends on your asset position, income profile, and how quickly you need the funds.</p>

<h2>The fundamental difference</h2>
<p>A loan against property is a secured loan: you pledge a residential or commercial property as collateral. A personal loan is unsecured — the lender relies solely on your income, credit score, and repayment history to assess risk. This distinction drives most of the differences below.</p>

<h2>Interest rates</h2>
<p>Because LAP is backed by real estate, lenders carry lower risk, which typically translates to lower interest rates compared to personal loans. Personal loans, being unsecured, generally attract a higher rate to compensate for the lender's risk. The actual rates vary across lenders and depend on your profile; these are indicative comparisons, not guarantees.</p>

<h2>Loan amount and tenure</h2>
<p>LAP allows you to borrow a percentage of your property's current market value — often in the range of 50–70%, subject to the lender's LTV (loan-to-value) policy and your profile. For a property worth ₹1 crore, this can mean a significant credit line. Tenures can extend to 15 years or more. Personal loans, by contrast, are typically capped at lower amounts (policies vary) and carry shorter tenures.</p>

<h2>Processing time</h2>
<p>Personal loans generally move faster because there is no property valuation or legal verification involved. LAP requires a technical evaluation of the property and a legal title search, which adds time. We work to coordinate these steps efficiently, but timelines ultimately depend on the lender's internal processes and the complexity of the property documentation.</p>

<h2>Risk of pledging your property</h2>
<p>This is a critical consideration. With LAP, your property is mortgaged. If you default, the lender has the right to initiate recovery proceedings against the asset. A personal loan carries no such collateral risk — though default will severely impact your credit score and could lead to legal action for recovery. Borrow only what you need and what your cash flows can comfortably service.</p>

<h2>When LAP makes more sense</h2>
<ul>
  <li>You need a larger amount and have an owned, unencumbered property.</li>
  <li>You prefer a lower EMI spread over a longer tenure.</li>
  <li>The end use is a long-horizon need (business capital, education, renovation).</li>
</ul>

<h2>When a personal loan may be more suitable</h2>
<ul>
  <li>You need funds quickly and cannot wait for property verification.</li>
  <li>Your loan requirement is modest and fits within personal loan limits.</li>
  <li>You do not want to encumber your property.</li>
</ul>

<h2>A word on total cost</h2>
<p>Do not compare only the rate — compare the total cost of borrowing, including processing fees, insurance charges, and the tenure. A slightly higher personal loan rate over two years may cost less in total interest than an LAP stretched over ten years. Our advisors help you model both scenarios with your actual numbers.</p>

<p><em>All rate comparisons are indicative. Actual rates, LTV ratios, and eligibility depend on lender policy and individual profile. This article is for informational purposes only and does not constitute financial advice.</em></p>
    `.trim(),
  },
  {
    slug: "documents-to-keep-ready-before-loan-application",
    title: "Documents to keep ready before you apply for a loan",
    excerpt:
      "A proactive documentation checklist for salaried and business applicants to prevent approval delays and avoid back-and-forth.",
    category: "Checklists",
    readTime: "6 min read",
    date: "Sep 2026",
    theme: "deep",
    relatedSlugs: [
      "home-loan-balance-transfer-savings",
      "loan-against-property-vs-personal-loan",
    ],
    body: `
<p>One of the most common reasons loan approvals take longer than expected is incomplete or mismatched documentation. Lenders work within credit policies that require specific papers to verify identity, income, and the asset being financed. Gathering these proactively before you apply can meaningfully reduce back-and-forth and avoid unnecessary delays.</p>

<p>Requirements differ by lender, loan type, and borrower profile. The list below covers what is typically needed — always confirm the exact list with us or your chosen lender.</p>

<h2>Documents every applicant typically needs</h2>
<ul>
  <li><strong>Identity proof</strong>: Aadhaar card, PAN card, passport, or voter ID — PAN is almost universally mandatory.</li>
  <li><strong>Address proof</strong>: Aadhaar, passport, recent utility bill, or bank statement showing current address.</li>
  <li><strong>Passport-size photographs</strong>: Typically two to four recent ones.</li>
  <li><strong>Bank statements</strong>: Last 6 months of your primary operative account (salary credit or business transactions). Some lenders ask for 12 months for business loans.</li>
</ul>

<h2>Additional documents for salaried applicants</h2>
<ul>
  <li><strong>Salary slips</strong>: Latest 3 months — must show employer name, employee name, gross salary, deductions, and net pay clearly.</li>
  <li><strong>Form 16</strong>: Latest two years, issued by your employer (Part A and Part B).</li>
  <li><strong>Employment continuity proof</strong>: Offer letter, appointment letter, or increment letter if you have changed jobs recently.</li>
  <li><strong>IT Returns (ITR)</strong>: Some lenders ask for last 2 years' filed ITR even for salaried applicants, especially for higher loan amounts.</li>
</ul>

<h2>Additional documents for self-employed / business applicants</h2>
<ul>
  <li><strong>Income Tax Returns (ITR)</strong>: Last 2–3 years of computation sheets and acknowledgements filed with the Income Tax Department.</li>
  <li><strong>P&L statement and Balance Sheet</strong>: CA-certified, for the same period — most lenders require these to be audited if turnover exceeds statutory thresholds.</li>
  <li><strong>Business proof</strong>: GST registration certificate, Udyam (MSME) registration, trade licence, shop establishment certificate, or partnership deed, as applicable.</li>
  <li><strong>Business bank account statements</strong>: Last 12 months — essential for assessing cash-flow health.</li>
</ul>

<h2>Property-related documents (for home loans and LAP)</h2>
<ul>
  <li><strong>Chain of title documents</strong>: All registered sale deeds establishing ownership history.</li>
  <li><strong>Latest 7/12 or property card / mutation entry</strong>: Showing current ownership in government records (format varies by state and type of property).</li>
  <li><strong>Sanctioned building plan</strong>: Approved by the competent municipal authority.</li>
  <li><strong>Occupation Certificate / Completion Certificate</strong>: For completed constructions.</li>
  <li><strong>Society NOC</strong>: For apartment purchases in housing societies.</li>
  <li><strong>Agreement to Sale or Sale Agreement</strong>: For purchase transactions.</li>
</ul>

<h2>Tips to avoid delays</h2>
<ul>
  <li>Ensure all documents show consistent name spelling — mismatches between PAN, Aadhaar, and sale deeds are a common cause of queries.</li>
  <li>Keep originals and clear, legible self-attested photocopies ready.</li>
  <li>If your name has changed (due to marriage, for example), carry the relevant legal certificate to explain the difference.</li>
  <li>File your ITR on time — lenders frequently request the latest available ITR, and a delayed filing can hold up applications.</li>
</ul>

<h2>How we help</h2>
<p>We provide a tailored document checklist based on your loan type and profile before you begin the application. We also review your papers with you to flag gaps before they reach the lender, reducing the risk of queries or rejections on procedural grounds. Getting started costs nothing — reach out to us for a free initial consultation.</p>

<p><em>Document requirements vary by lender, loan type, property, and individual profile. This is a general guide; always confirm with us or your lender before submitting an application.</em></p>
    `.trim(),
  },
  // Stubs – shown in index, but open a short placeholder on detail page
  {
    slug: "how-cibil-score-affects-your-loan-options",
    title: "How your CIBIL score affects loan options and interest rates",
    excerpt:
      "Understanding the range, factors that move it, and practical steps to improve your creditworthiness over time.",
    category: "Credit",
    readTime: "5 min read",
    date: "Oct 2026",
    theme: "gold",
    relatedSlugs: [
      "home-loan-balance-transfer-savings",
      "documents-to-keep-ready-before-loan-application",
    ],
    body: `
<p>Your CIBIL score (or credit score from any RBI-approved credit bureau) is one of the first things a lender checks when you apply for a loan. It summarises your credit history into a three-digit number and gives the lender a quick signal about how reliably you have managed debt in the past.</p>

<h2>What the score range means</h2>
<p>Scores generally range from 300 to 900. A score above 750 is widely regarded as a good starting point for most home loan or LAP applications. Scores in the 650–750 range may still get approvals with some lenders, often at a higher rate or with stricter conditions. Scores below 650 narrow your options significantly, though lenders differ in their policies.</p>

<h2>Key factors that affect your score</h2>
<ul>
  <li><strong>Payment history</strong>: Late EMI payments or credit card dues have the most negative impact. Even a single missed payment can drop your score.</li>
  <li><strong>Credit utilisation</strong>: Using a high percentage of your credit card limit consistently can signal risk. Keeping utilisation under 30–40% is generally considered healthy.</li>
  <li><strong>Credit mix and tenure</strong>: A history of managing different types of credit (home loan, car loan, credit card) responsibly over time can strengthen your profile.</li>
  <li><strong>Hard enquiries</strong>: Every time a lender pulls your full credit report (as happens when you formally apply), it creates an enquiry. Multiple hard enquiries in a short period can modestly lower your score.</li>
</ul>

<h2>Improving your score over time</h2>
<p>There are no overnight fixes, but consistent habits help: pay all EMIs and credit card bills on or before the due date, reduce outstanding card balances, and avoid applying to multiple lenders simultaneously. Dispute any errors in your credit report through the bureau's official process.</p>

<h2>How we work with lower scores</h2>
<p>If your score is not where you would like it to be, we help you understand which of our partner lenders are potentially more flexible, and whether restructuring your application (joint borrower, larger down payment, additional collateral) could improve your chances. Approval, however, remains solely at the lender's discretion.</p>

<p><em>Credit scores are indicative and vary across bureaus. This article is informational only and does not constitute financial advice.</em></p>
    `.trim(),
  },
  {
    slug: "msme-business-loan-what-you-should-know",
    title: "MSME business loan: what every small business owner should know",
    excerpt:
      "Government schemes, documentation tips, and how an advisory helps you navigate the crowded MSME lending landscape.",
    category: "Business Loans",
    readTime: "7 min read",
    date: "Oct 2026",
    theme: "deep",
    relatedSlugs: [
      "loan-against-property-vs-personal-loan",
      "documents-to-keep-ready-before-loan-application",
    ],
    body: `
<p>Accessing formal credit remains one of the biggest challenges for small and medium businesses in India. Yet the MSME lending landscape has expanded considerably — banks, NBFCs, and government-backed schemes now offer a range of options for businesses that can demonstrate stable revenue and proper documentation.</p>

<h2>What lenders typically look for in an MSME loan application</h2>
<ul>
  <li><strong>Business vintage</strong>: Most lenders prefer businesses with at least 2–3 years of operations, reflected in ITR and bank statements.</li>
  <li><strong>Revenue stability</strong>: Consistent bank credits and filed GST returns signal ongoing business activity.</li>
  <li><strong>Promoter profile</strong>: The owner's personal credit score and financial history matter significantly, especially for smaller businesses.</li>
  <li><strong>Collateral</strong>: Secured loans (against property or assets) generally offer larger amounts and lower rates; unsecured business loans depend more heavily on cash-flow metrics.</li>
</ul>

<h2>Common MSME loan categories</h2>
<p>Working capital loans fund day-to-day operations — inventory, salaries, receivables management. Term loans support expansion — equipment, infrastructure, or new premises. Overdraft facilities provide flexible access to credit up to a sanctioned limit. We work across all these structures depending on your business need.</p>

<h2>Government-backed schemes</h2>
<p>Several central government schemes such as MUDRA (Pradhan Mantri Mudra Yojana), CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises), and Stand-Up India target smaller businesses and may offer collateral-free credit with a guarantee cover from the government. Eligibility, coverage limits, and participating lenders change over time — we help you understand which scheme, if any, might apply to your business profile.</p>

<h2>Documentation for MSME loans</h2>
<p>In addition to the standard documents (KYC, bank statements, ITR), lenders typically require business registration proof (Udyam certificate, GST registration, trade licence), CA-certified profit and loss accounts and balance sheets, and sometimes a business plan or loan utilisation justification for larger amounts.</p>

<h2>How we help MSMEs</h2>
<p>Revolut Money helps business owners prepare a strong application package before approaching lenders. We review your documentation, identify gaps, and direct your application to partners whose credit policies align with your business profile. This targeted approach reduces the risk of rejections that can negatively affect your credit score and business timeline.</p>

<p><em>Government schemes, lender policies, and eligibility criteria change frequently. Always verify current terms with the lending institution. Loan approval is at the lender's sole discretion.</em></p>
    `.trim(),
  },
];
