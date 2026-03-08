import { castVote } from "../voting/castVote.js";

document.addEventListener("DOMContentLoaded", () => {

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  window.castVote = castVote;

});