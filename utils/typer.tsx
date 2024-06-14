export const typer = () => {
  const char_list = document.querySelectorAll(
    ".nav-body h1.nav-title span.typed-char",
  );

  char_list.forEach((char) => {
    // console.log(char);
    char.style.display = "inline-block";
  });
};
