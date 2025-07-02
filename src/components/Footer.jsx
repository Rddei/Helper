import { Mail, Phone } from "lucide-react";
import logo from "../assets/logo-sandbox.svg";

function Footer() {
  return (
    <footer className="bg-black w-full py-16 md:py-32 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-0">
        {/* Logo dan Copyright */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <img src={logo} alt="sandbox" className="w-[110px] h-auto" />
          <p className="text-[var(--color-sb-grey)] text-xs mt-2 lg:mt-6 leading-relaxed">
            Copyright © 2024 PT Wira Global Solusi Tbk. All rights reserved
          </p>
        </div>

        {/* Navigasi */}
        <div className="lg:col-span-3">
          <ul className="flex flex-col gap-3 md:gap-4">
            <li className="text-white text-sm font-semibold">Solusi Produk</li>
            <li className="text-white text-sm font-semibold">Tentang Sandbox</li>
            <li className="text-white text-sm font-semibold">Bantuan</li>
          </ul>
        </div>

        {/* Alamat dan Kontak */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-white text-sm leading-relaxed">
            Lippo Tower Holland Village Jakarta, Jl. Letjen Suprapto No.Kav.60 No.1, Lt. 29, RT.10/RW.7, Cemp. Putih Tim., Kec. Cemp. Putih, Jakarta, Daerah Khusus Ibukota Jakarta 10510
          </p>

          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <Phone className="text-[var(--color-sb-yellow)]" size={16} />
              <p className="text-white text-sm">+62 21 80633731</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-[var(--color-sb-yellow)]" size={16} />
              <p className="text-white text-sm">sandbox@wgshub.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
