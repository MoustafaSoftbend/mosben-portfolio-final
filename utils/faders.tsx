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
  threshold: number = 0.1, // You set this value, so I moved it to a default value
  rootMargin: string = "0px 200px 0 200px",
) => {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // DOM manipulation should be inside useEffect
    const selectedElements = document.querySelectorAll(selector);
    elementsRef.current = Array.from(selectedElements) as HTMLElement[];

    const observerOptions: IntersectionObserverOptions = {
      threshold, // Trigger when 10% of the observed element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // Apply fade-in effects
          // target.style.transition = `opacity ${animationDuration}ms, transform ${animationDuration}ms`;
          target.style.opacity = "1";
          target.style.transform = "scale(1)";
          target.style.transform = "translateX(0%)";

          // Unobserve the element after it has animated
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // Observe each selected element
    elementsRef.current.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup observer on unmount
    return () => {
      elementsRef.current.forEach((element) => observer.unobserve(element));
    };
  }, [selector, threshold, animationDuration]); // Dependencies for useEffect
};

export default useFade;
