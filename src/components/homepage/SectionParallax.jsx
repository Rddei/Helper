
import { useLayoutEffect, useRef, useState } from "react";
import SectionWhyChoose from "./SectionWhyChoose";
import SectionPortfolio from "./SectionPortfolio";


const SectionParallax = () => {
  const containerRef = useRef(null);
  const portfolioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !portfolioRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
      const percent = totalScroll > 0 ? scrolled / totalScroll : 0;
      setProgress(percent);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-auto pb-10 overflow-hidden bg-black"
      style={{ minHeight: '200vh' }}
    >
      {/* SectionWhyChoose tetap terlihat & menempel */}
      <div className="sticky top-0 h-screen z-10">
        <SectionWhyChoose />
      </div>
      {/* SectionPortfolio bergerak naik seiring scroll */}
      <div
        ref={portfolioRef}
        className="absolute top-0 left-0 w-full h-screen z-20"
        style={{
          transform: `translateY(${(1 - progress) * 100}%)`,
          transition: 'transform 0.1s linear',
        }}
      >
        <SectionPortfolio />
      </div>
    </div>
  );
};

export default SectionParallax;
