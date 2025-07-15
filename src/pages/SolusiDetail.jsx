import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dataSolusi } from "../data/DataSolusi";
import Breadcrumb from "../components/detailsolusi/Breadcrumb";
import SidebarMenu from "../components/detailsolusi/SidebarMenu";
import SectionOverview from "../components/detailsolusi/SectionOverview";
import SectionMedia from "../components/detailsolusi/SectionMedia";
import MediaModal from "../components/detailsolusi/MediaModal";
import SectionFitur from "../components/detailsolusi/SectionFitur";
import SectionManfaat from "../components/detailsolusi/SectionManfaat";
import SectionIndustri from "../components/detailsolusi/SectionIndustri";


const menuIndex = [
  { id: "overview", label: "Overview" },
  { id: "media", label: "Foto & Gambar" },
  { id: "fitur", label: "Fitur Utama" },
  { id: "manfaat", label: "Manfaat Utama" },
  { id: "industri", label: "Industri" },
];

const kategoriSolusi = [
  { id: "aplikasi", label: "Aplikasi" },
  { id: "data", label: "Data" },
  { id: "infrastruktur", label: "Infrastruktur" },
  { id: "solusi", label: "Solusi" },
];

export default function SolusiDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const solusi = dataSolusi.find((item) => item.slug === slug);

  const [activeSection, setActiveSection] = useState("overview");
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

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

    menuIndex.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      menuIndex.forEach(({ id }) => {
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
    <div>
      <Breadcrumb navigate={navigate} title={solusi.title} />

      <div className="grid grid-cols-1 md:grid-cols-12 bg-black pt-10 md:pt-28 pb-10">
        <SidebarMenu
          activeSection={activeSection}
          menuIndex={menuIndex}
          kategoriSolusi={kategoriSolusi}
          navigate={navigate}
        />

        <div className="col-span-9 text-white px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
          <div className="h-[500px] rounded-xl mb-10">
            <img
              src={solusi.image}
              alt=""
              className="h-full bg-contain rounded-xl w-full"
            />
          </div>

          <SectionOverview
            title={solusi.title}
            description={solusi.description}
          />

          <SectionMedia
            media={solusi.media}
            title={solusi.title}
            openModal={(index) => {
              setActiveMediaIndex(index);
              setIsMediaOpen(true);
            }}
          />

          <MediaModal
            isOpen={isMediaOpen}
            onClose={() => setIsMediaOpen(false)}
            media={solusi.media}
            activeIndex={activeMediaIndex}
            setActiveIndex={setActiveMediaIndex}
          />

          <SectionFitur
            fiturList={solusi.fitur}
            title={solusi.title}
          />

          <SectionManfaat
            manfaatList={solusi.manfaat}
            title={solusi.title}
          />

          <SectionIndustri
            industriList={solusi.industri}
            title={solusi.title}
          />
        </div>
      </div>

    </div>
  );
}
