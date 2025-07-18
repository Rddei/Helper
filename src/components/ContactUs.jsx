import React from "react";
import Button from "./Button";

const ContactUs = ({ subtitle, title, description }) => {
  return (
    <div className="bg-[#0D0D0D] w-full h-auto py-20 md:py-32 px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)]">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full gap-10">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start justify-center gap-6 w-full md:w-[80%]">
          {subtitle && (
            <p className="font-inter-tight text-lg font-bold text-[var(--color-sb-yellow)]">
              {subtitle}
            </p>
          )}
          {title && (
            <p className="font-alexandria text-4xl md:text-6xl font-bold text-white">
              {title}
            </p>
          )}
          {description && (
            <p className="text-[var(--color-sb-grey)] text-base md:text-lg font-inter-tight">
              {description}
            </p>
          )}
        </div>

        {/* RIGHT FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama Perusahaan */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-1">
              Nama Perusahaan
            </label>
            <input
              type="text"
              placeholder="Masukkan nama perusahaan"
              className="bg-[#070707] px-4 text-[#5B5B5B] py-2 border border-[#707070] rounded-lg focus:outline-none focus:ring-0 placeholder:text-[#5B5B5B]"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="bg-[#070707] px-4 text-[#5B5B5B] py-2 border border-[#707070] rounded-lg focus:outline-none focus:ring-0 placeholder:text-[#5B5B5B]"
            />
          </div>

          {/* Pesan */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-white mb-1">
              Deskripsi Pesan
            </label>
            <textarea
              placeholder="Tulis pesan atau kebutuhan Anda di sini..."
              rows={4}
              className="bg-[#070707] px-4 py-2 border border-[#707070] rounded-lg resize-none focus:outline-none focus:ring-0 placeholder:text-[#5B5B5B] text-[#5B5B5B]"
            />
          </div>

          {/* Tombol */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <Button variant="filled" shape="default">
              Mulai Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
