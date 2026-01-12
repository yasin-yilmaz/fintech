"use client";

import * as React from "react";

import { Construction } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  icon?: React.ReactNode;
};

export const NotReady = ({
  title = "This page isn’t ready yet",
  description = "We’re working on it. Please check back soon.",
  actionHref = "/dashboard",
  actionLabel = "Back to Dashboard",
  className,
  icon,
}: Props) => {
  return (
    <section
      className={cn("my-10 max-w-full min-w-0 bg-white p-6", className)}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-surface-2 mb-4 grid size-14 place-items-center rounded-full">
          {icon ?? <Construction className="text-granite size-7" />}
        </div>

        <div className="space-y-2">
          <h2 className="text-granite text-lg font-semibold">{title}</h2>
          <p className="text-granite-muted text-sm">{description}</p>
        </div>

        {actionHref && actionLabel ? (
          <Link
            href={actionHref}
            className={cn(
              "bg-surface hover:bg-surface-hover text-granite mt-6 inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors",
              "ring-border-soft ring-1",
            )}
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
};
