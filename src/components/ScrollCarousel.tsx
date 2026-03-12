import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type ScrollCarouselImage = {
  src: string;
  alt: string;
};

type ScrollCarouselProps = {
  images: ScrollCarouselImage[];
  className?: string;
  cardClassName?: string;
};

function ScrollCarousel({ images, className = "", cardClassName = "" }: ScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxShift, setMaxShift] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = Math.max(images.length - 1, 0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);

  const hideScrollbarStyle: CSSProperties = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  useEffect(() => {
    const updateShift = () => {
      const mobileViewport = window.matchMedia("(max-width: 680px)").matches;
      setIsMobileLayout(mobileViewport);

      if (mobileViewport) {
        setMaxShift(0);
        return;
      }

      const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      setMaxShift(Math.max(0, trackWidth - viewportWidth));
    };

    updateShift();
    window.addEventListener("resize", updateShift);
    return () => window.removeEventListener("resize", updateShift);
  }, [images.length]);

  useEffect(() => {
    if (activeIndex <= maxIndex) return;
    setActiveIndex(maxIndex);
  }, [activeIndex, maxIndex]);

  useEffect(() => {
    if (!isMobileLayout) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateActiveIndex = () => {
      const viewportWidth = viewport.clientWidth || 1;
      const nextIndex = Math.round(viewport.scrollLeft / viewportWidth);
      const boundedIndex = Math.max(0, Math.min(maxIndex, nextIndex));
      setActiveIndex(boundedIndex);
    };

    updateActiveIndex();
    viewport.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      viewport.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [isMobileLayout, maxIndex]);

  const scrollToIndex = (index: number) => {
    if (!isMobileLayout) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const boundedIndex = Math.max(0, Math.min(maxIndex, index));
    viewport.scrollTo({
      left: boundedIndex * viewport.clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(boundedIndex);
  };

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full max-w-[1180px] py-3 ${className}`}
      aria-label="Medical image carousel"
    >
      {isMobileLayout && images.length > 1 && activeIndex > 0 ? (
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          className="absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#47a786] bg-[#47a786] text-black shadow-[0_6px_14px_rgba(7,29,39,0.22)] transition-transform hover:scale-105"
          aria-label="Previous image"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18 9 12l6-6" />
          </svg>
        </button>
      ) : null}

      {isMobileLayout && images.length > 1 && activeIndex < maxIndex ? (
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          className="absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#47a786] bg-[#47a786] text-black shadow-[0_6px_14px_rgba(7,29,39,0.22)] transition-transform hover:scale-105"
          aria-label="Next image"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      ) : null}

      <div
        ref={viewportRef}
        style={isMobileLayout ? hideScrollbarStyle : undefined}
        className={
          isMobileLayout
            ? "scroll-carousel-viewport w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
            : "w-full overflow-hidden"
        }
      >
        <motion.div
          ref={trackRef}
          style={isMobileLayout ? undefined : { x: trackX }}
          className={
            isMobileLayout
              ? "flex w-full"
              : "flex w-max items-center gap-4 px-2 will-change-transform"
          }
        >
          {images.map((image, index) => (
            <motion.article
              key={`${image.src}-${index}`}
              whileHover={isMobileLayout ? undefined : { scale: 1.03 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={`relative overflow-hidden rounded-2xl shadow-[0_14px_28px_rgba(11,53,42,0.22)] ${
                isMobileLayout
                  ? "snap-center snap-always shrink-0 h-48 w-full md:h-52"
                  : "h-48 w-64 shrink-0 md:h-52 md:w-72"
              } ${cardClassName}`}
              style={isMobileLayout ? { flex: "0 0 100%", width: "100%" } : undefined}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ScrollCarousel;
