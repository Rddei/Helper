import { useEffect, useRef } from "react";
import SectionWhyChoose from "./SectionWhyChoose";
import SectionPortfolio from "./SectionPortfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionParallax = () => {
  const containerRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      tl.fromTo(
        portfolioRef.current,
        { yPercent: 100 },
        { yPercent: 0, ease: "none" }
      );
    }, containerRef);

    return () => ctx.revert(); // clean up
  }, []);

  return (
    <div ref={containerRef} className="relative h-auto pb-10 overflow-hidden bg-black">
      {/* SectionWhyChoose tetap terlihat & menempel */}
        <div className="sticky top-0 h-screen z-10">
            <SectionWhyChoose />
        </div>

      {/* SectionPortfolio bergerak naik seiring scroll */}
      <div
        ref={portfolioRef}
        className="absolute top-0 left-0 w-full h-screen z-20"
      >
        <SectionPortfolio />
      </div>
    </div>
  );
};

export default SectionParallax;
