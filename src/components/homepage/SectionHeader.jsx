import { motion as Motion } from "framer-motion";
import Button from "../Button";

const SectionHeader = () => {
  return (
    <div className="md:h-[400px] h-auto pt-[100px] md:pt-0 flex flex-col md:flex-row items-center justify-center gap-10 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] bg-black pb-10">
      {/* Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="font-alexandria text-[70px] md:text-[80px] leading-[100%] tracking-tight font-bold text-white text-center md:text-left">
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
        className="w-full md:w-[35%] h-full flex flex-col items-center md:items-start justify-end"
      >
        <p className="font-inter-tight font-light  text-xl md:text-2xl text-white tracking-wide text-center md:text-left">
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
