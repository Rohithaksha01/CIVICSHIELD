import { issueWelfare } from "../welfare/issueWelfare.js";

document.addEventListener("DOMContentLoaded", () => {

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // expose function to HTML button
  window.issueWelfare = issueWelfare;

});