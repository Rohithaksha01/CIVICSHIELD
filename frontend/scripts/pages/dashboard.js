import { initSlider } from "../dashboard/slider.js";
import { initStats } from "../dashboard/stats.js";
import { initSystemHealth } from "../dashboard/systemHealth.js";
import { initStatNavigation } from "../dashboard/navigation.js";
import { initThemeToggle } from "../core/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  initStats();
  initSystemHealth();
  initStatNavigation();
  initThemeToggle();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});