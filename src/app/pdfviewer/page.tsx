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

// "use client";

// import { Suspense, useState } from "react";
// import { useSearchParams } from "next/navigation";

// function PdfViewerInner() {
//   const searchParams = useSearchParams();
//   let file = searchParams.get("file");
//   const [loading, setLoading] = useState(true);

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
//       {/* Spinner in background */}
//       {loading && (
//         <div className="spinner-background">
//           <div className="spinner"></div>
//           <p>Loading PDF…</p>
//         </div>
//       )}
//       <embed
//         src={file}
//         type="application/pdf"
//         className="pdf-embed"
//         onLoad={() => setLoading(false)}
//       />
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
//           position: relative;
//           z-index: 2; /* Always above spinner background */
//         }
//         .spinner-background {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           z-index: 1; /* Behind the PDF */
//           opacity: 0.4; /* faint in background */
//         }
//         .spinner {
//           border: 4px solid #ddd;
//           border-top: 4px solid #333;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
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
//         <div style={{ textAlign: "center", padding: "2rem" }}>
//           <div className="spinner"></div>
//           <p>Loading PDF…</p>
//         </div>
//       }
//     >
//       <PdfViewerInner />
//     </Suspense>
//   );
// }
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PdfViewerInner() {
  const searchParams = useSearchParams();
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

  return (
    <div className="pdf-container">
      <iframe src={file} className="pdf-iframe" />
      <style jsx>{`
        .pdf-container {
          width: 100%;
          height: 100vh;
          background: #f5f5f5;
        }
        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        @media (max-width: 768px) {
          .pdf-container {
            height: 100dvh;
          }
          .pdf-iframe {
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
          <style jsx>{`
            .spinner {
              border: 4px solid #ddd;
              border-top: 4px solid #333;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 1rem auto;
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      }
    >
      <PdfViewerInner />
    </Suspense>
  );
}
