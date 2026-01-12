"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Portal } from "@/components/ui/Portal";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  titleId?: string;
  descriptionId?: string;

  children: React.ReactNode;
  className?: string;

  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
};

export const Modal = ({
  isOpen,
  onClose,
  titleId,
  descriptionId,
  children,
  className,
  closeOnBackdrop = true,
  closeOnEsc = true,
}: Props) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ESC
  React.useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => panelRef.current?.focus());
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen ? (
          <div className="fixed inset-0 z-100">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={() => {
                if (closeOnBackdrop) onClose();
              }}
            />

            {/* Panel */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                tabIndex={-1}
                ref={panelRef}
                className={cn(
                  "bg-surface ring-border-soft w-full max-w-md rounded-2xl p-5 shadow-sm ring-1 outline-none",
                  className,
                )}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {children}
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
};
