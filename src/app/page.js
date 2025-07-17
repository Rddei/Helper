// src/app/page.js

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/',
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  title: "Sandbox - Software Company Indonesia",
  description: "Solusi teknologi integratif untuk semua kebutuhan perusahaan Anda. Lihat portofolio, produk, dan layanan terbaik dari Sandbox.",
  keywords: "software, teknologi, solusi, sandbox, indonesia, portofolio, produk",
  openGraph: {
    title: "Sandbox - Software Company Indonesia",
    description: "Solusi teknologi integratif untuk semua kebutuhan perusahaan Anda.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Sandbox",
    images: [
      {
        url: "/assets/logo-sandbox.svg",
        width: 800,
        height: 600,
        alt: "Sandbox Logo",
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open Graph Image",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandbox - Software Company Indonesia",
    description: "Solusi teknologi integratif untuk semua kebutuhan perusahaan Anda.",
    images: ["/assets/logo-sandbox.svg", "/og-image.png"],
  },
};

// Impor semua komponen halaman depan Anda
import SectionHeader from '@/components/homepage/SectionHeader';
import SectionAboutSandbox from '@/components/homepage/SectionAboutSandbox';
import SectionSolutionSandbox from '@/components/homepage/SectionSolutionSandbox';
import SectionReadyToUse from '@/components/homepage/SectionReadyToUse';
import SectionParallax from '@/components/SectionParallax';
import SectionContactUs from '@/components/homepage/SectionContactUs';
import SectionWhyChoose from '@/components/homepage/SectionWhyChoose';
import SectionPortfolio from '@/components/homepage/SectionPortfolio';

// Komponen Halaman sekarang menjadi sederhana dan tidak mengambil data
export default function HomePage() {
  return (
    <div className='bg-black'>
      <SectionHeader />
      <SectionAboutSandbox />
      <SectionSolutionSandbox />  
      <SectionReadyToUse />
      <SectionParallax topSection={<SectionWhyChoose />} bottomSection={<SectionPortfolio />} />
      <div id="kontak-kami">
        <SectionContactUs />
      </div>
    </div>
  );
}