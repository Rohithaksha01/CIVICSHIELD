
export function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    localStorage.theme =
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
  });
}

// Apply saved theme on load
export function applySavedTheme() {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
  }
}