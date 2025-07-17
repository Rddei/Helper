import React from 'react'
import ImgSolusi from '../../assets/image/bg-section-batuan.png'
import Button from '../Button'


const SectionHeader = () => {
  return (
    <div className="relative w-full h-auto md:aspect-[16/9] bg-solution bg-black flex flex-col items-center justify-center px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] py-10 md:py-0">
       <div className='w-full h-full flex flex-col items-center justify-center px-0 md:px-10'>
            <div className='h-full md:h-[90%] w-full grid grid-cols-1 md:grid-cols-2 md:px-[3%]'>
                <div className='flex flex-col items-center md:items-start justify-center gap-2'>
                   <p className='font-alexandria text-center md:text-left text-4xl md:text-7xl font-bold text-white '><span className='text-[var(--color-sb-yellow)]'>Butuh Bantuan ?</span> Kami di sini untuk anda</p>
                </div>
                <div className='w-full md:w-[90%] flex flex-col items-start justify-center gap-6 mt-10 md:mt-0 mb-0 md:mb-10 pl-0 md:pl-[15%]'>
                    <div className='mt-2 md:mt-[300px] flex flex-col md:items-start items-center justify-center gap-8'>
                        <p className='font-inter-tight text-center md:text-left text-lg md:text-xl text-white'>Kunjungi halaman bantuan atau hubungi tim kami. Kami siap memberikan solusi terbaik dengan cepat dan mudah.</p>
                    </div>
                </div>
            </div>
       </div>
       <div className='-mt-24'>
        <img src={ImgSolusi} alt="Sandbox" loading="lazy" />
       </div>
    </div>
  )
}

export default SectionHeader