import React from 'react'
import Button from '../Button'

const SectionAboutSandbox = () => {
  return (
    <div className="relative w-full aspect-[16/9] bg-about-sandbox bg-black flex items-center justify-center px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
       <div className='w-full h-full flex flex-col items-center justify-center px-4 md:px-10'>
            <div className='h-[90%] w-full grid grid-cols-1 md:grid-cols-2  px-[3%]'>
                <div className='flex flex-col items-start justify-center gap-2'>
                   <p className='font-inter-tight text-lg font-bold text-white'>Tentang Sandbox</p>
                   <p className='font-alexandria text-7xl font-bold text-white '>Kombinasi  <span className='text-[var(--color-sb-yellow)]'>software domestik</span> dan solusi luar negeri</p>
                </div>
                <div className='w-[90%] flex flex-col items-start justify-end gap-6 mb-10 pl-[15%]'>
                    <p className='font-inter-tight text-2xl font-bold text-white'>Sandbox merupakan brand ekosistem perangkat lunak yang didedikasikan untuk perusahaan dan korporat di Indonesia.</p>
                    <p className='font-inter-tight text-xl text-[var(--color-sb-grey)]'>Kami mengintegrasikan software domestik dengan solusi luar negeri yang telah teruji kehandalannya serta sesuai dengan regulasi lokal. Semua solusi kami dapat disesuaikan dengan kebutuhan spesifik bisnis Anda, memastikan efisiensi dan keberlanjutan operasional.</p>
                    <Button variant='outline' shape='default' className='w-fit'>
                        Pelajari Lebih Lanjut
                    </Button>
                </div>
            </div>
       </div>
    </div>

  )
}

export default SectionAboutSandbox