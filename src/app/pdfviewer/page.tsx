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
  const [preloaded, setPreloaded] = useState(false);

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

  // Preload PDF
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = file;
    link.as = "fetch";
    link.crossOrigin = "anonymous";

    link.onload = () => setPreloaded(true);
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [file]);

  return (
    <div className="pdf-container">
      {(loading || !preloaded) && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <embed
        src={file}
        type="application/pdf"
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
          object-fit: contain;
        }
        .loader-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          z-index: 10;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid #ccc;
          border-top: 6px solid #0070f3;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .pdf-container {
            height: 100dvh;
          }
          .pdf-embed {
            width: 100%;
            height: 100%;
            object-fit: contain;
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
              animation: spin 0.8s linear infinite;
              margin: 0 auto;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
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
