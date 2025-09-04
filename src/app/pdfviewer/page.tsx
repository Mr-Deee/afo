// "use client";

// import { Suspense } from "react";
// import { useSearchParams } from "next/navigation";

// function PdfViewerInner() {
//   const searchParams = useSearchParams();
//   let file = searchParams.get("file");

//   if (!file) {
//     return (
//       <p style={{ textAlign: "center", padding: "2rem" }}>
//         No PDF selected
//       </p>
//     );
//   }

//   if (!file.startsWith("http") && !file.startsWith("/")) {
//     file = "/" + file;
//   }

//   return (
//     <div className="pdf-container">
//       <embed src={file} type="application/pdf" className="pdf-embed" />
//       <style jsx>{`
//         .pdf-container {
//           position: relative;
//           width: 100%;
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: #f5f5f5;
//         }
//         .pdf-embed {
//           width: 100%;
//           height: 100%;
//           object-fit: contain;
//         }
//         @media (max-width: 768px) {
//           .pdf-container {
//             height: 100dvh;
//           }
//           .pdf-embed {
//             width: 100%;
//             height: 100%;
//             object-fit: contain;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function PdfViewerPage() {
//   return (
//     <Suspense
//       fallback={
//         <p style={{ textAlign: "center", padding: "2rem" }}>
//           Loading PDF…
//         </p>
//       }
//     >
//       <PdfViewerInner />
//     </Suspense>
//   );
// }

"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function PdfViewerInner() {
  const searchParams = useSearchParams();
  const fileParam = searchParams.get("file");
  const [loading, setLoading] = useState(true);
  const [viewerUrl, setViewerUrl] = useState("");

  useEffect(() => {
    if (!fileParam) return;

    let file = fileParam;
    if (!file.startsWith("http") && !file.startsWith("/")) {
      file = "/" + file;
    }

    // Full absolute URL for Google Docs Viewer
    const fullUrl =
      file.startsWith("http") ? file : window.location.origin + file;

    setViewerUrl(
      `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
        fullUrl
      )}`
    );
  }, [fileParam]);

  if (!fileParam) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        No PDF selected
      </p>
    );
  }

  return (
    <div className="pdf-container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
          <p>Loading PDF…</p>
        </div>
      )}

      {viewerUrl && (
        <iframe
          src={viewerUrl}
          className="pdf-iframe"
          onLoad={() => setLoading(false)}
          allow="fullscreen"
        />
      )}

      <style jsx>{`
        .pdf-container {
          position: relative;
          width: 100%;
          height: 100dvh; /* safer for iOS Safari than 100vh */
          background: #f5f5f5;
          overflow: hidden;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .spinner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          z-index: 10;
        }

        .spinner {
          border: 4px solid #ddd;
          border-top: 4px solid #333;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .pdf-container {
            height: 100dvh; /* dynamic height ensures no cutoff on iOS Safari */
          }
        }
      `}</style>
    </div>
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
          <div
            style={{
              border: "4px solid #ddd",
              borderTop: "4px solid #333",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
              margin: "auto",
            }}
          ></div>
          <p>Loading PDF…</p>
        </div>
      }
    >
      <PdfViewerInner />
    </Suspense>
  );
}
