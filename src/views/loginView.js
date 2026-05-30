export function loginView() {
  return `
<div class="container-login">

  <div class="brand">
    <h1 class="brand-name">Kurohana</h1>
    <p class="brand-sub">Asian Cuisine</p>
  </div>

  <div class="login-tabs">
    <button class="login-tab active" data-panel="0">Login</button>
    <button class="login-tab" data-panel="1">Sign up</button>
  </div>

  <div class="slide-viewport">
    <div class="slide-track" id="slide-track">

      <article class="slide-panel" id="login-user">
        <form id="login-form">
          <label for="username">User</label>
          <input type="text" id="username" placeholder="username">

          <label for="password">Password</label>
          <input type="password" id="password" placeholder="••••••••">

          <button type="submit">Login</button>

          <p id="message-login-user"></p>
        </form>
      </article>

      <article class="slide-panel" id="login-new">
        <form id="form-new">
          <label class="label-form" for="usernameNew">User</label>
          <input type="text" id="usernameNew" placeholder="username">

          <label class="label-form" for="useremail">Email</label>
          <input type="email" id="useremail" placeholder="maria@example.com">

          <label class="label-form" for="passwordNew">Password</label>
          <input type="password" id="passwordNew" placeholder="••••••••">

          <label class="label-form" for="passwordConfirmation">Confirm Password</label>
          <input type="password" id="passwordConfirmation" placeholder="••••••••">

          <button id="adduser" type="submit">Sign Up</button>

          <p id="message-login-new"></p>
        </form>
      </article>

    </div>
  </div>

</div>
`;
}
