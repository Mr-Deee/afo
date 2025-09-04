"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PdfViewerInner() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  if (!file) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        No PDF selected
      </p>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh", // ✅ safer for mobile (respects dynamic viewport)
        overflow: "hidden",
      }}
    >
      <iframe
        src={file}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="PDF Viewer"
      />
    </div>
  );
}

export default function PdfViewerPage() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: "center", padding: "2rem" }}>
          Loading PDF…
        </p>
      }
    >
      <PdfViewerInner />
    </Suspense>
  );
}
