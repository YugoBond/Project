
const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show-password');

form.addEventListener('submit', (event) => {
  event.preventDefault();


  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const userData = JSON.parse(localStorage.getItem('userData'));

  if (username === userData.username && email === userData.email && password === userData.password) {
    window.location.href = 'loading.html';
  } else {
    alert('Invalid credentials');
  }
});
showPasswordCheckbox.addEventListener('change', () => {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});