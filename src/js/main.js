import { contenido } from './UI.js';

const app = document.getElementById("app");
app.innerHTML = contenido()

// // LOGIN CONTROL

// const form = document.getElementById("loginForm");


// const usernameInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");


// const message = document.getElementById("message");


// // Login validation
// form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const usernameValue = usernameInput.value.trim();
//     const passwordValue = passwordInput.value.trim();


//     if (!usernameValue || !passwordValue) {

//         message.textContent = "Todos los campos son obligatorios";

//         return;
//     }


//     try {

//         // search user on json-server
//         const response = await fetch("http://localhost:3000/kurohana");
//         const users = await response.json();

//         // Search user
//         const userFound = users.find((user) => {
//             return (user.username === usernameValue && user.password === passwordValue);
//         });


//         // login validation
//         if (userFound) {

//             message.textContent = "Login exitoso";

//             // Save user on localStorage
//             localStorage.setItem("user", JSON.stringify(userFound));

//             console.log(userFound);

//         } else {

//             message.textContent = "Usuario o contraseña incorrectos";

//         }

//     } catch (error) {

//         message.textContent = "Error al conectar con el servidor";

//         console.log(error);

//     }

// });

// SIDEBAR - SHOPPINCART

let carrito = [];


export function agregarAlCarrito(producto)  {
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    renderizarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id)

    renderizarCarrito()
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

