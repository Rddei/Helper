// src/components/homepage/SectionAboutSandbox.jsx
import React from 'react';
import Button from '../Button.jsx';
import styles from './SectionAboutSandbox.module.css'; // Impor CSS Module

const SectionAboutSandbox = () => {
  return (
    <div className={`${styles.wrapper} bg-about-sandbox`}>
      <div className={styles.grid}>
        <div className={styles.titleColumn}>
          <p className={styles.subtitle}>Tentang Sandbox</p>
          <p className={styles.title}>
            Distributor <span className={styles.highlight}>software domestik</span> dan solusi luar negeri
          </p>
        </div>
        <div className={styles.descriptionColumn}>
          <p className={styles.textLarge}>
            Sandbox merupakan brand ekosistem perangkat lunak yang didedikasikan untuk perusahaan dan korporat di Indonesia.
          </p>
          <p className={styles.textNormal}>
            Kami mengintegrasikan software domestik dengan solusi luar negeri yang telah teruji kehandalannya serta sesuai dengan regulasi lokal. Semua solusi kami dapat disesuaikan dengan kebutuhan spesifik bisnis Anda, memastikan efisiensi dan keberlanjutan operasional.
          </p>
          <Button variant='outline' shape='default'>
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionAboutSandbox;