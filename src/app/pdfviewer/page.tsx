"use client";

import { useSearchParams } from "next/navigation";

export default function PdfViewerPage() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  if (!file) {
    return (
      <p
        style={{
          textAlign: "center",
          padding: "2rem",
          fontSize: "1rem",
        }}
      >
        No PDF selected
      </p>
    );
  }

  // ✅ Add fit-to-width param to PDF
  const pdfSrc = file.includes("#") ? file : `${file}#view=fitH`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        width: "100%",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          overflow: "auto", // allow scrolling if needed
          WebkitOverflowScrolling: "touch",
        }}
      >
        <iframe
          src={pdfSrc}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title="PDF Viewer"
        />
      </div>
    </div>
  );
}

