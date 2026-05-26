import { loginView } from "./views/loginView.js";
import { loginController } from "./controllers/loginController.js";

import { homeView } from "./views/homeView.js";
import { initHome } from "./controllers/homeController.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");
  const userLogin = localStorage.getItem("auth");

  if (!userLogin) {
    appContainer.innerHTML = loginView();
    loginController(appContainer);
  } else {
    const role = localStorage.getItem("role") || "user";
    const username = localStorage.getItem("username") || "User";
    appContainer.innerHTML = homeView();
    initHome(username, role, appContainer);
  }
});
