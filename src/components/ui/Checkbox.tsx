import React, { InputHTMLAttributes, ReactNode, useId } from 'react';
import { cn } from '../../lib/cn';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
  containerClassName?: string;
}

export function Checkbox({ label, error, containerClassName, id: idProp, className, ...props }: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            id={id}
            className={cn(
              "peer appearance-none w-5 h-5 border-2 rounded transition-colors",
              error ? "border-red-500" : "border-ink-300 group-hover:border-brand-500",
              "checked:bg-brand-600 checked:border-brand-600",
              "focus:outline-none focus:ring-2 focus:ring-brand-600/20",
              className
            )}
            aria-invalid={!!error}
            {...props}
          />
          <svg
            className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-sm text-ink-600 leading-snug select-none">{label}</div>
      </label>
      {error && <p className="text-xs text-red-600 ml-8" role="alert">{error}</p>}
    </div>
  );
}
