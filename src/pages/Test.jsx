// src/pages/BlogPage.jsx
import React from 'react';
import usePosts from '../hooks/usePosts';

const Test = () => {
  // Ambil 5 post terbaru dan sertakan media terkait (_embed)
  const { posts, loading, error } = usePosts({ per_page: 5, _embed: true });

  if (loading) {
    return <div>Memuat data...</div>;
  }

  if (error) {
    return <div>Terjadi kesalahan saat memuat data.</div>;
  }

  return (
    <div>
      <h1>Artikel Terbaru</h1>
      {posts.map((post) => (
        <article key={post.id} style={{ marginBottom: '2rem' }}>
          <h2>{post.title.rendered}</h2>
          {/* Menampilkan gambar unggulan jika ada */}
          {post._embedded && post._embedded['wp:featuredmedia'] && (
            <img 
              src={post._embedded['wp:featuredmedia'][0].source_url} 
              alt={post._embedded['wp:featuredmedia'][0].alt_text}
              style={{ maxWidth: '100%' }}
            />
          )}
          {/* PERHATIAN: Gunakan dangerouslySetInnerHTML dengan hati-hati */}
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          <a href={`/blog/${post.slug}`}>Baca Selengkapnya</a>
        </article>
      ))}
    </div>
  );
};

export default Test;