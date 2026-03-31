document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navMenu");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

});