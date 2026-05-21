import { renderApp } from './UI.js';
import { productos } from './mary.js';
import { sidesBar } from "./UI2.js";
import { initCarrito, agregarAlCarrito } from "./shpcart.js";

// MARY

const app = document.getElementById('app');
app.innerHTML = renderApp();
productos()

// CARLOS

const app = document.getElementById("app")
function mostrarDashboard() {
  app.innerHTML = sidesBar()
  initCarrito()
}
mostrarDashboard()