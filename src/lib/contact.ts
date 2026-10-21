// src/lib/contact.ts
// WhatsApp and contact helper utilities.

import { SITE_CONFIG } from "../config/site";

/**
 * Build a WhatsApp deep-link URL.
 * @param message Pre-filled message text
 */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encoded}`;
}

/**
 * Default WhatsApp inquiry message.
 */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello! I would like to enquire about a loan. Please assist me.";

/**
 * Generate a vCard (.vcf) string for Yash Darji and trigger download.
 */
export function downloadVCard(): void {
  const { relationshipManager, primaryPhoneDisplay, emails } =
    SITE_CONFIG.contact;
  const { full } = SITE_CONFIG.address;

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${relationshipManager.name}`,
    `N:Darji;Yash;;;`,
    `ORG:Revolut Money`,
    `TITLE:${relationshipManager.title}`,
    `TEL;TYPE=CELL,VOICE:${primaryPhoneDisplay}`,
    `EMAIL;TYPE=INTERNET:${emails.info}`,
    `ADR;TYPE=WORK:;;${full}`,
    `URL:https://www.${SITE_CONFIG.brand.domain}`,
    `PHOTO;VALUE=uri:https://www.${SITE_CONFIG.brand.domain}/logo-square-1024.png`,
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "yash-darji-revolut-money.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Format phone number as tel: href.
 */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/**
 * Format email as mailto: href.
 */
export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}
