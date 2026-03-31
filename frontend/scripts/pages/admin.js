function openProfile() {
    document.getElementById("profileModal").style.display = "flex";
}

function closeProfile() {
    document.getElementById("profileModal").style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById("profileModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function uploadPhoto() {

    const file = document.getElementById("uploadImage").files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("profileImage").src = e.target.result;
        };

        reader.readAsDataURL(file);

    }

}

function editAdmin() {

    let name = prompt("Enter Name");
    let phone = prompt("Enter Phone");

    if (name) {
        document.getElementById("adminName").innerText = name;
    }

    if (phone) {
        document.getElementById("adminPhone").innerText = phone;
    }

}

/* CHARTS */

new Chart(document.getElementById("citizenChart"), {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "New Citizens",
            data: [120, 200, 150, 300, 280, 350],
            borderColor: "#ff8c00",
            backgroundColor: "rgba(255,140,0,0.2)",
            fill: true
        }]
    }
});

new Chart(document.getElementById("welfareChart"), {
    type: "bar",
    data: {
        labels: ["Food", "Pension", "Housing", "Education"],
        datasets: [{
            label: "Beneficiaries",
            data: [180, 120, 90, 160],
            backgroundColor: "#2ecc71"
        }]
    }
});