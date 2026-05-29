import { loginView } from "./views/loginView.js";
import { loginController } from "./controllers/loginController.js";

import { homeView } from "./views/homeView.js";
import { initHome } from "./controllers/homeController.js";

import routerMiddleware from "./middlewares/router.js";

const appContainer = document.getElementById("app");
const loginRoot = document.getElementById("login-root");

const router = {
  home: {
    view: homeView,
    controller: async () => {
      await initHome(
        localStorage.getItem("username") || "User",
        localStorage.getItem("role") || "user",
        appContainer,
      );
    },
  },

  login: {
    view: loginView,
    controller: async () => {
      await loginController(appContainer, loginRoot);
    },
  },
};

function handleRoute() {
  routerMiddleware(router, appContainer, loginRoot);
}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
});
