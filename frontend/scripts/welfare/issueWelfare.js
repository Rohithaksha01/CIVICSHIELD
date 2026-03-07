export async function issueWelfare() {
  const rationInput = document.getElementById("ration");
  const status = document.getElementById("status");
  const tableWrapper = document.getElementById("welfareTableWrapper");
  const tableBody = document.getElementById("welfareTableBody");

  if (!rationInput || !status) return;

  const ration = rationInput.value.trim();

  if (!ration) {
    status.textContent = "Please enter Ration Card number";
    status.style.color = "red";
    return;
  }

  if (!navigator.onLine) {
    status.textContent = "Offline. Cannot verify now.";
    status.style.color = "orange";
    return;
  }

  status.textContent = "Verifying ration card...";
  status.style.color = "orange";

  try {
    const res = await fetch("http://localhost:5000/issue-welfare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ration })
    });

    const data = await res.json();

    if (!res.ok) {
      status.textContent = data.message || "Verification failed";
      status.style.color = "red";
      return;
    }

    status.textContent = "Welfare issued successfully";
    status.style.color = "green";

    const now = new Date();
    const issuedDate = now.toLocaleDateString("en-IN");
    const issuedTime = now.toLocaleTimeString("en-IN");

    tableBody.innerHTML = "";

    (data.stock || []).forEach(p => {
      tableBody.innerHTML += `
        <tr>
          <td>${p.item}</td>
          <td>${p.total}</td>
          <td>${p.remaining}</td>
          <td>${p.unit}</td>
          <td>${issuedDate}</td>
          <td>${issuedTime}</td>
        </tr>
      `;
    });

    tableWrapper.classList.remove("hidden");

  } catch {
    status.textContent = "Server not reachable";
    status.style.color = "red";
  }
}