import { castVote } from "../voting/castVote.js";
import { initThemeToggle } from "../core/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  window.castVote = castVote; // expose to button
});