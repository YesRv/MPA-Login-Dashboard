export async function initOrder(appContainer) {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();

    const orderContainer = document.getElementById("order-container");

    // Admin: ve todas las órdenes agrupadas por usuario
    if (role === "admin") {
        if (orders.length === 0) {
            orderContainer.innerHTML = "<p style='color:var(--txt3);text-align:center;padding:20px 0'>No orders yet</p>";
            return;
        }

        // Agrupar por username
        const grouped = orders.reduce((acc, order) => {
            const user = order.username || "Unknown";
            if (!acc[user]) acc[user] = [];
            acc[user].push(order);
            return acc;
        }, {});

        Object.entries(grouped).forEach(([user, userOrders]) => {
            const userSection = document.createElement("div");
            userSection.style.cssText = "margin-bottom: 24px;";
            userSection.innerHTML = `
                <h3 style="color: var(--color1); border-bottom: 2px solid var(--fnd3); padding-bottom: 8px; margin-bottom: 12px;">
                    👤 ${user}
                </h3>
            `;

            userOrders.forEach((order) => {
                const div = document.createElement("div");
                div.style.cssText = "background: var(--fnd3); border-radius: 12px; padding: 14px; margin-bottom: 10px;";
                div.innerHTML = `
                    <p style="font-weight:700; margin: 0 0 6px; color: var(--color1);">Order ${order.nombre || "#" + order.id}</p>
                    <p style="margin:2px 0; font-size:13px;">📅 ${new Date(order.fecha).toLocaleDateString()}</p>
                    <p style="margin:2px 0; font-size:13px;">💳 ${order.metodoPago}</p>
                    <p style="margin:2px 0; font-size:13px; font-weight:700;">💰 Total: $${order.total}</p>
                    <ul style="margin: 8px 0 0; padding-left: 18px; font-size:12px;">
                        ${order.items.map(item => `<li>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</li>`).join("")}
                    </ul>
                `;
                userSection.appendChild(div);
            });

            orderContainer.appendChild(userSection);
        });

    // Usuario normal: solo sus propias órdenes
    } else {
        const userOrders = orders.filter(order => order.username === username);

        if (userOrders.length === 0) {
            orderContainer.innerHTML = "<p style='color:var(--txt3);text-align:center;padding:20px 0'>You have no orders yet</p>";
            return;
        }

        userOrders.forEach((order) => {
            const div = document.createElement("div");
            div.style.cssText = "background: var(--fnd3); border-radius: 12px; padding: 14px; margin-bottom: 10px;";
            div.innerHTML = `
                <p style="font-weight:700; margin: 0 0 6px; color: var(--color1);">Order ${order.nombre || "#" + order.id}</p>
                <p style="margin:2px 0; font-size:13px;">📅 ${new Date(order.fecha).toLocaleDateString()}</p>
                <p style="margin:2px 0; font-size:13px;">💳 ${order.metodoPago}</p>
                <p style="margin:2px 0; font-size:13px; font-weight:700;">💰 Total: $${order.total}</p>
                <ul style="margin: 8px 0 0; padding-left: 18px; font-size:12px;">
                    ${order.items.map(item => `<li>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</li>`).join("")}
                </ul>
            `;
            orderContainer.appendChild(div);
        });
    }
}