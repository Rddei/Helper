// Wajib untuk komponen yang menggunakan hooks interaktif
'use client'; 

import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { DataWhyChoose } from '../../data/DataWhyChoose'; // Pastikan path ini benar
import 'swiper/css';
import 'swiper/css/navigation';

import CardDark from '../CardDark'; // Pastikan path ini benar
import styles from './SectionWhyChoose.module.css'; // Impor CSS Modules

const SectionWhyChoose = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={styles.whyChooseSection}>
      {/* Title Section */}
      <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
          <p className={styles.subtitle}>Mengapa Memilih Kami</p>
          <p className={styles.title}>
            Keunggulan Dari Kami
          </p>
        </div>
        <div className={styles.navigationWrapper}>
          <button ref={prevRef} className={styles.navButton}>
            <ArrowLeft size={20} />
          </button>
          <button ref={nextRef} className={styles.navButton}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={'auto'}
          // Hapus properti 'navigation' dari sini agar tidak diinisialisasi dengan null
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          // Gunakan onInit untuk meng-assign navigasi setelah ref terpasang
          onInit={(swiper) => {
            // Pastikan ref sudah ada sebelum di-assign
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          className='!overflow-visible'
        >
          {DataWhyChoose.map((card) => (
            <SwiperSlide key={card.id} className={styles.swiperSlide}>
              <CardDark {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SectionWhyChoose;