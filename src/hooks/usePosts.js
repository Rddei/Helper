// src/hooks/usePosts.js
import { useState, useEffect } from 'react';
import { getPosts } from '../api/wordpress';

const usePosts = (params) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts(params);
        setPosts(response.data);
      } catch (err) {
        setError(err);
        console.error("Gagal mengambil data posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [JSON.stringify(params)]); // Efek dijalankan kembali jika parameter berubah

  return { posts, loading, error };
};

export default usePosts;