import { contenido } from "./UI.js";
import { renderLoggin, ControllersLoggin } from "./login.js";
import { initEventListenerHome, renderProducts } from "./utils.js";

const app = document.getElementById("app");
// app.innerHTML = contenido();
app.innerHTML = renderLoggin(app);
let result = await ControllersLoggin();

if (result) {
    console.log("Mostrando la página de home")
    app.innerHTML = contenido()
    console.log("Añadiendo event listeners")
    initEventListenerHome()
    console.log("renderizando productos")
    renderProducts()
} else {
    console.log("el usuario no pudo iniciar sesión", result)
}

// SIDEBAR - SHOPPINCART

let carrito = [];

export function agregarAlCarrito(producto) {
  const existente = carrito.find((item) => item.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  renderizarCarrito();
}

function quitarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);

  renderizarCarrito();
  actualizarBadge();
}

function cambiarCantidad(id, nuevaCantidad) {
  const item = carrito.find((item) => item.id === id);

  if (!item) return;

  if (nuevaCantidad <= 0) {
    quitarDelCarrito(id);
  } else {
    item.cantidad = nuevaCantidad;
    renderizarCarrito();
    actualizarBadge();
  }
}

function actualizarTotal() {
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  const totalEl = document.getElementById("carrito-total");
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  const vacio = document.getElementById("carrito-vacio");

  if (!contenedor) return;

  const itemsAnteriores = contenedor.querySelectorAll(".carrito-item");
  itemsAnteriores.forEach((el) => el.remove());

  if (carrito.length === 0) {
    if (vacio) vacio.style.display = "block";
    actualizarTotal();
    return;
  }

  if (vacio) vacio.style.display = "none";

  carrito.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
            <div class="carrito-item-img-wrap">
                <img src="${item.url || ""}" alt="${item.nombre}" class="carrito-item-img"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
                <div class="carrito-item-img-fallback" style="display:none;">🍽️</div>
            </div>
            <div class="carrito-item-info">
                <span class="carrito-item-nombre">${item.nombre}</span>
                <span class="carrito-item-precio-unit">$${Number(item.precio).toFixed(2)} c/u</span>
                <div class="carrito-item-bottom">
                    <div class="carrito-item-controles">
                        <button class="btn-menos">−</button>
                        <span class="carrito-item-cantidad">${item.cantidad}</span>
                        <button class="btn-mas">+</button>
                    </div>
                    <button class="btn-quitar">🗑️</button>
                </div>
                <span class="carrito-item-subtotal">$${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
        `;
    div
      .querySelector(".btn-menos")
      .addEventListener("click", () =>
        cambiarCantidad(item.id, item.cantidad - 1),
      );
    div
      .querySelector(".btn-mas")
      .addEventListener("click", () =>
        cambiarCantidad(item.id, item.cantidad + 1),
      );
    div
      .querySelector(".btn-quitar")
      .addEventListener("click", () => quitarDelCarrito(item.id));
    contenedor.appendChild(div);
  });

  actualizarTotal();
  actualizarBadge();
}

function ConfirmarPedido() {
  if (carrito.length === 0) {
    return;
  }

  const total = document.getElementById("carrito-total").textContent;
  alert(`Pedido confirmado. Total: ${total}`);

  carrito = [];
  renderizarCarrito();
}

function actualizarBadge() {
  const badge = document.getElementById("carrito-fab-badge");
  const headerCount = document.getElementById("carrito-header-count");
  // if (!badge) return
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
  }
  if (headerCount) {
    headerCount.textContent = total;
  }
}

function abrirCarritoPanel() {
  const carritoEl = document.getElementById("carrito");
  const overlay = document.getElementById("carrito-overlay");
  if (carritoEl) carritoEl.classList.add("abierto");
  if (overlay) {
    overlay.classList.add("visible");
    overlay.style.display = "block";
  }
  document.body.style.overflow = "hidden";
}

function cerrarCarritoPanel() {
  const carritoEl = document.getElementById("carrito");
  const overlay = document.getElementById("carrito-overlay");
  if (carritoEl) carritoEl.classList.remove("abierto");
  if (overlay) {
    overlay.classList.remove("visible");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 300);
  }
  document.body.style.overflow = "";
}

export function initCarrito() {
  renderizarCarrito();

  const btnCheckout = document.getElementById("btn-checkout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", ConfirmarPedido);
  }

  // FAB: abrir carrito en móvil
  const fab = document.getElementById("carrito-fab");
  if (fab) fab.addEventListener("click", abrirCarritoPanel);

  // Botón cerrar dentro del panel
  const btnCerrar = document.getElementById("btn-cerrar-carrito");
  if (btnCerrar) btnCerrar.addEventListener("click", cerrarCarritoPanel);

  // Overlay: cerrar al tocar fuera
  const overlay = document.getElementById("carrito-overlay");
  if (overlay) overlay.addEventListener("click", cerrarCarritoPanel);
}

// STOCK

// Formulario
const btnCreate = document.getElementById("create");




// guarda o actualiza el producto
async function sendData() {
  btnCreate.disabled = true;
  const editingId = btnCreate.getAttribute("data-editing");

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
      // si hay ID, se EDITA
      response = await fetch(`http://localhost:3000/productos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } else {
      // si NO hay ID, se CREA
      response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    }

    if (response.ok) {
      alert(editingId ? "Updated Product" : "Product created");
      location;
    }
  } catch (error) {
    console.error(error);
  } finally {
    btnCreate.disabled = false;
  }
}

// coge los productos


// CATEGORIAS
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

initCarrito();
