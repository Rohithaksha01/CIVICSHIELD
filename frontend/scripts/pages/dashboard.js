import { initSlider } from "../dashboard/slider.js";
import { initStats } from "../dashboard/stats.js";
import { initSystemHealth } from "../dashboard/systemHealth.js";
import { initStatNavigation } from "../dashboard/navigation.js";
import { initThemeToggle, applySavedTheme } from "../core/theme.js";

document.addEventListener("DOMContentLoaded", () => {

  // 🔐 TOKEN CHECK
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "../pages/login.html";
    return;
  }

  // 🌙 Apply saved theme first
  applySavedTheme();

  // Initialize dashboard features
  initSlider();
  initStats();
  initSystemHealth();
  initStatNavigation();
  initThemeToggle();

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // 🚪 LOGOUT BUTTON
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("Logout clicked");

      localStorage.removeItem("token");
      window.location.href = "../pages/login.html";
    });
  }
});