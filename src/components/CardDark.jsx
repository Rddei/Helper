// File: components/cards/CardDark.jsx
import React from 'react';

const CardDark = ({ title, description, icon, hover1, hover2 }) => (
  <div className='group w-[300px] h-[350px] p-2.5 bg-[#141414] flex flex-col gap-6 justify-center relative overflow-hidden'>
    {/* Hover Effects */}
    <div className='hover-card cursor-pointer opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out'>
      <img
        src={hover1}
        alt=""
        className='absolute -top-[39px] -right-[25px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-0'
        loading='lazy'
      />
      <img
        src={hover2}
        alt=""
        loading="lazy"
        className='absolute -top-[39px] -left-[25px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-[200ms]'
      />
    </div>

    {/* Icon */}
    <div className='h-[128px] w-full flex items-center justify-center z-10'>
      <img src={icon} alt={title} className='h-full w-auto' loading="lazy" />
    </div>

    {/* Content */}
    <div className='flex flex-col gap-2'>
      <p className='text-white text-2xl font-alexandria font-bold w-[50%]'>{title}</p>
      <div className='w-[30px] h-[3px] bg-[var(--color-sb-yellow)]'></div>
      <p className='text-[var(--color-sb-grey)] text-base leading-tight'>{description}</p>
    </div>
  </div>
);

export default CardDark;
