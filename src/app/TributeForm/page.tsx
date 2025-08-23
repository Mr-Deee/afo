"use client";

import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "@/firebase";
import styles from "./TributeForm.module.css";  // 👈 import CSS module

export default function TributeFormPage() {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tributeRef = ref(db, "tributes");

      await push(tributeRef, {
        name,
        relation,
        message,
        createdAt: Date.now(),
      });

      setName("");
      setRelation("");
      setMessage("");

      alert("Tribute submitted successfully 💐");
    } catch (error) {
      console.error("Error saving tribute:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Leave a Tribute</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Relation (e.g. Friend, Brother)"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className={styles.input}
            required
          />

          <textarea
            placeholder="Write your tribute..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
            rows={4}
            required
          />

          <button type="submit" className={styles.button}>
            Submit Tribute
          </button>
        </form>
      </div>
    </main>
  );
}
