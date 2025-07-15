import React, { useState } from "react";
import { ChevronDown, CircleArrowUp, Search, X } from "lucide-react";
import ImgEmptyState1 from "../../assets/image/empty-state-2.svg"
import Button from "../Button";


const tabs = [
  "Informasi Umum Sandbox",
  "Produk dan Layanan",
  "Panduan Pengguna",
  "Pemecahan Masalah",
];

const faqData = {
  "Informasi Umum Sandbox": [
    {
      question: "Apa itu Sandbox?",
      answer:
        "Sandbox adalah perusahaan penyedia produk software dan hardware yang dirancang untuk memenuhi berbagai kebutuhan teknologi bisnis Anda.",
    },
    {
      question: "Bagaimana cara menghubungi dukungan pelanggan?",
      answer:
        "Anda bisa menghubungi tim dukungan kami melalui email di support@sandbox.com, telepon di +62 123 4567 890, atau menggunakan live chat di situs kami.",
    },
    {
      question: "Apakah Sandbox menyediakan pelatihan atau onboarding untuk pengguna baru?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    },
    {
      question: "Apakah Sandbox menyediakan versi demo atau trial produk?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    },
    {
      question: "Di negara apa saja Sandbox tersedia?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    },
  ],
  "Produk dan Layanan": [
    {
      question: "Apa saja produk software yang ditawarkan oleh Sandbox?",
      answer:
        "Kami menawarkan berbagai produk software, termasuk Sistem Manajemen Perusahaan (ERP & CRM), Keamanan Siber (Antivirus, Firewall), dan alat Kolaborasi dan Produktivitas (Manajemen Proyek, Platform Kolaborasi).",
    },
    {
      question: "Apa saja produk hardware yang tersedia di Sandbox?",
      answer:
        "Produk hardware kami meliputi Perangkat Jaringan (Router, Switch, Access Point), Keamanan Fisik (Sistem CCTV, Akses Kontrol), dan Perangkat Komputasi (Server, Workstation).",
    },
    {
      question: "Bagaimana proses pembelian dan integrasi produk Sandbox?",
      answer:
        "Setelah pemilihan produk, tim kami akan bantu cek kebutuhan teknis, lalu menyiapkan kontrak dan proses pembayaran. Setelah itu, tim integrasi akan menangani instalasi dan setup sesuai jadwal.",
    },
    {
      question: "Apakah Sandbox menyediakan dukungan purna jual (after-sales)?",
      answer:
        "Ya, dukungan purna jual tersedia melalui maintenance, update perangkat lunak, serta layanan respons 24/7 untuk kasus kritis.",
    },
    {
      question: "Apakah produk Sandbox bisa dikustomisasi sesuai kebutuhan bisnis saya?",
      answer:
        "Semua produk kami bersifat flexible dan bisa disesuaikan. Untuk kebutuhan kustom lanjut, tim R&D kami siap berdiskusi dan memberikan solusi.",
    },
  ],
  "Panduan Pengguna": [
    {
      question: "Bagaimana cara menginstal software dari Sandbox?",
      answer:
        "Setiap produk software dilengkapi dengan panduan instalasi yang dapat diakses di dokumentasi produk. Jika Anda memerlukan bantuan lebih lanjut, tim dukungan kami siap membantu.",
    },
    {
      question: "Apakah ada tutorial untuk menggunakan produk Sandbox?",
      answer:
        "Ya, kami menyediakan tutorial dan video panduan di halaman dukungan kami yang bisa diakses oleh semua pengguna.",
    },
    {
      question: "Apakah dokumentasi tersedia dalam bahasa Indonesia dan Inggris?",
      answer:
        "Ya. Semua panduan instalasi, penggunaan, dan troubleshooting tersedia dalam bahasa Indonesia dan Inggris. Anda bisa mengubah preferensi bahasa di halaman dokumentasi.",
    },
    {
      question: "Bagaimana cara memperbarui (update) software Sandbox?",
      answer:
        " Notifikasi pembaruan akan muncul saat login. Anda bisa mengikuti panduan update manual atau menggunakan fitur update otomatis melalui dashboard.",
    },
    {
      question: "Bisakah saya mengakses panduan penggunaan secara offline?",
      answer:
        "Ya. Anda bisa download PDF panduan dari halaman dokumentasi kami atau minta file offline melalui email support@sandbox.com.",
    },
  ],
  "Pemecahan Masalah": [
    {
      question: "Apa yang harus dilakukan jika mengalami masalah saat menggunakan produk Sandbox?",
      answer:
        "Silakan merujuk ke panduan pemecahan masalah di dokumentasi produk kami. Jika masalah Anda tidak teratasi, hubungi dukungan pelanggan kami untuk bantuan lebih lanjut.",
    },
    {
      question: "Bagaimana cara melaporkan bug atau masalah teknis?",
      answer:
        "Anda dapat melaporkan bug atau masalah teknis melalui email ke support@sandbox.com dengan menyertakan deskripsi masalah dan informasi terkait.",
    },
    {
      question: "Apa yang harus dilakukan jika lupa login atau password?",
      answer:
        "Gunakan fitur Lupa Password di halaman login. Jika tetap terkendala, hubungi tim dukungan dengan menyertakan detail akun Anda.",
    },
    {
      question: "Bagaimana jika software berjalan lambat atau lemot?",
      answer:
        "Coba restart aplikasi dan periksa koneksi internet Anda. Jika masih lambat, hubungi kami dengan menyertakan laporan performa (screenshot/log) supaya tim teknis bisa bantu menganalisa.",
    },
    {
      question: "Apa yang harus dilakukan jika hardware bermasalah atau tidak responsif?",
      answer:
        "Pastikan perangkat terhubung dengan benar dan menyala. Coba restart. Jika masalah tetap ada, hubungi tim hardware support kami dan jelaskan kode kesalahan atau kondisi perangkat.",
    },
  ],
};

const SectionFaq = () => {
  const [activeTab, setActiveTab] = useState("Informasi Umum Sandbox");
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqData[activeTab]?.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 md:px-20 py-16">
      {/* Heading */}
      <h1 className="text-center text-3xl md:text-5xl font-bold mb-8">
        Apa yang bisa kami bantu?
      </h1>

      <div className="w-full md:w-[60%] flex flex-col items-center justify-center">
        {/* Search Bar */}
        <div className="w-full relative mb-10">
          <input
            type="text"
            placeholder="Tanyakan sesuatu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-10 rounded-lg bg-[#1a1a1a] text-white placeholder-[var(--color-sb-grey-dark)] border border-gray-600 focus:outline-none"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-sb-grey-dark)]" size={20} />
          {searchTerm ? (
            <X
              className="absolute top-3 right-3 w-6 h-6 text-red-500 cursor-pointer"
              onClick={() => setSearchTerm("")}
            />
          ) : (
            <CircleArrowUp
              className="absolute top-3 right-3 w-6 h-6 text-[var(--color-sb-yellow)]"
            />
          )}
        </div>

        {/* Tabs */}
        <div className="flex w-full flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenIndex(0); // reset accordion
              }}
              className={`px-4 py-1 rounded-[5px] text-sm ${
                activeTab === tab
                  ? "bg-[var(--color-sb-yellow)] font-bold text-black cursor-pointer"
                  : "bg-[#6C6C6C] hover:bg-[var(--color-sb-yellow)] text-black cursor-pointer"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="w-full">
          {filteredFAQs?.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <div key={index} className="border-b border-gray-700 py-4">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left cursor-pointer"
                >
                  <span className="text-lg font-medium">{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-[var(--color-sb-grey-dark)] text-md">{item.answer}</p>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col gap-10 items-center justify-center py-[50px]">
              <div className="flex flex-col items-center">
                <img src={ImgEmptyState1} alt="Sandbox" className="w-[300px]" loading="lazy" />
                <div className="text-center mt-7">
                  <p className="text-2xl font-alexandria font-bold">Pertanyaan anda tidak di temukan</p>
                  <p className="text-[var(--color-sb-grey)] text-lg">Kami tidak dapat menemukan solusi apa pun. <br />Coba lagi nanti. Silahkan hubungi admin sandbox.</p>
                </div>
              </div>
              <div>
                <Button variant="filled" shape="default" className="w-fit">Hubungin Admin</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionFaq;
