import React from "react";
import clsx from "clsx";

const SectionFilter = ({ categories, filter, handleFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-2 mb-6">
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
