import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";

export default function SectionFitur({ fiturList, title }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div id="fitur" className="mb-24 scroll-mt-28 min-h-[300px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-4xl mb-1 font-bold font-alexandria">
            <span className="text-[var(--color-sb-yellow)]">Fitur</span> Utama
          </p>
          <p className="text-base font-inter-tight">{title}</p>
        </div>
        <div className="flex gap-3">
          <button ref={prevRef} className="w-10 h-10 rounded-full border text-white border-white hover:bg-white hover:text-black flex items-center justify-center transition">
            <ArrowLeft size={20} />
          </button>
          <button ref={nextRef} className="w-10 h-10 rounded-full border text-white border-white hover:bg-white hover:text-black flex items-center justify-center transition">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={"auto"}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {fiturList.map((fitur, idx) => (
          <SwiperSlide key={idx} className="!w-[300px]">
            <div className="bg-[#141414] p-6 rounded-xl w-[300px] h-[350px]">
              <div className="h-[128px] w-full flex items-center justify-center mb-5">
                <img src={fitur.icons} alt="" className="h-full w-auto" />
              </div>
              <p className="font-bold h-[60px] text-lg mb-2">{fitur.title}</p>
              <div className="w-[30px] h-[3px] bg-[var(--color-sb-yellow)] rounded-full my-2"></div>
              <p className="text-sm h-[70px] text-[var(--color-sb-grey-dark)] leading-relaxed">{fitur.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
