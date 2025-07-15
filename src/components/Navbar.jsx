import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import Logo from "../assets/logo-sandbox.svg";
import Button from "./Button";
import clsx from "clsx";

import IconAplikasi from "../assets/icon/ic-megamenu-aplikasi.svg";
import IconSolusi from "../assets/icon/ic-megamenu-solusi.svg";
import IconInfrastruktur from "../assets/icon/ic-megamenu-infrastruktur.svg";
import IconData from "../assets/icon/ic-megamenu-data.svg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [leaveTimeout, setLeaveTimeout] = useState(null);
  const [megaOpen, setMegaOpen] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // Tambah state untuk section aktif

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      // Highlight menu Kontak Kami jika section kontak-kami sedang di viewport
      const kontak = document.getElementById('kontak-kami');
      if (kontak) {
        const rect = kontak.getBoundingClientRect();
        const offset = 120; // offset untuk sticky navbar
        if (rect.top - offset <= 0 && rect.bottom - offset > 0) {
          setActiveSection('kontak-kami');
        } else {
          setActiveSection(null);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label) => {
    clearTimeout(leaveTimeout);
    setHoveredItem(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setHoveredItem(null), 200);
    setLeaveTimeout(timeout);
  };

  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "Solusi Produk",
      href: "/solusi-produk",
      megaMenu: true,
      items: [
        {
          label: "Aplikasi",
          description:
            "Aplikasi kami dirancang untuk meningkatkan efisiensi dan produktivitas dalam setiap aspek operasional Anda.",
          href: "/solusi-produk?filter=aplikasi",
          icon: IconAplikasi,
        },
        {
          label: "Solusi",
          description:
            "Sandbox memiliki beragam solusi inovatif untuk meningkatkan value bisnis Anda.",
          href: "/solusi-produk?filter=solusi",
          icon: IconSolusi,
        },
        {
          label: "Infrastruktur",
          description:
            "Infrastruktur yang dirancang berfokus pada scalabilities dan reliabilities untuk memberikan fondasi yang solid bagi bisnis Anda.",
          href: "/solusi-produk?filter=infrastruktur",
          icon: IconInfrastruktur,
        },
        {
          label: "Data",
          description:
            "Data menjadi inti dari setiap keputusan bisnis. Optimalisasi data bisnis untuk membuat keputusan yang lebih tepat.",
          href: "/solusi-produk?filter=data",
          icon: IconData,
        },
      ],
    },
    { label: "Tentang Sandbox", href: "/tentang-sandbox" },
    { label: "Bantuan", href: "/bantuan" },
    { label: "Kontak Kami", href: "/#kontak-kami", section: "kontak-kami" },
  ];

  return (
    <nav
      className={clsx(
        "fixed w-full z-50 transition duration-300 backdrop-blur-xl",
        scrolled ? "bg-black/60" : "bg-black"
      )}
    >
      <div className="mx-auto px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] py-4 flex items-center justify-between">
        <img src={Logo} className="w-20" alt="Logo Sandbox" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 relative">
          <ul className="flex gap-10 text-white font-inter-tight text-md relative z-50">
            {menuItems.map((item) => {
              let isActive = false;
              // Jika sedang di section kontak, hanya Kontak Kami yang menyala
              if (activeSection === 'kontak-kami') {
                isActive = item.section === 'kontak-kami';
              } else {
                isActive = location.pathname === item.href && !item.section;
              }

              if (item.megaMenu) {
                return (
                  <li
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={clsx(
                        "transition-all duration-300 pb-[10px] relative",
                        isActive
                          ? "text-[var(--color-sb-yellow)]"
                          : "text-white hover:text-[var(--color-sb-yellow)]"
                      )}
                    >
                      {item.label}
                      <span
                        className={clsx(
                          "block h-[2px] bg-[var(--color-sb-yellow)] absolute bottom-0 left-0 origin-left transition-transform duration-300",
                          isActive
                            ? "w-full scale-x-100"
                            : "w-full scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </button>

                    {hoveredItem === item.label && (
                      <div
                        className="absolute left-0 top-full mt-5 bg-white text-black rounded-xl shadow-lg grid grid-cols-2 gap-2 min-w-[700px] z-40"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.items.map((subItem) => (
                          <div className="p-4">
                            <button
                              key={subItem.label}
                                onClick={() => {
                                  setHoveredItem(null);
                                  navigate(subItem.href);
                                }}
                              className="flex items-start gap-4 hover:bg-[#FAFAFA] cursor-pointer rounded-lg p-3 transition text-left w-full"
                            >
                              <img src={subItem.icon} alt="" className="w-6 h-6 mt-1 object-contain" />
                              <div>
                                <div className="font-semibold">{subItem.label}</div>
                                <p className="text-[12px] text-[var(--color-sb-grey)]">{subItem.description}</p>
                              </div>
                            </button>
                          </div>
                        ))}
                        <div className="bg-[#FFE8AE] col-span-2 px-6 py-4 rounded-b-xl flex flex-row items-center justify-between">
                          <div>
                            <p className="font-alexandria text-sm font-bold">SOLUSI SANDBOX</p>
                            <p className="font-inter-tight text-[12px]">Eksplorasi Produk Sandbox untuk Meningkatkan Produktivitas Bisnis Anda</p>
                          </div>
                          <div>
                            <Button variant="filled" shape="default" className="w-fit">
                              Semua
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.label} className="group relative">
                  <a
                    href={item.href}
                    className={clsx(
                      "transition-all duration-300 pb-[10px] relative",
                      isActive
                        ? "text-[var(--color-sb-yellow)]"
                        : "text-white hover:text-[var(--color-sb-yellow)]"
                    )}
                  >
                    {item.label}
                    <span
                      className={clsx(
                        "block h-[2px] bg-[var(--color-sb-yellow)] absolute bottom-0 left-0 origin-left transition-transform duration-300",
                        isActive
                          ? "w-full scale-x-100"
                          : "w-full scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-white hover:text-[var(--color-sb-yellow)] transition">
            <Globe size={24} />
          </button>
          <Button variant="outline" shape="rounded">
            Kontak Kami
          </Button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Mega Menu Drawer */}
      {megaOpen && (
        <div className="fixed inset-0 bg-black text-white z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">{megaOpen}</h2>
            <button onClick={() => setMegaOpen(null)} aria-label="Close menu">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {menuItems
              .find((item) => item.label === megaOpen)
              ?.items.map((subItem) => (
                <button
                  key={subItem.label}
                  onClick={() => {
                    setMegaOpen(null);
                    setIsOpen(false);
                    navigate(subItem.href);
                  }}
                  className="flex gap-4 items-start bg-white/10 rounded-lg p-4 text-left"
                >
                  <img src={subItem.icon} alt="" className="w-6 h-6 object-contain" />
                  <div>
                    <div className="font-semibold">{subItem.label}</div>
                    <p className="text-sm text-gray-300">{subItem.description}</p>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-[var(--padding-dekstop)] pb-4 pt-2 bg-black text-white">
          <ul className="flex flex-col space-y-3 font-medium">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <li key={item.label}>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.megaMenu) {
                          setMegaOpen(item.label);
                        } else {
                          setIsOpen(false);
                          navigate(item.href);
                        }
                      }}
                      className={clsx(
                        "block py-2 mt-2 border-b border-gray-700 transition-all w-full text-left",
                        isActive && "text-[var(--color-sb-yellow)]"
                      )}
                    >
                      {item.label}
                    </button>
                  </div>
                </li>
              );
            })}
            <li>
              <Button
                variant="outline"
                shape="rounded"
                className="w-full text-center mt-2"
              >
                Kontak Kami
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
