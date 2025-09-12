"use client";

import { useEffect } from "react";

export default function FuneralImagesPage() {
  useEffect(() => {
    window.location.href = "https://photos.app.goo.gl/uRUyG2iNqzudqLCx9";
  }, []);

  return <p>Redirecting to Funeral Photos…</p>;
}
