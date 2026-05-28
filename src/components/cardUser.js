export function cardUserA(username, email, id) {
    return `
    <div class="user-card"
    style="
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:12px 16px;
    border:1px solid var(--fnd3);
    border-radius:8px;
    margin-bottom:12px;
    ">

        <article>
            <p class="username">Username: ${username}</p>
            <p class="email">Email: ${email}</p>
        </article>

        <button 
        class="btn-delete-user"
        data-id="${id}"
        style="
        background:transparent;
        border:none;
        cursor:pointer;
        font-size:1rem;
        ">
        🗑
        </button>

    </div>
    `
}