function renderizarCarrito() {
    const contenedor = document.getElementById("carrito-items")
    const vacio = document.getElementById("carrito-vacio")

    if (!contenedor) return 

    const itemsAnteriores = contenedor.querySelectorAll(".carrito-item")
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
            <div class="carrito-item-img-wrap">
                <img src="${item.url || ''}" alt="${item.nombre}" class="carrito-item-img"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
                <div class="carrito-item-img-fallback" style="display:none;">🍽️</div>
            </div>
            <div class="carrito-item-info">
                <span class="carrito-item-nombre">${item.nombre}</span>
                <span class="carrito-item-precio-unit">$${Number(item.precio).toFixed(2)} c/u</span>
                <div class="carrito-item-controles">
                    <button class="btn-menos">−</button>
                    <span class="carrito-item-cantidad">${item.cantidad}</span>
                    <button class="btn-mas">+</button>
                </div>
            </div>
            <div class="carrito-item-right">
                <button class="btn-quitar">🗑️</button>
                <span class="carrito-item-subtotal">$${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
        `
        div.querySelector(".btn-menos").addEventListener("click", () =>
            cambiarCantidad(item.id, item.cantidad - 1))
        div.querySelector(".btn-mas").addEventListener("click", () =>
            cambiarCantidad(item.id, item.cantidad + 1))
        div.querySelector(".btn-quitar").addEventListener("click", () =>
            quitarDelCarrito(item.id))
        contenedor.appendChild(div)
    })

    actualizarTotal()
    actualizarBadge()
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

function actualizarBadge() {
    const badge = document.getElementById("carrito-fab-badge")
    if (!badge) return
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    badge.textContent = total
    badge.style.display = total > 0 ? "flex" : "none"
}

function abrirCarritoPanel() {
    const carritoEl = document.getElementById("carrito")
    const overlay = document.getElementById("carrito-overlay")
    if (carritoEl) carritoEl.classList.add("abierto")
    if (overlay) {
        overlay.classList.add("visible")
        overlay.style.display = "block"
    }
    document.body.style.overflow = "hidden"
}

function cerrarCarritoPanel() {
    const carritoEl = document.getElementById("carrito")
    const overlay = document.getElementById("carrito-overlay")
    if (carritoEl) carritoEl.classList.remove("abierto")
    if (overlay) {
        overlay.classList.remove("visible")
        setTimeout(() => { overlay.style.display = "none" }, 300)
    }
    document.body.style.overflow = ""
}

export function initCarrito() {
    renderizarCarrito()

    const btnCheckout = document.getElementById("btn-checkout")
    if (btnCheckout) {
        btnCheckout.addEventListener("click", ConfirmarPedido)
    }

    // FAB: abrir carrito en móvil
    const fab = document.getElementById("carrito-fab")
    if (fab) fab.addEventListener("click", abrirCarritoPanel)

    // Botón cerrar dentro del panel
    const btnCerrar = document.getElementById("btn-cerrar-carrito")
    if (btnCerrar) btnCerrar.addEventListener("click", cerrarCarritoPanel)

    // Overlay: cerrar al tocar fuera
    const overlay = document.getElementById("carrito-overlay")
    if (overlay) overlay.addEventListener("click", cerrarCarritoPanel)
}

// STOCK

// Formulario
    const btnAdd = document.getElementById("add-button"); 
    const btnCancel = document.getElementById("cancel");
    const btnCreate = document.getElementById("create");
    const dataContainer = document.getElementById("data-container");
    const inputBuscar = document.getElementById("inputB");
    const btnBuscar = document.getElementById("buscar");
    
    // boton para añadir
    btnAdd.addEventListener("click", (event) =>{
        console.log("se precionó el botón: ", event)
        resetForm();
        document.getElementById("formulario").classList.remove("hidden");
    });
    
    // boton para cerrar
    btnCancel.addEventListener("click", () =>{
        document.getElementById("formulario").classList.add("hidden");
        resetForm();
    });
    
    // limpia el formulario
    function resetForm() {
        document.getElementById("formData").reset(); //aca falta
        btnCreate.textContent = "create";
        btnCreate.removeAttribute("data-editing");
    }
    
    // busca el producto
    btnBuscar.addEventListener("click", async () => {
        const texto = inputBuscar.value.toLowerCase();
        const cards = document.querySelectorAll("#data-container > div");
    
        cards.forEach((card) => {
            const nombre = card.querySelector(".nombrecito").textContent.toLowerCase();
            if(nombre.includes(texto)){
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
    
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
                location.reload();
            }
        } catch (error) {
            console.error(error);
        } finally {
            btnCreate.disabled = false;
        }
    }
    
    // Un solo listener para evitar duplicados
    btnCreate.addEventListener("click", (event) => {
        event.preventDefault();
        sendData();
    });
    
    // coge los productos
    async function getData() {
        const response = await fetch("http://localhost:3000/productos");
        const data = await response.json();
        return data;
    }
    
    // muestra el producto
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const data = await getData();
            data.forEach((element) => {
                const { id, url, name, category, price, country } = element;
                const product = document.createElement("div");
                product.innerHTML = `
                <div class="producto">
                    <article>
                        <h3 class="nombrecito">${name}</h3>
                    </article>
                    <figure>
                        <img src="${url}" alt="${name}" />
                        <span>Price: $${price}</span>
                        <span class="category">${category}</span>
                        <span class="country">${country}</span>
                    </figure>
                    <section id="actions">
                        <div>
                            <button class="btn-agregar">Add</button> 
                        </div>
                        <div>
                            <button class="btn-editar">Edit</button>
                        </div>
                        <div>
                            <button class="btn-eliminar">Delete</button>
                        </div>
                    </section>
                </div>`;

                // agregar
                product.querySelector(".btn-agregar").addEventListener("click", () => {
                    agregarAlCarrito({id, nombre: name, precio: Number(price), url });
                });
    
                // eliminar
                product.querySelector(".btn-eliminar").addEventListener("click", async () => {
                    const confirmar = confirm(`¿Estas seguro de que quieres eliminar a ${name}?`);
                    if (confirmar) {
                        const confirmar2 = confirm(`¿Seguro? Sera irreversible`);
                        if (confirmar2) {
    
                            try {
                                const response = await fetch(`http://localhost:3000/productos/${id}`, { method: "DELETE" });
                                if (response.ok) {
                                    product.remove();
                                    alert("Se elimino correctamente");
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }
                });
    
                // carga los datos del producto a editar
                product.querySelector(".btn-editar").addEventListener("click", () => {
                    document.getElementById("formulario").classList.remove("hidden");
                    document.getElementById("url").value = url;
                    document.getElementById("name").value = name;
                    document.getElementById("category").value = category;
                    document.getElementById("price").value = price;
                    document.getElementById("country").value = country;
    
                    btnCreate.textContent = "Actualizar";
                    btnCreate.setAttribute("data-editing", id); // ID en el boton
                });
    
                dataContainer.appendChild(product);
            });
        } catch {dataContainer.innerHTML = "No products";}
        // Aplicar filtro activo después de cargar las cards
        const btnActivo = document.querySelector(".cat-btn.active-cat");
        if (btnActivo) aplicarFiltro(btnActivo.id);
    });
    
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

    contenedorCategorias.addEventListener("click", (event) => {
        const btn = event.target.closest("button.cat-btn");
        if (!btn) return;

        // Cambiar clase activa
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active-cat"));
        btn.classList.add("active-cat");

        aplicarFiltro(btn.id.toLowerCase());
    });

initCarrito();