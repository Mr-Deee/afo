"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

function PdfViewerInner() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  let file = searchParams.get("file");

  if (!file) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        No PDF selected
      </p>
    );
  }

  // Normalize relative paths
  if (!file.startsWith("http") && !file.startsWith("/")) {
    file = "/" + file;
  }

  // Cache-busting version (bump this when you update the PDF)
  const versionedFile = `${file}?v=1.0.0`;

  return (
    <>
      {/* Preload PDF so browser fetches it ASAP */}
      <Head>
        <link
          rel="preload"
          href={versionedFile}
          as="document"
          type="application/pdf"
        />
      </Head>

      <div className="pdf-container">
        {/* Loader circle */}
        {loading && (
          <div className="loader-overlay">
            <div className="loading-circle"></div>
          </div>
        )}

        <iframe
          src={versionedFile}
          className="pdf-embed"
          onLoad={() => setLoading(false)}
        />

        <style jsx>{`
          .pdf-container {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f5f5f5;
          }

          .pdf-embed {
            width: 100%;
            height: 100%;
            border: none;
            display: ${loading ? "none" : "block"};
          }

          .loader-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f5f5f5;
            z-index: 10;
          }

          .loading-circle {
            width: 60px;
            height: 60px;
            border: 6px solid #ccc;
            border-top: 6px solid #0070f3;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {
            .pdf-container {
              height: 100dvh;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default function PdfViewerPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
          }}
        >
          Loading PDF Viewer…
        </div>
      }
    >
      <PdfViewerInner />
    </Suspense>
  );
}
