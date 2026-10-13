import { getLoggedUser } from "../services/user-service.js";

export function showLoggedUserName() {
  const userName = document.getElementById("user-name");
  const user = getLoggedUser();

  if (user) {
    userName.textContent = user.name;
  } else {
    userName.textContent = "";
  }
}
