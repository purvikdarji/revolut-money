import React, { forwardRef, ButtonHTMLAttributes, useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/cn";
import { MagneticButton } from "../motion";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "on-dark";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  success?: boolean;
  magnetic?: boolean; // magnetic hover (off by default, only active on desktop)
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cta-gradient text-white shadow-card hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border-0",
  secondary:
    "bg-transparent text-brand-600 border-2 border-brand-600 hover:bg-brand-50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  ghost:
    "bg-transparent text-ink-600 hover:text-brand-600 hover:bg-brand-50 active:scale-[0.98] border-0",
  "on-dark":
    "bg-white/15 text-white border border-white/30 backdrop-blur-md hover:bg-white/25 hover:-translate-y-0.5 active:scale-[0.98]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm rounded-pill gap-1.5 whitespace-nowrap",
  md: "h-11 px-6 text-sm rounded-pill gap-2 whitespace-nowrap",
  lg: "h-14 px-8 text-base rounded-pill gap-2.5 whitespace-nowrap",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      success = false,
      magnetic = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      disabled,
      as,
      href,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [isPointerFine, setIsPointerFine] = useState(false);
    useEffect(() => {
      const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
      setIsPointerFine(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const base =
      "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 ease-smooth cursor-pointer select-none min-h-[44px] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 overflow-hidden";

    const cls = cn(
      base,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      className,
    );

    const content = (
      <>
        <AnimatePresence mode="popLayout" initial={false}>
          {success ? (
            <motion.div
              key="success"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="mr-2"
            >
              <Check className="text-emerald-400" size={18} strokeWidth={2.5} />
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="mr-2"
            >
              <Loader2 className="animate-spin" size={16} />
            </motion.div>
          ) : leftIcon ? (
            <motion.div
              key="icon"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="shrink-0 mr-2"
            >
              {leftIcon}
            </motion.div>
          ) : null}
        </AnimatePresence>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        {!loading && !success && rightIcon && (
          <span className="shrink-0 relative z-10 ml-2">{rightIcon}</span>
        )}
        {variant === "primary" && (
          <span className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
            <span className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shine" />
          </span>
        )}
      </>
    );

    if (as === "a" || href) {
      if (magnetic && isPointerFine) {
        return (
          <MagneticButton>
            <a
              href={href}
              className={cn(cls, "group relative")}
              {...(props as any)}
            >
              {content}
            </a>
          </MagneticButton>
        );
      }
      return (
        <a
          href={href}
          className={cn(cls, "group relative")}
          {...(props as any)}
        >
          {content}
        </a>
      );
    }

    if (magnetic && isPointerFine) {
      return (
        <MagneticButton>
          <button
            ref={ref}
            type={type}
            className={cn(cls, "group relative")}
            disabled={disabled || loading}
            {...(props as any)}
          >
            {content}
          </button>
        </MagneticButton>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cn(cls, "group relative")}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
export { Button };
