import sidebar from "../components/sidebar.js";
import { fetchApiData } from "../utils/utils.js";
import sidebarController from "./sidebarController.js";
import { cardUserA } from "../components/cardUser.js";

export async function initAdministrator(appContainer) {
  renderUsers();
  const inputSearch = document.getElementById("input-search");
  const btnSearch = document.getElementById("button-search");

  btnSearch.addEventListener("click", () => {
    console.log("Looking for User");
    const textSearch = (inputSearch ? inputSearch.value : "").toLowerCase();
    const users = document.querySelectorAll("#container-Users > div");
    users.forEach((user) => {
      const nameUser = user.querySelector(".username");
      const name = nameUser ? nameUser.textContent.toLowerCase() : "";
      user.style.display = name.includes(textSearch) ? "flex" : "none";
    });
  });
}

export async function renderUsers() {
  const dataContainer = document.querySelector("#container-Users");
  console.log("render users funcionando");
  console.log(dataContainer);
  if (!dataContainer) return;
  dataContainer.innerHTML = "";

  try {
    const data = await fetchApiData("/users");
    console.log(data);
    data.forEach((element) => {
      const { username, email, id, role } = element;
      const user = document.createElement("div");
      user.innerHTML = cardUserA(username, email, id, role);
      const btnDeleteUser = user.querySelector(".btn-delete-user");
      const btnRoleUser = user.querySelector(".btn-role-user");
      btnDeleteUser.addEventListener("click", async () => {
        const support = confirm(`Are you sure you want to delete ${username}?`);

        if (support) {
          const support2 = confirm(`Are you sure? It will be irreversible`);
          if (support2) {
            try {
              const response = await fetch(
                `http://localhost:3000/users/${id}`,
                { method: "DELETE" },
              );
              if (response.ok) {
                user.remove();
                alert("It was successfully removed");
              }
            } catch (e) {
              alert("There was an error deleting");
            }
          }
        }
      });

      btnRoleUser.addEventListener("click", async () => {
        const newRole = element.role === "admin" ? "user" : "admin";

        try {
          const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              role: newRole,
            }),
          });

          if (response.ok) {
            alert(`Now is ${newRole}`);

            renderUsers();
            // event.preventDefault();
          }
        } catch (error) {
          console.log(error);
        }
      });
      dataContainer.appendChild(user);
    });
  } catch (e) {
    dataContainer.innerHTML = "No users found";
  }
}
