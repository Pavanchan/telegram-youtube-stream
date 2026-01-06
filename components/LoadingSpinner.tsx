"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  message?: string;
  className?: string;
  showMessage?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  message = "Loading...",
  className,
  showMessage = true,
}: LoadingSpinnerProps) {
  const sizeClasses: Record<SpinnerSize, string> = {
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-10 h-10 border-[3px]",
  };

  const containerPadding: Record<SpinnerSize, string> = {
    sm: "min-h-[60px]",
    md: "min-h-[80px]",
    lg: "min-h-[100px]",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        containerPadding[size],
        className
      )}
    >
      <div
        className={cn(
          "border-muted-foreground/20 border-t-primary rounded-full animate-spin",
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      />

      {showMessage && (
        <p className="mt-3 text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   Inline spinner for use inside buttons / text / layouts
   ============================================================ */

export function InlineSpinner({
  size = "sm",
  className,
}: {
  size?: SpinnerSize;
  className?: string;
}) {
  const sizeClasses: Record<SpinnerSize, string> = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-6 h-6 border-2",
  };

  return (
    <div
      className={cn(
        "border-muted-foreground/20 border-t-primary rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
