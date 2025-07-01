import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { DataWhyChoose } from '../../data/DataWhyChoose';

const WhyChooseCard = ({ title, description, icon, hover1, hover2 }) => (
  <div className='group w-[300px] h-[350px] p-2.5 bg-[#141414] flex flex-col gap-6 justify-center relative overflow-hidden'>
    <div className='hover-card cursor-pointer opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out'>
      <img
        src={hover1}
        alt=""
        className='absolute -top-[39px] -right-[25px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-0'
      />
      <img
        src={hover2}
        alt=""
        className='absolute -top-[39px] -left-[25px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-[200ms]'
      />
    </div>
    <div className='h-[128px] w-full flex items-center justify-center z-10'>
      <img src={icon} alt={title} className='h-full w-auto' />
    </div>
    <div className='flex flex-col gap-2'>
      <p className='text-white text-2xl font-alexandria font-bold w-[50%]'>{title}</p>
      <div className='w-[30px] h-[3px] bg-[var(--color-sb-yellow)]'></div>
      <p className='text-[var(--color-sb-grey)] text-base leading-tight'>{description}</p>
    </div>
  </div>
);

const SectionWhyChoose = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative bg-black py-24 pb-40 overflow-hidden">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-8 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
        <div className='w-full md:w-[50%]'>
          <p className="text-base font-inter-tight text-[var(--color-sb-grey)] mb-3">Mengapa Memilih Kami</p>
          <p className="text-4xl md:text-6xl font-alexandria font-bold text-white leading-[1.2]">
            Keunggulan Dari Kami
          </p>
        </div>
        <div className="flex gap-4 mt-6">
          <button ref={prevRef} className="cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
            <ArrowLeft size={20} />
          </button>
          <button ref={nextRef} className="cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
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
            <WhyChooseCard {...card} />
            </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  )
}

export default SectionWhyChoose;
