const carrito = [];

export function initCarrito() {
    document.getElementById("btn-checkout").addEventListener("click", () => {
        if (carrito.length === 0) return alert("El carrito está vacío");
        alert("¡Pedido confirmado!");
        carrito.length = 0;
        renderCarrito();
    });
}

export function agregarAlCarrito(producto) {
    const existente = carrito.find(p => p.id === producto.id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    renderCarrito();
}

function renderCarrito() {
    const container = document.getElementById("carrito-items");
    const vacio = document.getElementById("carrito-vacio");
    const totalEl = document.getElementById("carrito-total");

    container.querySelectorAll(".carrito-item").forEach(el => el.remove());

    if (carrito.length === 0) {
        vacio.style.display = "block";
        totalEl.textContent = "$0.00";
        return;
    }

    vacio.style.display = "none";

    let total = 0;

    carrito.forEach(producto => {
        total += producto.price * producto.cantidad;

        const item = document.createElement("div");
        item.classList.add("carrito-item");
        item.innerHTML = `
            <img src="${producto.url}" alt="${producto.name}" />
            <div class="carrito-item-info">
                <span class="carrito-item-name">${producto.name}</span>
                <span class="carrito-item-price">$${(producto.price * producto.cantidad).toFixed(2)}</span>
            </div>
            <div class="carrito-item-controls">
                <button class="btn-menos">-</button>
                <span>${producto.cantidad}</span>
                <button class="btn-mas">+</button>
            </div>
            <button class="btn-eliminar-item">✕</button>
        `;

        item.querySelector(".btn-mas").addEventListener("click", () => {
            producto.cantidad++;
            renderCarrito();
        });

        item.querySelector(".btn-menos").addEventListener("click", () => {
            producto.cantidad--;
            if (producto.cantidad === 0) {
                carrito.splice(carrito.indexOf(producto), 1);
            }
            renderCarrito();
        });

        item.querySelector(".btn-eliminar-item").addEventListener("click", () => {
            carrito.splice(carrito.indexOf(producto), 1);
            renderCarrito();
        });

        container.appendChild(item);
    });

    totalEl.textContent = `$${total.toFixed(2)}`;
}