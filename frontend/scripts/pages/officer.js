const API = "http://localhost:3000/api";

// ======================
// LOAD CITIZENS
// ======================
window.loadCitizens = async function () {
    const res = await fetch(`${API}/citizens`);
    const data = await res.json();

    const container = document.getElementById("citizenList");
    container.innerHTML = "";

    data.forEach(citizen => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p><b>Name:</b> ${citizen.name}</p>
            <p><b>Aadhaar:</b> ${citizen.aadhaar}</p>
            <p><b>Status:</b> ${citizen.status || "Pending"}</p>

            <button onclick="approveCitizen('${citizen._id}')">Approve</button>
            <button onclick="rejectCitizen('${citizen._id}')">Reject</button>
            <hr>
        `;

        container.appendChild(div);
    });
};

// ======================
// LOAD WELFARE
// ======================
window.loadWelfare = async function () {
    const res = await fetch(`${API}/welfare`);
    const data = await res.json();

    const table = document.getElementById("welfareTable");
    table.innerHTML = "";

    data.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${item.ration || "N/A"}</td>
                <td>Welfare Scheme</td>
                <td>${item.status || "Pending"}</td>
                <td>
                    <button onclick="approveWelfare('${item._id}')">Approve</button>
                    <button onclick="rejectWelfare('${item._id}')">Reject</button>
                </td>
            </tr>
        `;
    });
};

// ======================
// CITIZEN ACTIONS
// ======================
window.approveCitizen = async function (id) {
    await fetch(`${API}/citizen/approve/${id}`, { method: "POST" });
    alert("Citizen Approved ✅");
    loadCitizens();
};

window.rejectCitizen = async function (id) {
    await fetch(`${API}/citizen/reject/${id}`, { method: "POST" });
    alert("Citizen Rejected ❌");
    loadCitizens();
};

// ======================
// WELFARE ACTIONS
// ======================
window.approveWelfare = async function (id) {
    await fetch(`${API}/approve/${id}`, { 
    method: "POST",
    headers: { "Content-Type": "application/json" }
});
    alert("Welfare Approved ✅");
    loadWelfare();
};

window.rejectWelfare = async function (id) {
    await fetch(`${API}/reject/${id}`, { 
    method: "POST",
    headers: { "Content-Type": "application/json" }
});
    alert("Welfare Rejected ❌");
    loadWelfare();
};

// ======================
// INIT
// ======================
loadCitizens();
loadWelfare();