const eye = document.querySelector(".eye");
const close = document.querySelector(".close_model_trigger")
const showPassword = () =>{
const password = document.getElementById("password");
eye.classList.toggle("active")
if(password.type === "password"){
    password.setAttribute("type","text")
}else{
    password.setAttribute("type","password")
}
}
const closeModel = () =>{
    const loginForm = document.querySelector(".login_form")
    const login = document.querySelector(".login")
    loginForm.style.display = "none"
    login.style.display = "none"
}



close.addEventListener("click", closeModel, false)
eye.addEventListener("click", showPassword, false)