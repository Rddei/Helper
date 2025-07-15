import { useState, useEffect } from 'react';
import { getProjects } from '../api/wordpress'; // Pastikan path ke file API Anda sudah benar

/**
 * Custom hook untuk mengambil data dari Custom Post Type 'project'.
 * @param {object} params - Parameter query untuk API, e.g., { per_page: 5, _embed: true }
 * @returns {{projects: Array, loading: boolean, error: object|null}}
 */
const useProjects = (params) => {
  // State untuk menampung data, status loading, dan kemungkinan error
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi async untuk mengambil data dari API
    const fetchProjects = async () => {
      try {
        setLoading(true); // Mulai loading
        // Panggil fungsi getProjects dari service API kita
        const response = await getProjects({ ...params, _embed: true });
        setProjects(response.data); // Simpan data yang berhasil didapat ke state
      } catch (err) {
        // Jika gagal, simpan informasi error
        setError(err);
        console.error("Gagal mengambil data projects:", err);
      } finally {
        // Apapun hasilnya (berhasil atau gagal), hentikan loading
        setLoading(false);
      }
    };

    fetchProjects();
  }, [JSON.stringify(params)]); // Efek ini akan dijalankan kembali jika parameter berubah

  // Kembalikan state agar bisa digunakan oleh komponen
  return { projects, loading, error };
};

export default useProjects;