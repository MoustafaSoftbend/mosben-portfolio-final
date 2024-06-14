export const fade_left = () => {
  const left_faders = document.querySelectorAll(".fade-left");

  // left_faders.forEach((el) => {
  //   el.style.opacity = 0;
  //   el.style.transform = "translateX(-100%)";
  // });

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px 1000px 0px 1000px", // No margin around the root
    threshold: 0.1, // Trigger when 50% of the observed element is visible
  };
  const intersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateX(0%)";
      }
    });
  };

  const observer = new IntersectionObserver(intersection, observerOptions);

  left_faders.forEach((fader) => {
    observer.observe(fader);
  });
};
export const fade_right = () => {
  const right_faders = document.querySelectorAll(".fade_right");

  // right_faders.forEach((el) => {
  //   el.style.opacity = 0;
  //   el.style.transform = "translateX(0)";
  // });

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px 1000px 0px 1000px", // No margin around the root
    threshold: 0.5, // Trigger when 50% of the observed element is visible
  };
  const intersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateX(0%)";
      }
    });
  };

  const observer = new IntersectionObserver(intersection, observerOptions);

  right_faders.forEach((fader) => {
    observer.observe(fader);
  });
};

export const fade_text_svg = () => {
  const pivot_text = document.querySelectorAll(
    ".orbit-svg-container h1.pivot-text",
  );
  const container = document.querySelector("section.services-section");
  const svg = document.querySelector(".orbit-svg-container svg");
  const observerOptions = {
    root: null, // Use the viewport as the root
    // rootMargin: "0px 1000px 0px 1000px",
    threshold: 0.5, // Trigger when 50% of the observed element is visible
  };

  const intersection = (intersectionEntry) => {
    intersectionEntry.forEach((entry) => {
      if (entry.isIntersecting) {
        svg.style.opacity = 1;
        svg.style.transform = "scale(1)";
        setTimeout(() => {
          pivot_text.forEach((el) => {
            el.style.opacity = 1;
            el.style.transform = "translateX(0%)";
          });
        }, 2000);
      }
    });
  };

  const observer = new IntersectionObserver(intersection, observerOptions);
  observer.observe(container);

  // pivot_text.forEach((el) => {
  //   console.log(el);
  //   observer.observe(el);
  // });
};
