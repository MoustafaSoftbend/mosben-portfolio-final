export const scroller = () => {
  const carousel = document.querySelector(".carousel-container");
  const slide_right = document.querySelector(".arrow-right");
  const slide_left = document.querySelector(".arrow-left");

  var position = carousel.scrollLeft;
  const right_pos = carousel.scrollWidth - carousel.clientWidth;

  // console.log(carousel, slide_right, slide_left);

  slide_right.addEventListener("click", () => {
    position >= right_pos ? (position = right_pos) : (position += 150);
    carousel.scrollLeft = position;
  });
  slide_left.addEventListener("click", () => {
    position == 0 ? (position = 0) : (position -= 150);
    carousel.scrollLeft = position;
  });
};
