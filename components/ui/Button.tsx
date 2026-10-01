import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold-outline";
  size?: "default" | "sm" | "lg";
  href?: string;
  isExternal?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "default",
  href,
  isExternal,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-[#D9AE55] text-[#1A1300] hover:bg-[#F0C873] shadow-sm hover:shadow-md border border-[#D9AE55]",
    secondary:
      "bg-transparent text-[var(--text)] border border-[var(--line)] hover:bg-[var(--surface)] hover:border-[var(--muted)]",
    ghost:
      "bg-transparent text-[var(--text)] hover:text-[#D9AE55] hover:bg-white/5",
    "gold-outline":
      "bg-transparent text-[#D9AE55] border border-[#D9AE55] hover:bg-[#D9AE55] hover:text-[#1A1300]"
  };

  const sizeStyles = {
    default: "min-h-[48px] px-6 text-[15px]",
    sm: "min-h-[40px] px-4 text-[14px]",
    lg: "min-h-[54px] px-8 text-[16px]"
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (isExternal || href.startsWith("http") || href.startsWith("https://wa.me") || href.startsWith("tel:")) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={href.startsWith("tel:") ? undefined : "_blank"}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
