import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SectionMedia({ media, title, openModal }) {

  return (
    <div id="media" className="mb-24 scroll-mt-28 min-h-[500px]">
      <div className="mb-5 flex flex-row items-center justify-between">
        <div>
          <p className="text-4xl mb-1 font-bold font-alexandria">
            <span className="text-[var(--color-sb-yellow)]">Foto</span> dan Video
          </p>
          <p className="text-base font-inter-tight">{title}</p>
        </div>
        <div className="flex gap-4 mt-10 md:mt-6">
          <button className="swiper-prev cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
            <ArrowLeft size={20} />
          </button>
          <button className="swiper-next cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
          slidesPerView={2.2} 
          centeredSlides={true}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="w-full overflow-visible"
        >

        {media.map((item, idx) => (
          <SwiperSlide key={idx} className="!w-full md:!w-[400px] h-[300px]">
            <div
              className="w-full h-[300px] overflow-hidden rounded-xl cursor-pointer"
              onClick={() => openModal(idx)}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={`media-${idx}`}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <iframe
                  src={item.url}
                  title={`video-${idx}`}
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
