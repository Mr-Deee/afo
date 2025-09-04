"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PdfViewerInner() {
  const searchParams = useSearchParams();
  let file = searchParams.get("file");

  if (!file) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        No PDF selected
      </p>
    );
  }

  if (!file.startsWith("http") && !file.startsWith("/")) {
    file = "/" + file;
  }

  return (
    <div className="pdf-container">
      <embed src={file} type="application/pdf" className="pdf-embed" />
      <style jsx>{`
        .pdf-container {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f5f5f5;
        }
        .pdf-embed {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        @media (max-width: 768px) {
          .pdf-container {
            height: 100dvh;
          }
          .pdf-embed {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      `}</style>
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

