export function initStatNavigation() {
  document
    .querySelectorAll(".stat-card.clickable")
    .forEach(card => {
      card.addEventListener("click", () => {
        const type = card.dataset.chart;
        window.location.href = `chart.html?type=${type}`;
      });
    });
}