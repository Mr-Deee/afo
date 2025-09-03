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
          color: "#666",
        }}
      >
        No PDF selected
      </p>
    );
  }

  // ✅ Force fit-to-width by default
  const pdfSrc = file.includes("#") ? file : `${file}#view=fitH`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh", // better for mobile than 100vh
        width: "100%",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          overflow: "hidden",
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
