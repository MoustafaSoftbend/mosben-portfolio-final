"use client"
import { useEffect, useRef } from "react";

interface IntersectionObserverOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useFade = (
  selector: string,
  initialOpacity: number = 0,
  initialTransform: string = "translateX(-100%)",
  animationDuration: number = 2000,
  threshold: number = 0.1,
  rootMargin: string = "0px 200px 0 200px",
) => {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Check if window exists to ensure it's only run on the client-side
    if (typeof window === 'undefined') return;

    const observerOptions: IntersectionObserverOptions = {
      rootMargin,
      threshold,
    };

    const intersectionCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // Ensure transition is applied for animation
          target.style.transition = `opacity ${animationDuration}ms, transform ${animationDuration}ms`;
          target.style.opacity = "1";
          target.style.transform = "translateX(0%)";
          
          // Optionally use scale as well
          target.style.transform += " scale(1)";

          // Unobserve element after animation to avoid repeated triggers
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(intersectionCallback, observerOptions);

    elementsRef.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [selector, initialOpacity, initialTransform, animationDuration, threshold, rootMargin]);

  useEffect(() => {
    const selectedElements = document.querySelectorAll(selector);
    elementsRef.current = Array.from(selectedElements) as HTMLElement[];
  }, [selector]);
};

export default useFade;
