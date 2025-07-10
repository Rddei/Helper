import React from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SectionPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mt-10 flex justify-center items-center gap-2 flex-wrap py-10">
      {/* Tombol Sebelumnya */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={clsx(
          "flex items-center gap-1 px-3 py-1 text-base font-medium",
          currentPage === 1
            ? "text-[var(--color-sb-grey-dark)]  cursor-not-allowed"
            : "text-white hover:text-[var(--color-sb-yellow)] cursor-pointer"
        )}
      >
        <ChevronLeft size={16} />
        Sebelumnya
      </button>

      {/* Tombol Angka */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={clsx(
            "px-3 py-1 rounded-md border text-base font-medium",
            currentPage === i + 1
              ? "bg-[var(--color-sb-yellow)] text-black border-transparent"
              : "border-[var(--color-sb-grey-dark)] text-[var(--color-sb-grey-dark)] hover:bg-gray-800"
          )}
        >
          {i + 1}
        </button>
      ))}

      {/* Tombol Selanjutnya */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={clsx(
          "flex items-center gap-1 px-3 py-1 rounded-md text-base font-medium",
          currentPage === totalPages
            ? "text-[var(--color-sb-grey-dark)] cursor-not-allowed"
            : "text-white hover:text-[var(--color-sb-yellow)] cursor-pointer"
        )}
      >
        Selanjutnya
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default SectionPagination;
