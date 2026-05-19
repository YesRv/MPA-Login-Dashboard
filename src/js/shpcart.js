let carrito = [];


export function agregarAlCarrito(producto)  {
    const existente = carrito.find(item => item.idd === producto.id);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    renderizarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id)

    renderCarrito()
}

function cambiarCantidad(id, nuevaCantidad) {
    const item = carrito.find(item => item.id === id)

    if (!item) return

    if (nuevaCantidad <= 0) {
        quitarDelCarrito(id)
    } else {
        item.cantidad = nuevaCantidad
        renderizarCarrito()
    }
}

function actualizarTotal() {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    
    const totalEl = document.getElementById("carrito-total")
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`
}

// export function initCarrito() {
//     document.getElementById("btn-checkout").addEventListener("click", () => {
//         if (carrito.length === 0) return alert("El carrito está vacío");
//         alert("¡Pedido confirmado!");
//         carrito.length = 0;
//         renderCarrito();
//     });
// }

function renderizarCarrito() {
    const contenedor = document.getElementById("carrito-item")
    const vacio = document.getElementById("carrito-vacio")

    if (!contenedor) return 

    const itemsAnteriores = contenedor.querySelectorAll("carrito-item")
    itemsAnteriores.forEach(el => el.remove())

    if (carrito.length === 0) {
        if (vacio) vacio.style.display = "block"
        actualizarTotal()
        return
    }

    if (vacio) vacio.style.display = "none"
    
    carrito.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("carrito-item")
        div.innerHTML = `
            <span>${item.nombre}</span>
            <div>
                <button data-id="{item.id}" class="btn-menos">-</button>
                <span>${item.cantidad}</span>
                <button data-id="{item.id}" class="btn-mas">+</button>
            </div>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            <button data-id="${item.id}" class="btn-quitar">🗑️</button>
        `

        div.querySelector(".btn-menos").addEventListener("click", ()=>  
            cambiarCantidad(item.id, item.cantidad - 1))

        div.querySelector(".btn-mas").addEventListener("click", () => 
            cambiarCantidad(item.id, item.cantidad + 1))

        div.querySelector(".btn-quitar").addEventListener("click", () => 
            quitarDelCarrito(item.id))

        contenedor.appendChild(div)
    })

    actualizarTotal()
}

function ConfirmarPedido() {
    if (carrito.length === 0) {
        return
    }
    
    const total = document.getElementById("carrito-total").textContent
    alert(`Pedido confirmado. Total: ${total}`)

    carrito = []
    renderizarCarrito()
}

export function initCarrito() {
    renderizarCarrito()

    const btnCheckout = document.getElementById("btn-checkout")
    if (btnCheckout) {
        btnCheckout.addEventListener("click", ConfirmarPedido)
    }
}
