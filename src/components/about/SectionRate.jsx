import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dataRate from '../../data/DataRate.jsx';

gsap.registerPlugin(ScrollTrigger);

const SectionRate = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll('.rate-item');

    items.forEach((item) => {
      const number = item.querySelector('.count-number');
      const finalValue = parseInt(number.dataset.value, 10);
      const obj = { val: 0 };

      gsap.to(obj, {
        val: finalValue,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'restart none restart none',
        },
        onUpdate: () => {
          number.innerText = Math.floor(obj.val).toLocaleString('id-ID');
        },
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className='py-20 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] bg-black'
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0'>
        {dataRate.map((item, idx) => (
          <div
            key={idx}
            className='rate-item flex items-center justify-center flex-col text-center'
          >
            <div className='flex flex-col items-center gap-3'>
              <p className='text-5xl h-14 text-white font-bold font-alexandria flex items-center justify-center'>
                <span
                  className='count-number text-[var(--color-sb-yellow)]'
                  data-value={item.value}
                >
                  0
                </span>
                {['Proyek', 'Klien'].includes(item.label) && (
                  <span className='text-[var(--color-sb-yellow)]'>+</span>
                )}
                &nbsp;{item.label}
              </p>
              <p className='w-[80%] h-20 text-lg text-[var(--color-sb-grey)] font-inter-tight'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionRate;
