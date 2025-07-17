// Wajib: Menandai sebagai Komponen Klien
'use client';

import { useState, useRef, useLayoutEffect } from "react";
import styles from './SectionParallax.module.css'; // Impor CSS Modules

const SectionParallax = ({ topSection, bottomSection }) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Total jarak scroll yang tersedia di dalam kontainer
      const totalScroll = rect.height - windowHeight;

      // Jarak yang sudah di-scroll di dalam kontainer.
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);

      // Hitung progresi dalam bentuk persentase (0 hingga 1)
      const percent = totalScroll > 0 ? scrolled / totalScroll : 0;
      setProgress(percent);
    };

    // Tambahkan event listener saat komponen dimuat
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Panggil sekali untuk mengatur posisi awal
    handleScroll();

    // Hapus event listener untuk mencegah memory leak
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Dependensi kosong agar hanya berjalan sekali

  return (
    <div ref={containerRef} className={styles.parallaxContainer}>
      {/* Bagian atas yang akan tetap menempel */}
      <div className={styles.stickyWrapper}>
        {topSection}
      </div>

      {/* Bagian bawah yang bergerak naik seiring scroll */}
      <div
        className={styles.slidingWrapper}
        style={{
          // (1 - progress) bergerak dari 1 (posisi di bawah) ke 0 (posisi di atas)
          transform: `translateY(${(1 - progress) * 100}%)`,
          // Transisi ditambahkan agar gerakan tidak terlalu kaku
          transition: 'transform 0.1s linear',
        }}
      >
        {bottomSection}
      </div>
    </div>
  );
};

export default SectionParallax;