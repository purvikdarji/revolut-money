// src/components/ui/Tabs.tsx
import React, { createContext, useContext, useState, useId, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { motion } from "framer-motion";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue>({ activeTab: "", setActiveTab: () => {} });

export interface TabsProps {
  defaultTab?: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultTab = "", children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex gap-1 bg-mist rounded-pill p-1 w-fit",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface TabProps {
  id: string;
  label: string;
}

export function Tab({ id, label }: TabProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      id={`tab-${id}`}
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      onClick={() => setActiveTab(id)}
      className={cn(
        "relative px-5 py-2 text-sm font-semibold rounded-pill min-h-[44px] z-10",
        isActive
          ? "text-ink-900"
          : "text-ink-600 hover:text-brand-600 hover:bg-white/50"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeTabBackground"
          className="absolute inset-0 bg-white shadow-elev-1 rounded-pill -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {label}
    </button>
  );
}

export interface TabPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ id, children, className }: TabPanelProps) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className={className}
    >
      {children}
    </div>
  );
}
