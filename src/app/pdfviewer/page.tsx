"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function PdfViewerInner() {
  const searchParams = useSearchParams();
  const fileParam = searchParams.get("file");
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!fileParam) return;

    // Clean the file path
    const cleanFile = fileParam.startsWith("/") ? fileParam : `/${fileParam}`;
    const fullUrl = `${window.location.origin}${cleanFile}`;
    setPdfUrl(fullUrl);
  }, [fileParam]);

  if (!fileParam) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>No PDF selected</p>
      </div>
    );
  }

  return (
    <div style={{ 
      width: "100%", 
      height: "100dvh", 
      background: "#f5f5f5",
      position: "relative"
    }}>
      {pdfUrl && (
        <object
          data={pdfUrl}
          type="application/pdf"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          onError={() => setError(true)}
        >
          <div style={{ 
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <p>Unable to display PDF.</p>
            <a 
              href={pdfUrl} 
              download
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
              Download PDF
            </a>
          </div>
        </object>
      )}
      
      {error && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}>
          <p>⚠️ Unable to load PDF</p>
          <a 
            href={pdfUrl} 
            download
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            Download PDF instead
          </a>
        </div>
      )}
    </div>
  );
}

export default function PdfViewerPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        height: "100dvh",
        background: "#f5f5f5"
      }}>
        <div style={{
          border: "4px solid #ddd",
          borderTop: "4px solid #333",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
        }}></div>
        <p style={{ marginTop: "1rem" }}>Loading PDF…</p>
      </div>
    }>
      <PdfViewerInner />
    </Suspense>
  );
}