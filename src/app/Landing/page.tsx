"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { useRouter } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { db } from "@/firebase";
import styles from "./Home.module.css";

type Tribute = {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: number;
};




type Memory = {
  src: string;
  caption?: string;
};

const memories: Memory[] = [
  { src: "/images/memory1.jpg", caption: "" },
  { src: "/images/memory2.jpg", caption: "" },
  { src: "/images/memory3.jpg", caption: "" },
  { src: "/images/memory4.jpg", caption: "" },
  { src: "/images/memory5.jpg", caption: "" },
  { src: "/images/memory6.jpg", caption: "" },
  { src: "/images/drum1.jpg", caption: "" },
  { src: "/images/Drum2.jpg", caption: "" },
  { src: "/images/Drum3.jpg", caption: "" },
  { src: "/images/Drum4.jpg", caption: "" },
  { src: "/images/ROK8.jpg", caption: "" },
  { src: "/images/Aunt.jpg", caption: "" },
  { src: "/images/Bro1.jpg", caption: "" },
  { src: "/images/Bro2.jpg", caption: "" },
  { src: "/images/Bro3.jpg", caption: "" },
  { src: "/images/DAD1.jpg", caption: "" },
  { src: "/images/DAD2.jpg", caption: "" },
  { src: "/images/DAD3.jpg", caption: "" },
  { src: "/images/EMI.jpg", caption: "" },
  { src: "/images/EMI2.jpg", caption: "" },
  { src: "/images/emi3.jpg", caption: "" },
  { src: "/images/ENOS1.jpg", caption: "" },
  { src: "/images/ENOS2.jpg", caption: "" },
  { src: "/images/ENOS3.jpg", caption: "" },
  { src: "/images/ENOS4.jpg", caption: "" },
  { src: "/images/FAM.jpg", caption: "" },
  { src: "/images/FAM2.jpg", caption: "" },
  { src: "/images/FAM3.jpg", caption: "" },
  // ... add all 50 here, or fetch from Firebase later
];
export default function LandingPage() {
  const router = useRouter();

  const navLinks = [
    // { href: "#", label: "Memories" },
    { href: "#work", label: "Tributes" },
    { href: "#memories", label: "Memories" },
  ];

  const gototribute = () => {
    router.push("/tributeform");
  };

  const services = [
    { title: "Brochure", desc: "",pdf: "/pdfs/BR.pdf" },
    { title: "Program Outline", desc: "", pdf: "/pdfs/PO.pdf" },
    { title: "Hymn Book", desc: "",pdf: "/pdfs/HYB.pdf" },
    { title: "Echo Magazine", desc: "",pdf: "/pdfs/EM.pdf" },

  ];



    // ⬇️ PDF Preloading + Cache
    useEffect(() => {
      if ("caches" in window) {
        caches.open("pdf-cache").then((cache) => {
          services.forEach(({ pdf }) => {
            if (pdf) {
              fetch(pdf).then((response) => {
                if (response.ok) {
                  cache.put(pdf, response.clone());
                }
              }).catch(() => {
                console.warn(`Failed to preload ${pdf}`);
              });
            }
          });
        });
      } else {
        // Fallback: just fetch into memory
        services.forEach(({ pdf }) => {
          if (pdf) fetch(pdf).catch(() => {});
        });
      }
    }, []);
  
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [index, setIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const openSlideshow = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeSlideshow = () => {
    setIsOpen(false);
    setIsPlaying(false);
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % memories.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextImage();
    }, 4000); // 4 seconds per slide
    return () => clearInterval(timer);
  }, [isPlaying]);
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
        <h1 className={styles.logo}><Image
        src="/images/logo.png" // put your logo inside public/logo.png
        alt="Your Logo"
        width={100}     // adjust size
        height={70}
        priority        // ensures it loads fast
      /></h1>
        <nav className={styles.navLinks} aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        {/* <button className={styles.primaryButton} aria-label="Donate">
          Donate
        </button> */}
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
  {services.map(({ title, desc, pdf }) => (
    <div
      key={title}
      className={styles.card}
      onClick={() => {
        if (title === "BioGraphy") {
          router.push("/biography");
        } else if (pdf) {
          router.push(`/pdfviewer?file=${pdf}`);
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
      <a aria-label={`Learn more about ${title}`}>View</a>
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



      <section id="memories" className={styles.memories}>
      <div className={styles.headerRow}>
        <h2>
          <span>Memories</span>
        </h2>
        <button className={styles.outlineButton} onClick={() => openSlideshow(0)}>
          View All Memories →
        </button>
      </div>

      {/* Preview Grid (first 6) */}
      <div className={styles.memoriesGrid}>
        {memories.slice(0, 6).map((memory, index) => (
          <div
            key={index}
            className={styles.memoryCard}
            onClick={() => openSlideshow(index)}
            style={{ cursor: "pointer" }}
          >
            <img src={memory.src} alt={`Memory ${index + 1}`} className={styles.memoryImage} />
            {memory.caption && <p className={styles.memoryCaption}>{memory.caption}</p>}
          </div>
        ))}
      </div>


      
      {/* Fullscreen Slideshow/Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dialogOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.dialogContent}>
              <button className={styles.closeButton} onClick={closeSlideshow}>
                ✕
              </button>

              <button className={styles.prevButton} onClick={prevImage}>
                ‹
              </button>

              <div className={styles.dialogInner}>
                <img
                  src={memories[currentIndex].src}
                  alt={`Memory ${currentIndex + 1}`}
                  className={styles.dialogImage}
                />
                {memories[currentIndex].caption && (
                  <p className={styles.dialogCaption}>{memories[currentIndex].caption}</p>
                )}
              </div>

              <button className={styles.nextButton} onClick={nextImage}>
                ›
              </button>

              <button
                className={styles.playButton}
                onClick={() => setIsPlaying((prev) => !prev)}
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </section>
      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} OBED JERON-DONKOR. All rights reserved.
      </footer>
    </main>
  );
}
