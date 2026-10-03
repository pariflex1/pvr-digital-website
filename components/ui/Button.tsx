import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold-outline";
  size?: "default" | "sm" | "lg" | "xl";
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
    "group inline-flex items-center justify-center font-medium tracking-tight rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5C518] focus-visible:outline-offset-3 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] select-none";

  const variantStyles = {
    primary:
      "bg-accent text-[#070709] font-bold hover:bg-accent shadow-md hover:shadow-lg border border-accent",
    secondary:
      "bg-surface/80 text-text-main border border-text-main/10 hover:border-text-main/25 hover:bg-surface shadow-sm",
    ghost:
      "bg-transparent text-text-muted hover:text-[#FFFFFF] hover:bg-text-main/[0.04]",
    "gold-outline":
      "bg-transparent text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(245,197,24,0.15)]"
  };

  const sizeStyles = {
    sm: "min-h-[38px] px-4 text-[13px] gap-1.5",
    default: "min-h-[46px] px-6 text-[14px] gap-2",
    lg: "min-h-[52px] px-8 text-[15px] font-semibold gap-2.5",
    xl: "min-h-[60px] px-10 text-[16px] font-semibold gap-3"
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
