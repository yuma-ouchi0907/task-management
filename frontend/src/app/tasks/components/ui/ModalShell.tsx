"use client";

import { ReactNode } from "react";
import { CloseIcon } from "@/app/tasks/components/icons";

type Props = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalShell({ onClose, children }: Props) {
  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      {/* overlay */}
      <div
        className="fixed inset-0 bg-[var(--bg-surface)]/60 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-2xl bg-[var(--bg-surface2)] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
          >
            <button
              type="button"
              aria-label="閉じる"
              className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              onClick={onClose}
            >
              <CloseIcon />
            </button>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
