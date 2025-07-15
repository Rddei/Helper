// src/hooks/usePortfolio.js

import { useState, useEffect } from 'react';
import { getPosts } from '../api/wordpress'; // Ganti dengan getProjects jika post type-nya 'project'

/**
 * Custom hook untuk mengambil dan memformat data portfolio dari WordPress.
 *
 * @returns {{ portfolio: Array, loading: boolean, error: string|null }}
 * Obyek yang berisi data portfolio, status loading, dan pesan error.
 */
const usePortfolio = () => {
  // State untuk menyimpan data portfolio yang sudah diformat
  const [portfolio, setPortfolio] = useState([]);

  // State untuk melacak status loading
  const [loading, setLoading] = useState(true);

  // State untuk menyimpan pesan error jika terjadi
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi async untuk mengambil data dari API
    const fetchPortfolio = async () => {
      try {
        // Panggil API untuk mendapatkan posts dengan _embed=true agar data gambar ikut terkirim
        // Kita batasi 3 item saja sesuai contoh, Anda bisa sesuaikan
        const response = await getPosts({ _embed: true, per_page: 3 });

        // Transformasi data dari format API ke format yang diinginkan
        const formattedData = response.data.map((item) => {
          // Mengambil URL gambar dari data _embedded
          const imageUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

          // Membersihkan tag <p> dari deskripsi
          const cleanDescription = item.excerpt.rendered.replace(/<p>|<\/p>/g, '').trim();

          return {
            id: item.id, // Sebaiknya tambahkan ID untuk key di React
            slug: item.slug,
            title: item.title.rendered,
            description: cleanDescription,
            image: imageUrl, // URL gambar dari API
          };
        });

        setPortfolio(formattedData);
      } catch (err) {
        // Jika terjadi error, simpan pesan error
        setError('Gagal memuat data portfolio. Silakan coba lagi nanti.');
        console.error('Error fetching portfolio:', err);
      } finally {
        // Hentikan status loading, baik berhasil maupun gagal
        setLoading(false);
      }
    };

    // Panggil fungsi fetch data
    fetchPortfolio();
  }, []); // Array dependensi kosong agar hook ini hanya berjalan sekali saat komponen dimuat

  // Kembalikan state yang bisa digunakan oleh komponen
  return { portfolio, loading, error };
};

export default usePortfolio;