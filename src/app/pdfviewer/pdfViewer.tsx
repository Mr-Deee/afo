"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

// Load worker (needed for react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="w-full flex flex-col items-center p-4">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p>Loading PDF...</p>}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={800} // ✅ adjust for large screens
          />
        ))}
      </Document>
    </div>
  );
}
