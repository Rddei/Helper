// src/components/homepage/SectionHeader.jsx
'use client'; // Wajib karena menggunakan Framer Motion

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import styles from './SectionHeader.module.css'; // Impor CSS Module

const SectionHeader = () => {
  return (
    <div className={styles.wrapper}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className={styles.heading}>
          Software Company <br />
          Indonesia
        </p>
      </motion.div>

      {/* Deskripsi + Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className={styles.descriptionWrapper}
      >
        <p className={styles.descriptionText}>
          Solusi Teknologi Integratif untuk Semua Kebutuhan Perusahaan Anda
        </p>
        <Button variant="filled" shape="default">
          Mulai Sekarang
        </Button>
      </motion.div>
    </div>
  );
};

export default SectionHeader;