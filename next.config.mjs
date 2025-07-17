// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Konfigurasi yang sudah ada
      {
        protocol: 'https',
        hostname: 'sandbox.co.id',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // TAMBAHKAN BLOK INI
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Izinkan semua path dari domain ini
      },
    ],
  },
};

export default nextConfig; // <-- Perubahan ada di sini