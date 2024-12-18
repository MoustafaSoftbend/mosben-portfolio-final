export const scroller = () => {
  const carousel = document.querySelector<HTMLElement>(".carousel-container");
  const slide_right = document.querySelector<HTMLElement>(".btn-arrow-right");
  const slide_left = document.querySelector<HTMLElement>(".btn-arrow-left");

  if (carousel) {
    var position = carousel.scrollLeft;
    const right_pos = carousel.scrollWidth - carousel.clientWidth;

    // Check if slide_right exists before adding the event listener
    if (slide_right) {
      slide_right.addEventListener("click", () => {
        console.log("right clicked")
        position >= right_pos ? (position = right_pos) : (position += 150);
        carousel.scrollLeft = position;
      });
    }

    // Check if slide_left exists before adding the event listener
    if (slide_left) {
      slide_left.addEventListener("click", () => {
        console.log("right left")
        position == 0 ? (position = 0) : (position -= 150);
        carousel.scrollLeft = position;
      });
    }
  } else {
    console.warn("Carousel element not found");
  }
};
