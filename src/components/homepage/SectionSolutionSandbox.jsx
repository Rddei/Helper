'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRouter } from 'next/navigation'; // Perbaiki: gunakan 'next/navigation' untuk App Router
import "swiper/css";
import "swiper/css/navigation";

import useSolutionData from "../../hooks/useSolutionData";
import { ArrowLeft, ArrowRight } from "lucide-react";
import parse from "html-react-parser";
import styles from './SectionSolutionSandbox.module.css';

const SectionSolutionSandbox = () => {
  const router = useRouter();
  const { solutions, loading, error } = useSolutionData();

  const handleNavigate = (slug) => {
    if (slug) router.push(`/produk/${slug}`);
  };

  return (
    <div className={styles.solutionSection}>
      {/* Kiri: Title dan Deskripsi */}
      <div className={styles.descriptionContainer}>
        <p className={styles.subtitle}>Solusi Sandbox</p>

        <h2 className={styles.title}>
          Eksplorasi <span className={styles.highlight}>Produk Sandbox</span>
        </h2>

        <p className={styles.description}>
          Kami mengintegrasikan software domestik dengan solusi luar negeri yang telah teruji kehandalannya serta sesuai dengan regulasi lokal. Semua solusi kami dapat disesuaikan dengan kebutuhan spesifik bisnis Anda, memastikan efisiensi dan keberlanjutan operasional.
        </p>

        {/* Tombol Navigasi di bawah teks */}
        <div className={styles.navigationButtons}>
          <button className={`${styles.navButton} swiper-prev`}>
            <ArrowLeft size={20} />
          </button>
          <button className={`${styles.navButton} swiper-next`}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Kanan: Carousel */}
      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className={styles.swiperContainer}
        >
          {error && <p className={styles.errorText}>{error}</p>}
          {loading ? (
            <div className={styles.loadingText}>Memuat data...</div>
          ) : (
            Array.isArray(solutions) && solutions.map((product, index) => (
              <SwiperSlide
                key={product.id || index}
                onClick={() => handleNavigate(product.slug)}
                className={styles.swiperSlide}
              >
                <div className={styles.slideContent}>
                  <img
                    src={product._embedded?.['wp:featuredmedia']?.[0]?.source_url || product.image || 'https://placehold.co/400x240?text=No+Image'}
                    alt={product.title?.rendered || product.title}
                    loading="lazy"
                    className={styles.slideImage}
                  />

                  {/* Gradient bawah */}
                  <div className={styles.gradientOverlay} />

                  {/* Hover full overlay */}
                  <div className={styles.hoverOverlay} />

                  {/* Teks */}
                  <div className={styles.textContainer}>
                    <h3 className={styles.productTitle}>
                      {product.title?.rendered || product.title}
                    </h3>
                    <div className={styles.productDescription}>
                      {product.excerpt?.rendered ? parse(product.excerpt.rendered) : product.description}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default SectionSolutionSandbox;