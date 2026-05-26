import { loginView } from "../views/loginView.js"
import { loginController } from "./loginController.js"

export default function sidebarController(appContainer) {
    const exitButton = document.getElementById("exit-btn")

    exitButton.addEventListener("click", ()=> {
        console.log("Iniciando progreso de cierre de sesión...")
        localStorage.clear();

        appContainer.innerHTML = loginView();
        loginController(appContainer);

    })
}
