// src/components/Footer.jsx
import React from 'react';
import Image from 'next/image'; // Menggunakan Image dari Next.js
import { Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css'; // Impor CSS Module

// Import logo untuk digunakan oleh Next/Image
import logo from '../assets/logo-sandbox.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Logo dan Copyright */}
        <div className={styles.logoSection}>
          <Image src={logo} alt="Sandbox Logo" style={{ width: '110px', height: 'auto' }} />
          <p className={styles.copyright}>
            Copyright © 2024 PT Wira Global Solusi Tbk. All rights reserved
          </p>
        </div>

        {/* Navigasi */}
        <div className={styles.navSection}>
          <ul className={styles.navLinks}>
            <li className={styles.navLinkItem}>Solusi Produk</li>
            <li className={styles.navLinkItem}>Tentang Sandbox</li>
            <li className={styles.navLinkItem}>Bantuan</li>
          </ul>
        </div>

        {/* Alamat dan Kontak */}
        <div className={styles.contactSection}>
          <p className={styles.address}>
            Lippo Tower Holland Village Jakarta, Jl. Letjen Suprapto No.Kav.60 No.1, Lt. 29, RT.10/RW.7, Cemp. Putih Tim., Kec. Cemp. Putih, Jakarta, Daerah Khusus Ibukota Jakarta 10510
          </p>
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <Phone style={{ color: 'var(--color-sb-yellow)' }} size={16} />
              <p>+62 21 80633731</p>
            </div>
            <div className={styles.contactItem}>
              <Mail style={{ color: 'var(--color-sb-yellow)' }} size={16} />
              <p>sandbox@wgshub.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;