export function cartsCoupon(id, name, discount, description){
    return`
    <div class="coupon" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1px solid var(--fnd3); border-radius: 8px; margin-bottom: 12px; box-sizing: border-box; width: 100%;">

    <article style="display: flex; align-items: baseline; gap: 12px; margin: 0;">
    <h3 class="name-coupon" style="margin: 0; font-size: 1.1rem; font-weight: 600; color: var(--txt1);">${name}</h3>
    <p style="margin: 0; color: var(--txt2); font-size: 0.9rem;">${description}</p>
    </article>

    <div>
    <button class="btn-delete-coupon" data-id="${id}" style="background: transparent; color: var(--txt2); border: none; font-size: 1rem; font-weight: bold; cursor: pointer; padding: 4px 8px; line-height: 1;">
    🗑
    </button>
    </div>
    </div>
    `
}