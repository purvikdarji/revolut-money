import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../brand/Logo";
import { Illustration } from "../../assets/ui/Illustration";

export function Loader() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      const hasLoaded = sessionStorage.getItem("rm_app_loaded");
      if (hasLoaded) return false;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      return !prefersReducedMotion;
    } catch {
      return false;
    }
  });

  const handleSkip = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    try {
      sessionStorage.setItem("rm_app_loaded", "true");
    } catch {}

    // Max 1.2s duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    const onKey = () => handleSkip();
    const onClick = () => handleSkip();

    window.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("click", onClick, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [isVisible, handleSkip]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] } }}
          role="status"
          aria-label="Loading Revolut Money"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Logo wipe reveal */}
            <motion.div
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0, scale: 0.96 }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} // expoOut
            >
              <Logo
                variant="full"
                tone="color"
                width="max(180px, min(320px, 50vw))"
              />
            </motion.div>

            {/* Premium Progress Bar */}
            <motion.div
              className="mt-10 flex flex-col items-center gap-4 w-48"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full h-[2px] rounded-full bg-brand-50 overflow-hidden relative shadow-inner">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 rounded-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                />
              </div>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-ink-400">
                Initializing
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
