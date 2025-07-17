import React from 'react'
import ImgVisiMisi from '../../assets/image/img-visi-misi.png'

const SectionVisiMisi = () => {
  return (
    <div className='bg-[#141414] py-10 h-auto md:py-28 w-full'>
        <div className='flex flex-col items-center justify-center gap-10 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]'>
            <p className='font-alexandria text-center md:text-left text-4xl md:text-6xl font-bold text-white '>Visi dan Misi <span className='text-[var(--color-sb-yellow)]'>Sandbox</span></p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-20 mt-10'>
                <div className='p-2'>
                    <img src={ImgVisiMisi} alt="Sandbox" loading="lazy" className='w-full' />
                </div>
                <div className='flex flex-col items-center justify-center gap-20 p-10'>
                    <div className='flex flex-col gap-4'>
                        <p className='text-white font-bold font-alexandria text-3xl'>Visi Sandbox</p>
                        <p className='text-[var(--color-sb-grey-dark)] font-inter-tight text-xl'>Sandbox menjadi platform penyedia Software-as-a-Service(Saas) untuk usaha kecil-berkembang lewat penerapan teknologi digital yang dapat digunakan usaha di berbagai industri di Indonesia</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p className='text-white font-bold font-alexandria text-3xl'>Misi Sandbox</p>
                        <p className='text-[var(--color-sb-grey-dark)] font-inter-tight text-xl'>Dapat menjadi pilihan nomor satu untuk ratusan ribu pengusaha kecil-menengah di Indonesia dalam urusan membantu operasional, transaksi, sampai penjualan.</p>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default SectionVisiMisi