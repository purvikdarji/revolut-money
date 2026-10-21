// src/components/layout/FloatingElements.tsx
// Desktop floating WhatsApp button + Mobile sticky bottom bar.
import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "../../i18n";
import { SITE_CONFIG } from "../../config/site";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE, telHref } from "../../lib/contact";
import { cn } from "../../lib/cn";

// ─── Desktop floating WhatsApp button ────────────────────────────────────────
export function FloatingWhatsApp() {
  const t = useT();
  return (
    <motion.a
      href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full items-center justify-center shadow-lg"
      style={{ background: "#25D366" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}

// ─── Mobile sticky bottom bar ─────────────────────────────────────────────────
export function MobileBottomBar() {
  const t = useT();
  const [hidden, setHidden] = React.useState(false);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleResize = () => {
      if (window.visualViewport) {
        // If the visual viewport is significantly smaller than the window height, assume keyboard is open
        const isKeyboardOpen = window.visualViewport.height < window.innerHeight * 0.75;
        setKeyboardOpen(isKeyboardOpen);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", handleResize);
    
    // Initial check for keyboard
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    {
      id: "mobile-bar-call",
      label: t("floatingBar.call"),
      icon: <Phone size={20} strokeWidth={1.75} />,
      href: telHref(SITE_CONFIG.contact.primaryPhone),
      external: false,
      color: "text-brand-600",
    },
    {
      id: "mobile-bar-whatsapp",
      label: t("floatingBar.whatsapp"),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE),
      external: true,
      color: "text-[#25D366]",
    },
    {
      id: "mobile-bar-apply",
      label: t("floatingBar.apply"),
      icon: <PenLine size={20} strokeWidth={1.75} />,
      href: "/apply",
      external: false,
      color: "text-brand-600",
      highlight: true,
    },
  ];

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "md:hidden fixed bottom-0 inset-x-0 z-[70] bg-white border-t border-line pb-safe shadow-[0_-4px_24px_rgba(0,0,0,.08)] transition-transform duration-300 ease-in-out",
        (hidden || keyboardOpen) ? "translate-y-full" : "translate-y-0"
      )}
    >
      <div className="flex">
        {items.map((item, idx) => {
          const content = (
            <span className="flex flex-col items-center gap-1 min-h-[56px] justify-center px-4">
              <span className={cn(item.color)}>{item.icon}</span>
              <span className={cn("text-[10px] font-semibold", item.color)}>{item.label}</span>
            </span>
          );

          const cls = cn(
            "flex-1 flex items-center justify-center transition-colors",
            item.highlight ? "bg-brand-600" : "hover:bg-brand-50",
            item.highlight && "text-white"
          );

          const highlightItem = item.highlight
            ? { ...item, color: "text-white" }
            : item;

          if (item.external) {
            return (
              <a
                key={item.id}
                id={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className={cls}
              >
                {content}
              </a>
            );
          }
          if (item.href.startsWith("/")) {
            return (
              <Link
                key={item.id}
                id={item.id}
                to={item.href}
                aria-label={item.label}
                className={cn(cls, item.highlight && "[&_span]:text-white")}
              >
                {content}
              </Link>
            );
          }
          return (
            <a
              key={item.id}
              id={item.id}
              href={item.href}
              aria-label={item.label}
              className={cls}
            >
              {content}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
