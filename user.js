const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const errorMessage = document.querySelector('.error-message');
const successMessage = document.querySelector('.success-message');

form.addEventListener('submit', async(e) => {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();


     
    
    console.log(emailValue,passwordValue)
    
    const response = await fetch(
        `https://puzzle12backend.onrender.com/auth/signup`,
        {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name:nameValue, email:emailValue, password:passwordValue}),
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
