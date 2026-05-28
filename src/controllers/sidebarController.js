import { loginView } from "../views/loginView.js"
import { loginController } from "./loginController.js"
import { modalTemplate, openModal, closeModal, initModal } from "../components/modal.js"
import { settingView } from "../views/settingView.js";
import { orderView } from "../views/orderView.js";
import { initOrder } from "./orderController.js";

export default function sidebarController(appContainer) {
    const exitButton = document.getElementById("exit-btn")

    exitButton.addEventListener("click", ()=> {
        console.log("Iniciando progreso de cierre de sesión...")
        localStorage.clear();
        appContainer.innerHTML = loginView();
        loginController(appContainer);
    })

    const btnSettings = document.getElementById("btn-settings");
    btnSettings.addEventListener("click", () => {
        const settingsId = "settings-modal";
        const existing = document.getElementById(`${settingsId}-overlay`);
        if (existing) existing.remove();

        const settingsContent = settingView();

        appContainer.insertAdjacentHTML("beforeend", modalTemplate(settingsId, "Settings", settingsContent));
        initModal(settingsId);

        let currentUser = null;
        (async () => {
            const username = localStorage.getItem("username");
            try {
                const response = await fetch("http://localhost:3000/users");
                const users = await response.json();
                currentUser = users.find(u => u.username === username);
                if (currentUser) {
                    document.getElementById("modal-setting-username").value = currentUser.username;
                    document.getElementById("modal-setting-email").value = currentUser.email;
                }
            } catch (err) {
                console.error(err);
            }
        })();

        document.getElementById("modal-btn-save").addEventListener("click", async () => {
            if (!currentUser) return;
            const newUsername = document.getElementById("modal-setting-username").value;
            const newEmail = document.getElementById("modal-setting-email").value;
            const newPassword = document.getElementById("modal-setting-password").value;
            const response = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: newUsername, email: newEmail, password: newPassword })
            });
            if (response.ok) {
                localStorage.setItem("username", newUsername);
                alert("Profile updated successfully");
                closeModal(settingsId);
            } else {
                alert("Error updating profile");
            }
        });

        openModal(settingsId);
    })

    const btnAdmin = document.getElementById("btn-admin");
    if (btnAdmin) {
        btnAdmin.addEventListener("click", () => openSectionModal("admin-modal", "Administrator", appContainer));
    }

    const btnOrder = document.getElementById("btn-order");
    if (btnOrder) {
        btnOrder.addEventListener("click", () => {
            const existing = document.getElementById("order-modal-overlay");
            if (existing) existing.remove();
            appContainer.insertAdjacentHTML("beforeend", modalTemplate("order-modal", "My Orders", orderView()));
            initModal("order-modal")
            initOrder(appContainer)
            openModal("order-modal");
        });
    }

    const btnFavorite = document.getElementById("btn-favorite");
    if (btnFavorite) {
        btnFavorite.addEventListener("click", () => openSectionModal("favorite-modal", "Favorite", appContainer));
    }

    const btnCoupon = document.getElementById("btn-coupon");
    if (btnCoupon) {
        btnCoupon.addEventListener("click", () => openSectionModal("coupon-modal", "Coupon", appContainer));
    }
}

function openSectionModal(id, title, container) {
    const existing = document.getElementById(`${id}-overlay`);
    if (existing) existing.remove();
    container.insertAdjacentHTML("beforeend", modalTemplate(id, title, "<p style='color:var(--txt3);text-align:center;padding:20px 0'>Content coming soon</p>"));
    initModal(id);
    openModal(id);
}
