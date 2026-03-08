export async function castVote() {

  const voterId = document.getElementById("voterId").value.trim();
  const candidate = document.getElementById("candidate").value;
  const status = document.getElementById("status");

  if (!voterId || !candidate) {
    status.textContent = "Please enter Voter ID and select a candidate";
    return;
  }

  try {

    const res = await fetch("http://localhost:3000/cast-vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        voterId,
        candidate
      })
    });

    const data = await res.json();

    status.textContent = data.message;

  } catch (err) {

    status.textContent = "Server unreachable";

  }
}