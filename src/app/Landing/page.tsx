"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { useRouter } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/firebase";
import styles from "./Home.module.css";

type Tribute = {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: number;
};

export default function LandingPage() {
  const router = useRouter();

  const navLinks = [
    { href: "#services", label: "Memories" },
    { href: "#work", label: "Tributes" },
    { href: "#about", label: "" },
  ];

  const gototribute = () => {
    router.push("/tributeform");
  };

  const services = [
    { title: "Program Outline", desc: "." },
    { title: "BioGraphy", desc: "" },
    { title: "Location", desc: "." },
  ];

  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tributeRef = ref(db, "tributes");

    const unsubscribe = onValue(tributeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedTributes: Tribute[] = Object.entries(data as Record<string, Tribute>).map(
          ([id, value]) => ({
            id,
            name: value.name,
            relation: value.relation,
            message: value.message,
            createdAt: value.createdAt,
          })
        );
        

        // sort newest first
        loadedTributes.sort((a, b) => b.createdAt - a.createdAt);
        setTributes(loadedTributes);
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto-change slides every 6 seconds
  useEffect(() => {
    if (tributes.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % tributes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [tributes]);

  const currentTribute = tributes[index];

  return (
    <main className={styles.main}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <h1 className={styles.logo}>.</h1>
        <nav className={styles.navLinks} aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button className={styles.primaryButton} aria-label="Donate">
          Donate
        </button>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.heroContent} ${styles.fadeInUp}`}>
          <h2 className={styles.heroTitle}>
            <span>OBED JERON-DONKOR</span>
          </h2>
          <p className={styles.heroText}>
            28.SEP.1998 - 04.AUG.2025.
          </p>

          {/* Tribute button now sits directly below the date */}
          <button className={styles.outlineButton} onClick={gototribute}>
            Add A Tribute
          </button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className={styles.services}>
      {services.map(({ title, desc }) => (
    <div
      key={title}
      className={styles.card}
      onClick={() => title === "BioGraphy" && router.push("/biography")}
      style={{ cursor: "pointer" }}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
      <a aria-label={`Learn more about ${title}`}>Learn More →</a>
    </div>
  ))}
      </section>

      {/* Tributes (Slideshow) */}
      <section id="work" className={styles.work}>
        <h2>
          <span>Tributes</span>
        </h2>

        {tributes.length === 0 ? (
          <div className={styles.card}>No tributes yet 💐</div>
        ) : (
          <div className={styles.container}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTribute.id}
                className={styles.card}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {/* Tribute image placeholder */}
                <div className={styles.imageWrapper}>
                  {/* <img
                    src="/tribute-placeholder.jpg"
                    alt="Tribute"
                    className={styles.image}
                  /> */}
                </div>

                {/* Tribute details */}
                <div className={styles.text}>
                  <h2 className={styles.name}>{currentTribute.name}</h2>
                  <p className={styles.relation}>{currentTribute.relation}</p>
                  <p className={styles.message}>
                    &quot;{currentTribute.message}&quot;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} OBED JERON. All rights reserved.
      </footer>
    </main>
  );
}
