"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as unknown as { lenis?: Lenis }).lenis) {
      (window as unknown as { lenis: Lenis }).lenis.scrollTo(0, { immediate: true } as Parameters<Lenis["scrollTo"]>[1]);
    }
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    (window as unknown as { lenis: Lenis }).lenis = lenis;

    lenis.on("scroll", () => ScrollTrigger.update());

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      (window as unknown as { lenis: undefined }).lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
