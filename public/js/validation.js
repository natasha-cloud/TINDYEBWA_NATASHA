const validate=()=>{

    // picking input fields with their names or ids.
    let firstName = document.register.firstname
    let lastName = document.register.lastname
    let phone = document.register.phone
    let email = document.register.Email
    let nin = document.register.nin
    let car = document.register.carType



// Picking error fields
let firstNameError = document.getElementById("firstNameError")
let errorLastName = document.getElementById("lastName")
let phoneError = document.getElementById("phoneError")
let EmailError = document.getElementById("emailError")
let errorcar = document.getElementById("errorcar")
let ninError = document.getElementById("ninError")


// validation firstname input fields.
// validating for emptyness errors
if(firstName.value === "") {
   firstName.style.border = "2px solid red";
   firstNameError.textContent = "first name is required";
   firstNameError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
   firstName.focus();
   error++;
}

else if(firstName.value.length <2 ){
    firstName.style.border = "2px solid red";
    firstNameError.textContent = "First name must be at least 2 characters";
    firstNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    firstName.focus();
    return false;
}
else if (firstName.value.length >15){
    firstName.style.border = "1px solid red";
    firstNameError.textContent = "First name must no be greater than 15 characters";
    firstNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    firstName.focus();
    return false;
}
else{
    firstName.style.border = "1px solid green";
    lastName.focus(); 
}
// lastName validation
if(lastName.value == ""){
    lastName.style.border = "1px solid red";
    lastNameError.textContent = "firstname is required";
    lastNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    lastName.focus();
    error++;
}
else if(lastName.value.length < 2){
    lastName.style.border = "1px solid red";
    errorLastName.textContent = "should be atleast 2 characters";
    errorLastName.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    lastName.focus();
   return false;

}else if(lastName.value.length > 15){
    lastName.style.border = "1px solid red";
    errorLastName.textContent = "first name should be atleast 2 characters";
    errorLastName.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    lastName.focus();
   return false;
}else{
    lastName.style.border = "1px solid green";
    email.focus();
    
}
  

// Validating Phone number.
const phoneRegex = /^(\+256|7)[\d]{9}$/


if(phone.value == ""){
    phone.style.border = "1px solid red";
    phoneError.textContent = "Phone number is required";
    phoneError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    phone.focus();
    error++;
}
else if(!(phoneRegex.test(phone.value) || phoneRegex.test(phone.value))){
    phone.style.border = "1px solid red";
    errorPhone.textContent = "right phone '+256/7..";
    errorPhone.style = "color: red; font-size: 11px; font-family: arial, sans-serif;";
    phone.focus();
    return false;  
}else{
    phone.style.border = "1px solid green";
}

// validation for Email
const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

if(Email.value == ""){
    Email.style.border = "1px solid red";
    EmailError.textContent = "Email is required";
    EmailError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    Email.focus();
    error++;
}

else if(!EmailRegex.test(email.value)){
    Email.style.border = "1px solid red";
    EmailError.textContent = "The email address should be valid";
    EmailError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    Email.focus();
    return false;
}
else{
    email.style.border = "1px solid green";
    national.focus()
}

// validation for car type emptiness.
if (car.value == ""){
   firstName.style.border = "1px solid red";
   errorcar.textContent = "name is required";
   errorcar.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    car.focus();
    return false;
}

// validation for NIN input emptyness.
const ninRegex = /^CF ([a-zA-Z0-9]{12})+$/
const ninRegex2 = /^CM([a-zA-Z0-9]{12})+$/

if(nin.value == ""){
    nin.style.border = "1px solid red";
    ninError.textContent = "NIN is required";
    ninError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    nin.focus();
    error++;
}

else if(!(ninRegex.test(nin.value)||!ninRegex2.test(nin.value))){
        nin.style.border = "1px solid red";
        ninError.textContent = "NIN should look like CFXXXXX OR CMXXXX";
        ninError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
        nin.focus();
        return false;
    }
else{
    nin.style.border = "1px solid green";
    nin.textContent = "";
        
}


}