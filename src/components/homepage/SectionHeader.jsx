import { motion as Motion } from "framer-motion";
import Button from "../Button";

const SectionHeader = () => {
  return (
    <div className="pt-[100px] md:pt-[150px] h-auto px-[var(--padding-mobile)] md:px-[7%] bg-black pb-10">
      {/* Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="font-alexandria text-[70px] md:text-[84px] leading-[100%] tracking-tight font-bold text-white text-center md:text-left">
          Software Company <br />
          Indonesia
        </p>
      </Motion.div>

      {/* Deskripsi + Button */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="w-full md:w-[35%] flex flex-col items-center md:items-start justify-center mt-4 md:mt-[-4.5%] ml-0 md:ml-[50%]"
      >
        <p className="font-inter-tight font-light text-xl md:text-3xl text-white tracking-wide text-center md:text-left">
          Solusi Teknologi Integratif untuk Semua Kebutuhan Perusahaan Anda
        </p>
        <Button variant="filled" shape="default" className="mt-4">
          Mulai Sekarang
        </Button>
      </Motion.div>
    </div>
  );
};

export default SectionHeader;
