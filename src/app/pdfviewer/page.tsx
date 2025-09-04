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

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function PdfViewerInner() {
  const searchParams = useSearchParams();
  let file = searchParams.get("file");
  const [loading, setLoading] = useState(true);

  if (!file) {
    return (
      <p style={{ textAlign: "center", padding: "2rem" }}>
        No PDF selected
      </p>
    );
  }

  if (!file.startsWith("http") && !file.startsWith("/")) {
    file = "/" + file;
  }

  // Add cache-buster for fresh load each time
  const src = `${file}#zoom=page-fit&${Date.now()}`;

  return (
    <div className="pdf-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading PDF…</p>
        </div>
      )}
      <iframe
        src={src}
        className="pdf-frame"
        onLoad={() => setLoading(false)}
        title="PDF Viewer"
      />
      <style jsx>{`
        .pdf-container {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #f5f5f5;
          display: flex;
          flex-direction: column;
        }
        .pdf-frame {
          flex: 1;
          width: 100%;
          height: 100%;
          border: none;
        }
        .loading-overlay {
          position: absolute;
          inset: 0;
          background: #f5f5f5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .spinner {
          border: 6px solid #ddd;
          border-top: 6px solid #0070f3;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .pdf-container {
            height: 100dvh;
          }
          .pdf-frame {
            width: 100%;
            height: 100%;
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
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div className="spinner"></div>
          <p>Loading PDF…</p>
        </div>
      }
    >
      <PdfViewerInner />
    </Suspense>
  );
}
