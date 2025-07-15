// src/pages/SolusiDetail.jsx (Kode yang Diperbarui)

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from 'html-react-parser'; // <-- Impor parser HTML

// 1. Impor hook, bukan data statis
import useSolusi from "../hooks/useSolusi";

// Komponen
// ...existing code...
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Daftar seksi bisa tetap statis
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "media", label: "Foto & Video" },
  { id: "fitur", label: "Fitur Utama" },
  { id: "manfaat", label: "Manfaat Utama" },
  { id: "industri", label: "Industri Terkait" },
];

const SolusiDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 2. Panggil hook dengan slug untuk mendapatkan data detail
  const { solusi, loading, error } = useSolusi({ slug });

  const [activeSection, setActiveSection] = useState("overview");

  // 3. Efek untuk IntersectionObserver, jalankan hanya setelah data dimuat
  useEffect(() => {
    // Jangan jalankan observer jika data masih loading atau tidak ada
    if (loading || !solusi) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Threshold 0.5 berarti seksi dianggap aktif jika 50% terlihat
      { rootMargin: "0px 0px -50% 0px" } 
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [solusi, loading]); // <-- Dependensi pada `solusi` dan `loading`

  // 4. Handle status Loading
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Memuat data...
        </div>
        <Footer />
      </>
    );
  }

  // 5. Handle status Error atau jika solusi tidak ditemukan
  if (error || !solusi) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-xl font-bold">{error ? "Terjadi Kesalahan" : "Solusi Tidak Ditemukan"}</p>
            <p className="text-gray-400 mt-2">{error ? "Gagal memuat data dari server." : "Data yang Anda cari tidak ada."}</p>
            <button
              onClick={() => navigate("/solusi-produk")}
              className="mt-6 px-4 py-2 rounded-md bg-[var(--color-sb-yellow)] text-black font-semibold"
            >
              Kembali ke Daftar Solusi
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  // 6. Jika data berhasil dimuat, render halaman
  return (
    <>
    <Navbar/>
    <div className="grid grid-cols-1 md:grid-cols-12 bg-black pt-28">
      {/* Sidebar Navigasi */}
      <div className="col-span-12 md:col-span-3 px-[var(--padding-mobile)] md:px-0 md:pl-[var(--padding-dekstop)] mb-8 md:mb-0">
        <div className="sticky top-28 h-fit">
            <ul className="flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto pb-4">
              {SECTIONS.map(({ id, label }) => {
                  // Cek apakah section memiliki konten
                  const hasContent = solusi[id] && solusi[id].length > 0;
                  if (id !== 'overview' && !hasContent) return null; // Sembunyikan jika tidak ada konten (kecuali overview)

                  return(
                    <li
                      key={id}
                      className={`py-2 px-4 rounded-md cursor-pointer transition-all text-sm whitespace-nowrap ${
                        activeSection === id
                          ? "bg-[var(--color-sb-yellow)] text-black font-semibold"
                          : "text-white bg-[#1E1E1E] hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        const el = document.getElementById(id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      {label}
                    </li>
                  )
              })}
            </ul>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="col-span-12 md:col-span-9 text-white px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
        {/* Gambar Utama */}
        <div className="mb-12">
          <img src={solusi.image} alt={solusi.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl" />
        </div>

        {/* Overview */}
        <section id="overview" className="mb-16 scroll-mt-28">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-sb-yellow)] mb-6 font-alexandria">
            {solusi.title}
          </h1>
          <div className="prose prose-invert prose-lg text-gray-300 font-inter-tight text-justify whitespace-pre-line leading-relaxed">
            {parse(solusi.description || "")}
          </div>
        </section>

        {/* Media (Foto & Video) */}
        {solusi.media && solusi.media.length > 0 && (
          <section id="media" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-alexandria">Foto & Video</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solusi.media.map((item, idx) =>
                item.type === "image" ? (
                  <img key={idx} src={item.url} alt={`media-${idx}`} className="rounded-xl w-full h-full object-cover"/>
                ) : (
                  <iframe key={idx} src={item.url} title={`video-${idx}`} className="w-full aspect-video rounded-xl" allowFullScreen />
                )
              )}
            </div>
          </section>
        )}

        {/* Fitur Utama */}
        {solusi.fitur && solusi.fitur.length > 0 && (
            <section id="fitur" className="mb-16 scroll-mt-28">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 font-alexandria">Fitur Utama</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {solusi.fitur.map((fitur, idx) => (
                    <div key={idx} className="bg-[#1E1E1E] p-6 rounded-lg">
                        <h3 className="font-bold text-xl mb-2 text-[var(--color-sb-yellow)] font-alexandria">{fitur.title}</h3>
                        <p className="text-sm text-gray-300 font-inter-tight">{fitur.desc}</p>
                    </div>
                    ))}
                </div>
            </section>
        )}
        
        {/* Manfaat Utama */}
        {solusi.manfaat && solusi.manfaat.length > 0 && (
            <section id="manfaat" className="mb-16 scroll-mt-28">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 font-alexandria">Manfaat Utama</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {solusi.manfaat.map((item, idx) => (
                    <div key={idx} className="bg-[#1E1E1E] p-6 rounded-lg">
                        <h3 className="font-bold text-xl mb-2 text-[var(--color-sb-yellow)] font-alexandria">{item.title}</h3>
                        <p className="text-sm text-gray-300 font-inter-tight">{item.desc}</p>
                    </div>
                    ))}
                </div>
            </section>
        )}

        {/* Industri */}
        {solusi.industri && solusi.industri.length > 0 && (
          <section id="industri" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-alexandria">Industri Terkait</h2>
            <div className="flex flex-wrap gap-3">
              {solusi.industri.map((industri, idx) => (
                <span key={idx} className="bg-[#1E1E1E] text-gray-300 text-sm font-medium px-4 py-2 rounded-full">{industri}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SolusiDetail;