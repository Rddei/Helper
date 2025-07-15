import { CircleX, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";

export default function MediaModal({
  isOpen,
  onClose,
  media,
  activeIndex,
  setActiveIndex
}) {
  const swiperRefModal = useRef(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[rgba(125,125,125,0.8)] flex flex-col items-center justify-center px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] py-10 overflow-y-auto">
      <div className="w-full md:w-[70%] bg-white rounded-xl p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl text-black font-bold font-alexandria">
            <span className="text-[var(--color-sb-yellow)]">Foto</span> dan Video
          </p>
          <button onClick={onClose} className="text-black hover:text-red-500 cursor-pointer">
            <CircleX size={24} />
          </button>
        </div>

        <div className="relative">
          <button className="modal-swiper-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 w-10 h-10 rounded-full text-[var(--color-sb-grey-dark)] hover:bg-black hover:text-[var(--color-sb-yellow)] transition flex items-center justify-center">
            <ChevronLeft size={20} />
          </button>
          <button className="modal-swiper-next absolute top-1/2 right-0 -translate-y-1/2 z-10 w-10 h-10 rounded-full text-[var(--color-sb-grey-dark)] hover:bg-black hover:text-[var(--color-sb-yellow)] transition flex items-center justify-center">
            <ChevronRight size={20} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".modal-swiper-prev",
              nextEl: ".modal-swiper-next",
            }}
            initialSlide={activeIndex}
            slidesPerView={1}
            onBeforeInit={(swiper) => (swiperRefModal.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="rounded-lg mb-4"
          >
            {media.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-[370px] flex items-center justify-center bg-black rounded-lg overflow-hidden">
                  {item.type === "image" ? (
                    <img src={item.url} alt="Sandbox" loading="lazy" className="object-contain h-full w-full" />
                  ) : (
                    <iframe src={item.url} title={`video-${idx}`} className="w-full h-full rounded-lg" allowFullScreen />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex gap-4 justify-center flex-wrap mt-4">
          {media.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                swiperRefModal.current?.slideTo(idx);
              }}
              className={`w-20 h-16 cursor-pointer border-2 ${
                idx === activeIndex
                  ? "border-[var(--color-sb-yellow)]"
                  : "border-transparent"
              } rounded-lg overflow-hidden`}
            >
              {item.type === "image" ? (
                <img src={item.url} alt="Sandbox" loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-black text-white flex items-center justify-center text-xs">Video</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
