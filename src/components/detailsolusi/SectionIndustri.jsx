import IcIndustri from "../../assets/icon/ic-square-arrow.svg";

export default function SectionIndustri({ industriList, title }) {
  return (
    <div id="industri" className="mb-16 scroll-mt-28">
      <div className="mb-6">
        <p className="text-4xl mb-1 font-bold font-alexandria">
          <span className="text-[var(--color-sb-yellow)]">Industri yang cocok</span> menggunakan produk ini
        </p>
        <p className="text-base font-inter-tight">{title}</p>
      </div>
      <ul className="">
        {industriList.map((item, idx) => (
          <li key={idx} className="flex items-center gap-4 mb-4 py-2">
            <img src={IcIndustri} alt="Sandbox" loading="lazy" className="w-[40px]" />
            <div className="flex flex-col">
              <span className="text-white">{item.title}</span>
              <span className="text-[var(--color-sb-grey-dark)]">{item.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
