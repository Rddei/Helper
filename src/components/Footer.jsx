import { Mail, Phone } from "lucide-react";
import logo from "../assets/logo-sandbox.svg";

function Footer() {
  return (
    <footer className="bg-black w-full  py-32 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <img src={logo} alt="sandbox" className="w-[130px] h-auto" />
          <p className="text-[var(--color-sb-grey)] text-xs mt-10">Copyright © 2024 PT Wira Global Solusi Tbk. All rights reserved</p>
        </div>
        <div className="col-span-3">
          <ul className="flex flex-col justify-between h-full">
            <li className="text-white text-sm">Solusi Produk</li>
            <li className="text-white text-sm">Tentang Sandbox</li>
            <li className="text-white text-sm">Bantuan</li>
          </ul>
        </div>

        <div className="col-span-5 flex flex-col justify-between h-full">
          <p className="text-white text-sm">Lippo Tower Holland Village Jakarta, Jl. Letjen Suprapto No.Kav.60 No.1, Lt. 29, RT.10/RW.7, Cemp. Putih Tim., Kec. Cemp. Putih, Jakarta, Daerah Khusus Ibukota Jakarta 10510</p>
          <div className="flex flex-row gap-9">
            <div className="flex items-center gap-2 mt-5">
              <Phone className="text-[var(--color-sb-yellow)]" size={14} />
              <p className="text-white text-sm">+62 21 80633731</p>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <Mail className="text-[var(--color-sb-yellow)]" size={14} />
              <p className="text-white text-sm">sandbox@wgshub.com</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
