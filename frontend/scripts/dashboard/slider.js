export function initSlider() {
  let i = 0;
  const slides = document.querySelectorAll(".slides");
  const dots = document.querySelectorAll(".dot");

  if (!slides.length) return;

  setInterval(() => {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");

    i = (i + 1) % slides.length;

    slides[i].classList.add("active");
    dots[i].classList.add("active");
  }, 5000);
}