"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const [scale, setScale] = useState<number>(1.0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const resetZoom = () => setScale(1.0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        width: "100%",
        overflow: "auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Zoom Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "0.75rem",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <button onClick={zoomOut}>➖ Zoom Out</button>
        <button onClick={resetZoom}>🔄 Reset</button>
        <button onClick={zoomIn}>➕ Zoom In</button>
      </div>

      {/* PDF Pages */}
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p style={{ textAlign: "center" }}>Loading PDF...</p>}
        className="flex flex-col items-center"
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={scale}
            width={windowWidth > 800 ? 800 : windowWidth - 20}
          />
        ))}
      </Document>
    </div>
  );
}
