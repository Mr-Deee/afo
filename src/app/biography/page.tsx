"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Biography.module.css"; // 👈 import CSS

export default function BiographyPage() {
  const [content, setContent] = useState<string>("Loading biography...");

  useEffect(() => {
    async function fetchBio() {
      const res = await fetch("/Biography.docx");
      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();

      const mammoth = await import("mammoth");
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      setContent(value);
    }
    fetchBio();
  }, []);

  return (
    <motion.main
      className={styles.main}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}></h1>
        <p className={styles.text}>{content}</p>
      </div>
    </motion.main>
  );
}
