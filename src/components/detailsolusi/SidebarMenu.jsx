import { CircleCheck } from "lucide-react";
import Button from "../Button";

export default function SidebarMenu({
  activeSection,
  menuIndex,
  kategoriSolusi,
  navigate,
}) {
  return (
    <div className="sticky bg-black md:pt-0 pt-10 pb-5 top-[75px] md:top-28 h-fit col-span-3 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
      <p className="text-white font-alexandria text-lg mb-4">Index Dalam Solusi Ini</p>
      <div className="border-none md:border-l-[1px] border-white py-5">
        <ul className="flex flex-row overflow-x-auto md:flex-col gap-4">
          {menuIndex.map(({ id, label }) => (
            <li
              key={id}
              className={`py-2 px-4 rounded-md md:rounded-l-none rounded-l-md cursor-pointer whitespace-nowrap transition-all ${
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

      <div className="py-10 md:block hidden">
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

      
      <div className="bg-white px-5 py-10 rounded-xl md:block hidden">
        <div className="w-full">
          <p className="text-lg text-center text-black font-bold font-alexandria">
            Gunakan Sekarang Solusi Sandbox
          </p>
          <div className="my-4">
            {[
              "Integratif untuk Semua Kebutuhan Perusahaan Anda",
              "Meningkatkan Produktivitas Bisnis Anda",
              "Aplikasi siap pakai, Instalasi mudah, Kustomisasi"
            ].map((text, idx) => (
              <div key={idx} className="flex flex-row gap-2 my-2">
                <CircleCheck
                  className="text-[var(--color-sb-yellow)] w-6 h-6 flex-shrink-0"
                />
                <p className="text-sm text-black">{text}</p>
              </div>
            ))}
          </div>
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
    </div>
  );
}
