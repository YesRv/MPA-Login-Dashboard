export function loginView() {
  return `
<div class="container-login">

  <div class="brand">
    <h1 class="brand-name">Kurohana</h1>
    <p class="brand-sub">cocina asiática</p>
  </div>

  <div class="login-tabs">
    <button class="login-tab active" data-panel="0">Sign in</button>
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

          <button type="submit">Sign In</button>

          <div class="form-footer">
            <p>Don't you have an account? <span id="to-register">Sign Up</span></p>
          </div>

          <p id="message-login-user"></p>
        </form>
      </article>

      <article class="slide-panel" id="login-new">
        <form id="form-new">
          <label for="usernameNew">User</label>
          <input type="text" id="usernameNew" placeholder="username">

          <label for="useremail">Email</label>
          <input type="email" id="useremail" placeholder="maria@example.com">

          <label for="passwordNew">Password</label>
          <input type="password" id="passwordNew" placeholder="••••••••">

          <label for="passwordConfirmation">Confirm Password</label>
          <input type="password" id="passwordConfirmation" placeholder="••••••••">

          <div class="col-span-1 space-y-2">
            <label for="profileRol">Choose a rol profile</label>
            <select id="profileRol" name="profileRol" required>
              <option value="white">Choose...</option>
              <option value="user">USER</option>
              <option value="blue">ADMIN</option>
            </select>
          </div>

          <button id="adduser" type="submit">Sign Up</button>

          <div class="form-footer-New">
            <p>Do you have an account? <span id="to-login">Sign In</span></p>
          </div>

          <p id="message-login-new"></p>
        </form>
      </article>

    </div>
  </div>

</div>
`;
}
