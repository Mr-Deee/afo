"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./PdfViewerPage.module.css";

/**
 * Append a fragment so most built-in viewers start "zoomed out".
 * - Chrome/Edge: #zoom=page-fit works well
 * - Firefox: #view=FitH (fit width), #page=1 ensures first page
 * We include both; browsers ignore unknown params.
 */
function withZoomedOutView(url: string) {
  const hasHash = url.includes("#");
  const sep = hasHash ? "&" : "#";
  const params = "page=1&zoom=page-fit&view=FitH&toolbar=1&navpanes=0";
  return `${url}${sep}${params}`;
}

export default function PdfViewerPage() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  const src = useMemo(() => (file ? withZoomedOutView(file) : null), [file]);

  if (!src) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        No PDF selected
      </p>
    );
  }

  return (
    <div className={styles.pdfContainer}>
      <iframe
        src={src}
        className={styles.pdfFrame}
        title="PDF viewer"
        /* Helpful for iOS/Safari to allow inline media */
        allow="fullscreen"
        /* sandbox relaxed enough for embedded PDF UIs */
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}
