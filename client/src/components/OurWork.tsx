import { useState } from "react";

const WORK_ITEMS = [
  {
    type: "video" as const,
    src: "https://framerusercontent.com/assets/Fc7PSpH0ZaYoSGNU5zKXVZ3eips.webm",
    href: "/#portfolio",
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/ujEq7HJJsmQseW1niZxDvyF5VRk.png?scale-down-to=512",
    href: "/#portfolio",
  },
  {
    type: "video" as const,
    src: "https://framerusercontent.com/assets/Z2QLGtFTpYbIcJpKDnzJ4AWL1yg.webm",
    href: "/#portfolio",
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/EHg0xpTq95F66aCmueGsSUM2e0.jpg",
    href: "https://linktr.ee/gauravachaiah",
  },
  {
    type: "video" as const,
    src: "https://framerusercontent.com/assets/hrqRrx8Poz8ldZhFQTBYYEc4Qw.mp4",
    poster: "https://framerusercontent.com/images/KmY3HvNNStmOERgxtV1Cd5FPCE.png",
    href: "/#portfolio",
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/ZiPtXTT74pScybYj98xmWBvJDLk.jpg",
    href: "https://linktr.ee/gauravachaiah",
  },
  {
    type: "video" as const,
    src: "https://framerusercontent.com/assets/jgjN09cM5r17aDth1UoIprhupG8.webm",
    href: "/#portfolio",
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/SQPZRuC8fVe3fEpEpte2VaRJnVo.png",
    href: "/#portfolio",
  },
  {
    type: "video" as const,
    src: "https://framerusercontent.com/assets/JXKG3OcJlbXz7KcNAWFi7IPl94.webm",
    href: "/#portfolio",
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/Gac3ZJeCKYr7KB2espH3mrltz3s.png",
    href: "/#portfolio",
  },
];

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function OurWork() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="our-work"
      className="relative pt-8 md:pt-12 pb-16 md:pb-24 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-10 mb-10 text-center">
        <h3
          className="text-3xl md:text-4xl font-heading font-bold text-white lowercase"
          style={{
            backgroundImage: "linear-gradient(0deg, rgb(255,255,255) 0%, rgba(255,255,255,0) 203.7%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Work
        </h3>
      </div>

      <div
        className="w-full flex items-center overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, rgba(0,0,0,0.25) 1%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0.25) 99%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.25) 1%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0.25) 99%)",
        }}
      >
        <ul
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex flex-row items-center gap-4 list-none m-0 p-0 flex-nowrap w-max place-items-center"
          style={{
            animation: "work-ticker 45s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {[...WORK_ITEMS, ...WORK_ITEMS].map((item, i) => (
            <li key={i} className="flex-shrink-0">
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener" : undefined}
                className={`block relative rounded-xl overflow-hidden group cursor-pointer ${
                  item.type === "video" ? "w-[429px] h-[240px]" : "w-[240px] h-[240px]"
                }`}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    poster={"poster" in item ? item.poster : undefined}
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                    className="block w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)", borderRadius: "12px" }}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    decoding="async"
                    className="block w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)", borderRadius: "12px" }}
                  />
                )}
                <div
                  className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: "rgba(12, 12, 12, 0.95)" }}
                >
                  <span className="relative w-12 h-12 rounded-full bg-[#4D4D4D] flex items-center justify-center">
                    <SearchIcon />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes work-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
