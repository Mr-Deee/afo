"use client";

import { useEffect } from "react";

export default function FuneralImagesPage() {
  useEffect(() => {
    window.location.href = "https://photos.app.goo.gl/v5Hx2YcWqJ5UmBqQ7";
  }, []);

  return <p>Redirecting to Funeral Photos…</p>;
}
