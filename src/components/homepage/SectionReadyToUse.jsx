'use client'; // Wajib untuk App Router jika menggunakan hook/interaktivitas

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation"; // Menggunakan router Next.js
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import useSolusi from "../../hooks/useSolusi";
import styles from './SectionReadyToUse.module.css'; // Impor CSS Modules

const SectionReadyToUse = () => {
  const router = useRouter();
  const { solusi, loading, error } = useSolusi();

  if (loading) {
    return <div className={styles.loadingState}>Memuat Solusi...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }

  return (
    <div className={styles.sectionWrapper}>
      {/* Title Section */}
      <div className={styles.titleContainer}>
        <p className={styles.title}>
          Perangkat Lunak <br />
          <span className={styles.highlight}>Ready-to-Use</span><br />
          untuk Bisnis Anda
        </p>
        <p className={styles.description}>
          Dengan perangkat lunak siap pakai dari Sandbox, Anda dapat merespon kebutuhan efisiensi operasional dan percepatan digitalisasi bisnis Anda...
        </p>
      </div>

      {/* Carousel */}
      <div className={styles.carouselWrapper}>
        <p className={styles.carouselSubtitle}>
          Temukan Solusi Terbaik untuk Bisnis Anda
        </p>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".find-next",
            prevEl: ".find-prev",
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={"auto"}
          spaceBetween={24}
          className="w-full"
        >
          {solusi.map((item) => (
            <SwiperSlide
              key={item.id}
              className={styles.swiperSlide}
              onClick={() => router.push(`/produk/${item.slug}`)}
            >
              <div className={`${styles.slideContent} group`}>
                <img
                  src={item.image || 'https://placehold.co/400x400?text=No+Image'}
                  alt={item.title}
                  loading="lazy"
                  className={styles.slideImage}
                />
                <div className={styles.gradientOverlay} />
                <div className={styles.hoverOverlay} />
                <div className={styles.textOverlay}>
                  <span className={styles.productCategory}>Solusi Produk</span>
                  <h3 className={styles.productTitle}>{item.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigasi Panah */}
        <div className={styles.navigationContainer}>
          <button className={`${styles.navButton} find-prev`}>
            <ArrowLeft size={20} />
          </button>
          <button className={`${styles.navButton} find-next`}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionReadyToUse;