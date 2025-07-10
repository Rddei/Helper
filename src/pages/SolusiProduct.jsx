import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import clsx from "clsx";
import {
  categories,
  dataSolusi,
  filterMeta
} from "../data/DataSolusi";

import SectionFilter from "../components/solusi/SectionFilter";
import SectionCard from "../components/solusi/SectionCard";
import SectionPagination from "../components/solusi/SectionPagination";
import SectionSearch from "../components/solusi/SectionSearch";
import SectionHeader from "../components/solusi/SectionHeader";
import ImgEmptyState1 from "../assets/image/empty-state-1.svg"
import ContactUs from "../components/ContactUs";
const SolusiProduk = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSticky, setIsSticky] = useState(false);

  const gridRef = useRef();
  const sentinelRef = useRef();

  const cardsPerPage = 9;

  // Sticky detection
useEffect(() => {
  const sentinel = sentinelRef.current;

  if (!sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsSticky(!entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(sentinel);

  return () => {
    observer.unobserve(sentinel);
  };
}, []);


  // Set filter dari query param
  useEffect(() => {
    const param = searchParams.get("filter");
    if (param && categories.includes(param)) {
      setFilter(param);
    } else {
      setFilter("semua");
    }
    setCurrentPage(1);
  }, [searchParams]);

  const handleFilterChange = (value) => {
    if (value === "semua") {
      setSearchParams({});
    } else {
      setSearchParams({ filter: value });
    }
  };

  // Filter & search data
  const filteredData =
    filter === "semua"
      ? dataSolusi
      : dataSolusi.filter((item) => item.category === filter);

  const searchedData = filteredData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(searchedData.length / cardsPerPage);
  const paginatedData = searchedData.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  // GSAP animation
  useEffect(() => {
    if (gridRef.current?.children?.length) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05
        }
      );
    }
  }, [filter, searchTerm, currentPage]);

  return (
    <div className="bg-black min-h-screen text-white pt-25">
      <SectionHeader />

      {/* Header teks */}
      <div className="px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] pt-10">
        <div className="mb-24 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-sb-yellow)] mb-2 font-alexandria">
            {filterMeta[filter].title}
          </h1>
          <p className="text-[var(--color-sb-grey-dark)] md:w-[50%] w-full text-center font-inter-tight text-sm md:text-base">
            {filterMeta[filter].description}
          </p>
        </div>
      </div>

      {/* Sticky Sentinel */}
      <div ref={sentinelRef} className="h-[1px]" />

      {/* Sticky Filter & Search */}
      <div
        className={clsx(
          "sticky top-[70px] pt-5 z-50 transition-colors duration-300 backdrop-blur-xl",
          isSticky ? "bg-[#1a1919]/80" : "bg-black"
        )}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
          <SectionFilter
            categories={categories}
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
          <SectionSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {/* Grid Card */}
      <div
        ref={gridRef}
        className="grid md:grid-cols-3 gap-6 min-h-[300px] px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] pb-10"
      >
        {paginatedData.length > 0 ? (
          paginatedData.map((solusi, idx) => (
            <SectionCard key={solusi.slug || idx} solusi={solusi} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-[150px]">
            <div className="flex flex-col items-center">
              <img src={ImgEmptyState1} alt="" className="w-[300px]" />
              <div className="text-center mt-7">
                <p className="text-2xl font-alexandria font-bold">Solusi tidak di temukan</p>
                <p className="text-[var(--color-sb-grey)] text-lg">Kami tidak dapat menemukan solusi apa pun. Coba lagi nanti</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <SectionPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

       <ContactUs
            title={
              <>
                Mulai <span className="text-[var(--color-sb-yellow)]">Transformasi Bisnis</span> Anda Sekarang !
              </>
            }
            description="Tingkatkan produktivitas dan efisiensi bisnis Anda sekarang. Jelaskan kebutuhan bisnis Anda kepada kami, dan kami akan bantu cari solusinya."
        />
    </div>
  );
};

export default SolusiProduk;
