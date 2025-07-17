// src/hooks/useRatesData.js

import { useState, useEffect } from 'react';
import { apiClient } from '../api/wordpress'; // Pastikan path ini benar

/**
 * Hook untuk mengambil data statistik (rate) dari custom field di halaman depan.
 * Secara otomatis menemukan halaman depan dan mengekstrak data dari field ACF.
 *
 * @returns {{ ratesData: Array, loading: boolean, error: string|null }}
 */
const useRatesData = () => {
  const [ratesData, setRatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Langkah 1: Ambil pengaturan situs untuk menemukan ID Halaman Depan
        const settingsResponse = await apiClient.get('/');
        const frontPageId = settingsResponse.data?.page_on_front;

        if (!frontPageId) {
          throw new Error("Tidak ada halaman statis yang diatur sebagai 'Front Page' di WordPress.");
        }

        // Langkah 2: Ambil data halaman berdasarkan ID yang ditemukan
        const pageResponse = await apiClient.get(`/pages/${frontPageId}?_embed`);

        // Langkah 3: Ekstrak data dari field ACF.
        // Asumsi nama field repeater di WordPress Anda adalah 'rates_data'
        const items = pageResponse.data?.acf?.rates_data || [];
        
        if (items.length === 0) {
            console.warn("Field 'rates_data' tidak ditemukan atau kosong di data Halaman Depan.");
        }

        setRatesData(items);

      } catch (err) {
        console.error("Gagal mengambil data Rates:", err);
        setError(err.message || "Gagal memuat data statistik.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependensi kosong agar hook hanya berjalan sekali

  return { ratesData, loading, error };
};

export default useRatesData;