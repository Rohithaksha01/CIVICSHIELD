export function initSystemHealth() {
  const serverLoad = document.getElementById("serverLoad");
  const lastSync = document.getElementById("lastSync");

  function update() {
    if (serverLoad)
      serverLoad.innerText =
        Math.floor(Math.random() * 30 + 50) + "%";

    if (lastSync)
      lastSync.innerText = new Date().toLocaleTimeString();
  }

  update();
  setInterval(update, 7000);
}