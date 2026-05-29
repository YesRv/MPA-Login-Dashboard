export default async function routerMiddleware(routes, appContainer, loginRoot) {
  const userAuth = localStorage.getItem("auth") === "true";
  const currentHash = window.location.hash.replace("#", "");
  const path = currentHash || "home";
  const route = routes[path];

  if (!route) {
    loginRoot.innerHTML = "";
    appContainer.innerHTML = `
      <div class="not-found" style="padding: 3rem; text-align: center; color: var(--txt3);">
        <h1>Page not found</h1>
        <p>The route <strong>${path}</strong> does not exist.</p>
        <a href="#home" style="color: var(--color4);">Go back to Home</a>
      </div>
    `;
    return;
  }

  if (!userAuth && path !== "login") {
    window.location.hash = "#login";
    return;
  }

  if (userAuth && path === "login") {
    window.location.hash = "#home";
    return;
  }

  if (path === "login") {
    appContainer.innerHTML = "";
    loginRoot.innerHTML = routes.login.view();
    await routes.login.controller(appContainer, loginRoot);
    return;
  }

  loginRoot.innerHTML = "";
  appContainer.innerHTML = route.view();
  await route.controller(appContainer, loginRoot);
}
