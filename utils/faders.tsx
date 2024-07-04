import { useRef, useEffect } from "react"; // Assuming React integration

// Type definition for IntersectionObserver options
interface IntersectionObserverOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold: number;
}

// Reusable fade function with animation options
const fade = (
  selector: string,
  initialOpacity: number = 0,
  initialTransform: string = "translateX(-100%)",
  animationDuration: number = 2000,
  threshold: number = 0.5, // Adjust based on your needs
) => {
  const elements = useRef<HTMLElement[]>(null);

  useEffect(() => {
    const observerOptions: IntersectionObserverOptions = {
      root: null, // Use viewport as root
      threshold,
    };

    const intersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0%)";
        } else {
          entry.target.style.opacity = initialOpacity.toString();
          entry.target.style.transform = initialTransform;
        }
      });
    };

    const observer = new IntersectionObserver(intersection, observerOptions);

    if (elements.current) {
      elements.current.forEach((element) => observer.observe(element));
    }

    return () => {
      observer.disconnect(); // Clean up observer on unmount
    };
  }, [elements.current, threshold]); // Re-run effect when elements or threshold changes

  useEffect(() => {
    const selectedElements = document.querySelectorAll(selector);
    elements.current = Array.from(selectedElements);
  }, [selector]); // Re-run effect when selector changes

  return null; // No JSX return for utility function
};

export const fadeLeft = () => fade(".fade-left");
export const fadeRight = () => fade(".fade-right", 0, "translateX(0)");
export const fadeTextSvg = () => {
  fade(".orbit-svg-container h1.pivot-text", 0, "translateX(100%)", 2000, 0.75); // Adjust threshold as needed
};
