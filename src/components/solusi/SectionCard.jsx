import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SectionCard = ({ solusi }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#141414] h-[550px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
    >
      <div className="relative w-full h-[50%]">
        <img
          src={solusi.image}
          alt={solusi.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414]" />
      </div>
      <div className="p-8 h-[50%]">
        <div className="flex flex-col items-start justify-center gap-2">
          <h3 className="font-bold text-xl md:text-[24px] h-[70px] mb-1 line-clamp-2">
            {solusi.title}
          </h3>
          <p className="text-base text-[var(--color-sb-grey-dark)] h-[72px] mb-3 line-clamp-3">
            {solusi.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-[var(--color-sb-grey)] capitalize">{solusi.label}</p>
          <button
            onClick={() => navigate(`/solusi-produk/${solusi.slug}`)}
            className="text-[var(--color-sb-yellow)] hover:text-[var(--color-sb-yellow-dark)] text-sm font-medium cursor-pointer flex items-center gap-2"
          >
            Pelajari Lebih Lanjut <ArrowRight size={18} /> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
