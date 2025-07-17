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
import ImgEmptyState1 from "../assets/image/empty-state-1.svg"
import Button from "../components/Button";

import NoImage from "../assets/image/Solusi/Aplikasi/AI Manajement Kontrak/Img-1.webp"



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
      <div className="min-h-screen flex flex-col bg-[#141414] items-center justify-center text-white">
          <div className="flex flex-col items-center">
            <img src={ImgEmptyState1} alt="Sandbox" loading="lazy" className="w-[300px]" />
            <div className="text-center mt-7">
              <p className="text-2xl font-alexandria font-bold">Solusi tidak di temukan</p>
              <p className="text-[var(--color-sb-grey)] text-lg">Kami tidak dapat menemukan solusi apa pun. Coba lagi nanti</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/solusi-produk")}
            className="mt-10"
          >
            Kembali ke daftar solusi
          </Button>
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
          <div className="relative h-[500px] rounded-xl mb-10 overflow-hidden">
            <img
              src={solusi.image}
              alt="Sandbox"
              loading="lazy"
              className="h-full w-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent to-black opacity-100"></div>
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
