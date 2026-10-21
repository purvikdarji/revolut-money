import { SITE_CONFIG } from '../config/site';
import { trackEvent } from './analytics';

export interface LeadPayload {
  source: string; // 'apply_form' | 'contact_form' | 'partner_form' | 'lead_modal' | 'quick_emi'
  loanType?: string;
  amount?: string | number;
  city?: string;
  profile?: string; // 'salaried' | 'self_employed_professional' | 'business_owner' | 'company_firm'
  incomeBand?: string;
  name: string;
  mobile: string; // 10 digits
  email?: string;
  preferredTime?: string; // 'Morning (9 AM - 12 PM)' | 'Afternoon (12 PM - 4 PM)' | 'Evening (4 PM - 7 PM)'
  message?: string;
  consent: boolean;
  honeypot?: string; // Hidden spam honeypot
  
  // Auto-captured metadata
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  page?: string;
  clientTimestamp?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  type: 'api' | 'whatsapp' | 'mailto' | 'simulated';
  fallbackUrl?: string;
}

/* ==========================================================================
 * BACKEND INTEGRATION GUIDE (Choose 1 of 3 options in SITE_CONFIG.submitLeadEndpoint)
 * ==========================================================================
 *
 * OPTION 1: FORMSPREE (Easiest for email notifications)
 * -------------------------------------------------------------
 * 1. Sign up free at https://formspree.io
 * 2. Click "New Form", name it "Revolut Money Leads", set notification email.
 * 3. Copy your Form ID (e.g. "xpzgklwq").
 * 4. In `src/config/site.ts`, set:
 *    `submitLeadEndpoint: 'https://formspree.io/f/xpzgklwq'`
 * 5. Test submit. You will receive structured email notifications instantly.
 *
 * OPTION 2: WEB3FORMS (Generous free tier + no registration required)
 * -------------------------------------------------------------
 * 1. Visit https://web3forms.com and enter your email to get an Access Key.
 * 2. Verify key in your inbox.
 * 3. In `src/config/site.ts`, set:
 *    `submitLeadEndpoint: 'https://api.web3forms.com/submit'`
 * 4. Pass `access_key: 'YOUR_KEY_HERE'` in the payload or configure it here.
 * 5. Test submit. Submissions route to your email and dashboard.
 *
 * OPTION 3: GOOGLE SHEETS via APPS SCRIPT (Ideal for CRM tracking & team access)
 * -------------------------------------------------------------
 * 1. Create a Google Sheet named "Revolut Money Inquiries".
 * 2. Row 1 headers: Timestamp | Source | Loan Type | Amount | Name | Mobile | Email | City | Profile | Time | Message
 * 3. In the Sheet, click Extensions > Apps Script. Paste this code:
 *      function doPost(e) {
 *        var data = JSON.parse(e.postData.contents);
 *        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *        sheet.appendRow([new Date(), data.source, data.loanType, data.amount, data.name, data.mobile, data.email, data.city, data.profile, data.preferredTime, data.message]);
 *        return ContentService.createTextOutput(JSON.stringify({result: 'success'})).setMimeType(ContentService.MimeType.JSON);
 *      }
 * 4. Click Deploy > New Deployment > Type: Web App. Execute as: "Me", Who has access: "Anyone".
 * 5. Copy the generated Web App URL and set it as `submitLeadEndpoint` in `src/config/site.ts`.
 * ==========================================================================
 */

// In-memory rate limiting: max 3 submissions per session
const MAX_LEADS_PER_SESSION = 3;
let sessionSubmissionCount = 0;
const sessionStartTime = Date.now();

