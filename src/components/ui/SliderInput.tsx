import React, { ChangeEvent, useState } from "react";
import { cn } from "../../lib/cn";
import { useToast } from "./Toast";
import { formatNumber } from "../../lib/format";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  formatValue?: (val: number) => string;
  prefix?: string;
  suffix?: string;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  prefix,
  suffix,
}: SliderInputProps) {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const displayValue = isTyping ? inputValue : (formatValue ? formatValue(value) : value.toString());
  const percentage = ((value - min) / (max - min)) * 100;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setInputValue(e.target.value);
    
    // Remove non-numeric characters for parsing
    let val = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
    if (!isNaN(val)) {
       // We update the slider visually, but don't clamp yet
       onChange(val);
    }
  };

  const handleBlur = () => {
    setIsTyping(false);
    let val = parseFloat(inputValue.replace(/[^0-9.]/g, "")) || value;
    let clamped = false;

    if (val < min) {
      val = min;
      clamped = true;
    }
    if (val > max) {
      val = max;
      clamped = true;
    }

    if (clamped) {
      toast({
        type: "info",
        title: "Value Adjusted",
        message: `Value adjusted to be between ${formatNumber(min)} and ${formatNumber(max)}.`,
      });
    }

    onChange(val);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-4">
        <label className="text-sm font-semibold text-gray-700 font-inter">
          {label}
        </label>
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              {prefix}
            </span>
          )}
          <input
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={cn(
              "w-32 text-right bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-semibold text-brand-deep font-jakarta transition-all",
              prefix && "pl-8",
              suffix && "pr-8"
            )}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <div className="relative h-2 rounded-full bg-gray-100 group">
        <div
          className="absolute top-0 left-0 h-full bg-brand-green rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-brand-green rounded-full shadow-md pointer-events-none transition-transform flex justify-center group-hover:scale-110 group-active:scale-95"
          style={{ left: `calc(${percentage}% - 12px)` }}
        >
          {/* Coin motif inside slider thumb */}
          <div className="absolute inset-1 rounded-full bg-brand-green/10" />
          
          {/* Value Bubble */}
          <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pointer-events-none flex flex-col items-center translate-y-2 group-hover:translate-y-0 group-active:translate-y-0">
            <div className="bg-brand-deep text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {formatValue ? formatValue(value) : value}
            </div>
            <div className="w-2 h-2 bg-brand-deep transform rotate-45 -mt-1" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium font-inter">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}
