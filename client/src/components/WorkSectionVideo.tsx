import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import workSectionVideo from "@/assets/story-video.mov";

const PLAY_DURATION_SEC = 7; // play once for 7 sec then stop until page reload

export default function WorkSectionVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const hasStoppedRef = useRef(false);

  useEffect(() => {
    if (!isInView || !videoRef.current || hasStoppedRef.current) return;
    const video = videoRef.current;
    video.currentTime = 0;
    video.play().catch(() => {});

    const stopAfterDuration = () => {
      if (video.currentTime >= PLAY_DURATION_SEC) {
        video.pause();
        hasStoppedRef.current = true;
        video.removeEventListener("timeupdate", stopAfterDuration);
      }
    };
    video.addEventListener("timeupdate", stopAfterDuration);

    return () => {
      video.removeEventListener("timeupdate", stopAfterDuration);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="w-full bg-background overflow-hidden"
    >
      <div className="w-full overflow-hidden">
        <video
          ref={videoRef}
          src={workSectionVideo}
          muted
          playsInline
          loop={false}
          className="w-full h-auto object-cover block scale-[1.02] outline-none border-0"
        />
      </div>
    </section>
  );
}
