import { useState, useEffect } from 'react';
import axios from 'axios';

// Praktik terbaik: Gunakan environment variable untuk API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sandbox.co.id/wp-json/wp/v2';

const useSolusi = () => {
  const [solusi, setSolusi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolusi = async () => {
      try {
        setLoading(true);
        // Mengambil data dari endpoint 'posts' dengan _embed untuk mendapatkan gambar
        const response = await axios.get(`${API_URL}/posts?_embed`);

        // Mengubah data API agar sesuai dengan format yang dibutuhkan komponen
        const formattedSolusi = response.data.map(item => ({
          id: item.id, // Tambahkan ID untuk key yang unik
          title: item.title.rendered,
          slug: item.slug,
          image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
        }));

        setSolusi(formattedSolusi);
        setError(null);
      } catch (err) {
        setError('Gagal memuat data solusi. Silakan coba lagi.');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolusi();
  }, []); // Array dependensi kosong agar hook hanya berjalan sekali

  return { solusi, loading, error };
};

export default useSolusi;