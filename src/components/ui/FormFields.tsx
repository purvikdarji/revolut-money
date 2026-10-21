// src/components/ui/FormFields.tsx
// Input, Select, Textarea with floating labels and error states.
// Slider with coin-shaped thumb.
import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useId,
} from "react";
import { cn } from "../../lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { UI_FLAGS } from "../../config/ui";

// ─── Shared wrapper ───────────────────────────────────────────────────────────
interface FieldWrapperProps {
  label: string;
  error?: string;
  hint?: string;
  id: string;
  hasValue: boolean;
  children: React.ReactNode;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

function FieldWrapper({ label, error, hint, id, hasValue, children, className, prefix, suffix }: FieldWrapperProps) {
  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "relative flex items-center bg-white rounded-input border transition-all duration-300 min-h-[48px]",
        error ? "border-red-400" : "border-line hover:border-brand-400",
        UI_FLAGS.microInteractions && UI_FLAGS.microInputGlow ? "focus-within:ring-4 focus-within:ring-brand-500/20 focus-within:border-brand-500" : "focus-within:ring-2 focus-within:ring-brand-600 focus-within:border-transparent"
      )}>
        {prefix && <span className="pl-4 pr-2 text-ink-600 font-medium whitespace-nowrap">{prefix}</span>}
        <div className="relative flex-1">
          {children}
          <label
            htmlFor={id}
            className={cn(
              "absolute left-4 transition-all duration-200 pointer-events-none select-none max-w-[calc(100%-1rem)] overflow-hidden text-ellipsis whitespace-nowrap",
              hasValue || true
                ? "top-2 text-xs text-brand-600 font-medium"
                : "top-1/2 -translate-y-1/2 text-sm text-ink-400"
            )}
          >
            {label}
          </label>
        </div>
        {suffix && <span className="pr-4 pl-2 text-ink-400 text-sm">{suffix}</span>}
        
        <div className="pr-4 flex items-center justify-center min-w-[2rem]">
          <AnimatePresence mode="wait" initial={false}>
            {error ? (
              <motion.span
                key="error"
                initial={UI_FLAGS.microInteractions ? { scale: 0.5, opacity: 0 } : {}}
                animate={{ scale: 1, opacity: 1 }}
                exit={UI_FLAGS.microInteractions ? { scale: 0.5, opacity: 0 } : {}}
                className="text-red-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </motion.span>
            ) : hasValue ? (
              <motion.span
                key="success"
                initial={UI_FLAGS.microInteractions ? { scale: 0.5, opacity: 0 } : {}}
                animate={{ scale: 1, opacity: 1 }}
                exit={UI_FLAGS.microInteractions ? { scale: 0.5, opacity: 0 } : {}}
                className="text-emerald-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <motion.polyline 
                    points="20 6 9 17 4 12" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </svg>
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error-msg"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-xs text-red-600 overflow-hidden"
            role="alert"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <motion.p
            key="hint-msg"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-xs text-ink-400 overflow-hidden"
          >
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function Input({ label, error, hint, containerClassName, prefix, suffix, id: idProp, value, defaultValue, className, ...props }: InputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasValue = Boolean(value ?? defaultValue ?? props.placeholder);

  return (
    <FieldWrapper label={label} error={error} hint={hint} id={id} hasValue={!!hasValue} className={containerClassName} prefix={prefix} suffix={suffix}>
      <input
        id={id}
        value={value}
        defaultValue={defaultValue}
        placeholder=" "
        className={cn(
          "w-full pt-6 pb-2 px-4 bg-transparent text-[16px] sm:text-sm text-ink-900 leading-snug transition-all duration-150 focus:outline-none placeholder:text-transparent disabled:text-ink-400 disabled:cursor-not-allowed",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldWrapper>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, hint, containerClassName, id: idProp, options, className, ...props }: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <FieldWrapper label={label} error={error} hint={hint} id={id} hasValue className={containerClassName}>
      <select
        id={id}
        className={cn(
          "w-full pt-6 pb-2 px-4 bg-transparent text-[16px] sm:text-sm text-ink-900 leading-snug transition-all duration-150 focus:outline-none appearance-none cursor-pointer",
          className
        )}
        aria-invalid={!!error}
        {...props}
      >
        <option value="" disabled />
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {/* Chevron icon */}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </FieldWrapper>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export function Textarea({ label, error, hint, containerClassName, id: idProp, className, ...props }: TextareaProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <FieldWrapper label={label} error={error} hint={hint} id={id} hasValue className={containerClassName}>
      <textarea
        id={id}
        placeholder=" "
        rows={4}
        className={cn(
          "w-full pt-6 pb-2 px-4 bg-transparent text-[16px] sm:text-sm text-ink-900 leading-snug resize-y min-h-[100px] transition-all duration-150 focus:outline-none placeholder:text-transparent",
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
    </FieldWrapper>
  );
}

// ─── Slider with coin-shaped thumb ───────────────────────────────────────────
export interface SliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  id?: string;
  className?: string;
}

export function Slider({ label, min, max, step = 1, value, onChange, formatValue, id: idProp, className }: SliderProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const pct = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : String(value);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink-600">
          {label}
        </label>
        <span className="text-sm font-semibold text-brand-600 tabular-nums">{displayValue}</span>
      </div>
      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-1.5 rounded-pill bg-line overflow-hidden">
          <div
            className="h-full bg-cta-gradient rounded-pill transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        {/* Native input (accessible) */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full opacity-0 h-6 cursor-pointer"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={displayValue}
        />
        {/* Coin-shaped thumb */}
        <div
          className="absolute w-7 h-7 rounded-full bg-cta-gradient shadow-md border-2 border-white flex items-center justify-center pointer-events-none transition-all duration-150"
          style={{ left: `calc(${pct}% - 14px)` }}
          aria-hidden
        >
          {/* Coin ₹ symbol */}
          <span className="text-white text-[9px] font-bold leading-none">₹</span>
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-ink-400 tabular-nums">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}

// ─── Segmented Control ───────────────────────────────────────────────────────
export interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div className={cn("inline-flex bg-mist p-1 rounded-pill border border-line", className)}>
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-pill transition-all duration-200 ease-smooth whitespace-nowrap",
              isSelected
                ? "bg-white text-ink-900 shadow-sm"
                : "text-ink-600 hover:text-brand-600"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Toggle Switch ───────────────────────────────────────────────────────────
export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function ToggleSwitch({ checked, onChange, label, className }: ToggleSwitchProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group", className)}>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={cn("block w-12 h-7 rounded-pill transition-colors duration-200", checked ? "bg-brand-600" : "bg-line")} />
        <div className={cn("absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 shadow-sm", checked ? "translate-x-5" : "")} />
      </div>
      {label && <span className="text-sm font-medium text-ink-900 group-hover:text-brand-600 transition-colors">{label}</span>}
    </label>
  );
}

// ─── Chip Selector ───────────────────────────────────────────────────────────
export interface ChipSelectorProps {
  options: { label: string; value: string }[];
  value: string | string[];
  onChange: (val: string | string[]) => void;
  multiple?: boolean;
  className?: string;
}

export function ChipSelector({ options, value, onChange, multiple, className }: ChipSelectorProps) {
  const toggle = (val: string) => {
    if (!multiple) {
      onChange(val);
      return;
    }
    const current = Array.isArray(value) ? value : [];
    if (current.includes(val)) onChange(current.filter((v) => v !== val));
    else onChange([...current, val]);
  };
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => {
        const isSelected = multiple ? (Array.isArray(value) && value.includes(opt.value)) : value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-pill border transition-all duration-200 ease-smooth",
              isSelected
                ? "bg-brand-50 border-brand-600 text-brand-700"
                : "bg-white border-line text-ink-600 hover:border-brand-400"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Stepper ─────────────────────────────────────────────────────────────────
export interface StepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function Stepper({ value, onChange, min = 0, max = 100, step = 1, className }: StepperProps) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));
  return (
    <div className={cn("inline-flex items-center bg-white rounded-input border border-line overflow-hidden", className)}>
      <button type="button" onClick={dec} disabled={value <= min} className="p-3 text-ink-600 hover:text-brand-600 hover:bg-mist transition-colors disabled:opacity-50">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <div className="w-12 text-center text-sm font-semibold tabular-nums">{value}</div>
      <button type="button" onClick={inc} disabled={value >= max} className="p-3 text-ink-600 hover:text-brand-600 hover:bg-mist transition-colors disabled:opacity-50">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>
  );
}
