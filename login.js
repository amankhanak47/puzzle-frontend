const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.querySelector(".error-message");

form.addEventListener("submit", async(e) => {
  e.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

 
    
    
    
    console.log(emailValue,passwordValue)
    
    const response = await fetch(
        `https://puzzle12backend.onrender.com/auth/login`,
        {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email:emailValue, password:passwordValue}),
        }
        );
        const json = await response.json();
        
        if (json.sucess) {
          console.log(json.authtoken)
          localStorage.setItem("puzzle_token", json.authtoken)
          location.replace("https://puzzle12.netlify.app/")
          
        }
        else {
          console.log(json)
          alert("Enter Valid credentials")
        }
        
      
});
