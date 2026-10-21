/**
 * src/data/images.ts
 * Phase 8.5 — Image asset manifest.
 *
 * Every meaningful image used on the site is described here.
 * The <Img> component uses this manifest to find srcset data
 * from images.generated.ts and to apply the right alt text,
 * focal point, and visual treatment.
 *
 * Gujarati alt text is flagged for native-speaker review
 * in docs/GUJARATI-REVIEW.md.
 */

export type ImageKind = "render" | "photo" | "real" | "illustration";

export interface ImageManifestEntry {
  /** Unique identifier matching images.generated.ts key */
  id: string;
  /** Original source filename (in assets-src/) */
  file: string;
  /** Type of asset */
  kind: ImageKind;
  /** Intrinsic aspect ratio as a CSS string, e.g. "4/3" */
  ratio: string;
  /** Focal point 0–1 for object-position, used by <FramedImage> */
  focal: { x: number; y: number };
  /** Alt text in supported languages; empty string = decorative */
  alt: { en: string; gu: string };
  /** If true, render alt="" — purely decorative, carries no meaning */
  decorative?: boolean;
  /** If true, show "Illustrative image" caption to avoid implying real clients */
  illustrative?: boolean;
  /** Photo/AI credit reference (see docs/IMAGE-CREDITS.md) */
  credit?: string;
}

