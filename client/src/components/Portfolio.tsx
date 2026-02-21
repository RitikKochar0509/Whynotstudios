import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import weddingImg from "@assets/generated_images/wedding_videography_cinematic_shot.png";
import corporateImg from "@assets/generated_images/corporate_event_videography_professional.png";
import musicImg from "@assets/generated_images/music_video_production_neon.png";
import docImg from "@assets/generated_images/documentary_filmmaking_nature.png";
import commercialImg from "@assets/generated_images/commercial_product_studio_shot.png";

// Straight horizontal spread from center — with clear gap between cards
const SPREAD_X = [-520, 520, -260, 260, 0];

const categories = [
  {
    id: 1,
    title: "Wild Hearts",
    category: "[ WEDDING FILMS ]",
    image: weddingImg,
    duration: "2W",
    path: "/portfolio/weddings",
  },
  {
    id: 2,
    title: "Neon Pulse",
    category: "[ LIVE EVENTS ]",
    image: musicImg,
    duration: "3M",
    path: "/portfolio/live-events",
  },
  {
    id: 3,
    title: "Clear Vision",
    category: "[ CORPORATE & BRANDS]",
    image: corporateImg,
    duration: "2Y",
    path: "/portfolio/corporate",
  },
  {
    id: 4,
    title: "Big Waves",
    category: "[ ADVENTURE ]",
    image: docImg,
    duration: "2M",
    path: "/portfolio/adventure-travel",
  },
  {
    id: 5,
    title: "Deep Impact",
    category: "[ CSR ]",
    image: commercialImg,
    duration: "1M",
    path: "/portfolio/csr",
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative min-h-0 md:min-h-screen md:h-screen bg-background flex flex-col md:flex-row items-center justify-center overflow-hidden py-12 md:py-0"
    >
      <div className="w-full flex flex-col items-center justify-center">
        {/* Title */}
        <div className="w-full max-w-6xl px-6 text-center mb-8 md:mb-0 md:absolute md:top-12 md:left-1/2 md:-translate-x-1/2 z-30">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-[0.9] lowercase">
            latest <span className="text-primary/70 italic">dispatches</span>
          </h3>
        </div>

        {/* Mobile: static column, no animation */}
        <div className="flex flex-col items-center gap-3 w-full max-w-sm px-4 md:hidden">
          {categories.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="block w-full max-w-[240px] rounded-xl overflow-hidden bg-white shadow-2xl shadow-primary/20 border border-primary/10 hover:border-primary/30 transition-colors duration-300 group"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-sm font-heading font-bold text-white leading-tight lowercase">
                    {item.title}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-white/80">
                    {item.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: animated spread from center, shifted left to balance space */}
        <div className="hidden md:block relative w-full max-w-6xl flex items-center justify-center px-4 overflow-visible -translate-y-[38%] -translate-x-24 lg:-translate-x-32">
          <div className="relative w-full h-[240px]">
            {categories.map((item, index) => {
              const spreadX = SPREAD_X[index];
              const isCenter = index === 4;
              const rangeStart = isCenter ? 0.18 : 0.24;
              const rangeEnd = isCenter ? 0.48 : 0.56;

              const x = useTransform(scrollYProgress, [0, rangeStart, rangeEnd], [0, 0, spreadX]);
              const opacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [0, 1, 1]);
              const scale = useTransform(scrollYProgress, [0, rangeStart, rangeEnd], [0.94, 0.94, 1]);

              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-1/2 w-0 h-0 -translate-x-1/2 -translate-y-1/2"
                  style={{ zIndex: isCenter ? 10 : index + 1 }}
                >
                  <motion.div
                    style={{ x, opacity, scale }}
                    className="will-change-transform inline-block"
                  >
                    <Link
                      to={item.path}
                      className="block rounded-xl overflow-hidden bg-white shadow-2xl shadow-primary/20 border border-primary/10 hover:border-primary/30 transition-colors duration-300 group"
                    >
                      <div className="relative w-[240px] lg:w-[264px] aspect-[4/5] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h4 className="text-sm lg:text-base font-heading font-bold text-white leading-tight lowercase">
                            {item.title}
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider text-white/80">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
