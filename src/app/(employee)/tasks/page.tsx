"use client";

import * as React from "react";

import { DoDChecklist } from "@/features/evidence/DoDChecklist";
import type { ChecklistItem } from "@/types";

const demoItems: ChecklistItem[] = [
  {
    id: "dod-1",
    text: "Teslim edilecek çıktı hazır",
    isCompleted: false,
    requiresProof: true,
    taskId: "task-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dod-2",
    text: "Testler çalıştırıldı",
    isCompleted: false,
    requiresProof: false,
    taskId: "task-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "dod-3",
    text: "Gerekli dosyalar paylaşıldı",
    isCompleted: false,
    requiresProof: true,
    taskId: "task-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function EmployeeTasksPage() {
  const [completedIds, setCompletedIds] = React.useState<string[]>([]);
  const [uploadedEvidenceIds, setUploadedEvidenceIds] = React.useState<string[]>([]);

  const requiredEvidenceIds = React.useMemo(
    () => demoItems.filter((item) => item.requiresProof).map((item) => item.id),
    []
  );

  const handleToggle = (id: string) => {
    setCompletedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <DoDChecklist
          items={demoItems}
          completedIds={completedIds}
          requiredEvidenceIds={requiredEvidenceIds}
          uploadedEvidenceIds={uploadedEvidenceIds}
          onToggleItem={handleToggle}
          onEvidenceSelected={() => setUploadedEvidenceIds(requiredEvidenceIds)}
          onSubmit={() => {
            setCompletedIds([]);
            setUploadedEvidenceIds([]);
          }}
        />
      </div>
    </main>
  );
}
