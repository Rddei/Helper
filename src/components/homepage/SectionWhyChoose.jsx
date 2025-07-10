import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay  } from 'swiper/modules';
import { DataWhyChoose } from '../../data/DataWhyChoose';
import 'swiper/css';
import 'swiper/css/navigation';
import CardDark from '../CardDark';


const SectionWhyChoose = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative bg-black py-24 pb-40 overflow-hidden">
      {/* Title Section */}
      <div className="flex flex-column items-center justify-between mb-8 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
        <div className='w-full md:w-[50%]'>
          <p className="text-base font-inter-tight text-[var(--color-sb-grey)] mb-3">Mengapa Memilih Kami</p>
          <p className="text-4xl md:text-6xl font-alexandria font-bold text-white leading-[1.2]">
            Keunggulan Dari Kami
          </p>
        </div>
        <div className="flex gap-2 mt-6">
          <button ref={prevRef} className="cursor-pointer w-8 h-8 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
            <ArrowLeft size={20} />
          </button>
          <button ref={nextRef} className="cursor-pointer w-8 h-8 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <div className='pl-[var(--padding-mobile)] md:pl-[var(--padding-dekstop)]'>
        <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={'auto'}
        navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
        }}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false
        }}
        onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }}
        className='!overflow-visible'
        >
        {DataWhyChoose.map((card) => (
            <SwiperSlide key={card.id} className='!w-auto'>
            <CardDark {...card} />
            </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  )
}

export default SectionWhyChoose;
