import React, { useEffect, useState } from "react";
import { UI_FLAGS } from "../../config/ui";

export function OpenStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const istTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const hours = istTime.getHours();
      const day = istTime.getDay(); // 0 is Sunday
      // Assuming open Monday(1) to Saturday(6) from 9:30 AM to 6:30 PM (18:30)
      if (day >= 1 && day <= 6 && hours >= 9 && hours < 19) {
        // We can do a more strict check for 9:30 to 18:30 if needed
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium">
      <span className="relative flex h-2.5 w-2.5">
        {isOpen && UI_FLAGS.microInteractions && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 @media(prefers-reduced-motion){animate-none}"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isOpen ? "bg-emerald-500" : "bg-gray-400"
          }`}
        ></span>
      </span>
      <span className={isOpen ? "text-white" : "text-white/70"}>
        {isOpen ? "Open Now" : "Closed"}
      </span>
    </div>
  );
}
