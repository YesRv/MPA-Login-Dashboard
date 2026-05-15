import { renderApp } from './UI.js';
import { productos } from './mary.js';

const app = document.getElementById('app');
app.innerHTML = renderApp();
productos()

document.querySelector("#app").innerHTML = `
<div id="app">
  <section id="loginForm" class="flex items-center justify-center min-h-screen">
    <div class="w-80 h-80 bg-indigo-200 rounded-xl flex flex-col items-center justify-center">
      <h1 class="text-center text-lg"> Welcome to my first MPA</h1>
      <form class=" flex flex-col">
        <br>
        <label for="username">Username</label>
        <input class="rounded-xl p-1 bg-emerald-50  " type="text" id="username" name="username" placeholder="
        user.123">
        <br>
        <label for="password">password</label>
        <input class="rounded-xl p-1 bg-emerald-50 text-start " type="password" id="password" name="password" placeholder="**********">
        <br>
        <button class="p-2 bg-sky-200 rounded-xl my-5   hover:bg-sky-700 text-white font-bold" id="login">Login</button>
      </form>
    </div>
  </section>
</div>
`

const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) =>{
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; 

  if (!username || !password) {
    alert ("The user does not exist");
  }
}
)