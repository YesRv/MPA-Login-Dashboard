import { loginView } from "./views/loginView.js";
import { loginController } from "./controllers/loginController.js";

import { homeView } from "./views/homeView.js";
import { initHome } from "./controllers/homeController.js";

const appContainer = document.getElementById("app");

// SIDEBAR - SHOPPINCART

// STOCK

// Formulario
const btnCreate = document.getElementById("create");

const contenedorCategorias = document.getElementById("categorias");

function aplicarFiltro(categoria) {
  const cards = document.querySelectorAll("#data-container > div");
  cards.forEach((card) => {
    if (categoria === "home") {
      card.style.display = "block";
      return;
    }
    const categoryElement = card.querySelector(".category");
    if (categoryElement) {
      const categoryText = categoryElement.textContent.toLowerCase();
      card.style.display = categoryText === categoria ? "block" : "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // acá se guarda la sesión del usuario
  const userLogin = localStorage.getItem("auth");

  // si no está logeado, entonces, renderizamos el formulario de registro
  if (!userLogin) {
    appContainer.innerHTML = loginView();

    // importante, llamar al controlador, este maneja toda la lógica de login
    console.log("Usuario no autenticado, renderizando vista de login.")
    loginController(appContainer);
  } else {
    // si lo está, entonces, mostramos la vista de home
    console.log("Renderizando vista de home.")
    appContainer.innerHTML = homeView();
    initHome();
  }
});
