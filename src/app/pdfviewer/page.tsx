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

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

  if (!file.startsWith("http") && !file.startsWith("/")) {
    file = "/" + file;
  }

  // ⚡ Preload + prefetch for faster opens
  useEffect(() => {
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "document";
    preload.href = file;
    preload.crossOrigin = "anonymous";

    const prefetch = document.createElement("link");
    prefetch.rel = "prefetch";
    prefetch.as = "document";
    prefetch.href = file;
    prefetch.crossOrigin = "anonymous";

    document.head.appendChild(preload);
    document.head.appendChild(prefetch);

    return () => {
      document.head.removeChild(preload);
      document.head.removeChild(prefetch);
    };
  }, [file]);

  return (
    <div className="pdf-container">
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <iframe
        src={file + "#zoom=page-fit"}
        className="pdf-embed"
        onLoad={() => setLoading(false)} // hides loader as soon as PDF viewer is ready
      />
      <style jsx>{`
        .pdf-container {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #f5f5f5;
        }
        .pdf-embed {
          width: 100%;
          height: 100%;
          border: none;
        }
        .loader-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          z-index: 10;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid #ddd;
          border-top: 6px solid #0070f3;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .pdf-container {
            height: 100dvh;
          }
          .pdf-embed {
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
          <style jsx>{`
            .spinner {
              width: 40px;
              height: 40px;
              border: 5px solid #ccc;
              border-top: 5px solid #0070f3;
              border-radius: 50%;
              animation: spin 0.6s linear infinite;
              margin: 0 auto;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <p>Loading PDF…</p>
        </div>
      }
    >
      <PdfViewerInner />
    </Suspense>
  );
}
