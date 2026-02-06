import * as React from "react";

import type { ChecklistItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { EvidenceUpload } from "./EvidenceUpload";

export interface DoDChecklistProps {
  items: ChecklistItem[];
  completedIds: string[];
  requiredEvidenceIds: string[];
  uploadedEvidenceIds: string[];
  onToggleItem?: (id: string) => void;
  onSubmit?: () => void;
  onEvidenceSelected?: (files: FileList) => void;
}

export function DoDChecklist({
  items,
  completedIds,
  requiredEvidenceIds,
  uploadedEvidenceIds,
  onToggleItem,
  onSubmit,
  onEvidenceSelected,
}: DoDChecklistProps) {
  const allChecked = items.every((item) => completedIds.includes(item.id));
  const requiredEvidenceDone = requiredEvidenceIds.every((id) =>
    uploadedEvidenceIds.includes(id)
  );
  const canSubmit = allChecked && requiredEvidenceDone;

  return (
    <section className="flex min-h-screen w-full flex-col gap-6 bg-white px-5 py-8 text-slate-900 sm:rounded-squircle-lg sm:border sm:border-slate-200 sm:bg-white sm:p-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Definition of Done
        </p>
        <h2 className="text-2xl font-semibold">Görev Teslim Kontrolü</h2>
        <p className="text-sm text-slate-500">
          Tüm maddeleri tamamlamadan ve gerekli kanıtları yüklemeden teslim
          edemezsiniz.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const isChecked = completedIds.includes(item.id);

          return (
            <label
              key={item.id}
              className={`flex items-start gap-3 rounded-squircle border px-4 py-3 text-sm transition ${
                isChecked
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleItem?.(item.id)}
                className="mt-1 h-4 w-4 accent-emerald-500"
              />
              <div>
                <p className="font-medium text-slate-900">{item.text}</p>
                {item.requiresProof ? (
                  <p className="text-xs text-slate-500">
                    Kanıt yükleme zorunlu
                  </p>
                ) : null}
              </div>
            </label>
          );
        })}
      </div>

      <EvidenceUpload
        isVisible={requiredEvidenceIds.length > 0}
        onFilesSelected={onEvidenceSelected}
      />

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant={canSubmit ? "primary" : "ghost"}
          disabled={!canSubmit}
          onClick={() => onSubmit?.()}
          className={`w-full justify-center ${
            canSubmit ? "" : "border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          Submit
        </Button>
        {!canSubmit ? (
          <p className="text-xs text-slate-500">
            Eksik maddeler veya kanıtlar var.
          </p>
        ) : null}
      </div>
    </section>
  );
}
