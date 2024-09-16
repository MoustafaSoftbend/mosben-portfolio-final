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
  // rootMargin: string = "0px 200px 0px 200px", // Ensure this is in the correct format
) => {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Check if window exists to ensure it's only run on the client-side
    if (typeof window === 'undefined') return;

    // Validate that the rootMargin has the correct format
    // const validRootMargin = /^(\d+px|\d+%) (\d+px|\d+%) (\d+px|\d+%) (\d+px|\d+%)$/.test(rootMargin)
    //   ? rootMargin
    //   : "0px 200px 0px 200px"; // Fallback if invalid

    const observerOptions: IntersectionObserverOptions = {
      rootMargin: "0px 200px 0px 200px", // Use validated rootMargin
      threshold,
    };

    const intersectionCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.style.transition = `opacity ${animationDuration}ms, transform ${animationDuration}ms`;
          target.style.opacity = "1";
          target.style.transform = "translateX(0%) scale(1)";
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
  }, [selector, initialOpacity, initialTransform, animationDuration, threshold]);

  useEffect(() => {
    const selectedElements = document.querySelectorAll(selector);
    elementsRef.current = Array.from(selectedElements) as HTMLElement[];
  }, [selector]);
};

export default useFade;
