export async function castVote() {
  const voterId = document.getElementById("voterId").value.trim();
  const candidate = document.getElementById("candidate").value;
  const status = document.getElementById("status");

  if (!voterId || !candidate) {
    status.textContent = "Please enter Voter ID and select a candidate";
    return;
  }

  if (!navigator.onLine) {
    showToast("⚠ You are offline", "warning");
    return;
  }

  addAuditLog("VOTE_ATTEMPT", `VoterID: ${voterId}`);

  try {
    const res = await fetch("http://localhost:5000/cast-vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voterId, candidate })
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    status.textContent = data.message;
    showToast("🗳 Vote successfully cast", "success");

    addAuditLog("VOTE_RESULT", data.message);
  } catch {
    status.textContent = "Server unreachable";
    showToast("⚠ Server unreachable", "error");
    addAuditLog("VOTE_FAILED", "Server error");
  }
}