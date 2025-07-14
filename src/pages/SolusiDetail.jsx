import { useParams, useNavigate } from "react-router-dom";
import { dataSolusi } from "../data/DataSolusi";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, CircleCheck, CircleX } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Button from "../components/Button";

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


const SolusiDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const solusi = dataSolusi.find((item) => item.slug === slug);
  const [activeSection, setActiveSection] = useState("overview");
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const swiperRef = useRef(null);
  const swiperRefModal = useRef(null);
  const fiturPrevRef = useRef(null);
  const fiturNextRef = useRef(null);




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
      if (el) {
        observer.observe(el);
      }
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

  const openMediaModal = (index) => {
    setActiveMediaIndex(index);
    setIsMediaOpen(true);
  };

  const closeMediaModal = () => {
    setIsMediaOpen(false);
  };


  return (
    <div>
       {/* Breadcrumb */}
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
        <span className="text-[var(--color-sb-yellow)]">{solusi.title}</span>
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 bg-black pt-28">
        {/* Left Side */}
        <div className="px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] sticky top-28 h-fit col-span-3 ">
          <p className="text-white font-alexandria text-lg mb-4">Index Dalam Solusi Ini</p>
          {/* Menu Index */}
          <div className=" border-l-[1px] border-white py-5">
            <ul className="flex flex-col gap-4">
              {menuIndex.map(({ id, label }) => (
                <li
                  key={id}
                  className={`py-2 px-4 rounded-md rounded-l-none cursor-pointer transition-all ${
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
          {/* Kategori Solusi */}
          <div className="py-5 mt-20">
            <p className="text-white font-alexandria text-lg mb-4">Kategori Solusi Sandbox</p>
            <div className="py-5">
              <ul className="flex flex-col gap-5">
                {kategoriSolusi.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => navigate(`/solusi-produk?filter=${item.id}`)}
                    className="p-2 border-b-[1px] border-[#141414] cursor-pointer hover:rounded-md transition-all text-[var(--color-sb-grey-dark)] hover:bg-[var(--color-sb-yellow)] hover:text-black"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Hubungi Kami */}
          <div className="bg-white px-[10px] py-[20px] rounded-md">
            <p className="text-lg text-center text-black font-bold font-alexandria">
              Gunakan Sekarang Solusi Sandbox
            </p>

            {[
              "Integratif untuk Semua Kebutuhan Perusahaan Anda",
              "Meningkatkan Produktivitas Bisnis Anda",
              "Aplikasi siap pakai, Instalasi mudah, Kustomisasi"
            ].map((text, idx) => (
              <div
                key={idx}
                className="my-4 flex flex-row gap-2"
              >
                <CircleCheck
                  className="text-[var(--color-sb-yellow)] w-6 h-6 flex-shrink-0"
                />
                <p className="text-[12px] text-black">{text}</p>
              </div>
            ))}
            <div className="flex justify-center mt-5">
              <Button
                variant="filled"
                shape="default"
                onClick={() => navigate("/solusi-produk")}
              >
                Mulai Sekarang
              </Button>
            </div>
          </div>

        </div>

        {/* Right Side */}
        <div className="col-span-9 text-white px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
          {/* Image */}
          <div className="h-[500px] rounded-xl mb-10">
            <img src={solusi.image} alt="" className="h-full bg-contain rounded-xl w-full" />
          </div>

          {/* Title & Decription */}
          <div id="overview" className="mb-16 scroll-mt-28">
            <h1 className="text-3xl md:text-5xl font-bold font-alexandria text-white mb-6">
              {solusi.title}
            </h1>
            <p className="text-lg font-inter-tight text-justify whitespace-pre-line leading-7">
              {solusi.description}
            </p>
          </div>

          {/* Foto dan Video */}
          <div id="media" className="mb-24 scroll-mt-28">
            <div className="mb-5 flex flex-row items-center justify-between">
              <div>
                <p className="text-4xl mb-1 font-bold font-alexandria">
                  <span className="text-[var(--color-sb-yellow)]">Foto</span> dan Video
                </p>
                <p className="text-base font-inter-tight text-justify whitespace-pre-line leading-7">
                  {solusi.title}
                </p>
              </div>
              <div className="flex gap-4 mt-10 md:mt-6">
                <button className="swiper-prev cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
                  <ArrowLeft size={20} />
                </button>
                <button className="swiper-next cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full text-white border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Swiper Utama */}
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
              }}
              slidesPerView={1.15}
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="w-full overflow-visible"
            >
              {solusi.media.map((item, idx) => (
                <SwiperSlide
                  key={idx}
                  className="!w-full md:!w-[400px] h-[300px] transition-transform duration-300 ease-in-out"
                >
                  <div
                    className="w-full h-[300px] overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => openMediaModal(idx)}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={`media-${idx}`}
                        className="w-full h-[300px] object-cover rounded-xl"
                      />
                    ) : (
                      <iframe
                        src={item.url}
                        title={`video-${idx}`}
                        className="w-full h-[300px] rounded-xl"
                        allowFullScreen
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Modal Foto dan Video */}
            {isMediaOpen && (
              <div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex flex-col items-center justify-center px-4 md:px-20 py-10 overflow-y-auto">
                <div className="w-[70%] bg-white rounded-xl p-6 relative">
                  {/* Header */}
                  <div className="flex  items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <p className="text-2xl text-black font-bold font-alexandria">
                        <span className="text-[var(--color-sb-yellow)]">Foto</span> dan Video
                      </p>
                      <p className="text-base text-[var(--color-sb-grey)] font-inter-tight text-justify whitespace-pre-line leading-7">
                        {solusi.title}
                      </p>
                    </div>
                    <button onClick={closeMediaModal} className="text-black hover:text-red-500 cursor-pointer">
                      <CircleX size={24} />
                    </button>
                  </div>

                  {/* Swiper Modal */}
                  <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
                      <button className="modal-swiper-prev w-10 h-10 rounded-full border text-[var(--color-sb-grey-dark)] cursor-pointer border-black hover:bg-black hover:text-[var(--color-sb-yellow)] transition flex items-center justify-center">
                        <ChevronLeft size={20} />
                      </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
                      <button className="modal-swiper-next w-10 h-10 rounded-full border text-[var(--color-sb-grey-dark)] cursor-pointer border-black hover:bg-black hover:text-[var(--color-sb-yellow)] transition flex items-center justify-center">
                        <ChevronRight  size={20} />
                      </button>
                    </div>

                    {/* Swiper */}
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        prevEl: ".modal-swiper-prev",
                        nextEl: ".modal-swiper-next",
                      }}
                      initialSlide={activeMediaIndex}
                      slidesPerView={1}
                      onBeforeInit={(swiper) => {
                        swiperRefModal.current = swiper;
                      }}
                      onSlideChange={(swiper) => setActiveMediaIndex(swiper.activeIndex)}
                      className="rounded-lg mb-4"
                    >
                      {solusi.media.map((item, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="w-full h-[370px] flex items-center justify-center bg-black rounded-lg overflow-hidden">
                            {item.type === "image" ? (
                              <img
                                src={item.url}
                                alt={`media-full-${idx}`}
                                className="object-contain h-full w-full"
                              />
                            ) : (
                              <iframe
                                src={item.url}
                                title={`video-${idx}`}
                                className="w-full h-full rounded-lg"
                                allowFullScreen
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>


                  {/* Thumbnail Navigation */}
                  <div className="flex gap-4 justify-center flex-wrap">
                    {solusi.media.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setActiveMediaIndex(idx);
                          swiperRefModal.current?.slideTo(idx); // ⬅️ Trigger pindah slide
                        }}
                        className={`w-20 h-16 cursor-pointer border-2 ${
                          idx === activeMediaIndex
                            ? "border-[var(--color-sb-yellow)]"
                            : "border-transparent"
                        } rounded-lg overflow-hidden`}
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt={`thumb-${idx}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-black text-white flex items-center justify-center text-xs">
                            Video
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fitur Utama */}
          <div id="fitur" className="mb-24 scroll-mt-28 min-h-[300px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-4xl mb-1 font-bold font-alexandria">
                  <span className="text-[var(--color-sb-yellow)]">Fitur</span> Utama
                </p>
                <p className="text-base font-inter-tight text-justify whitespace-pre-line leading-7">
                  {solusi.title}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  ref={fiturPrevRef}
                  className="w-10 h-10 cursor-pointer rounded-full border text-white border-white hover:bg-white hover:text-black transition flex items-center justify-center"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  ref={fiturNextRef}
                  className="w-10 h-10 cursor-pointer rounded-full border text-white border-white hover:bg-white hover:text-black transition flex items-center justify-center"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={"auto"}
              navigation={{
                prevEl: fiturPrevRef.current,
                nextEl: fiturNextRef.current,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = fiturPrevRef.current;
                swiper.params.navigation.nextEl = fiturNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className=""
            >
              {solusi.fitur.map((fitur, idx) => (
                <SwiperSlide key={idx} className="!w-[300px]">
                  <div className="bg-[#141414] p-6 rounded-xl w-[300px] h-[350px]">
                    <div className='h-[128px] w-full flex items-center justify-center mb-5'>
                      <img src={fitur.icons} className='h-full w-auto' />
                    </div>
                    <p className="font-bold h-[60px] text-lg mb-2">{fitur.title}</p>
                    <div className='w-[30px] h-[3px] bg-[var(--color-sb-yellow)] rounded-full my-2'></div>
                    <p className="text-sm h-[70px] text-[var(--color-sb-grey-dark)] leading-relaxed">{fitur.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
    </div>
  );
};

export default SolusiDetail;
