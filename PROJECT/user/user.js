
const signupForm = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const repeatPasswordInput = document.getElementById('repeat-password');
const showPasswordCheckbox = document.getElementById('show-password');
const showRepeatPasswordCheckbox = document.getElementById('show-repeat-password');
const signupButton = document.getElementById('signup-button');

function validatePassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const repeatPassword = repeatPasswordInput.value.trim();

  if (username.length < 4 || email.length === 0 || password.length === 0 || repeatPassword.length === 0) {
    alert('Please fill in all fields.');
    return;
  }else {
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.');
      return;
    }
    if (password !== repeatPassword) {
      alert('Passwords do not match.');
      return;
    }
      if(validateEmail(email) && validatePassword && password === repeatPassword){
        window.location.href = 'login.html';
      }
  }
  

  const userData = {
    username,
    email,
    password
  };

  localStorage.setItem('userData', JSON.stringify(userData));
});

showPasswordCheckbox.addEventListener('change', () => {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

showRepeatPasswordCheckbox.addEventListener('change', () => {
  if (showRepeatPasswordCheckbox.checked) {
    repeatPasswordInput.type = 'text';
  } else {
    repeatPasswordInput.type = 'password';
  }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }