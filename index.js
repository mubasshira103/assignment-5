document.getElementById("login-btn").addEventListener("click" , function (event){
  event.preventDefault();
  const password= document.getElementById("pass").value;
  const name =document.getElementById("userName").value;

if(name === "admin" && password === "admin123"){
  window.location.assign("home.html");
}
else{
  alert("Invalid username or password");
}
})
