const liveIndicator = document.getElementById("liveIndicator");

function updateConnectionStatus(){

if(navigator.onLine){

liveIndicator.textContent = "● ONLINE";
liveIndicator.classList.remove("offline");
liveIndicator.classList.add("online");

}
else{

liveIndicator.textContent = "● OFFLINE";
liveIndicator.classList.remove("online");
liveIndicator.classList.add("offline");

}

}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

updateConnectionStatus();