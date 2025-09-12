"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FuneralImagesPage() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = "https://photos.app.goo.gl/uRUyG2iNqzudqLCx9";
  }, [router]);

  return <p>Redirecting to Funeral Photos…</p>;
}
