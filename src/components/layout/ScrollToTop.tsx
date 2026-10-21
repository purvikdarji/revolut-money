import React, { useEffect, useState } from "react";
import { ArrowUp, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UI_FLAGS } from "../../config/ui";

export function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setShow(currentScroll > 300);
      setShowStickyCTA(progress > 30); // 30% scroll
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 20; // r=20
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 left-6 z-[70] hidden md:flex flex-col gap-4 items-center">
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
          >
            <Link
              to="/apply"
              className="bg-brand-600 text-white rounded-full px-5 py-3 shadow-xl hover:bg-brand-700 transition-colors flex items-center gap-2 font-semibold text-sm group"
            >
              <PenLine size={18} className="group-hover:-rotate-12 transition-transform" />
              Apply Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-brand-600 hover:bg-brand-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            {UI_FLAGS.microInteractions && UI_FLAGS.microScrollProgress && (
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-brand-100"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-brand-600 transition-all duration-300 ease-out"
                />
              </svg>
            )}
            <ArrowUp size={20} className="relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
