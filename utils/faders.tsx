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
  threshold: number = 0,
  rootMargin: string = "0px 200px 0 200px",
) => {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observerOptions: IntersectionObserverOptions = {
      threshold: threshold,
    };

    const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // target.style.transition = `opacity ${animationDuration}ms, transform ${animationDuration}ms`;
          target.style.opacity = "1";
          target.style.transform = "translateX(0%)";
          target.style.transform = "scale(1)";
        }
        // else {
        //   target.style.transition = `opacity ${animationDuration}ms, transform ${animationDuration}ms`;
        //   target.style.opacity = initialOpacity.toString();
        //   target.style.transform = initialTransform;
        // }
      });
      observer.unobserve();
    };

    const observer = new IntersectionObserver(
      intersectionCallback,
      observerOptions,
    );

    elementsRef.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [initialOpacity, initialTransform, animationDuration, threshold]);

  useEffect(() => {
    const selectedElements = document.querySelectorAll(selector);
    elementsRef.current = Array.from(selectedElements) as HTMLElement[];
  }, [selector]);
};

export default useFade;
