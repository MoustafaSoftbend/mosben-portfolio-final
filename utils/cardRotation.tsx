"use client"
export const cardRotation = () => {
  const cards = document.querySelectorAll<HTMLElement>(".profile");

  const observerOptions: IntersectionObserverInit = {
    root: null, // Use the viewport as the root
    rootMargin: "0px 1000px 0px 1000px", // No margin around the root
    threshold: 0.1, // Trigger when 10% of the observed element is visible
  };

  // Define the type for the entries parameter
  const intersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.opacity = "1";
        (entry.target as HTMLElement).style.transform =
          "rotateY(0deg) translateX(0%)";
      }
    });
  };

  const observer = new IntersectionObserver(intersection, observerOptions);

  cards.forEach((fader) => {
    observer.observe(fader);
  });
};
