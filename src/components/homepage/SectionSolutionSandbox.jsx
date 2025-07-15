import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

import useSolusi from "../../hooks/useSolusi";
import { ArrowLeft, ArrowRight } from "lucide-react";
import parse from "html-react-parser";

const SectionSolutionSandbox = () => {
  const navigate = useNavigate();
  const { solusi, loading, error } = useSolusi();

  return (
    <div className="bg-black text-white py-12 md:py-24 pl-[var(--padding-mobile)] md:pl-[var(--padding-dekstop)] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Kiri: Title dan Deskripsi */}
      <div className="flex flex-col items-start gap-2 md:gap-5 w-full md:w-[70%]">
        <p className="text-base font-inter-tight text-white">Solusi Sandbox</p>

        <h2 className="text-4xl md:text-5xl font-alexandria font-bold leading-tight">
          Eksplorasi <span className="text-[var(--color-sb-yellow)]">Produk Sandbox</span>
        </h2>

        <p className="text-base md:text-lg text-[var(--color-sb-grey)] font-inter-tight leading-relaxed">
          Kami mengintegrasikan software domestik dengan solusi luar negeri yang telah teruji kehandalannya serta sesuai dengan regulasi lokal. Semua solusi kami dapat disesuaikan dengan kebutuhan spesifik bisnis Anda, memastikan efisiensi dan keberlanjutan operasional.
        </p>

        {/* Tombol Navigasi di bawah teks */}
        <div className="flex gap-4 mt-10 md:mt-6">
          <button className="swiper-prev cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
            <ArrowLeft size={20} />
          </button>
          <button className="swiper-next cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Kanan: Carousel */}
      <div className="w-full">
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
          className="w-full overflow-hidden"
        >
          {error && <p className="text-center text-red-500">{error}</p>}
          {loading ? (
            <div className="text-center text-white py-20">Memuat data...</div>
          ) : (
            solusi.map((product, index) => (
              <SwiperSlide
                key={product.id || index}
                onClick={() => navigate(`/produk/${product.slug}`)}
                className="!w-[85%] md:!w-[350px] lg:!w-[320px] transition-transform duration-300 ease-in-out cursor-pointer"
              >
                <div className="relative w-full h-[500px] overflow-hidden rounded-lg group">
                  <img
                    src={product._embedded?.['wp:featuredmedia']?.[0]?.source_url || product.image || 'https://placehold.co/400x240?text=No+Image'}
                    alt={product.title?.rendered || product.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                {/* Gradient bawah */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

                {/* Hover full overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300 z-20" />

                  {/* Teks */}
                  <div className="absolute bottom-0 left-0 w-full z-30 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {product.title?.rendered || product.title}
                    </h3>
                    <div className="text-sm md:text-base h-[80px] md:h-[100px] text-white text-opacity-80">
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