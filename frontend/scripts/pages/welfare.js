import { issueWelfare } from "../welfare/issueWelfare.js";
import { initThemeToggle } from "../core/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  window.issueWelfare = issueWelfare; // expose to button
});