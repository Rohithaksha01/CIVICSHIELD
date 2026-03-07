import { renderChart } from "../chart/renderChart.js";
import { initThemeToggle } from "../core/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  renderChart();
});