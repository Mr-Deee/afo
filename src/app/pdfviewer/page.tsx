"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./PdfViewerPage.module.css";

function PdfViewerInner() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  if (!file) {
    return (
      <p className={styles.message}>
        No PDF selected
      </p>
    );
  }

  return (
    <div className={styles.viewerContainer}>
      <iframe
        src={file}
        className={styles.viewerFrame}
        title="PDF Viewer"
      />
    </div>
  );
}

export default function PdfViewerPage() {
  return (
    <Suspense
      fallback={
        <p className={styles.message}>Loading PDF…</p>
      }
    >
      <PdfViewerInner />
    </Suspense>
  );
}
