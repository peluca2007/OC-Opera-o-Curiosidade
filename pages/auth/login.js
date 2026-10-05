const users = [
  { email: 'admin@oc.com', password: 'admin123' },
  { email: 'luciano@oc.com', password: 'luciano123' },
];

function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  const isValidUser = users.some((user) => user.email === email && user.password === password);

  if (!isValidUser) {
    message.style.display = 'block';
    return;
  }

  location.href = '../dashboard/dashboard.html';
}
document.querySelector(".login-form").addEventListener("submit", event => {
  event.preventDefault();
  login();
});

