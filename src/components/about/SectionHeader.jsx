import React from 'react'

const SectionHeader = () => {
  return (
    <div className="relative w-full h-auto md:aspect-[16/9] bg-about bg-black flex items-center justify-center px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] py-28 md:py-0">
       <div className='w-full h-full flex flex-col items-center justify-center px-0 md:px-10'>
            <div className='h-full md:h-[90%] w-full grid grid-cols-1 md:grid-cols-2 md:px-[3%]'>
                <div className='flex flex-col items-center md:items-start justify-center gap-2'>
                    <p className='font-inter-tight text-lg font-bold text-white'>Tentang Sandbox</p>
                   <p className='font-alexandria text-center md:text-left text-3xl md:text-7xl font-bold text-white '><span className='text-[var(--color-sb-yellow)]'>Satu Ekosistem Digital</span> untuk Usaha Kecil Medium di Indonesia</p>
                </div>
                <div className='w-full md:w-[90%] flex flex-col items-start justify-center gap-6 mt-10 md:mt-0 mb-0 md:mb-10 pl-0 md:pl-[15%]'>
                    <div className='mt-2 md:mt-[300px] flex flex-col md:items-start items-center justify-center gap-4'>
                        <p className='font-inter-tight text-lg text-center md:text-left md:text-2xl font-bold text-white'>Kami di sini untuk membantu Anda! Jelajahi halaman bantuan kami atau hubungi tim dukungan kami untuk mendapatkan solusi cepat dan efektif.</p>
                        <p className='font-inter-tight text-base text-center md:text-left md:text-xl text-[var(--color-sb-grey)]'>Sandbox menyediakan berbagai solusi untuk berbagai industri usaha dalam urusan operasional, transaksi, sampai penjualan karena kami percaya usaha yang baik perlu juga didukung oleh sistem yang lebih baik.</p>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default SectionHeader