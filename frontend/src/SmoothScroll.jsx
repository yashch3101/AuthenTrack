import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,        
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smooth: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      lerp: 0.07           
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return null;
}