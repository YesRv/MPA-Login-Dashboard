export function settingView() {
return(`
     <aside class="aside" id="sidebar-container"></aside>
    <main id="app">
      <section id="settingCustomer">
            <article id="formsSettingCustomer" class="formsCustomer">
            <div class="settingCustomer-1">
                <label for="userCustomer">User Customer</label>
                <input type="text" id="setting-username" name="userCustomer" placeholder="User Customer" required>
            </div>
            <div class="settingCustomer-2">
                <label for="emailCustomer">Email Customer</label>
                <input type="email" id="setting-email" name="email" placeholder="Email Customer" required>
            </div>
            <div class="settingCustomer-3">
                <label for="paswordCustomer">Password Customer</label>
                <input type="password" id="setting-password" name="password" placeholder="Password Customer" required>
            </div>
            </article>
            <article id="btn-save-setting">
            <button id="btn-save-setting-customer" aria-label="Save">✔️</button>
            </article>
      </section>
    </main>
`)
}
