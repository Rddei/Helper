import React from "react";
import { CircleArrowUp, X } from "lucide-react";

const SectionSearch = ({ searchTerm, setSearchTerm, setCurrentPage }) => {
  const handleClear = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="mb-6 relative">
      <input
        type="text"
        placeholder="Cari solusi..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="w-[350px] md:w-[400px] px-4 py-2 rounded-md bg-[#1a1a1a] border border-[var(--color-sb-grey-dark)] text-white placeholder-gray-[var(--color-sb-grey-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sb-yellow)]"
      />

      {/* Icon kanan input */}
      {searchTerm ? (
        <X
          className="absolute top-2 right-2 w-6 h-6 text-red-500 cursor-pointer"
          onClick={handleClear}
        />
      ) : (
        <CircleArrowUp
          className="absolute top-2 right-2 w-6 h-6 text-[var(--color-sb-yellow)]"
        />
      )}
    </div>
  );
};

export default SectionSearch;
