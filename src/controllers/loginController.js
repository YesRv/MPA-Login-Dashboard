import { fetchApiData } from "../utils/utils.js";
import { homeView } from "../views/homeView.js";
import { initHome } from "./homeController.js";

export async function loginController(appContainer) {
  // mensajes especiales, form
  const messageLoginUser = document.getElementById("message-login-user");
  const messageLoginNew = document.getElementById("message-login-new");
  const formNew = document.getElementById("form-new");
  const formLogin = document.getElementById("login-form");

  // inputs
  // LOGIN INPUTS 
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // CREATE INPUTS
  const usernameNewInput = document.getElementById("usernameNew");
  const emailNewInput = document.getElementById("useremail");
  const passwordNewInput = document.getElementById("passwordNew");
  const passwordConfirmationInput = document.getElementById("passwordConfirmation");
  addLoginEventsListeners();

  // CUENTA ADMINISTRATIVA

  const userAdm = "Kurohana-Adm";
  const passAdm = "123456";

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (!usernameValue || !passwordValue) {
      messageLoginUser.textContent = "Please fill in all fields";
      return false;
    }

    try {
      const data = await fetchApiData("/users");

      if (userAdm === usernameValue && passAdm === passwordValue) {
        messageLoginUser.innerText = "Welcome administrator";
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("username", userAdm);
        if (appContainer) {
          appContainer.innerHTML = homeView();
          initHome(userAdm, "admin", appContainer);
        }
        return true;
      }

      // validar que el men exista
      const userExists = data.some(
        (u) => u.username === usernameValue && u.password === passwordValue
      );

      if (userExists) {
        messageLoginUser.textContent = "Welcome to Kurohana";
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", "user");
        localStorage.setItem("username", usernameValue);
        if (appContainer) {
          appContainer.innerHTML = homeView();
          initHome(usernameValue, "user", appContainer);
        }
        return true;
      }

      messageLoginUser.textContent = "Invalid username or password";
      return false;
    } catch {
      alert("Connection error — make sure JSON Server is running");
    }
  });
  // CREAR USUARIO

  formNew.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameNewInput.value.trim();
    const password = passwordNewInput.value.trim();
    const email = emailNewInput.value.trim();

    const userData = { username, email, password };

    if (!username || !password || !email) {
      messageLoginNew.innerText = "Please fill in all the fields";
      return;
    }
    const passwordConfirmation = passwordConfirmationInput.value.trim();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      formNew.reset();
      return;
    }

    try {

      // If the user fill all the fields the new user will be save on the json server
      // 1. GET all users from json-server
      const usersResponse = await fetch("http://localhost:3000/users");
      const users = await usersResponse.json();

      // 2. Validate duplicated username
      const usernameExists = users.some(
        (user) => user.username === username
      );

      if (usernameExists) {
        messageLoginNew.innerText = "This username is already taken";
        return;
      }

      // 3. Validate duplicated email
      const emailExists = users.some(
        (user) => user.email === email
      );

      if (emailExists) {
        messageLoginNew.innerText = "This email is already registered";
        return;
      }

      // 4. Create new user object
      const userData = {
        username,
        email,
        password,
      };

      // 5. Save user
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      });

      if (response.ok) {

        messageLoginNew.innerText =
          "The account was created successfully";

        const loginUser = document.getElementById("login-user");
        const loginNew = document.getElementById("login-new");

        loginUser.classList.remove("hidden");
        loginNew.classList.add("hidden");

        formNew.reset();

      } else {
        messageLoginNew.innerText = "Error creating account";
      }

    } catch {
      alert("Error Register");
    }
  });
}

function addLoginEventsListeners() {
  // contenedores del login
  const welcome = document.getElementById("welcome");
  const loginNew = document.getElementById("login-new");
  const loginUser = document.getElementById("login-user");

  // botones Welcome
  const signInButton = document.getElementById("sign-in-button");
  const signUpButton = document.getElementById("sign-up-button");

  // enlaces de span
  const toRegisterSpan = document.getElementById("to-register");
  const toLoginSpan = document.getElementById("to-login");

  // para iniciar sesion
  signInButton.addEventListener("click", () => {
    welcome.classList.add("hidden");
    loginUser.classList.remove("hidden");
  });

  // para registrarse
  signUpButton.addEventListener("click", () => {
    welcome.classList.add("hidden");
    loginNew.classList.remove("hidden");
  });

  // de registro a login
  toLoginSpan.addEventListener("click", () => {
    loginNew.classList.add("hidden");
    loginUser.classList.remove("hidden");
  });

  // de login a registo
  toRegisterSpan.addEventListener("click", () => {
    loginUser.classList.add("hidden");
    loginNew.classList.add("hidden");
    loginNew.classList.remove("hidden");
  });
}
