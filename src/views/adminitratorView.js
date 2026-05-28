export function adminitratorView(){
    return`
    <div>
        <h1 style="font-family: inherit; color: var(--txt1); margin-bottom: 16px; font-size: 1.8rem; font-weight: 600;">User List</h1>
    </div>

    <div class="container-search" style="display: flex; gap: 12px; align-items: center; width: 100%; box-sizing: border-box; margin-bottom: 20px;">
        <div class="search-bar" style="flex: 1;">
            <input id="input-search" type="text" placeholder="Enter the name of the user you are looking for" style="width: 100%; padding: 10px 14px; border: 1px solid var(--fnd3); border-radius: 8px; font-family: inherit; box-sizing: border-box;" />
        </div>

        <div>
            <button id="button-search" style="padding: 10px 20px; background: var(--purple-main); color: #fff; border: none; border-radius: 8px; font-family: inherit; font-size: 1rem; cursor: pointer; white-space: nowrap;">
                Search
            </button>
        </div>
    </div>

    <div id="container-Users" class="container-Users">
    </div>
    `
}