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

  return (
    <>
      {/* Preload PDF so browser fetches it ASAP */}
      <Head>
        <link
          rel="preload"
          href={file}
          as="document"
          type="application/pdf"
        />
      </Head>

      <div className="pdf-container">
        {/* Loader overlay */}
        {loading && (
          <div className="loader-overlay">
            <div className="circle-loader"></div>
          </div>
        )}

        <iframe
          src={file}
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
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
          }

          .circle-loader {
            width: 60px;
            height: 60px;
            border: 6px solid #ddd;
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
