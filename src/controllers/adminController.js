import sidebar from "../components/sidebar.js";
import { fetchApiData } from "../utils/utils.js";
import sidebarController from "./sidebarController.js";
import { cardUserA } from "../components/cardUser.js";

export async function initAdministrator(appContainer) {
    renderUsers();
    const inputSearch = document.getElementById("input-search");
    const btnSearch = document.getElementById("button-search");

    btnSearch.addEventListener("click", () => {
        console.log("Looking for User")
        const textSearch = (inputSearch ? inputSearch.value : "").toLowerCase();
        const users = document.querySelectorAll("#container-Users > div");
        users.forEach((user) => {
            const nameUser = user.querySelector(".username");
            const name = nameUser ? nameUser.textContent.toLowerCase() : "";
            user.style.display = name.includes(textSearch) ? "flex" : "none"
        });
    });
}

export async function renderUsers() {
    const dataContainer = document.querySelector("#container-Users");
    console.log("render users funcionando");
    console.log(dataContainer);
    if (!dataContainer) return;
    dataContainer.innerHTML = "";    

    try{
        const data = await fetchApiData("/users");
        console.log(data);
        data.forEach((element) => {
            const { username, email, id } = element;
            const user = document.createElement("div");
            user.innerHTML = cardUserA(username, email, id);
            const btnDeleteUser = user.querySelector(".btn-delete-user");
            btnDeleteUser.addEventListener("click", async () =>{

                const support = confirm(`Are you sure you want to delete ${username}?`)
                
                if (support){
                    const support2 = confirm(`Are you sure? It will be irreversible`);
                    if (support2) {
                        try{
                            const response = await fetch(`http://localhost:3000/users/${id}`, 
                                { method: "DELETE"},
                            );
                            if (response.ok){
                                user.remove();
                                alert("It was successfully removed");
                                
                            }
                        } catch (e) {
                            alert("There was an error deleting");
                        }
                    }
                }
            });
            dataContainer.appendChild(user);
        })
    } catch (e) {
        dataContainer.innerHTML = "No users found"
    }
}
