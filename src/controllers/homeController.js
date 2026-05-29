import { fetchApiData } from "../utils/utils.js";
import { agregarAlCarrito, initCarrito } from "./cartController.js";
import { cartAdmnistrator } from "../components/cartAdm.js";
import { cartUser } from "../components/cartUser.js";
import sidebar from "../components/sidebar.js";
import sidebarController from "./sidebarController.js";
import { paginate } from "../components/pagination.js";

let currentPage = 1;
let itemsPerPage = 12;
let filteredProducts = [];

function resetForm(btnCreate) {
  const form = document.getElementById("formData");
  if (form) form.reset();
  if (btnCreate) {
    btnCreate.textContent = "create";
    btnCreate.removeAttribute("data-editing");
  }
}

// function aplicarFiltro(categoria) {
//   const cards = document.querySelectorAll("#data-container > div");
//   cards.forEach((card) => {
//     if (categoria === "home") {
//       card.style.display = "block";
//       return;
//     }
//     const categoryElement = card.querySelector(".category");
//     if (categoryElement) {
//       const categoryText = categoryElement.textContent.toLowerCase();
//       card.style.display = categoryText === categoria ? "block" : "none";
//     }
//   });
// }

export async function renderProducts(role) {
  console.log("Renderizando productos");
  const itemsPerPage = role === "admin" ? 10 : 12;
  const dataContainer = document.getElementById("data-container");
  if (!dataContainer) return;
  dataContainer.innerHTML = "";
  try {
    const data = await fetchApiData("/productos");
    if (filteredProducts.length === 0) {
      filteredProducts = data;
    }
    const paginateProducts = paginate(
      filteredProducts,
      currentPage,
      itemsPerPage,
    );
    paginateProducts.forEach((element) => {
      const { id, url, name, category, price, country } = element;
      const product = document.createElement("div");
      product.innerHTML = cartAdmnistrator(name, url, price, category, country);
      if (role === "admin") {
        product.innerHTML = cartAdmnistrator(
          name,
          url,
          price,
          category,
          country,
        );
      } else {
        product.innerHTML = cartUser(name, url, price, category, country);
      }

      if (role === "admin") {
        // eliminar
        product
          .querySelector(".btn-eliminar")
          .addEventListener("click", async () => {
            const confirmar = confirm(
              `Are you sure you want to delete ${name}?`,
            );
            if (confirmar) {
              const confirmar2 = confirm(
                `Are you sure? It will be irreversible`,
              );
              if (confirmar2) {
                try {
                  const response = await fetch(
                    `http://localhost:3000/productos/${id}`,
                    { method: "DELETE" },
                  );
                  if (response.ok) {
                    product.remove();
                    alert("It was successfully removed");
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            }
          });

        // editar
        product.querySelector(".btn-editar").addEventListener("click", () => {
          document.getElementById("formulario").classList.remove("hidden");
          document.getElementById("url").value = url;
          document.getElementById("name").value = name;
          document.getElementById("category").value = category;
          document.getElementById("price").value = price;
          document.getElementById("country").value = country;

          const btnCreate = document.getElementById("create");
          if (btnCreate) {
            btnCreate.textContent = "Update";
            btnCreate.setAttribute("data-editing", id);
          }
        });
      } else {
        product.querySelector(".btn-agregar").addEventListener("click", () => {
          agregarAlCarrito({ id, nombre: name, precio: Number(price), url });
        });
      }
      dataContainer.appendChild(product);
    });
  } catch (err) {
    dataContainer.innerHTML = "No products";
  }

  // Aplicar filtro activo después de cargar las cards
  const btnActivo = document.querySelector(".cat-btn.active-cat");
  if (btnActivo) aplicarFiltro(btnActivo.id);
}

async function sendData() {
  const btnCreate = document.getElementById("create");
  if (btnCreate) btnCreate.disabled = true;
  const editingId = btnCreate ? btnCreate.getAttribute("data-editing") : null;

  try {
    const url = document.getElementById("url").value;
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const country = document.getElementById("country").value;

    const productData = { url, name, category, price, country };

    if (!url || !name || !category || !price || !country) {
      alert("Please fill in the fields.");
      return;
    }

    let response;
    if (editingId) {
      response = await fetch(`http://localhost:3000/productos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } else {
      response = await fetch(`http://localhost:3000/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    }

    if (response.ok) {
      alert(editingId ? "Updated Product" : "Product created");
      resetForm(btnCreate);
      await renderProducts();
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (btnCreate) btnCreate.disabled = false;
  }
}

export function initHome(username, isAdmin, appContainer) {
  // Elementos
  const btnCreate = document.getElementById("create");
  const inputBuscar = document.getElementById("inputB");
  const btnBuscar = document.getElementById("buscar");
  const btnNext = document.getElementById("next-page");
  const btnPrev = document.getElementById("prev-page");
  const btnAdd = document.getElementById("add-button");
  if (isAdmin !== "admin") {
    btnAdd.style.display = "none";
  }
  if (isAdmin === "admin") {
    const carritoEl = document.getElementById("carrito");
    const carritoFab = document.getElementById("carrito-fab");
    const carritoOverlay = document.getElementById("carrito-overlay");
    if (carritoEl) carritoEl.style.display = "none";
    if (carritoFab) carritoFab.style.display = "none";
    if (carritoOverlay) carritoOverlay.style.display = "none";

    const appEl = document.getElementById("app");
    if (appEl) appEl.classList.add("sin-carrito");
  }
  const btnCancel = document.getElementById("cancel");
  const contenedorCategorias = document.getElementById("categorias");

  const sidebarContainer = document.getElementById("sidebar-container");

  sidebarContainer.innerHTML = sidebar(username, isAdmin);

  // iniciar el controlador del sidebar
  sidebarController(appContainer);

  // iniciar carrito
  initCarrito();

  // mostrar formulario
  if (btnAdd)
    btnAdd.addEventListener("click", () => {
      resetForm(btnCreate);
      document.getElementById("formulario").classList.remove("hidden");
    });

  if (btnCancel)
    btnCancel.addEventListener("click", () => {
      document.getElementById("formulario").classList.add("hidden");
      resetForm(btnCreate);
    });

  if (btnBuscar)
    btnBuscar.addEventListener("click", () => {
      // const texto = (inputBuscar ? inputBuscar.value : "").toLowerCase();
      // const cards = document.querySelectorAll("#data-container > div");
      // cards.forEach((card) => {
      //   const nombreEl = card.querySelector(".nombrecito");
      //   const nombre = nombreEl ? nombreEl.textContent.toLowerCase() : "";
      //   card.style.display = nombre.includes(texto) ? "block" : "none";
      // });
      const texto = (inputBuscar ? inputBuscar.value : "").toLowerCase();

      fetchApiData("/productos").then((data) => {
        filteredProducts = data.filter((product) =>
          product.name.toLowerCase().includes(texto),
        );

        currentPage = 1;

        renderProducts(isAdmin);
      });
    });

  if (btnNext)
    btnNext.addEventListener("click", () => {
      currentPage++;
      renderProducts(isAdmin);
    });

  if (btnPrev)
    btnPrev.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts(isAdmin);
      }
    });

  if (btnCreate)
    btnCreate.addEventListener("click", (e) => {
      e.preventDefault();
      sendData();
    });

  if (contenedorCategorias)
    contenedorCategorias.addEventListener("click", (event) => {
      const btn = event.target.closest("button.cat-btn");
      if (!btn) return;
      document
        .querySelectorAll(".cat-btn")
        .forEach((b) => b.classList.remove("active-cat"));
      btn.classList.add("active-cat");
      const categoria = btn.id.toLowerCase();

      fetchApiData("/productos").then((data) => {
        if (categoria === "home") {
          filteredProducts = data;
        } else {
          filteredProducts = data.filter(
            (product) => product.category.toLowerCase() === categoria,
          );
        }

        currentPage = 1;

        renderProducts(isAdmin);
      });
    });

  // render inicial de productos
  renderProducts(isAdmin);
}

export default { initHome, renderProducts };
