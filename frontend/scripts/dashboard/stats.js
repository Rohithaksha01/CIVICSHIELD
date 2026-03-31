function animate(el, end) {
  if (!el) return;
  let start = 0;
  const step = Math.max(1, end / 60);

  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      el.innerText = end;
      clearInterval(timer);
    } else {
      el.innerText = Math.floor(start);
    }
  }, 50);
}

export function initStats() {
  const citizens = document.getElementById("citizens");
  const welfare = document.getElementById("welfare");
  const votes = document.getElementById("votes");
  const frauds = document.getElementById("frauds");

  fetch("http://localhost:3000/dashboard-stats")
    .then(r => r.json())
    .then(d => {
      animate(citizens, d.citizens);
      animate(welfare, d.welfare);
      animate(votes, d.votes);
      animate(frauds, d.frauds);
    })
    .catch(() => {
      animate(citizens, 1250);
      animate(welfare, 480);
      animate(votes, 890);
      animate(frauds, 12);
    });
}