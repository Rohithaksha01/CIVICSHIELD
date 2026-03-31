const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const data = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value,
aadhaar: document.getElementById("aadhaar").value,
password: document.getElementById("password").value
};

try{

const res = await fetch("http://localhost:3000/register-citizen",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)

});

const result = await res.json();

alert(result.message);

if(result.message === "Citizen registered successfully"){

// redirect to login page
window.location.href = "../pages/login.html";

}

}catch(error){

alert("Registration failed");

}

});