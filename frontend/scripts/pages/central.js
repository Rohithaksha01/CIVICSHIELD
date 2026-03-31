// ===============================
// 🚀 CENTRAL DASHBOARD SCRIPT (FINAL CLEAN)
// ===============================

const API = "http://127.0.0.1:3000"; // 🔥 use this (not localhost sometimes)

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // 📊 LOAD REAL DATA FROM BACKEND
    // ===============================
    loadDashboardStats();
    loadFrauds();
    loadChart();


    // CHART
    async function loadChart() {
        try {
            const res = await fetch(`${API}/state-stats`);
            const data = await res.json();

            const labels = data.votes.map(v => v._id);
            const values = data.votes.map(v => v.count);

            const ctx = document.getElementById("chart");

            if (ctx) {
                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Votes",
                            data: values,
                            backgroundColor: "orange"
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: "white"
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: { color: "white" }
                            },
                            y: {
                                ticks: { color: "white" }
                            }
                        }
                    }
                });
            }

        } catch (err) {
            console.error("Chart error:", err);
        }
    }


    // ===============================
    // 📱 MENU TOGGLE
    // ===============================
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }


    // ===============================
    // 🔥 EVENT DELEGATION
    // ===============================
    document.addEventListener("click", async (e) => {

        // ✅ RESOLVE FRAUD (UI + BACKEND)
        if (e.target.classList.contains("resolveBtn")) {

            const id = e.target.dataset.id;

            try {
                await fetch(`http://localhost:3000/frauds/${id}`, {
                    method: "PUT"
                });

                const row = e.target.closest("tr");
                row.cells[2].innerText = "Resolved";
                row.cells[2].className = "active";

            } catch (err) {
                console.error("Error resolving fraud:", err);
            }
        }

        // ✅ TOGGLE SCHEME
        if (e.target.classList.contains("toggleSchemeBtn")) {
            e.target.innerText =
                e.target.innerText === "Deactivate" ? "Activate" : "Deactivate";
        }

        // ✅ SUSPEND ADMIN
        if (e.target.classList.contains("suspendBtn")) {
            const row = e.target.closest("tr");

            row.cells[2].innerText = "Suspended";
            row.cells[2].className = "suspended";
        }

    });


    // ===============================
    // ➕ ADD SCHEME
    // ===============================
    const addSchemeBtn = document.querySelector("#schemes .addBtn");

    if (addSchemeBtn) {
        addSchemeBtn.addEventListener("click", () => {

            const table = document.getElementById("schemeTable");

            const row = table.insertRow();

            row.innerHTML = `
                <td>New Scheme</td>
                <td class="active">Active</td>
                <td>0</td>
                <td><button class="toggleSchemeBtn">Deactivate</button></td>
            `;
        });
    }


    // ===============================
    // ➕ ADD ADMIN
    // ===============================
    const adminBtn = document.querySelector("#admins .addBtn");

    if (adminBtn) {
        adminBtn.addEventListener("click", () => {

            const table = document.getElementById("adminTable");

            const row = table.insertRow();

            row.innerHTML = `
                <td>New Admin</td>
                <td>Unknown</td>
                <td class="active">Active</td>
                <td>Now</td>
                <td><button class="suspendBtn">Suspend</button></td>
            `;
        });
    }

});


// ===============================
// 📊 FETCH DASHBOARD STATS
// ===============================
async function loadDashboardStats() {
    try {
        const res = await fetch("http://localhost:3000/dashboard-stats");
        const data = await res.json();

        const counters = document.querySelectorAll(".counter");

        if (counters.length >= 5) {
            counters[0].innerText = data.citizens;
            counters[1].innerText = data.frauds;
            counters[2].innerText = data.welfare;
            counters[3].innerText = data.votes;
            counters[4].innerText = 45; // admins
        }

    } catch (err) {
        console.error("Stats error:", err);
    }
}


// ===============================
// 🚨 LOAD FRAUD TABLE
// ===============================
async function loadFrauds() {
    try {
        const res = await fetch(`${API}/frauds`);
        const data = await res.json();

        const table = document.querySelector("#fraud table");

        data.forEach(f => {
            const row = table.insertRow();

            row.innerHTML = `
                <td>${f.id}</td>
                <td>${f.region}</td>
                <td class="${f.status.toLowerCase()}">${f.status}</td>
                <td><button class="resolveBtn" data-id="${f.id}">Resolve</button></td>
            `;
        });

    } catch (err) {
        console.error("Fraud error:", err);
    }
}