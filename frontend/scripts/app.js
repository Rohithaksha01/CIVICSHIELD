
import { initThemeToggle, applySavedTheme } from "./core/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  initThemeToggle();
});