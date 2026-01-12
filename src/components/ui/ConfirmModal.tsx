"use client";

import * as React from "react";
import { useId } from "react";

import { cn } from "@/lib/utils";

import { Modal } from "@/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  title: string;
  description?: string;

  confirmLabel?: string;
  cancelLabel?: string;

  onConfirm: () => void | Promise<void>;
  isDanger?: boolean;
  isLoading?: boolean;

  className?: string;
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  isDanger = false,
  isLoading = false,
  className,
}: Props) => {
  const titleId = useId();
  const descId = useId();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleId={titleId}
      descriptionId={description ? descId : undefined}
      className={className}
    >
      <div className="space-y-2">
        <h3 id={titleId} className="text-granite text-base font-semibold">
          {title}
        </h3>
        {description ? (
          <p id={descId} className="text-granite-muted text-sm">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="text-granite hover:bg-surface-hover rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {cancelLabel}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-50",
            isDanger
              ? "bg-accent text-granite hover:opacity-95"
              : "bg-granite text-white hover:opacity-95",
          )}
        >
          {isLoading ? "Please wait..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
};
