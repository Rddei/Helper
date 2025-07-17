// Menandakan ini adalah komponen klien karena menggunakan hooks dan event listener
'use client'; 

import { useLayoutEffect, useRef, useState } from "react";
import SectionWhyChoose from "./SectionWhyChoose";
import SectionPortfolio from "./SectionPortfolio";
import styles from './SectionParallax.module.css'; // Impor CSS Modules

const SectionParallax = () => {
  const containerRef = useRef(null);
  const portfolioRef = useRef(null); // Ref ini disertakan untuk konsistensi dengan kode Anda
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const handleScroll = () => {
      // Pastikan ref sudah terpasang
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScroll = rect.height - windowHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
      
      const percent = totalScroll > 0 ? scrolled / totalScroll : 0;
      setProgress(percent);
    };

    // Tambahkan event listener saat komponen dimuat
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Panggil sekali untuk mengatur posisi awal
    handleScroll(); 

    // Hapus event listener saat komponen dibongkar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Dependensi kosong agar hanya berjalan sekali

  return (
    <div
      ref={containerRef}
      className={styles.parallaxContainer}
    >
      {/* SectionWhyChoose tetap terlihat & menempel */}
      <div className={styles.stickyWrapper}>
        <SectionWhyChoose />
      </div>
      
      {/* SectionPortfolio bergerak naik seiring scroll */}
      <div
        ref={portfolioRef}
        className={styles.slidingWrapper}
        style={{
          transform: `translateY(${(1 - progress) * 100}%)`,
          transition: 'transform 0.1s linear',
        }}
      >
        <SectionPortfolio />
      </div>
    </div>
  );
};

export default SectionParallax;