import { fetchApiData, hashPassword } from "../utils/utils.js";
import { homeView } from "../views/homeView.js";
import { initHome } from "./homeController.js";

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
  const passwordConfirmationInput = document.getElementById(
    "passwordConfirmation",
  );

  addLoginEventsListeners();

  if (!formLogin || !usernameInput || !passwordInput) {
    return;
  }

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (!usernameValue || !passwordValue) {
      messageLoginUser.textContent = "Please fill in all fields";
      return false;
    }

    try {
      const users = await fetchApiData("/users");
      const hashedInputPassword = await hashPassword(passwordValue);
      console.log("Pass: ", hashedInputPassword)
      const user = users.find(
        (u) =>
          u.username === usernameValue && u.password === hashedInputPassword,
      );

      if (!user) {
        messageLoginUser.textContent = "Invalid username or password";
        return false;
      }

      const role = user.role || "user";
      messageLoginUser.textContent = `Welcome ${role === "admin" ? "administrator" : "to Kurohana"}`;
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("username", usernameValue);
      loginRoot.innerHTML = "";
      const targetHash = "#home";
      const currentHash = window.location.hash;
      window.location.hash = targetHash;
      if (currentHash === targetHash) {
        window.dispatchEvent(new Event("hashchange"));
      }
      return true;
    } catch (error) {
      console.error(error);
      alert("Connection error — make sure JSON Server is running");
    }
  });

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
    // If the user fill all the fields the new user will be saved in the JSON API
    try {
      const users = await fetchApiData("/users");

      const usernameExists = users.some((user) => user.username === username);
      if (usernameExists) {
        messageLoginNew.innerText = "This username is already taken";
        return;
      }

      const emailExists = users.some((user) => user.email === email);
      if (emailExists) {
        messageLoginNew.innerText = "This email is already registered";
        return;
      }

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, role: "user" }),
      });

      if (response.ok) {
        messageLoginNew.innerText = "The account was created successfully";
        const tabs = document.querySelectorAll(".login-tab");
        if (tabs && tabs[0]) tabs[0].click();
        formNew.reset();
      } else {
        messageLoginNew.innerText = "Error creating account";
      }
    } catch (error) {
      console.error(error);
      alert("Error registering new user");
    }
  });
}

function addLoginEventsListeners() {
  const track = document.getElementById("slide-track");
  const tabs = document.querySelectorAll(".login-tab");
  const viewport = document.querySelector(".slide-viewport");
  const panels = document.querySelectorAll(".slide-panel");
  let currentIndex = 0;

  function updateViewportHeight(index) {
    if (!viewport || !panels || !panels[index]) return;
    const h = panels[index].offsetHeight;
    viewport.style.height = h + "px";
  }

  function slideTo(index) {
    if (!track) return;
    track.style.transform = `translateX(${-index * 100}%)`;
    tabs.forEach((t, i) => t.classList.toggle("active", i === index));
    currentIndex = index;
    updateViewportHeight(index);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => slideTo(i));
  });

  const toRegisterSpan = document.getElementById("to-register");
  if (toRegisterSpan)
    toRegisterSpan.addEventListener("click", () => slideTo(1));

  const toLoginSpan = document.getElementById("to-login");
  if (toLoginSpan) toLoginSpan.addEventListener("click", () => slideTo(0));

  // initialize viewport height to the first panel
  updateViewportHeight(0);

  // adjust height on window resize
  window.addEventListener("resize", () => updateViewportHeight(currentIndex));
}
