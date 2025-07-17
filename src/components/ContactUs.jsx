'use client'; // Disarankan untuk komponen dengan form

import React from "react";
import Button from "./Button";
import styles from './ContactUs.module.css'; // Impor CSS Modules

const ContactUs = ({ subtitle, title, description }) => {
  return (
    <div className={styles.contactSection}>
      <div className={styles.contentGrid}>
        {/* LEFT CONTENT */}
        <div className={styles.textContainer}>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {title && <p className={styles.title}>{title}</p>}
          {description && <p className={styles.description}>{description}</p>}
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formGrid}>
          {/* Nama Perusahaan */}
          <div className={styles.formField}>
            <label className={styles.formLabel}>Nama Perusahaan</label>
            <input
              type="text"
              placeholder="Masukkan nama perusahaan"
              className={styles.formInput}
            />
          </div>

          {/* Email */}
          <div className={styles.formField}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className={styles.formInput}
            />
          </div>

          {/* Pesan */}
          <div className={`${styles.formField} ${styles.fullSpan}`}>
            <label className={styles.formLabel}>Deskripsi Pesan</label>
            <textarea
              placeholder="Tulis pesan atau kebutuhan Anda di sini..."
              rows={4}
              className={styles.formTextarea}
            />
          </div>

          {/* Tombol */}
          <div className={`${styles.fullSpan} ${styles.buttonContainer}`}>
            <Button variant="filled" shape="default">
              Mulai Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;