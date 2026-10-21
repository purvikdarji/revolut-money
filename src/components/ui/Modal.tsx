// src/components/ui/Modal.tsx
import React, { useEffect, useRef, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ isOpen, onClose, title, children, size = "md", className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Close on Escape and Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalContentRef.current) {
        const focusable = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    // Auto focus first interactive element or close button
    const timer = setTimeout(() => {
      if (modalContentRef.current) {
        const focusable = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal
          aria-label={title}
          className={cn(
            "fixed inset-0 z-[200] flex bg-[#032B1A]/50 backdrop-blur-md",
            isMobile ? "items-end" : "items-center justify-center p-4"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalContentRef}
            className={cn(
              "relative w-full bg-white shadow-elev-3 flex flex-col",
              isMobile 
                ? "rounded-t-[32px] max-h-[92svh] pb-safe" // Bottom Sheet
                : cn("rounded-card max-h-[90vh]", sizeMap[size]), // Modal
              className
            )}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (isMobile && (info.offset.y > 150 || info.velocity.y > 500)) {
                onClose();
              }
            }}
            initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 16 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 16 }}
            transition={
              isMobile 
                ? { type: "spring", stiffness: 400, damping: 40 }
                : { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }
            }
          >
            {/* Drag Handle (Mobile only) */}
            {isMobile && (
              <div className="w-full flex justify-center py-3 touch-none flex-shrink-0">
                <div className="w-12 h-1.5 bg-ink-200 rounded-full" />
              </div>
            )}

            {/* Header */}
            {title && (
              <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-white/95 backdrop-blur-sm border-b border-line flex-shrink-0">
                <h3 className="text-lg font-bold text-ink-900">{title}</h3>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-mist text-ink-400 hover:text-ink-900 hover:bg-line transition-colors focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-mist text-ink-400 hover:text-ink-900 hover:bg-line transition-colors z-20 focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <X size={18} />
              </button>
            )}
            {/* Body */}
            <div className={cn("p-6 overflow-y-auto overscroll-contain", !title && "pt-12")}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