export const imageManifest: Record<string, ImageManifestEntry> = {
  // ── GROUP A: 3D brand renders ──────────────────────────────────────────────
  a01: {
    id: "a01",
    file: "hero-scene.png",
    kind: "render",
    ratio: "4/3",
    focal: { x: 0.5, y: 0.45 },
    alt: {
      en: "3D graphic showing a modern home with financial documents and a currency coin, representing smart loan advisory",
      gu: "આધુનિક ઘર, નાણાકીય દસ્તાવેજો અને સિક્કા સાથેનો 3D ગ્રાફિક, સ્માર્ટ લોન સલાહ દર્શાવે છે",
    },
    decorative: false,
    credit: "ai-render-a01",
  },
  a02: {
    id: "a02",
    file: "icon-home-loan.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a02",
  },
  a03: {
    id: "a03",
    file: "icon-loan-against-property.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a03",
  },
  a04: {
    id: "a04",
    file: "icon-commercial-property.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a04",
  },
  a05: {
    id: "a05",
    file: "icon-car-loan.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a05",
  },
  a06: {
    id: "a06",
    file: "icon-working-capital.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a06",
  },
  a07: {
    id: "a07",
    file: "icon-project-finance.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a07",
  },
  a08: {
    id: "a08",
    file: "icon-business-loan.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a08",
  },
  a09: {
    id: "a09",
    file: "icon-education-loan.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a09",
  },
  a10: {
    id: "a10",
    file: "icon-personal-loan.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a10",
  },
  a11: {
    id: "a11",
    file: "icon-balance-transfer.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a11",
  },
  a12: {
    id: "a12",
    file: "icon-top-up.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: { en: "", gu: "" },
    decorative: true,
    credit: "ai-render-a12",
  },
  a13: {
    id: "a13",
    file: "step-apply.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: {
      en: "Illustration of a person submitting a loan application online",
      gu: "ઓનલાઇન લોન અરજી સબમિટ કરતી વ્યક્તિનું ચિત્ર",
    },
    credit: "ai-render-a13",
  },
  a14: {
    id: "a14",
    file: "step-assess.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: {
      en: "Illustration of documents being assessed and checked during loan processing",
      gu: "લોન પ્રક્રિયા દરમ્યાન દસ્તાવેજોની ચકાસણી દર્શાવતું ચિત્ર",
    },
    credit: "ai-render-a14",
  },
  a15: {
    id: "a15",
    file: "step-approve.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: {
      en: "Illustration of a loan approval with a checkmark and sanction letter",
      gu: "ચેકમાર્ક અને સ્વીકૃતિ પત્ર સાથે લોન મંજૂરી દર્શાવતું ચિત્ર",
    },
    credit: "ai-render-a15",
  },
  a16: {
    id: "a16",
    file: "step-disburse.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: {
      en: "Illustration showing loan disbursement with funds transferred to a bank account",
      gu: "બેંક ખાતામાં ભંડોળ ટ્રાન્સફર સાથે લોન વિતરણ દર્શાવતું ચિત્ર",
    },
    credit: "ai-render-a16",
  },
  a17: {
    id: "a17",
    file: "docs-folder.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.45 },
    alt: {
      en: "3D render of a documents folder representing organised loan paperwork",
      gu: "સુવ્યવસ્થિત લોન દસ્તાવેજો દર્શાવતું ફોલ્ડર ચિત્ર",
    },
    credit: "ai-render-a17",
  },
  a18: {
    id: "a18",
    file: "coin-404.png",
    kind: "render",
    ratio: "1/1",
    focal: { x: 0.5, y: 0.5 },
    alt: {
      en: "A spinning coin illustrating a page-not-found error",
      gu: "પૃષ્ઠ ન મળ્યું ભૂલ દર્શાવતો ફરતો સિક્કો",
    },
    credit: "ai-render-a18",
  },

  // ── GROUP B: lifestyle / illustrative photos ───────────────────────────────
  p01: {
    id: "p01",
    file: "advisor-consultation.png",
    kind: "photo",
    ratio: "4/5",
    focal: { x: 0.5, y: 0.35 },
    alt: {
      en: "A financial advisor discussing loan options with a client across a desk",
      gu: "ટેબલ પર ક્લાઈન્ટ સાથે લોન વિકલ્પોની ચર્ચા કરતા નાણાકીય સલાહકાર",
    },
    illustrative: true,
    credit: "ai-photo-p01",
  },
  p02: {
    id: "p02",
    file: "family-new-home.png",
    kind: "photo",
    ratio: "3/2",
    focal: { x: 0.5, y: 0.4 },
    alt: {
      en: "A family standing happily outside their new home after a home loan approval",
      gu: "હોમ લોન મંજૂર થયા પછી નવા ઘરની બહાર ખુશ ઊભેલ કુટુંબ",
    },
    illustrative: true,
    credit: "ai-photo-p02",
  },
  p03: {
    id: "p03",
    file: "car-handover.png",
    kind: "photo",
    ratio: "3/2",
    focal: { x: 0.5, y: 0.45 },
    alt: {
      en: "A car dealer handing over keys to a customer who received a car loan",
      gu: "કાર લોન મળ્યા પછી ડીલર ગ્રાહકને ચાવી આપે છે",
    },
    illustrative: true,
    credit: "ai-photo-p03",
  },
  p04: {
    id: "p04",
    file: "self-employed-shop-owner.png",
    kind: "photo",
    ratio: "3/2",
    focal: { x: 0.5, y: 0.4 },
    alt: {
      en: "A self-employed shop owner reviewing business finances in their store",
      gu: "સ્વ-રોજગારી દુકાનદાર તેમના સ્ટોરમાં બિઝનેસ ફાઈનાન્સ સમીક્ષા કરે છે",
    },
    illustrative: true,
    credit: "ai-photo-p04",
  },
  p05: {
    id: "p05",
    file: "construction-project.png",
    kind: "photo",
    ratio: "3/2",
    focal: { x: 0.5, y: 0.5 },
    alt: {
      en: "An under-construction commercial building project financed through project finance",
      gu: "પ્રોજેક્ટ ફાઇનાન્સ દ્વારા ધિરાણ મળેલ નિર્માણ હેઠળ વ્યાવસાયિક ઇમારત",
    },
    illustrative: true,
    credit: "ai-photo-p05",
  },
  p06: {
    id: "p06",
    file: "salaried-professional.png",
    kind: "photo",
    ratio: "3/2",
    focal: { x: 0.5, y: 0.35 },
    alt: {
      en: "A salaried professional at their office desk reviewing loan documents",
      gu: "ઓફિસ ડેસ્ક પર લોન દસ્તાવેજો સમીક્ષા કરતા પગારદાર વ્યાવસાયિક",
    },
    illustrative: true,
    credit: "ai-photo-p06",
  },
  p07: {
    id: "p07",
    file: "nri-video-call.png",
    kind: "photo",
    ratio: "3/2",
    focal: { x: 0.5, y: 0.4 },
    alt: {
      en: "An NRI person on a video call discussing property investment in India",
      gu: "ભારતમાં મિલ્કત રોકાણ અંગે વીડિયો કૉલ પર NRI વ્યક્તિ",
    },
    illustrative: true,
    credit: "ai-photo-p07",
  },
  p08: {
    id: "p08",
    file: "business-owner-office.png",
    kind: "photo",
    ratio: "3/2",
    focal: { x: 0.5, y: 0.4 },
    alt: {
      en: "A business owner at their office reviewing expansion financing options",
      gu: "ઓફિસમાં વ્યવસાય વિસ્તરણ ધિરાણ વિકલ્પો સમીક્ષા કરતા ઉદ્યોગ-સ્વામી",
    },
    illustrative: true,
    credit: "ai-photo-p08",
  },
  p09: {
    id: "p09",
    file: "student-education.png",
    kind: "photo",
    ratio: "3/2",
    focal: { x: 0.5, y: 0.35 },
    alt: {
      en: "A student studying with books and a laptop, supported by an education loan",
      gu: "શૈક્ષણિક લોનથી ટેકો મળ્યા પછી પુસ્તકો અને લૅપટૉપ સાથે અભ્યાસ કરતો વિદ્યાર્થી",
    },
    illustrative: true,
    credit: "ai-photo-p09",
  },
  p10: {
    id: "p10",
    file: "ahmedabad-skyline.png",
    kind: "photo",
    ratio: "16/9",
    focal: { x: 0.5, y: 0.5 },
    alt: {
      en: "Aerial view of Ahmedabad city skyline showing modern commercial buildings",
      gu: "આધુનિક વ્યાવસાયિક ઇમારતો સાથે અમદાવાદ શહેરના આકાશગ્રહ-નજારો",
    },
    illustrative: true,
    credit: "ai-photo-p10",
  },
};

/**
 * Helper: Get manifest entry (returns undefined if not found — caller shows fallback)
 */
export function getImage(id: string): ImageManifestEntry | undefined {
  return imageManifest[id];
}
