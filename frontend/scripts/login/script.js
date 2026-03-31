const API = "http://127.0.0.1:3000";

// ===============================
// 👤 CITIZEN LOGIN
// ===============================
const citizenForm = document.getElementById("citizen");

if (citizenForm) {
    citizenForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = citizenForm.querySelector("input[type='email']").value;
        const password = citizenForm.querySelector("input[type='password']").value;

        try {

            const res = await fetch(`${API}/login-citizen`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const result = await res.json();

            if (result.token) {

                localStorage.setItem("token", result.token);

                alert("Login successful ✅");

                window.location.href = "../pages/dashboard.html";

            } else {
                alert(result.message);
            }

        } catch (error) {
            console.error(error);
            alert("Login failed");
        }

    });
}


// ===============================
// 👮 OFFICER LOGIN
// ===============================
const officerForm = document.getElementById("officer");

if (officerForm) {
    officerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const officerId = document.getElementById("officerId").value;
        const password = document.getElementById("officerPassword").value;

        try {
            const res = await fetch(`${API}/api/auth/officer-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ officerId, password })
            });

            const data = await res.json();

            if (data.success) {
                alert("✅ Officer Login Successful");

                // redirect page
                window.location.href = "../pages/officer.html";

            } else {
                alert("❌ " + data.message);
            }

        } catch (err) {
            console.log(err);
            alert("Server error");
        }
    });
}


// ===============================
// 🛡️ ADMIN LOGIN
// ===============================
const adminForm = document.getElementById("admin");

if (adminForm) {
    adminForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = adminForm.querySelector('input[type="text"]').value;
        const password = adminForm.querySelector('input[type="password"]').value;

        try {
            const res = await fetch(`${API}/login-admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.success) {
                alert("✅ Login Successful");

                // 🔥 IMPORTANT: correct path
                window.location.href = "../pages/admin.html";

            } else {
                alert("❌ " + data.message);
            }

        } catch (err) {
            console.log(err);
            alert("Server error");
        }
    });
}