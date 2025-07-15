import React, { useEffect, useRef } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionAddress = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const cards = self.selector('.address-card');
      const map = self.selector('.address-map');

      gsap.from(cards, {
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
          invalidateOnRefresh: true,
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.from(map, {
        scrollTrigger: {
          trigger: map,
          start: 'top 80%',
          invalidateOnRefresh: true,
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="px-[var(--padding-mobile)] md:px-[var(--padding-dekstop)] bg-black flex flex-col gap-10"
    >
      {/* Title */}
      <p className="font-alexandria text-center md:text-left text-4xl md:text-6xl font-bold text-white">
        Temukan <span className="text-[var(--color-sb-yellow)]"><br />Kami Di Sini</span>
      </p>

      {/* Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="address-card h-[110px] w-full bg-[#141414] rounded-md py-5 px-7 flex flex-row items-center">
          <Phone size={30} className="text-[var(--color-sb-yellow)] mr-3" />
          <div className="flex flex-col gap-1">
            <p className="text-white text-lg font-alexandria font-bold">Telephone</p>
            <p className="text-white text-sm font-inter-tight">+62 21 80633731</p>
          </div>
        </div>
        <div className="address-card h-[110px] w-full bg-[#141414] rounded-md py-5 px-7 flex flex-row items-center">
          <Mail size={30} className="text-[var(--color-sb-yellow)] mr-3" />
          <div className="flex flex-col gap-1">
            <p className="text-white text-lg font-alexandria font-bold">Email</p>
            <p className="text-white text-sm font-inter-tight">sandbox@wgshub.com</p>
          </div>
        </div>
        <div className="address-card h-[110px] w-full bg-[#141414] rounded-md py-5 px-7 flex flex-row items-center">
          <MapPin size={30} className="text-[var(--color-sb-yellow)] mr-3" />
          <div className="flex flex-col gap-1">
            <p className="text-white text-lg font-alexandria font-bold">Lokasi</p>
            <p className="text-white text-sm font-inter-tight">
              Lippo Tower Holland Village Jakarta, <br />
              Jl. Letjen Suprapto No.Kav.60 No.1, Lt. 29
            </p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="address-map w-full h-[500px] rounded-xl overflow-hidden">
        <iframe
          title="Lokasi Sandbox"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.9183271873992!2d106.867947!3d-6.180435999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f52c5b2e6457%3A0xe57e11398a56c71f!2sLippo%20Tower%20Holland%20Village%2C%20Jl.%20Letjen%20Suprapto%20No.Kav.60%20No.1%2C%20Jakarta%2010510!5e0!3m2!1sid!2sid!4v1720855881293!5m2!1sid!2sid"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default SectionAddress;
