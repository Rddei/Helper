import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import Logo from "../assets/logo-sandbox.svg";
import Button from "./Button";
import clsx from "clsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // 👈 get current path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Solusi Produk", href: "/solusi-produk" },
    { label: "Tentang Sandbox", href: "/tentang-sandbox" },
    { label: "Bantuan", href: "/bantuan" },
  ];

  return (
    <nav
      className={clsx(
        "fixed w-full z-50 transition duration-300 backdrop-blur-xl",
        scrolled ? "bg-black/60" : "bg-black"
      )}
    >
      <div className="mx-auto px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] py-4 flex items-center justify-between">
        {/* Logo */}
        <img src={Logo} className="w-20" alt="Logo Sandbox" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-10 text-white font-inter-tight text-md">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-[var(--padding-dekstop)] pb-4 pt-2 bg-black text-white">
          <ul className="flex flex-col space-y-3 font-medium">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "block py-2 mt-2 border-b border-gray-700 transition-all",
                      isActive && "text-[var(--color-sb-yellow)]"
                    )}
                  >
                    {item.label}
                  </a>
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
