import { useParams, useNavigate } from "react-router-dom";
import { dataSolusi } from "../data/DataSolusi";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "media", label: "Foto & Gambar" },
  { id: "fitur", label: "Fitur Utama" },
  { id: "manfaat", label: "Manfaat Utama" },
  { id: "industri", label: "Industri" },
];

const SolusiDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const solusi = dataSolusi.find((item) => item.slug === slug);

  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  if (!solusi) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div>
          <p className="text-xl">Solusi tidak ditemukan</p>
          <button
            onClick={() => navigate("/solusi-produk")}
            className="mt-4 underline text-[var(--color-sb-yellow)]"
          >
            Kembali ke daftar solusi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 bg-black pt-28">
      <div className="col-span-3 sticky top-28 h-fit pr-4 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
        <ul className="flex flex-col gap-4">
          {SECTIONS.map(({ id, label }) => (
            <li
              key={id}
              className={`py-2 px-4 rounded-md cursor-pointer transition-all ${
                activeSection === id
                  ? "bg-[var(--color-sb-yellow)] text-black"
                  : "text-white hover:bg-[var(--color-sb-yellow)] hover:text-black"
              }`}
              onClick={() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-9 text-white px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
        <div className="border">
          <img src={solusi.image} alt="" className="" />
        </div>
        <div id="overview" className="mb-16 scroll-mt-28">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-sb-yellow)] mb-6">
            {solusi.title}
          </h1>
          <p className="text-lg font-inter-tight text-justify whitespace-pre-line leading-7">
            {solusi.description}
          </p>
        </div>

        <div id="media" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl font-semibold mb-4">Foto & Video</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solusi.media.map((item, idx) =>
              item.type === "image" ? (
                <img
                  key={idx}
                  src={item.url}
                  alt={`media-${idx}`}
                  className="rounded-xl"
                />
              ) : (
                <iframe
                  key={idx}
                  src={item.url}
                  title={`video-${idx}`}
                  className="w-full aspect-video rounded-xl"
                  allowFullScreen
                />
              )
            )}
          </div>
        </div>

        <div id="fitur" className="mb-24 scroll-mt-28 min-h-[700px] border">
          <h2 className="text-2xl font-semibold mb-4">Fitur Utama</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {solusi.fitur.map((fitur, idx) => (
              <div
                key={idx}
                className="bg-[#111] p-4 rounded-lg border border-gray-700"
              >
                <h3 className="font-bold mb-1">{fitur.title}</h3>
                <p className="text-sm text-gray-400">{fitur.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="manfaat" className="mb-24 scroll-mt-28 min-h-[700px] border">
          <h2 className="text-2xl font-semibold mb-4">Manfaat Utama</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {solusi.manfaat.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#111] p-4 rounded-lg border border-gray-700"
              >
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="industri" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl font-semibold mb-4">
            Industri yang cocok menggunakan produk ini
          </h2>
          <ul className="list-disc list-inside text-gray-400">
            {solusi.industri.map((industri, idx) => (
              <li key={idx}>{industri}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SolusiDetail;
