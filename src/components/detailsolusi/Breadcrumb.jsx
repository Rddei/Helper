import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ navigate, title }) {
  return (
    <div className="text-sm text-[var(--color-sb-grey)] pt-32 bg-black px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
      <button
        onClick={() => navigate("/")}
        className="hover:text-[var(--color-sb-yellow)] cursor-pointer text-white"
      >
        Homepage
      </button>
      {" "}
      <ChevronRight size={16} className="inline-block mx-2" />
      <button
        onClick={() => navigate("/solusi-produk")}
        className="hover:text-[var(--color-sb-yellow)] cursor-pointer text-white"
      >
        Solusi Produk
      </button>
      {" "}
      <ChevronRight size={16} className="inline-block mx-3" />
      <span className="text-[var(--color-sb-yellow)]">{title}</span>
    </div>
  );
}
