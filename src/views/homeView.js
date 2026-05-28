export function homeView() {
return (`
  <aside class="aside" id="sidebar-container"></aside>
  
    <main id="app">
      <section id="shoppingCart"></section>
    </main>
  
    <!-- Overlay para cerrar el carrito en móvil -->
    <div id="carrito-overlay"></div>
  
    <!-- Botón flotante del carrito (solo visible en móvil) -->
    <button id="carrito-fab" aria-label="Ver carrito">
      🛒
      <span id="carrito-fab-badge">0</span>
    </button>
  
    <aside id="carrito" class="carrito">
  
      <div class="carrito-box carrito-box-items">
        <div class="carrito-header">
          <h2>Order Menu</h2>
          <div class="carrito-header-badge">
            🛒 <span id="carrito-header-count">0</span>
          </div>
          <button id="btn-cerrar-carrito" aria-label="Cerrar carrito">✕</button>
        </div>
        <div id="carrito-items" class="carrito-items">
          <p id="carrito-vacio" class="carrito-vacio">There are no products yet</p>
        </div>
      </div>
  
      <div class="carrito-box carrito-box-footer">
        <div class="carrito-capsula carrito-capsula-total">
          <span class="carrito-total-label">Total</span>
          <span id="carrito-total" class="carrito-total-valor">$0.00</span>
        </div>
        <button id="btn-checkout" class="carrito-capsula btn-checkout">Confirm Order</button>
      </div>
  
    </aside>
  
    <section id="stock" class="stock">
      <h1 class="nombre-restaurante">Kurohana</h1>
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
            <input id="inputB" type="text" placeholder="Enter the name of the product you are looking for" />
          </div>
  
          <div class="buscar">
            <button id="buscar">Search</button>
          </div>
        </div>
  
        <div class="add">
          <button id="add-button">Add</button>
        </div>
      </article>
  
      <article id="categorias" class="categorias">
        <div>
          <button id="home" class="cat-btn active-cat">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path
                d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9 21 9 15 12 15C15 15 15 21 15 21M9 21H15"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Home
          </button>
        </div>
        <div>
          <button id="appetizers" class="cat-btn">Appetizers</button>
        </div>
        <div>
          <button id="mainCourses" class="cat-btn">Main courses</button>
        </div>
        <div>
          <button id="desserts" class="cat-btn">Desserts</button>
        </div>
        <div>
          <button id="beverages" class="cat-btn">Beverages</button>
        </div>
      </article>
  
      <article id="formulario" class="formulario hidden">
        <form id="formData" class="formData">
          <div class="dato-1">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Name" required>
          </div>
  
          <div class="dato-2">
            <label for="price">price</label>
            <input type="number" id="price" name="price" required>
          </div>
  
          <div class="dato-3">
            <label for="category">category</label>
            <select name="category" id="category" required>
              <option value="appetizers">Appetizers</option>
              <option value="mainCourses">Main courses</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>
  
          <div class="dato-4">
            <label for="url">Photo</label>
            <input type="text" name="url" id="url" placeholder="https://ejemplo.com/mi-photo" required>
          </div>
  
          <div class="dato-5">
            <label for="country">Country</label>
            <select name="country" id="country" required>
              <option value="japan">Japan</option>
              <option value="korea">Korea</option>
              <option value="china">China</option>
            </select>
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
  
      <section id="data-container"></section>

    </section>

    <div id="modal-overlay" class="modal-overlay hidden">
      <div id="modal-order" class="modal-order">
        <div class="modal-header-order">
          <h2>Confirm Order</h2>
          <button id="btn-close-modal">✕</button>
        </div>
        <div id="modal-items"></div>
        <div id="modal-cuopon">
          <input type="text" id="input-cuopon" placeholder="Cuopon code"/>
          <button id="btn-apply-cuopon">Apply</button>
        </div>
        <p>Total: <span id="modal-total">$0.00</span></p>
        <div id="modal-payment">
          <label><input type="radio" name="payment" value="cash">Cash</label>
          <label><input type="radio" name="payment" value="transfer">Transfer</label>
        </div>
        <button id="btn-pay">Pay</button>
        <button id="btn-cancel-modal">Cancel</button>
      </div>
    </div>
  `)
}