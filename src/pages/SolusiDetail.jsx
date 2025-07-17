import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from 'html-react-parser'; // Parser untuk render string HTML

// Hooks & Data
import useSolusi from "../hooks/useSolusi"; // Hook untuk fetch data detail

// Komponen UI
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

import NoImage from "../assets/image/Solusi/Aplikasi/AI Manajement Kontrak/Img-1.webp"

// Aset
import ImgEmptyState1 from "../assets/image/empty-state-1.svg";

// Konfigurasi statis untuk seksi navigasi
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "media", label: "Foto & Video" },
  { id: "fitur", label: "Fitur Utama" },
  { id: "manfaat", label: "Manfaat Utama" },
  { id: "industri", label: "Industri Terkait" },
];

export default function SolusiDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 1. Mengambil data menggunakan custom hook
  const { solusi, loading, error } = useSolusi({ slug });

  // State untuk melacak seksi yang aktif di viewport
  const [activeSection, setActiveSection] = useState("overview");

  // 2. Efek untuk IntersectionObserver (mendeteksi seksi mana yang terlihat)
  useEffect(() => {
    // Jangan jalankan observer jika data belum siap
    if (loading || !solusi) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Seksi dianggap aktif jika bagian atasnya masuk ke 50% bagian atas layar
      { rootMargin: "0px 0px -50% 0px" }
    );

    // Amati setiap elemen seksi
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Fungsi cleanup untuk berhenti mengamati saat komponen di-unmount
    return () => {
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [solusi, loading]); // <-- Jalankan efek ini hanya jika 'solusi' atau 'loading' berubah

  // 3. Tampilan saat data sedang dimuat (Loading State)
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Memuat data solusi...
        </div>
        <Footer />
      </>
    );
  }

  // 4. Tampilan jika terjadi error atau solusi tidak ditemukan (Error/Empty State)
  if (error || !solusi) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col bg-[#141414] items-center justify-center text-white text-center px-4">
            <img src={ImgEmptyState1} alt="Solusi tidak ditemukan" loading="lazy" className="w-[250px] md:w-[300px]" />
            <div className="mt-7">
                <p className="text-2xl font-alexandria font-bold">
                    {error ? "Terjadi Kesalahan" : "Solusi Tidak Ditemukan"}
                </p>
                <p className="text-[var(--color-sb-grey)] text-lg mt-1">
                    {error ? "Gagal memuat data dari server." : "Maaf, kami tidak dapat menemukan solusi yang Anda cari."}
                </p>
            </div>
            <Button onClick={() => navigate("/solusi-produk")} className="mt-10">
                Kembali ke Daftar Solusi
            </Button>
        </div>
        <Footer />
      </>
    );
  }
  
  // 5. Tampilan utama jika data berhasil dimuat (Success State)
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-12 bg-black pt-28 pb-20">
        
        {/* Kolom Sidebar Navigasi */}
        <div className="col-span-12 md:col-span-3 px-[var(--padding-mobile)] md:px-0 md:pl-[var(--padding-dekstop)] mb-8 md:mb-0">
          <div className="sticky top-28 h-fit">
            <ul className="flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto pb-4">
              {SECTIONS.map(({ id, label }) => {
                // Cek apakah section memiliki konten yang relevan di data 'solusi'
                const hasContent = (id === 'overview') || (solusi[id] && solusi[id].length > 0);
                
                // Jangan render menu jika tidak ada kontennya (kecuali overview)
                if (!hasContent) return null;

                return (
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
                );
              })}
            </ul>
          </div>
        </div>

        {/* Kolom Konten Utama */}
        <div className="col-span-12 md:col-span-9 text-white px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
          {/* Gambar Utama */}
          <div className="mb-12">
            <img src={solusi.image} alt={solusi.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl" />
          </div>

          {/* Seksi Overview */}
          <section id="overview" className="mb-16 scroll-mt-28">
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-sb-yellow)] mb-6 font-alexandria">
              {solusi.title}
            </h1>
            <div className="prose prose-invert prose-lg text-gray-300 font-inter-tight text-justify whitespace-pre-line leading-relaxed">
              {parse(solusi.description || "")}
            </div>
          </section>

          {/* Seksi Media (Foto & Video) */}
          {solusi.media && solusi.media.length > 0 && (
            <section id="media" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-alexandria">Foto & Video</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {solusi.media.map((item, idx) =>
                  item.type === "image" ? (
                    <img key={idx} src={item.url} alt={`media-${idx}`} className="rounded-xl w-full h-full object-cover" />
                  ) : (
                    <iframe key={idx} src={item.url} title={`video-${idx}`} className="w-full aspect-video rounded-xl" allowFullScreen />
                  )
                )}
              </div>
            </section>
          )}

          {/* Seksi Fitur Utama */}
          {solusi.fitur && solusi.fitur.length > 0 && (
            <section id="fitur" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-alexandria">Fitur Utama</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {solusi.fitur.map((item, idx) => (
                  <div key={idx} className="bg-[#1E1E1E] p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2 text-[var(--color-sb-yellow)] font-alexandria">{item.title}</h3>
                    <p className="text-sm text-gray-300 font-inter-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Seksi Manfaat Utama */}
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

          {/* Seksi Industri Terkait */}
          {solusi.industri && solusi.industri.length > 0 && (
            <section id="industri" className="scroll-mt-28">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-alexandria">Industri Terkait</h2>
              <div className="flex flex-wrap gap-3">
                {solusi.industri.map((item, idx) => (
                  <span key={idx} className="bg-[#1E1E1E] text-gray-300 text-sm font-medium px-4 py-2 rounded-full">{item}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}