export const cardRotation = () => {
  const cards = document.querySelectorAll(".profile");

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px 1000px 0px 1000px", // No margin around the root
    threshold: 0.1, // Trigger when 50% of the observed element is visible
  };
  const intersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "rotateY(0deg) translateX(0%)";
      }
    });
  };

  const observer = new IntersectionObserver(intersection, observerOptions);

  cards.forEach((fader) => {
    observer.observe(fader);
  });
};
