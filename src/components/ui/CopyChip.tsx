import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { UI_FLAGS } from "../../config/ui";

interface CopyChipProps {
  value: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
}

export function CopyChip({ value, label, className = "", iconOnly = false }: CopyChipProps) {
  const [copied, setCopied] = useState(false);
  const scaleEffect = UI_FLAGS.microInteractions && UI_FLAGS.microButtonScale;

  const handleCopy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={scaleEffect ? { scale: 1.02 } : {}}
      whileTap={scaleEffect ? { scale: 0.95 } : {}}
      className={`relative inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
        copied
          ? "bg-brand-50 text-brand-700 border border-brand-200"
          : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
      } ${className}`}
      aria-label={copied ? "Copied" : `Copy ${label || value}`}
      title={copied ? "Copied!" : "Click to copy"}
    >
      {!iconOnly && <span className="truncate">{label || value}</span>}
      
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Check size={14} className="text-brand-600" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0, opacity: 0, rotate: 90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: -90 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Copy size={14} className="text-gray-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
