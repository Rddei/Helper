'use client';

import React from 'react';
import styles from './CardDark.module.css'; // Impor CSS Modules

const CardDark = ({ title, description, icon, hover1, hover2 }) => (
  <div className={styles.cardContainer}>
    {/* Hover Effects */}
    <div className={styles.hoverEffect}>
      <img
        src={hover1}
        alt=""
        className={`${styles.hoverImage} ${styles.hoverImage1}`}
        loading="lazy"
      />
      <img
        src={hover2}
        alt=""
        loading="lazy"
        className={`${styles.hoverImage} ${styles.hoverImage2}`}
      />
    </div>

    {/* Icon */}
    <div className={styles.iconWrapper}>
      <img src={icon} alt={title} className={styles.icon} loading="lazy" />
    </div>

    {/* Content */}
    <div className={styles.contentWrapper}>
      <p className={styles.title}>{title}</p>
      <div className={styles.divider}></div>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);

export default CardDark;