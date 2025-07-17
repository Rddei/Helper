// src/api/wordpress.js (Kode yang Sudah Diperbaiki)

import axios from 'axios';

// Konfigurasi base URL untuk semua permintaan API
export const apiClient = axios.create({
  baseURL: 'https://sandbox.co.id/wp-json/wp/v2',
});

/**
 * Mengambil daftar semua posts.
 * Kita bisa menambahkan parameter seperti per_page, page, dll.
 * @param {object} params - Parameter query (e.g., { per_page: 5, _embed: true })
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPosts = (params) => {
  return apiClient.get('/posts', { params });
};

/**
 * Mengambil satu post berdasarkan ID.
 * @param {number} id - ID dari post
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPostById = (id) => {
  return apiClient.get(`/posts/${id}?_embed`);
};

/**
 * Mengambil daftar semua pages.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPages = (params) => {
  return apiClient.get('/pages', { params });
};

/**
 * Mengambil satu halaman spesifik berdasarkan slug-nya.
 * @param {string} slug - Slug halaman yang ingin diambil (contoh: 'home').
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPageBySlug = (slug) => {
  // Panggil endpoint /pages dengan filter slug dan sertakan data _embed
  return apiClient.get(`/pages?slug=${slug}&_embed=true`);
};

// Anda bisa menambahkan fungsi lain untuk custom post type "project" di sini
/**
 * Mengambil daftar semua project.
 * @param {object} params - Parameter query
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getProjects = (params) => {
  return apiClient.get('/project', { params });
};

/**
 * Mengunggah file ke custom post type "project".
 * @param {File} file - File yang akan diunggah
 * @returns {Promise<AxiosResponse<any>>}
 */
export const uploadProjects = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  // Anda bisa menyesuaikan endpoint jika perlu autentikasi atau field lain
  return apiClient.post('/project/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Mengambil daftar semua product (solusi).
 * @param {object} params - Parameter query
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getProducts = (params) => {
  return apiClient.get('/product', { params });
};

/**
 * Mengambil daftar semua item 'Mengapa Memilih Kami'.
 * @param {object} params - Parameter query (e.g., { _embed: true })
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getWhyChooseItems = (params) => {
  return apiClient.get('/why_choose', { params });
};

/**
 * Mengambil SATU produk berdasarkan slug-nya.
 * Penting untuk halaman detail dan metadata dinamis.
 * @param {string} slug - Slug dari produk yang ingin diambil.
 */
export const getProductBySlug = (slug) => {
  return apiClient.get(`/product?slug=${slug}&_embed=true`);
};

/**
 * Mengambil SEMUA produk hanya untuk mendapatkan slug-nya.
 * Penting untuk membuat sitemap.
 */
export const getAllProductSlugs = () => {
    // Kita hanya butuh field 'slug', jadi ini lebih efisien
    return apiClient.get('/product?_fields=slug');
};