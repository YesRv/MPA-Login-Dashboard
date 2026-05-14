// Formulario
const btnAdd = document.getElementById("add"); 
const btnCancel = document.getElementById("cancel");
const btnCreate = document.getElementById("create");
const dataContainer = document.getElementById("data");
const inputBuscar = document.querySelector("input");
const btnBuscar = document.getElementById("buscar");

// boton para añadir
btnAdd.addEventListener("click", () =>{
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
    document.getElementById("formData").reset();
    btnCreate.textContent = "create";
    btnCreate.removeAttribute("data-editing");
}

// busca el producto
btnBuscar.addEventListener("click", async () => {
    const texto = inputBuscar.value.toLowerCase();
    const cards = document.querySelectorAll("#data-container > div");

    cards.forEach((card) => {
        const nombre = card.querySelector("h3").textContent.toLowerCase();
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

        const productData = { url, name, category, price };

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
            alert(editingId ? "Producto actualizado" : "Producto creado");
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
    const containerData = document.getElementById("data-container");
    try {
        const data = await getData();
        data.forEach((element) => {
            const { id, url, name, category, price } = element;
            const product = document.createElement("div");
            product.innerHTML = `
                <div class="bg-olive-100 p-3 rounded rounded-lg flex flex-col items-center space-y-2">    
                    <article><h3 class="text-2xl font-bold">${name}</h3></article>
                    <figure class="flex flex-col items-center space-y-2 h-60 w-64 md:w-100">
                        <img class="md:w-200 lg:max-h-40 w-50 object-cover" src="${url}" alt="${name}"/>    
                        <span class="text-lg text-stone-500">Precio: ${price}</span>
                        <span>${category}</span>
                    </figure>
                    <section id="actions" class="flex justify-around w-full">
                        <div>
                            <button class="btn-editar bg-orange-300 hover:bg-amber-500 hover:text-stone-100 px-5 py-2 rounded">Editar</button>
                        </div>    
                        <div>
                            <button class="btn-eliminar bg-red-400 hover:text-stone-100 hover:bg-red-600 px-5 py-2 rounded">Eliminar</button>
                        </div>    
                    </section>
                </div>`;

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

                btnCreate.textContent = "Actualizar";
                btnCreate.setAttribute("data-editing", id); // ID en el boton
            });

            containerData.appendChild(product);
        });
    } catch {
        containerData.innerHTML = "No products";
    }
});