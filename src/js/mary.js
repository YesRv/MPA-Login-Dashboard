export function productos() {

    // Formulario
    const btnAdd = document.getElementById("add"); 
    const btnCancel = document.getElementById("cancel");
    const btnCreate = document.getElementById("create");
    const dataContainer = document.getElementById("data-container");
    const inputBuscar = document.getElementById("inputB");
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
                const { id, url, name, category, price } = element;
                const product = document.createElement("div");
                product.innerHTML =`
                <div class="producto">
                <article>
                            <h3 class="nombrecito">${name}</h3>
                        </article>
                         <figure>
                        <img src="${url}" alt="${name}" />
                            <span>Precio: ${price}</span>
                            <span class="category">${category}</span>
                        </figure>
                        <section id="actions">
                            <div>
                                <button class="btn-editar">Editar</button>
                                </div>
                            <div>
                            <button class="btn-eliminar">Eliminar</button>
                            </div>
                        </section>
                    </div>`
    
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
    
                dataContainer.appendChild(product);
            });
        } catch {dataContainer.innerHTML = "No products";}
    });
    
    // CATEGORIAS
    const japon = document.getElementById("japon");
    const corea = document.getElementById("corea");
    const china = document.getElementById("china");
    
    const contenedorCategorias = document.getElementById("categorias");

    contenedorCategorias.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const categoria = event.target.id;
            const cards = document.querySelectorAll("#data-container > div");

            cards.forEach((card) => {
                const categoryElement = card.querySelector(".category");
                if (categoryElement) {
                    const categoryText = categoryElement.textContent.toLowerCase();
                    card.style.display = categoryText === categoria ? "block" : "none";
                }
            });
        }
    });

}
