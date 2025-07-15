import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

// import { readyToUseSolutions } from "../../data/readyToUseSolutions";
import useSolusi from "../../hooks/useSolusii";

const SectionReadyToUse = () => {
  const navigate = useNavigate();

  const { solusi, loading, error } = useSolusi();

  if (loading) {
    return <div className="py-24 text-center text-white bg-black">Memuat Solusi...</div>;
  }

  if (error) {
    return <div className="py-24 text-center text-red-500 bg-black">{error}</div>;
  }

  return (
      <div className="relative bg-black bg-ready-to-use bg-cover bg-center bg-no-repeat py-24  overflow-hidden">

          {/* Title Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-end mb-20 gap-10 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
            <p className="text-4xl md:text-6xl font-alexandria font-bold text-white leading-[1.2]">
              Perangkat Lunak <br />
              <span className="text-[var(--color-sb-yellow)]">Ready-to-Use</span><br />
              untuk Bisnis Anda
            </p>
            <p className="w-[90%] text-[var(--color-sb-grey)] text-base md:text-lg leading-relaxed font-inter-tight">
              Dengan perangkat lunak siap pakai dari Sandbox, Anda dapat merespon kebutuhan efisiensi operasional dan percepatan digitalisasi bisnis Anda. Sebagai mitra terpercaya dalam perjalanan transformasi digital, Sandbox memberikan solusi yang efektif dan efisien untuk mendukung keberhasilan bisnis Anda.
            </p>
          </div>

          {/* Carousel */}
          <div className="gap-2 pl-[var(--padding-mobile)] md:pl-[var(--padding-dekstop)]">
            <p className="mb-10 text-white font-semibold text-lg">
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
              key={item.slug}
              className="!w-[240px] md:!w-[260px] lg:!w-[340px] cursor-pointer"
              onClick={() => navigate(`/produk/${item.slug}`)}
            >
              <div className="relative rounded-md overflow-hidden group">
                <img
                  src={item.image || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/400x240?text=No+Image'}
                  alt={item.title?.rendered || item.title}
                  loading="lazy"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300 z-20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full p-4 z-30">
                  <span className="text-sm text-white font-light">Solusi Produk</span>
                  <h3 className="text-white text-xl w-[50%] font-bold">{item.title?.rendered || item.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

            {/* Navigasi Panah */}
            <div className="flex justify-center gap-4 mt-16">
              <button className="find-prev w-12 h-12 md:w-14 md:h-14 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition">
                <ArrowLeft size={20} />
              </button>
              <button className="find-next w-12 h-12 md:w-14 md:h-14 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
      </div>
  );
};

export default SectionReadyToUse;
