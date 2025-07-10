import React from 'react'
import Button from '../Button'

const SectionHeader = () => {
  return (
    <div className="relative w-full h-auto md:aspect-[16/9] bg-solution bg-black flex items-center justify-center px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] py-10 md:py-0">
       <div className='w-full h-full flex flex-col items-center justify-center px-0 md:px-10'>
            <div className='h-full md:h-[90%] w-full grid grid-cols-1 md:grid-cols-2 md:px-[3%]'>
                <div className='flex flex-col items-center md:items-start justify-center gap-2'>
                   <p className='font-alexandria text-center md:text-left text-4xl md:text-7xl font-bold text-white '>Optimalkan Bisnis Anda dengan <span className='text-[var(--color-sb-yellow)]'>Solusi Sistem Terbaik</span></p>
                </div>
                <div className='w-full md:w-[90%] flex flex-col items-start justify-center gap-6 mt-10 md:mt-0 mb-0 md:mb-10 pl-0 md:pl-[15%]'>
                    <div className='mt-2 md:mt-[300px] flex flex-col md:items-start items-center justify-center gap-8'>
                        <p className='font-inter-tight text-center md:text-left text-lg md:text-xl text-[var(--color-sb-grey)]'>Sandbox menawarkan solusi sistem informasi dan produk perangkat lunak yang efisien untuk meningkatkan produktivitas dan efisiensi operasional.</p>
                        <div className='flex items-center justify-center gap-5'>
                            <Button variant='filled' shape='default' className='w-fit'>Mulai Sekarang</Button>
                            <Button variant='outline' shape='default' className='w-fit'>Konsultasi Produk</Button>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default SectionHeader