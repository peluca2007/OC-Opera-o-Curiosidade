import { users } from '../../shared/services/user-service.js';

function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  const user = users.find(user =>
    user.email === email && user.password === password
  );

  if (!user) {
    message.style.display = 'block';
    return;
  }

  localStorage.setItem('loggedUserId', user.id);

  location.href = '../dashboard/dashboard.html';
}

document.querySelector('.login-form').addEventListener('submit', event => {
  event.preventDefault();
  login();
});