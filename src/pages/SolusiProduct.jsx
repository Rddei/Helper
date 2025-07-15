// src/pages/SolusiProduk.jsx (Kode yang Diperbarui)

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import clsx from "clsx";

// 1. Impor data statis dihapus dan diganti dengan hook
import useSolusi from "../hooks/useSolusi";

// Komponen-komponen section
import SectionFilter from "../components/solusi/SectionFilter";
import SectionCard from "../components/solusi/SectionCard";
import SectionPagination from "../components/solusi/SectionPagination";
import SectionSearch from "../components/solusi/SectionSearch";
import SectionHeader from "../components/solusi/SectionHeader";
// ...existing code...
import ImgEmptyState1 from "../assets/image/empty-state-1.svg";
import ContactUs from "../components/ContactUs";

// Meta untuk header bisa tetap statis untuk saat ini
const filterMeta = {
  semua: { title: "Eksplorasi Solusi Kami", description: "Temukan solusi teknologi inovatif yang dirancang untuk mendorong pertumbuhan dan efisiensi bisnis Anda di berbagai industri." },
  aplikasi: { title: "Aplikasi", description: "Aplikasi kami dirancang untuk meningkatkan efisiensi dan produktivitas dalam setiap aspek operasional Anda." },
  solusi: { title: "Solusi", description: "Sandbox memiliki beragam solusi inovatif untuk meningkatkan value bisnis Anda." },
  data: { title: "Data", description: "Data menjadi inti dari setiap keputusan bisnis. Optimalisasi data bisnis untuk membuat keputusan yang lebih tepat." },
  infrastruktur: { title: "Infrastruktur", description: "Infrastruktur yang dirancang berfokus pada scalabilities dan reliabilities untuk memberikan fondasi yang solid bagi bisnis Anda." },
};

const SolusiProduk = () => {
  // 2. Fetch data dari WordPress menggunakan hook
  const { solusi: allSolusi, loading, error } = useSolusi();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(9);

  const gridRef = useRef();
  const sentinelRef = useRef();

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCardsPerPage(6);
    } else {
      setCardsPerPage(9);
    }
  };

  handleResize(); // inisialisasi sekali saat mount

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  // 3. Membuat daftar kategori secara dinamis dari data API
  const categories = useMemo(() => {
    if (loading || !allSolusi) return ["semua"];
    // Ambil kategori unik dari field ACF, beri fallback 'solusi' jika tidak ada
    const uniqueCategories = new Set(allSolusi.map(item => item.acf?.category || 'solusi'));
    return ["semua", ...Array.from(uniqueCategories)];
  }, [allSolusi, loading]);

  // Efek untuk sticky header
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([e]) => setIsSticky(!e.isIntersecting), { threshold: 0 });
    observer.observe(sentinel);
    return () => observer.unobserve(sentinel);
  }, []);

  // Efek untuk sinkronisasi filter dengan URL query params
  useEffect(() => {
    const param = searchParams.get("filter");
    if (param && categories.includes(param)) {
      setFilter(param);
    } else {
      setFilter("semua");
    }
    setCurrentPage(1);
  }, [searchParams, categories]); // Tambahkan `categories` sebagai dependensi

  const handleFilterChange = (value) => {
    setSearchParams(value === "semua" ? {} : { filter: value });
  };

  // 4. Logika filter, search, dan pagination di-update untuk bekerja dengan data API
  const filteredData = useMemo(() => {
    if (loading || !allSolusi) return [];
    if (filter === "semua") return allSolusi;
    return allSolusi.filter(item => (item.acf?.category || 'solusi') === filter);
  }, [filter, allSolusi, loading]);

  const searchedData = useMemo(() => {
    return filteredData.filter(item =>
      item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, filteredData]);

  const totalPages = Math.ceil(searchedData.length / cardsPerPage);
  const paginatedData = searchedData.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  // Efek untuk animasi GSAP
  useEffect(() => {
    if (gridRef.current?.children?.length) {
      gsap.fromTo(gridRef.current.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 });
    }
  }, [paginatedData]); // Dependensi diubah ke `paginatedData` agar animasi terpicu saat data berubah

  return (
    <div className="bg-black min-h-screen text-white pt-25">
      <SectionHeader />
      <div className="px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] pt-10">
        <div className="mb-24 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-sb-yellow)] mb-2 font-alexandria text-center">
            {filterMeta[filter]?.title || "Eksplorasi Solusi Kami"}
          </h1>
          <p className="text-[var(--color-sb-grey-dark)] md:w-[50%] w-full text-center font-inter-tight text-sm md:text-base">
            {filterMeta[filter]?.description || ""}
          </p>
        </div>
      </div>
      <div ref={sentinelRef} className="h-[1px]" />
      <div className={clsx("sticky top-[70px] pt-5 z-50 transition-colors duration-300 backdrop-blur-xl", isSticky ? "bg-[#1a1919]/80" : "bg-black")}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
          <SectionFilter categories={categories} filter={filter} handleFilterChange={handleFilterChange} />
          <SectionSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 min-h-[500px] px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] pb-10">
        {loading ? (
          <div className="col-span-full flex items-center justify-center text-white py-20">Memuat data...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : paginatedData.length > 0 ? (
          <div ref={gridRef} className="contents">
            {paginatedData.map((solusi) => (
              <SectionCard key={solusi.id} solusi={solusi} />
            ))}
          </div>
        ) : (
          <div className="col-span-full flex items-center justify-center py-[150px]">
            <div className="flex flex-col items-center">
              <img src={ImgEmptyState1} alt="Sandbox" loading="lazy" className="w-[300px]" />
              <div className="text-center mt-7">
                <p className="text-2xl font-alexandria font-bold">Solusi tidak ditemukan</p>
                <p className="text-[var(--color-sb-grey)] text-lg">Kami tidak dapat menemukan solusi yang cocok. Silakan coba kata kunci atau filter lain.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && !loading && (
        <SectionPagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      <ContactUs title={<>Mulai <span className="text-[var(--color-sb-yellow)]">Transformasi Bisnis</span> Anda Sekarang !</>} description="Tingkatkan produktivitas dan efisiensi bisnis Anda sekarang. Jelaskan kebutuhan bisnis Anda kepada kami, dan kami akan bantu cari solusinya." />
    </div>
  );
};

export default SolusiProduk;