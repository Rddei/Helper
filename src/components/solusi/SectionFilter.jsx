import React from "react";
import clsx from "clsx";

const SectionFilter = ({ categories, filter, handleFilterChange }) => {
  return (
    <div className="flex md:flex-wrap items-center gap-4 md:gap-2 mb-6 overflow-x-auto scrollbar-hide w-full md:w-auto px-2 md:justify-center">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => handleFilterChange(item)}
          className={clsx(
            "px-4 py-2 rounded-md border font-medium text-sm capitalize ",
            filter === item
              ? "bg-[var(--color-sb-yellow)] text-black border-transparent cursor-pointer font-inter-tight"
              : "bg-transparent border-transparent text-[var(--color-sb-grey)] hover:bg-[var(--color-sb-yellow)] hover:text-black cursor-pointer font-inter-tight"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default SectionFilter;