// Sanitizer utility: strips dangerous HTML and script tags
function sanitize(input: string | undefined): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000);
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  // 1. Mandatory consent check
  if (!payload.consent) {
    return {
      success: false,
      message: 'Consent is mandatory before submitting your inquiry.',
      type: 'simulated',
    };
  }

  // 2. Honeypot check (silent bot trap)
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    console.warn('[Security] Bot trapped via honeypot field.');
    return {
      success: true,
      message: 'Thank you! We have received your inquiry.',
      type: 'simulated',
    };
  }

  // 3. Minimum time-to-submit check (detect super-fast scripted submissions < 1000ms from session start)
  if (Date.now() - sessionStartTime < 1000) {
    console.warn('[Security] Submission rejected: form filled too quickly.');
    return {
      success: true,
      message: 'Thank you! We have received your inquiry.',
      type: 'simulated',
    };
  }

  // 4. Rate limiting check
  if (sessionSubmissionCount >= MAX_LEADS_PER_SESSION) {
    return {
      success: false,
      message: 'You have reached the maximum number of inquiries for this session. Please call us directly for urgent help.',
      type: 'simulated',
    };
  }

  // 5. Basic mobile validation: 10 digits starting 6-9
  const cleanMobile = payload.mobile.replace(/\D/g, '');
  if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
    return {
      success: false,
      message: 'Please provide a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.',
      type: 'simulated',
    };
  }

  sessionSubmissionCount++;

  // 6. Enrich metadata
  const currentUrl = typeof window !== 'undefined' ? new URL(window.location.href) : null;
  const enriched: LeadPayload = {
    source: sanitize(payload.source) || 'website',
    loanType: sanitize(payload.loanType),
    amount: payload.amount ? String(payload.amount).trim() : undefined,
    city: sanitize(payload.city) || 'Ahmedabad',
    profile: sanitize(payload.profile),
    incomeBand: sanitize(payload.incomeBand),
    name: sanitize(payload.name),
    mobile: cleanMobile,
    email: sanitize(payload.email),
    preferredTime: sanitize(payload.preferredTime),
    message: sanitize(payload.message),
    consent: true,
    page: payload.page || (typeof window !== 'undefined' ? window.location.pathname : '/'),
    referrer: payload.referrer || (typeof document !== 'undefined' ? document.referrer : ''),
    utm_source: payload.utm_source || currentUrl?.searchParams.get('utm_source') || undefined,
    utm_medium: payload.utm_medium || currentUrl?.searchParams.get('utm_medium') || undefined,
    utm_campaign: payload.utm_campaign || currentUrl?.searchParams.get('utm_campaign') || undefined,
    clientTimestamp: new Date().toISOString(),
  };

  // Track event
  trackEvent('lead_submit', {
    source: enriched.source,
    loanType: enriched.loanType,
    city: enriched.city,
  });

  // 7. If an endpoint is configured, try POST
  const endpoint = SITE_CONFIG.submitLeadEndpoint;
  if (endpoint && endpoint.startsWith('http')) {
    try {
      const response = await fetchWithTimeout(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(enriched),
      }, 7000);

      if (response.ok) {
        return {
          success: true,
          message: 'Thank you! Your inquiry has been submitted. Our advisor will reach out shortly.',
          type: 'api',
        };
      }
      console.warn(`[LeadEngine] API endpoint returned ${response.status}. Falling back.`);
    } catch (err) {
      console.warn('[LeadEngine] API endpoint fetch failed or timed out. Falling back to WhatsApp/Email.', err);
    }
  }

  // 8. Graceful Fallback: Prepare WhatsApp and Mailto summaries
  return generateGracefulFallback(enriched);
}

// Timeout helper
async function fetchWithTimeout(resource: string, options: RequestInit, timeoutMs = 6000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Formats a clean message summary for WhatsApp and Mailto
function generateGracefulFallback(data: LeadPayload): LeadResponse {
  const summaryLines = [
    `*Revolut Money Inquiry*`,
    `Name: ${data.name}`,
    `Mobile: ${data.mobile}`,
    data.loanType ? `Loan: ${data.loanType}` : null,
    data.amount ? `Amount: ₹${data.amount}` : null,
    data.city ? `City: ${data.city}` : null,
    data.profile ? `Profile: ${data.profile}` : null,
    data.preferredTime ? `Callback Time: ${data.preferredTime}` : null,
    data.message ? `Notes: ${data.message}` : null,
  ].filter(Boolean);

  const plainText = summaryLines.join('\n');
  const encodedText = encodeURIComponent(plainText);

  const waNumber = SITE_CONFIG.contact.whatsappNumber || '919081645552';
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

  return {
    success: true,
    message: 'Your inquiry has been received! Our advisor will contact you within working hours.',
    type: 'whatsapp',
    fallbackUrl: whatsappUrl,
  };
}
