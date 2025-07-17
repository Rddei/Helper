// src/components/homepage/SectionRecommended.jsx (Final)

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Button from "../Button";
import useSolusi from "../../hooks/useSolusi"; // Hook yang sama dengan referensi
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionRecommended = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);

    // 1. Mengambil data solusi, persis seperti referensi
    const { solusi, loading, error } = useSolusi({ per_page: 10 });

    // 2. Filter untuk item yang direkomendasikan
    // Pastikan di WordPress ada custom field (ACF) checkbox bernama `recommended`
    const recommendedItems = solusi

    // Animasi GSAP
    useEffect(() => {
        if (!loading && sectionRef.current) {
            gsap.fromTo(
                sectionRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, [loading]);

    const enableLoop = recommendedItems.length > 3;

    return (
        <div ref={sectionRef} className="bg-black relative pb-14 opacity-0">
            <div className="bg-portfolio text-white py-20">
                {/* Title Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] gap-6">
                    <p className="text-4xl md:text-6xl font-bold leading-tight w-full md:w-1/2">
                        <span className="text-[var(--color-sb-yellow)]">Rekomendasi</span> Solusi untuk Anda
                    </p>
                    <Button onClick={() => navigate('/kontak')} variant="filled" shape="default" className="w-fit mt-2 md:mt-0">
                        Mulai Sekarang
                    </Button>
                </div>

                {/* Swiper */}
                <div className="px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
                    {/* 3. Logika loading dan error, persis seperti referensi */}
                    {error && <p className="text-center text-red-500 py-10">{error}</p>}
                    {loading ? (
                         <div className="text-center text-white py-20">Memuat rekomendasi...</div>
                    ) : (
                        <>
                            <Swiper
                                modules={[Pagination, Navigation, Autoplay]}
                                slidesPerView={"auto"}
                                centeredSlides={true}
                                spaceBetween={24}
                                loop={enableLoop}
                                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                // 4. Menggunakan selector CSS untuk navigasi, sama seperti referensi
                                navigation={{
                                    nextEl: ".recommended-next",
                                    prevEl: ".recommended-prev",
                                }}
                                pagination={{ clickable: true, el: '.recommended-pagination' }}
                                className="relative !pb-20"
                            >
                                {recommendedItems.map((item) => (
                                    <SwiperSlide key={item.id} className="!w-[85%] sm:!w-[80%] md:!w-[60%] lg:!w-[50%]">
                                        {/* TAMPILAN VISUAL CARD TIDAK DIUBAH */}
                                        <div className="flex flex-col md:flex-row bg-[#141414] rounded-xl overflow-hidden h-auto md:h-[250px]">
                                            <img
                                                src={item.image || 'https://placehold.co/400x250?text=No+Image'}
                                                alt={item.title}
                                                loading="lazy"
                                                className="w-full md:w-1/2 h-[200px] md:h-full object-cover"
                                            />
                                            <div className="flex flex-col justify-between p-6 md:w-1/2 h-full">
                                                <div className="space-y-2">
                                                    <p className="text-2xl font-bold line-clamp-2">{item.title}</p>
                                                    <p className="text-sm font-light text-[var(--color-sb-grey-dark)] leading-snug line-clamp-4">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center pt-4">
                                                    <p className="text-sm capitalize text-[var(--color-sb-grey-dark)]">
                                                        {item.acf?.category || 'solusi'}
                                                    </p>
                                                    <button
                                                        onClick={() => navigate(`/solusi/${item.slug}`)}
                                                        className="text-[var(--color-sb-yellow)] hover:text-[var(--color-sb-yellow-dark)] text-sm font-medium flex items-center gap-1">
                                                        Pelajari Lebih Lanjut <ArrowRight size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            
                            {/* 5. Tombol Navigasi dengan class yang sesuai */}
                            <div className="flex justify-center items-center gap-4 mt-2">
                                <button className="recommended-prev w-12 h-12 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition">
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="recommended-pagination flex justify-center gap-2" />
                                <button className="recommended-next w-12 h-12 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SectionRecommended;