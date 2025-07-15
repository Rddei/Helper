import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Button from "../Button";
import { dataSolusi } from "../../data/DataSolusi";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SectionRecommended = () => {
  const paginationRef = useRef(null);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);

  const sectionRef = useRef(null); // 🔥 Ref untuk animasi parallax
  const recommendedItems = dataSolusi.filter((item) => item.recommended);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        {
          y: 100,
          opacity: 0,
        },
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
  }, []);

  useEffect(() => {
    if (swiperRef.current?.swiper && paginationRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.params.pagination.el = paginationRef.current;
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
      swiper.slideToLoop(1, 0);
    }
  }, []);

  const handleNext = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.swiper?.slidePrev();
  };

  return (
    <div ref={sectionRef} className="bg-black relative pb-24">
      <div className="bg-portfolio text-white py-20">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] gap-6">
          <p className="text-4xl md:text-6xl font-bold leading-tight w-full md:w-1/2">
            <span className="text-[var(--color-sb-yellow)]">Rekomendasi</span> Solusi untuk Anda
          </p>
          <Button variant="filled" shape="default" className="w-fit mt-2 md:mt-0">
            Mulai Sekarang
          </Button>
        </div>

        {/* Swiper */}
        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={24}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="relative !pb-20"
        >
          {recommendedItems.map((item, index) => (
            <SwiperSlide
              key={index}
              className={`!w-[85%] sm:!w-[80%] md:!w-[60%] lg:!w-[50%] transition-all duration-500 ${
                index === activeIndex
                  ? "scale-100 z-[5]"
                  : "scale-[0.9] opacity-80 z-[1]"
              }`}
            >
              <div className="flex flex-col md:flex-row bg-[#141414] rounded-xl overflow-hidden h-auto md:h-[250px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full md:w-1/2 h-[200px] md:h-full object-cover"
                />
                <div className="flex flex-col justify-between p-4 md:w-1/2 h-full">
                  <div className="space-y-2">
                    <p className="text-2xl font-bold line-clamp-2">{item.title}</p>
                    <p className="text-sm font-light text-[var(--color-sb-grey-dark)] leading-snug line-clamp-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm capitalize text-[var(--color-sb-grey-dark)]">
                      {item.category}
                    </p>
                    <button
                      onClick={() => navigate(`/solusi-produk/${item.slug}`)}
                      className="text-[var(--color-sb-yellow)] hover:text-[var(--color-sb-yellow-dark)] text-sm font-medium flex items-center gap-1"
                    >
                      Pelajari Lebih Lanjut <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next/Prev Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionRecommended;
