import { fetchApiData } from "../utils/utils.js";
import { homeView } from "../views/homeView.js";
import { initHome } from "./homeController.js";
import { hashPassword } from "../utils/utils.js";

export async function loginController(appContainer, loginRoot) {
  // mensajes especiales, form
  const messageLoginUser = document.getElementById("message-login-user");
  const messageLoginNew = document.getElementById("message-login-new");
  const formNew = document.getElementById("form-new");
  const formLogin = document.getElementById("login-form");

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
        window.location.hash = "#home";
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
        window.location.hash = "#home";
        return true;
      }

      messageLoginUser.textContent = "Invalid username or password";
      return false;
    } catch {
      alert("Connection error — make sure JSON Server is running");
    }
  });

  // CUENTA PARA USERS - LOGIN

  const hashedInputPassword =
    await hashPassword(passwordValue);

  const userExists = data.some(
    (u) =>
      u.username === usernameValue &&
      u.password === hashedInputPassword
  );

  if (userExists) {

    messageLoginUser.textContent =
      "Welcome to Kurohana";

    localStorage.setItem("auth", "true");
    localStorage.setItem("role", "user");
    localStorage.setItem("username", usernameValue);
    loginRoot.innerHTML = "";
      appContainer.innerHTML = homeView();
      initHome(usernameValue, "user", appContainer);
        return true;

    if (appContainer) {

      appContainer.innerHTML = homeView();

      initHome(
        usernameValue,
        "user",
        appContainer
      );

    }

    return true;
  }

    messageLoginUser.textContent =
      "Invalid username or password";

    return false;






  // CREAR USUARIO
  formNew.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameNewInput.value.trim();
    const password = passwordNewInput.value.trim();
    const email = emailNewInput.value.trim();

    const hashedPassword = await hashPassword(password);
    const userData = { username, email, password: hashedPassword };

    if (!username || !password || !email) {
      messageLoginNew.innerText = "Please fill in all the fields";
      return;
    }

    const passwordConfirmation = passwordConfirmationInput.value.trim();
    if (password !== passwordConfirmation) {
      alert("Passwords don't match");
      formNew.reset();
      return;
    }
    // If the user fill all the fields the new user will be save on the json
    try {
      const usersResponse = await fetch("http://localhost:3000/users");
      const users = await usersResponse.json();

      // Validate duplicated username
      const usernameExists = users.some((user) => user.username === username);

      if (usernameExists) {
        messageLoginNew.innerText = "This username is already taken";
        return;
      }

      // Validate duplicated email
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        messageLoginNew.innerText = "This email is already registered";
        return;
      }


      // Save user
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        messageLoginNew.innerText = "The account was created successfully";
        const tabs = document.querySelectorAll(".login-tab");
        // trigger the first tab click so UI classes and heights update consistently
        if (tabs && tabs[0]) tabs[0].click();
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
  const track = document.getElementById("slide-track");
  const tabs = document.querySelectorAll(".login-tab");
  const viewport = document.querySelector('.slide-viewport');
  const panels = document.querySelectorAll('.slide-panel');
  let currentIndex = 0;

  function updateViewportHeight(index) {
    if (!viewport || !panels || !panels[index]) return;
    const h = panels[index].offsetHeight;
    viewport.style.height = h + 'px';
  }

  function slideTo(index) {
    if (!track) return;
    track.style.transform = `translateX(${ -index * 100 }%)`;
    tabs.forEach((t, i) => t.classList.toggle("active", i === index));
    currentIndex = index;
    updateViewportHeight(index);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => slideTo(i));
  });

  const toRegisterSpan = document.getElementById("to-register");
  if (toRegisterSpan) toRegisterSpan.addEventListener("click", () => slideTo(1));

  const toLoginSpan = document.getElementById("to-login");
  if (toLoginSpan) toLoginSpan.addEventListener("click", () => slideTo(0));

  // initialize viewport height to the first panel
  updateViewportHeight(0);

  // adjust height on window resize
  window.addEventListener('resize', () => updateViewportHeight(currentIndex));
}