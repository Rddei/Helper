// src/hooks/useSolusi.js
import { useState, useEffect } from 'react';
import { getProducts } from '../api/wordpress'; // Kita akan buat fungsi ini di API service

const useSolusi = (params) => {
  const [solusi, setSolusi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Panggil API untuk mengambil data product dengan _embed
        const response = await getProducts({ ...params, _embed: true });
        const formattedData = response.data.map(item => {
          const cleanDescription = item.excerpt?.rendered
            ? item.excerpt.rendered.replace(/<p>|<\/p>/g, '').trim()
            : '';
          return {
            id: item.id,
            slug: item.slug,
            title: item.title?.rendered || '',
            description: cleanDescription,
            content: item.content?.rendered || '',
            image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
            acf: item.acf || {},
            recommended: item.acf?.recommended || false, // Asumsi nama field di ACF adalah 'recommended' (true/false)
          };
        });
        setSolusi(formattedData);
      } catch (err) {
        setError(err);
        console.error("Gagal mengambil data solusi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  return { solusi, loading, error };
};

export default useSolusi;