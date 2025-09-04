"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import styles from "./PdfViewerPage.module.css";

const Document = dynamic(() => import("react-pdf").then((m) => m.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then((m) => m.Page), { ssr: false });

function useContainerWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

export default function PdfViewerPage() {
  const searchParams = useSearchParams();
  const file = searchParams.get("file") || "/pdfs/sample.pdf";

  const { ref, width } = useContainerWidth();
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    (async () => {
      const { pdfjs } = await import("react-pdf");
      pdfjs.GlobalWorkerOptions.workerSrc =
        `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    })();
  }, []);

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.inner}>
        <div className={styles.toolbar}>
          <span className={styles.filepath}>{file}</span>
        </div>

        <div ref={ref} className={styles.canvasWrap}>
          {width > 0 && (
            <Document
              file={file}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={(err) => console.error("PDF load error:", err)}
              loading={<div className={styles.message}>Loading PDF…</div>}
              error={<div className={styles.message}>Failed to load PDF.</div>}
            >
              {/* Render ALL pages in order */}
              {Array.from(new Array(numPages), (_, i) => (
                <Page
                  key={`page_${i + 1}`}
                  pageNumber={i + 1}
                  width={Math.min(width, 1000)}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
