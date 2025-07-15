import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import SectionHeader from '../components/homepage/SectionHeader';
import SectionAboutSandbox from '../components/homepage/SectionAboutSandbox';
import SectionSolutionSandbox from '../components/homepage/SectionSolutionSandbox';
import SectionReadyToUse from '../components/homepage/SectionReadyToUse';
import SectionParallax from '../components/homepage/SectionParallax';
import SectionContactUs from '../components/homepage/SectionContactUs';
import SectionWhyChoose from '../components/homepage/SectionWhyChoose'
import SectionPortfolio from '../components/homepage/SectionPortfolio'

const Homepage = () => {
  const location = useLocation();
  const contactRef = useRef(null);

  // Logika scroll ke section #kontak-kami (sudah disederhanakan)
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (location.hash === '#kontak-kami' && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);

    return () => clearTimeout(scrollTimeout);
  }, [location]);

  return (
    <div className='bg-black'>
      <SectionHeader />
      <SectionAboutSandbox />
      <SectionSolutionSandbox />
      <SectionReadyToUse />
      <SectionParallax topSection={<SectionWhyChoose />} bottomSection={<SectionPortfolio />} /> {/* Komponen ini sekarang mandiri */}
      <div id="kontak-kami" ref={contactRef}>
        <SectionContactUs />
      </div>
    </div>
  );
};

export default Homepage;