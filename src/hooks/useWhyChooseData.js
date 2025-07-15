// src/hooks/useWhyChooseData.js

import { useState, useEffect } from 'react';
import { getWhyChooseItems } from '../api/wordpress';
import parse from 'html-react-parser';

/**
 * Hook untuk mengambil data "Mengapa Memilih Kami" dari WordPress.
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 */
const useWhyChooseData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Ambil data dengan _embed untuk menyertakan gambar dari ACF
        const response = await getWhyChooseItems({ _embed: true });

        // Transformasi data dari format API ke format yang dibutuhkan komponen
        const formattedData = response.data.map(item => ({
          id: item.id,
          title: item.title.rendered,
          // Gunakan excerpt untuk deskripsi singkat
          description: parse(item.excerpt.rendered),
          // Asumsi field di ACF Anda bernama: icon, hover1, dan hover2
          // dan Anda mengambil URL dari gambar tersebut.
          icon: item.acf?.icon?.url || null,
          hover1: item.acf?.hover1?.url || null,
          hover2: item.acf?.hover2?.url || null,
        }));
        
        setData(formattedData);
      } catch (err) {
        console.error("Gagal mengambil data 'Why Choose Us':", err);
        setError("Gagal memuat data keunggulan kami.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependensi kosong agar hanya berjalan sekali

  return { data, loading, error };
};

export default useWhyChooseData;