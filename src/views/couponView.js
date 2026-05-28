export function couponView(name, description) {
  return `
  <section>
  <span class="titulito">Coupons List</span>
  <div id="container-coupons"></div>
  </section>
  <div>
    <button id="add-coupon-button" style="padding: 10px 16px; background: var(--purple-main); color: #fff; border: none; border-radius: 8px; font-family: inherit; cursor: pointer; margin-bottom: 16px;">Add Coupon</button>
    </div>

    <form id="form-data-cupon" class="form-data-cupon hidden"> 
    <div style="margin-bottom: 16px;">
    <label for="name" style="display: block; margin-bottom: 4px; color: var(--txt2);">Coupon Name</label>
    <input type="text" id="coupon-name" name="name" placeholder="Name" style="width: 100%; padding: 10px 14px; border: 1px solid var(--fnd3); border-radius: 8px; font-family: inherit; box-sizing: border-box;" required>
    </div>

    <div style="margin-bottom: 16px;">
    <label for="discount" style="display: block; margin-bottom: 4px; color: var(--txt2);">Discount</label>
    <input type="number" id="discount" name="discount" placeholder="0" style="width: 100%; padding: 10px 14px; border: 1px solid var(--fnd3); border-radius: 8px; font-family: inherit; box-sizing: border-box;" required>
    </div>

    <div style="margin-bottom: 16px;">
    <label for="description" style="display: block; margin-bottom: 4px; color: var(--txt2);">Description</label>
    <input type="text" id="description" name="description" placeholder="Description" style="width: 100%; padding: 10px 14px; border: 1px solid var(--fnd3); border-radius: 8px; font-family: inherit; box-sizing: border-box;" required>
    </div>

    <div class="container-buttons" id="container-buttons" style="display: flex; gap: 12px; margin-top: 20px;">
    <button id="create-coupon-button" type="submit" style="flex: 1; padding: 12px; background: var(--purple-main); color: #fff; border: none; border-radius: 8px; font-family: inherit; font-size: 1rem; cursor: pointer;">
    Create Coupon
    </button>

    <button id="cancel-coupon-button" type="button" style="flex: 1; padding: 12px; background: transparent; color: var(--txt2); border: 1px solid var(--fnd3); border-radius: 8px; font-family: inherit; font-size: 1rem; cursor: pointer;">
    Cancel
    </button>
    </div>
    </form>

    `;
}
