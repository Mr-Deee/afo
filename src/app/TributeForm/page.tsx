"use client";

import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "@/firebase";
import styles from "./TributeForm.module.css";
import { motion } from "framer-motion";

export default function TributeForm() {
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
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className={styles.title}>Leave a Tribute</h1>

        <motion.form
          onSubmit={handleSubmit}
          className={styles.form}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          />
<motion.select
  value={relation}
  onChange={(e) => setRelation(e.target.value)}
  className={styles.select}
  required
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }}
>
  <option value="" disabled>
    Select Relation
  </option>
  <option value="Friend">Friend</option>
  <option value="Brother">Brother</option>
  <option value="Sister">Sister</option>
  <option value="Parent">Parent</option>
  <option value="Child">Child</option>
  <option value="Relative">Relative</option>
  <option value="Colleague">Colleague</option>
  <option value="Neighbor">Neighbor</option>
  <option value="Other">Other</option>
</motion.select>


          <motion.textarea
            placeholder="Write your tribute..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
            rows={4}
            required
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          />

          <motion.button
            type="submit"
            className={styles.button}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Submit Tribute
          </motion.button>
        </motion.form>
      </motion.div>
    </main>
  );
}
