const Validate = () => {
  let email = document.login.email;
  let password = document.login.password;
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // error pick up fields
  let emailError = document.getElementById("errorEmail");
  let passwordError = document.getElementById("errorPassword");

  

  // validating email error
  if (email.value == "") {
    email.style.border = "1px solid red";
    emailError.textcontent = "Email is required";
    emailError.style ="color: red; font-size:2px; font-weight:bold; font-family:Helvetica;";
    email.focus();
    return false;
  } else if (!email.value.match(emailRegex)) {
    email.style.border = "1px solid red";
    emailError.textcontent = "Invalid email address";
    emailError.style =
      "color: red; font-size:11px; font-weight:bold; font-family:Helvetica;";
    email.focus();
    return false;
  }
if (password.value == "") {
    password.style.border = "1px solid red";
    passwordError.textContent = "password required";
  } else if (password.value.length<8){
    // passwordError(password, 'Password must be at least 8 characters');
    passwordError.style ="color:red; font-size:11px; font-weight:bold; font-family:Helvetica;";
    password.focus();
    return false;
  } 
  else {
    password.style.border = "1px solid green";
    // return false;
  }
};

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (data.loading) {
x  } else {
    // Redirect to another page
    window.location.href = "/services"; 
  }
});
 function myFunction(){
  var x = document.getElementById("formid")
  var y = document.getElementById("hide1")
  var z = document.getElementById("hide2")
  
  if(x.type === 'password'){
    x.type = "text";
    y.style.display = "block";;
    z.style.display = "none";
  }
  else {
    x.type = "password";
    y.style.display = "none";;
    z.style.display = "block";
  }
  
 }