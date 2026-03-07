function initThemeToggle() {
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

initThemeToggle();