import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "normal" | "wide" | "narrow" | "fluid";
}

export function Container({
  children,
  className,
  size = "normal",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-[880px]",
    normal: "max-w-[1240px]",
    wide: "max-w-[1400px]",
    fluid: "max-w-full"
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
