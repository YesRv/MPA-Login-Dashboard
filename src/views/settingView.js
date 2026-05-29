export function settingView() {

    return `
    <form id="modal-setting-form">
    <div style="margin-bottom:16px">
    <label style="display:block;margin-bottom:4px;color:var(--txt2)">User</label>
    <input type="text" id="modal-setting-username" style="width:100%;padding:10px 14px;border:1px solid var(--fnd3);border-radius:8px;font-family:inherit;box-sizing:border-box" placeholder="Username" required>
    </div>
    <div style="margin-bottom:16px">
    <label style="display:block;margin-bottom:4px;color:var(--txt2)">Email</label>
    <input type="email" id="modal-setting-email" style="width:100%;padding:10px 14px;border:1px solid var(--fnd3);border-radius:8px;font-family:inherit;box-sizing:border-box" placeholder="Email" required>
    </div>
    <div style="margin-bottom:16px">
    <label style="display:block;margin-bottom:4px;color:var(--txt2)">Password</label>
    <input type="password" id="modal-setting-password" style="width:100%;padding:10px 14px;border:1px solid var(--fnd3);border-radius:8px;font-family:inherit;box-sizing:border-box" placeholder="Password">
    </div>
    <button id="modal-btn-save" type="button" style="width:100%;padding:12px;background:var(--purple-main);color:#fff;border:none;border-radius:8px;font-family:inherit;font-size:1rem;cursor:pointer">Save</button>
    </form>
    `
}