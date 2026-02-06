import * as React from "react";

export interface EvidenceUploadProps {
  isVisible: boolean;
  onFilesSelected?: (files: FileList) => void;
}

export function EvidenceUpload({ isVisible, onFilesSelected }: EvidenceUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);

  if (!isVisible) {
    return null;
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onFilesSelected?.(event.dataTransfer.files);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`flex min-h-[220px] w-full flex-col items-center justify-center gap-3 rounded-squircle-lg border border-dashed px-6 py-8 text-center transition md:min-h-[260px] ${
          isDragging
            ? "border-action-blue bg-action-blue/10 text-action-blue"
            : "border-white/10 bg-glass-surface/70 text-white/70"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <p className="text-sm font-semibold text-white">
          Kanıt yüklemek için sürükleyip bırakın
        </p>
        <p className="text-xs text-white/60">PDF, JPG, PNG veya MP4</p>
        <label className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/5">
          Dosya seç
          <input
            type="file"
            className="hidden"
            multiple
            onChange={(event) => {
              if (event.target.files) {
                onFilesSelected?.(event.target.files);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}
