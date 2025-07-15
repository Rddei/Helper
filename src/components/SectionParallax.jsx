import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionParallax = ({ topSection, bottomSection }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

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
        bottomRef.current,
        { yPercent: 100 },
        { yPercent: 0, ease: "none" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-auto overflow-hidden bg-black"
    >
      {/* Sticky top section */}
      <div className="sticky top-0 h-screen z-10">{topSection}</div>

      {/* Scroll-in bottom section */}
      <div
        ref={bottomRef}
        className="absolute top-0 left-0 w-full h-screen z-20"
      >
        {bottomSection}
      </div>
    </div>
  );
};

export default SectionParallax;
