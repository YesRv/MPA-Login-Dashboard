import sidebar from "../components/sidebar.js";
import sidebarController from "./sidebarController.js";

export async function  initSetting(appContainer) {
    const username = localStorage.getItem("username");
    const  sidebarContainer = document.getElementById("sidebar-container");
    sidebarContainer.innerHTML = sidebar(username, "user");
    sidebarController(appContainer);

    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const user = users.find(u => u.username === username);

    document.getElementById("setting-username").value = user.username;
    document.getElementById("setting-email").value = user.email;

    const btnSave = document.getElementById("btn-save-setting-customer");
    btnSave.addEventListener("click", async () => {
        const newUsername = document.getElementById("setting-username").value;
        const newEmail = document.getElementById("setting-email").value;
        const newPassword = document.getElementById("setting-password").value;
        
        const updateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "aplication/json" },
            body: JSON.stringify({ username: newUsername, email: newEmail, password: newPassword })
        });

        if (updateResponse.ok) {
            localStorage.setItem("username", newUsername);
            alert("Profile updated successfully");
        } else {
            alert("Error updating profile");
        }
    })
}