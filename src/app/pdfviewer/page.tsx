"use client";

import { useSearchParams } from "next/navigation";

export default function PdfViewerPage() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  if (!file) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>No PDF selected</p>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src={file}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}
