import { useEffect, useState } from "react";
import loaderVideo from "@/assets/loader.mov";

const LOADER_DURATION_MS = 3000;
const FADE_OUT_MS = 600;

export default function AppLoader({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let hideTimerId: ReturnType<typeof setTimeout>;
    const showTimerId = setTimeout(() => {
      setFadingOut(true);
      hideTimerId = setTimeout(() => {
        setVisible(false);
        onFinish();
      }, FADE_OUT_MS);
    }, LOADER_DURATION_MS);
    return () => {
      clearTimeout(showTimerId);
      clearTimeout(hideTimerId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] w-screen min-w-full h-screen min-h-full bg-background overflow-hidden transition-opacity duration-[600ms] ease-out ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <video
        src={loaderVideo}
        autoPlay
        muted
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
