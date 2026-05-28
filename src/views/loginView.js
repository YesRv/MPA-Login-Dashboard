export function loginView() {
  return `
<div class="container-login">
    <div class="brand">
        <h1 class="brand-name">Kurohana</h1>
        <p class="brand-sub">cocina asiática</p>
    </div>
    <br>
    <div id="welcome" class="welcome">
        <h2>Welcome Back!</h2> <p class="text-welcome">Enter personal</p>
        <button id="sign-in-button">Login</button>
        <button id="sign-up-button">Sign Up</button>
    </div>

    <article id="login-new" class="container-loginNew hidden">
        <form id="form-new">
            <label for="usernameNew">User</label>
            <input type="text" id="usernameNew" placeholder="username" >

            <label for="useremail">Email</label>
            <input type="email" id="useremail" placeholder="maria@example.com" >

            <label for="passwordNew">Password</label>
            <input type="password" id="passwordNew" placeholder="••••••••" >

            <label for="password">Confirm Password</label>
            <input type="password" id="passwordConfirmation" placeholder="••••••••" >

            <div class="col-span-1 space-y-2" >
              <label for="rol">Choose a rol profile</label>
                  <select id="profileRol"
                  name="profileRol"
                  id="rol"
                  class="w-full border border-gray-200 rounded-lg p-2"
                  required
                  >
                      <option value="white">Choose...</option>
                      <option value="user" >USER</option>
                      <option value="blue" >ADMIN</option>
                  </select> 
            </div>

            <button id="adduser" type="submit">Sign Up</button>

            <div class="form-footer-New">
                <p>Do you have an account? <span id="to-login" style="cursor:pointer; color:blue;">Sign In</span></p>
            </div>

            <p id="message-login-new"></p>
        </form>
    </article>

    <article id="login-user" class="container-loginForm hidden">
        <form id="login-form">
            <label for="username">User</label>
            <input type="text" id="username" placeholder="username" >

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" >

            <button type="submit">Sign In</button>

            <div class="form-footer">
                <p>Don't you have an account? <span id="to-register" style="cursor:pointer; color:blue;">Sign Up</span></p>
            </div>

            <p id="message-login-user"></p>
        </form>
    </article>
</div>
`;
}