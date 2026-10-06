const users = [
  { email: "admin@oc.com", password: "admin123" },
  { email: "luciano@oc.com", password: "luciano123" }
];

function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const message = document.getElementById("message");

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let isValidUser = false;

  // Procure uma conta com o mesmo e-mail e a mesma senha.
  for (const user of users) {
    const matchesEmail = user.email === email;
    const matchesPassword = user.password === password;

    if (matchesEmail && matchesPassword) {
      isValidUser = true;
      break;
    }
  }

  if (!isValidUser) {
    message.style.display = "block";
    return;
  }

  location.href = "../dashboard/dashboard.html";
}

function submitLogin(event) {
  event.preventDefault();
  login();
}

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", submitLogin);
