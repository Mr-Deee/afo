"use client";

import { Suspense } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// Load worker for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewerContent() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");
  const [numPages, setNumPages] = useState<number>(0);

  if (!file) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>No PDF selected</p>;
  }

  return (
    <div className="w-full flex flex-col items-center p-4">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p>Loading PDF...</p>}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={800} // ✅ control max width for large screens
          />
        ))}
      </Document>
    </div>
  );
}

export default function PdfViewerPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center", padding: "2rem" }}>Loading PDF...</p>}>
      <PdfViewerContent />
    </Suspense>
  );
}
