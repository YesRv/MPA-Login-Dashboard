// Esta es la carta de los productos a mostrar para el usuario

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
          <button class="btn-agregar">+</button>
        </div>
      </section>
    </div>
`}
