document.getElementById("officer").addEventListener("submit", async function(e){

e.preventDefault();

const officerId = document.getElementById("officerId").value;
const password = document.getElementById("officerPassword").value;

const res = await fetch("http://localhost:3000/api/auth/officer-login",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
officerId,
password
})

});

const data = await res.json();

alert(data.message);

});