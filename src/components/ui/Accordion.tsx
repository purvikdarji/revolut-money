// src/components/ui/Accordion.tsx
import React, { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("flex flex-col divide-y divide-line", className)}>
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}

interface AccordionRowProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionRow({ item, isOpen, onToggle }: AccordionRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("transition-colors duration-300", isOpen ? "bg-brand-50" : "")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${item.id}`}
        id={`accordion-trigger-${item.id}`}
        className="w-full flex items-center justify-between py-5 px-4 text-left gap-4 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
      >
        <span className="text-base font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">
          {item.question}
        </span>
        <div className="relative shrink-0 w-5 h-5 flex items-center justify-center text-ink-400 group-hover:text-brand-600 transition-colors">
          <span className={cn("absolute w-3.5 h-0.5 bg-currentColor transition-transform duration-300", isOpen ? "rotate-180 bg-brand-600" : "")} />
          <span className={cn("absolute w-3.5 h-0.5 bg-currentColor transition-transform duration-300", isOpen ? "rotate-0 opacity-0" : "rotate-90")} />
        </div>
      </button>

      {/* Smooth height animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${item.id}`}
            role="region"
            aria-labelledby={`accordion-trigger-${item.id}`}
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 px-4 text-ink-600 leading-relaxed">{item.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
