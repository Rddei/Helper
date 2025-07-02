import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { portfolio } from "../../data/DataPortfolio";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const SectionPortfolio = () => {
  const paginationRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1); 

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      paginationRef.current
    ) {
      const swiper = swiperRef.current.swiper;

      swiper.params.pagination.el = paginationRef.current;
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();

      swiper.slideToLoop(1, 0);
    }
  }, []);

  return (
    <div className="bg-black relative pb-24">
      <div className="bg-portfolio h-auto text-white py-20">
        {/* Section Title */}
        <div className="text-center flex flex-col items-center mb-20 px-[var(--padding-mobile)] md:px-0">
          <p className="text-sm text-[var(--color-sb-yellow)] font-medium">
            Portfolio
          </p>
          <p className="text-4xl md:text-6xl w-full md:w-[50%] font-bold mt-2">
            Mereka yang telah percaya dengan Sandbox
          </p>
        </div>

        {/* Swiper Carousel */}
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
          {portfolio.map((product, index) => (
            <SwiperSlide
              key={index}
              className={`!w-[80%] md:!w-[60%] lg:!w-[50%] transition-all duration-500 ${
                index === activeIndex
                  ? "scale-100 z-[5]"
                  : "scale-[0.9] opacity-100 z-[1]"
              }`}
            >
              <div className="flex flex-col border h-auto md:h-[250px] w-full md:flex-row items-center rounded-[10px] justify-center p-2 bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full md:w-1/2 h-full border rounded-lg object-cover bg-card-potfolio"
                />
                <div className="h-full px-4 py-2 md:w-1/2 flex flex-col justify-center">
                  <div className="flex flex-col gap-3">
                    <p className="text-2xl w-full md:w-[80%] h-[60px] text-black font-alexandria font-bold leading-tight">
                      {product.title}
                    </p>
                    <div className="w-[30px] h-[3px] bg-[var(--color-sb-yellow)]" />
                    <p className="text-[12px] h-[60px] font-light font-inter-tight leading-tight text-[#181818]">
                      {product.description}
                    </p>
                  </div>
                  <Link
                    to={`/portfolio/${product.slug}`}
                    className="group flex items-center mt-8"
                  >
                    <div className="h-[40px] w-[150px] flex items-center justify-center rounded-full bg-[var(--color-sb-yellow)] text-black text-sm font-inter-tight cursor-pointer transition duration-300 ease-in-out group-hover:bg-[var(--color-sb-yellow-dark)]">
                      Lihat Detail
                    </div>
                    <span className="h-[40px] w-[40px] text-black flex items-center justify-center rounded-full bg-[var(--color-sb-yellow)] transition group-hover:bg-[var(--color-sb-yellow-dark)]">
                      <ArrowUpRight />
                    </span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pb-5">
        <div ref={paginationRef} className="custom-pagination flex z-10"></div>
      </div>
    </div>
  );
};

export default SectionPortfolio;
