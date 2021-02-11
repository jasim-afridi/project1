const stickyHeader = () =>{
    const header = document.getElementById("header");
    if(window.scrollY > 80){
        header.classList.add("sticky")
    }else{
        header.classList.remove("sticky")
    }
}

// carousel



window.addEventListener("scroll", stickyHeader, false)

const eye = document.querySelector(".eye");
console.log(eye)
eye.addEventListener("click", function(){
   const password = document.getElementById("password");
   if(password.type=== "password"){
       password.setAttribute("type","text")
   }else{
    password.setAttribute("type","password")
   }
    this.classList.toggle("active")
   
})
