export async function initOrder(appContainer) {
    const username = localStorage.getItem("username");

    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();
    const userOrders = orders.filter(order => order.username === username);

    const orderContainer = document.getElementById("order-container");

    if (userOrders.length === 0) {
        orderContainer.innerHTML = "<p>You have no orders yet</p>";
        return;
    }

    userOrders.forEach((order) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <h3>Order #${order.id}</h3>
            <p>Date: ${new Date(order.fecha).toLocaleDateString()}</p>
            <p>Payment: ${order.metodoPago}</p>
            <p>Total: $${order.total}</p>
            <ul>
                ${order.items.map((item) => `<li>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</li>`).join("")}
            </ul>
        `;
        orderContainer.appendChild(div);   
    });
}