// src/app/sitemap.js

import { getAllProductSlugs } from "@/api/wordpress";

export default async function sitemap() {
  const baseUrl = "https://www.nama-domain-anda.com"; // Ganti dengan domain Anda nanti

  const response = await getAllProductSlugs();
  const products = response.data;

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/solusi-produk/${product.slug}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/tentang-sandbox`, lastModified: new Date() },
    { url: `${baseUrl}/bantuan`, lastModified: new Date() },
    { url: `${baseUrl}/kontak-kami`, lastModified: new Date() },
  ];

  return [...staticUrls, ...productUrls];
}