export function renderApp() {
return (`
  <section id="stock" class="stock">
  <h1 class="nombre-restaurante" >Kurohana</h1>
  <div class="hero">
    <div class="mensajes">
      <p class="saludo"> Welcome to Kurohana</p>
      <p class="saludo"> Get Discount Voucher</p>
      <p>parrafito de ejemplo o promocion o yo que se</p>
    </div>
  </div>
  <article class="contenedor-1">
    <div class="contenedor-buscar">
      <div class="barra-buscar">
        <input id="inputB" type="text" placeholder= "Ingrese el nombre del producto a buscar"
        />
      </div>

      <div class="buscar">
        <button id="buscar">Buscar</button>
      </div>
    </div>

    <div class="add">
      <button id="add">Add</button>
    </div>
  </article>

  <article id="categorias" class="categorias">
    <div class="japon">
      <button id="japon">japon</button>
    </div>
    <div class="corea">
      <button id="corea">corea</button>
    </div>
    <div class="china">
      <button id="china">china</button>
    </div>

  </article>
  

  <article id="formulario" class="formulario hidden">
    <form id="formData" class="formData">     
      <div class="dato-1">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Name"
            required
          />
        </div>

        <div class="dato-2">
          <label for="price">price</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            required
          />
        </div>

        <div class="dato-3">
          <label for="category">category</label>
          <select name="category" id="category" required>
            <option value="japon">Japon</option>
            <option value="corea">Corea</option>
            <option value="china">China</option>
          </select>
        </div>

        <div class="dato-4">
          <label for="url">Photo</label>
          <input 
            type="text" 
            name="url" 
            id="url" 
            placeholder="https://ejemplo.com/mi-photo" 
            required
          />
        </div>
    </form>

    <div id="botones" class="botones">
      <div class="create">
        <button type="submit" id="create">
          create
        </button>
      </div>

      <div class="cancel">
        <button id="cancel">
          cancel
        </button>
      </div>
    </div>
  </article>

  <section id="data-container">
  </section>
</section>
  `)
}
