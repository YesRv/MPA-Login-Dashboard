export function cartUser(name, url, price, category, country) {
  return `
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
      </div>;
`}
