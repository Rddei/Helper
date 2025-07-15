import { useState, useEffect } from 'react';
import axios from 'axios';

// API WordPress Anda
const API_URL = 'https://sandbox.co.id/wp-json/wp/v2';

const useSolusi = () => {
  const [solusi, setSolusi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolusi = async () => {
      try {
        setLoading(true);
        // Mengambil data dari endpoint 'posts' dengan menyertakan media (gambar)
        const response = await axios.get(`${API_URL}/posts?_embed`);

        // Mengubah data API menjadi format yang kita inginkan
        const formattedSolusi = response.data.map(item => ({
          title: item.title.rendered,
          slug: item.slug,
          // Mengambil gambar dari data _embedded
          image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'URL_GAMBAR_PENGGANTI.jpg'
        }));

        setSolusi(formattedSolusi);
      } catch (err) {
        setError('Gagal memuat data solusi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolusi();
  }, []);

  return { solusi, loading, error };
};

export default useSolusi;