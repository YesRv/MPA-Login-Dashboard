import { loginView } from "../views/loginView.js"
import { loginController } from "./loginController.js"
import { settingView } from "../views/settingView.js"
import { initSetting } from "./settingsController.js"

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
        appContainer.innerHTML = settingView();
        initSetting(appContainer);
    })
}
 