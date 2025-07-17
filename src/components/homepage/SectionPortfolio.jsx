// src/components/homepage/SectionPortfolio.jsx
'use client';

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from "lucide-react";
import usePortfolio from "../../hooks/usePortfolio";
import styles from './SectionPortfolio.module.css'; // Impor CSS Module

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SectionPortfolio = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const paginationRef = useRef(null);
    const swiperRef = useRef(null);
    const { portfolio, loading, error } = usePortfolio();

    useEffect(() => {
        if (swiperRef.current?.swiper && paginationRef.current) {
            swiperRef.current.swiper.params.pagination.el = paginationRef.current;
            swiperRef.current.swiper.pagination.init();
            swiperRef.current.swiper.pagination.render();
            swiperRef.current.swiper.pagination.update();
            swiperRef.current.swiper.slideToLoop(1, 0);
        }
    }, [portfolio]);

    if (loading) return <div className={styles.wrapper} style={{textAlign: 'center', color: 'white', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Memuat Portofolio...</div>;
    if (error) return <div className={styles.wrapper} style={{textAlign: 'center', color: 'red', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Gagal memuat data.</div>;
    if (!portfolio || portfolio.length === 0) return <div className={styles.wrapper} style={{textAlign: 'center', color: 'white', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Portofolio tidak ditemukan.</div>;

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container} bg-portfolio`}>
                <div className={styles.titleWrapper}>
                    <p className={styles.subtitle}>Portfolio</p>
                    <p className={styles.title}>Mereka yang telah percaya dengan Sandbox</p>
                </div>
                <Swiper
                    ref={swiperRef}
                    modules={[Pagination]}
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={24}
                    loop={true}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    style={{paddingBottom: '5rem', position: 'relative'}}
                >
                    {portfolio.map((item, index) => (
                        <SwiperSlide
                            key={item.id}
                            style={{
                                width: '80%', // !w-[80%]
                                transition: 'all 500ms',
                                transform: index === activeIndex ? 'scale(1)' : 'scale(0.9)',
                                zIndex: index === activeIndex ? 5 : 1,
                                opacity: index === activeIndex ? 1 : 0.8,
                            }}
                        >
                            <div className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardTitleWrapper}>
                                        <div className={styles.cardTitle}>{item.title}</div>
                                        <div className={styles.separator} />
                                        <div className={styles.cardDescription}>{item.description}</div>
                                    </div>
                                    <Link href={`/portfolio/${item.slug}`} className={styles.cardLinkWrapper}>
                                        <div className={styles.cardButton}>Lihat Detail</div>
                                        <span className={styles.cardButtonIcon}><ArrowUpRight /></span>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.paginationWrapper}>
                <div ref={paginationRef} className="custom-pagination"></div>
            </div>
        </div>
    );
};

export default SectionPortfolio;  