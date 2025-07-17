import { useState, useEffect } from 'react';
import { getProducts } from '../api/wordpress'; // Pastikan path ini sesuai dengan struktur proyek Anda

const useSolutionData = (params) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Panggil API untuk mengambil data produk dengan _embed
        const response = await getProducts({ ...params, _embed: true });
        setSolutions(response.data);
      } catch (err) {
        setError("Gagal mengambil data solusi. Silakan coba lagi nanti.");
        console.error("Gagal mengambil data solusi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]); // Efek dijalankan kembali jika parameter berubah

  return { solutions, loading, error };
};

export default useSolutionData;