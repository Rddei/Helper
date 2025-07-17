// src/app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.nama-domain-anda.com/sitemap.xml', // Ganti dengan domain Anda
  };
}