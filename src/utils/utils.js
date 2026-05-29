const API_URL = "http://localhost:3000";


// Función generica para obtener todos los datos de la api
// Recibe como argumento path, que es básicamente /users, /data, /products
export async function fetchApiData(path) {

    const response = await fetch(API_URL + path);
    const data = await response.json();

    return data
}

// Función para enviar datos a la base de datos
export async function sendData() {
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
      response = await fetch(`${API_URL}/productos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } else {
      // si NO hay ID, se CREA
      response = await fetch(`${API_URL}/productos`, {
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

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}