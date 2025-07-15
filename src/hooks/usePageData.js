// src/hooks/usePageData.js

import { useState, useEffect } from 'react';
import { getPageBySlug } from '../api/wordpress';

/**
 * Hook untuk mengambil data dari satu halaman spesifik berdasarkan slug.
 * @param {string} slug - Slug dari halaman yang ingin diambil (misal: 'home').
 * @returns {{ pageData: object|null, loading: boolean, error: string|null }}
 */
const usePageData = (slug) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Slug halaman tidak disediakan.");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPageBySlug(slug);

        if (response.data && response.data.length > 0) {
          // API mengembalikan array, kita ambil objek pertama
          setPageData(response.data[0]);
        } else {
          throw new Error(`Halaman dengan slug '${slug}' tidak ditemukan.`);
        }
      } catch (err) {
        console.error(`Gagal mengambil data untuk halaman '${slug}':`, err);
        setError(`Gagal memuat data halaman: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Jalankan ulang jika slug berubah

  return { pageData, loading, error };
};

export default usePageData;