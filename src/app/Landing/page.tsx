"use client";


import Image from "next/image";
import styles from "./Home.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct hook for navigation


export default function LandingPage() {

  const router = useRouter();

  const navLinks = [
    { href: "#services", label: "Memories" },
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },

  ];
  const [showForm, setShowForm] = useState(false);

  const services = [
    { title: "Program Outline", desc: "." },
    { title: "BioGraphy", desc: "" },
    { title: "location", desc: "." },
  ];

  const workItems = ["space", "nova", "sonic", "solar"];
          <button className={styles.outlineButton}>Add A Tribute</button>

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
        <button className={styles.primaryButton} aria-label="Contact Me">
          Donate
        </button>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.heroContent} ${styles.fadeInUp}`}>
          <h2 className={styles.heroTitle}>
           <span>  OBED JERON DONKOR</span>
          </h2>
          <p className={styles.heroText}>
            28.SEP.1998 - 04.AUG.2025.
          </p>
        </div>


<button
      className={styles.outlineButton}
      onClick={() => router.push("/tributeform")}
    >
      Add A Tribute
    </button>
      </section>

      {/* Services */}
      <section id="services" className={styles.services}>
        {services.map(({ title, desc }) => (
          <div key={title} className={styles.card}>
            <h3>{title}</h3>
            <p>{desc}</p>
            <a href="#" aria-label={`Learn more about ${title}`}>
              Learn More →
            </a>
          </div>
        ))}
      </section>

      {/* Selected Work */}
      <section id="work" className={styles.work}>
        <h2>
           <span>Memories</span>
        </h2>
        <div className={styles.workGrid}>
          {workItems.map((item) => (
            <div key={item} className={`${styles.workItem} ${styles.hoverScale}`}>
              <Image
                src={`/images/${item}.jpg`}
                alt={`${item} project preview`}
                width={600}
                height={400}
                className={styles.workImage}
                priority={item === "space"} // optional: prioritize first image
              />
              <div className={styles.workLabel}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} OBED JERON. All rights reserved.
      </footer>
    </main>
  );
}
