"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./PdfViewerPage.module.css";

function PdfViewerInner() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  if (!file) {
    return <p className={styles.message}>No PDF selected. Please choose a PDF file to view.</p>;
  }

  // Append PDF fragment for auto-fit across browsers
  const pdfUrl = `${file}#zoom=page-fit&view=FitH&page=1`;

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.pdfWrapper}>
        <iframe
          src={pdfUrl}
          className={styles.viewerFrame}
          title="PDF Viewer"
          style={{
            width: "100%",
            height: isMobile ? "100vh" : "100%",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}

export default function PdfViewerPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.viewerContainer}>
          <p className={styles.message}>Loading PDF…</p>
        </div>
      }
    >
      <PdfViewerInner />
    </Suspense>
  );
}
