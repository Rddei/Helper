export default function SectionManfaat({ manfaatList, title }) {
  return (
    <div id="manfaat" className="mb-24 scroll-mt-28 min-h-[700px]">
      <div className="mb-6">
        <p className="text-4xl mb-1 font-bold font-alexandria">
          <span className="text-[var(--color-sb-yellow)]">Manfaat</span> Utama
        </p>
        <p className="text-base font-inter-tight">{title}</p>
      </div>
      <div className="grid md:grid-cols-1 gap-6">
        {manfaatList.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center gap-4 py-2 w-full"
          >
            <img src={item.icons} alt="Sandbox" loading="lazy" className="w-[40px]" />
            <div>
              <h3 className="font-bold mb-1 text-white text-xl">{item.title}</h3>
              <p className="text-sm text-[var(--color-sb-grey-dark)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
