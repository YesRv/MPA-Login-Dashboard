import sidebar from "../components/sidebar.js";
import { fetchApiData } from "../utils/utils.js";
import sidebarController from "./sidebarController.js";
import { cartsCoupon } from "../components/couponsAdm.js";

export async function initCoupon(appContainer) {
  renderCoupon();
  const btnAddCoupon = document.getElementById("add-coupon-button");
  const formDataCoupon = document.getElementById("form-data-cupon");
  formDataCoupon.addEventListener("submit", sendDataCoupons);
  const btnCancelCoupon = document.getElementById("cancel-coupon-button");

  btnAddCoupon.addEventListener("click", (event) => {
    document.getElementById("form-data-cupon").classList.remove("hidden");
    btnAddCoupon.classList.add("hidden")
    document.getElementById("container-coupons").classList.add("hidden")
    document.querySelector(".titulito").classList.add("hidden")
  });

  btnCancelCoupon.addEventListener("click", (event) => {
    document.getElementById("form-data-cupon").classList.add("hidden");
    btnAddCoupon.classList.remove("hidden")
    document.getElementById("container-coupons").classList.remove("hidden")
    document.querySelector(".titulito").classList.remove("hidden")
  });
}

export async function renderCoupon() {
  console.log("Hola soy un cupon");
  const containerCoupons = document.getElementById("container-coupons");
  if (!containerCoupons) return;
  containerCoupons.innerHTML = "";

  try {
    const data = await fetchApiData("/coupons");
    data.forEach((element) => {
      const { id, name, discount, description } = element;
      const coupon = document.createElement("div");
      coupon.innerHTML = cartsCoupon(id, name, discount, description);
      const btnDeleteCoupon = coupon.querySelector(".btn-delete-coupon");

      btnDeleteCoupon.addEventListener("click", async () => {
        const support = confirm(`Are you sure you want to delete ${name}?`);
        if (support) {
          const support2 = confirm(`Are you sure? It will be irreversible`);
          if (support2) {
            try {
              const response = await fetch(
                `http://localhost:3000/coupons/${id}`,
                { method: "DELETE" },
              );
              if (response.ok) {
                coupon.remove();
                alert("It was successfully removed");
              }
            } catch (e) {
              alert("There was an error deleting");
            }
          }
        }
      });
      containerCoupons.appendChild(coupon);
    });
  } catch (e) {
    containerCoupons.innerHTML = "No coupons";
  }
}

async function sendDataCoupons(event) {
  event.preventDefault();
  const btnCreateCoupon = document.getElementById("create-coupon-button");
  if (btnCreateCoupon) btnCreateCoupon.disabled = true;

  try {
    const name = document.getElementById("coupon-name").value;
    const discount = document.getElementById("discount").value;
    const description = document.getElementById("description").value;

    const couponData = { name, discount, description };

    if (!name || !discount || !description) {
      alert("Please fill in the fields.");
      return;
    }

    let response = await fetch(`http://localhost:3000/coupons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(couponData),
    });

    if (response.ok) {
      alert("Coupon created");
      document.getElementById("form-data-cupon").reset();
    }
    renderCoupon();
  } catch (error) {
    alert("Alertaaa");
  } finally {
    if (btnCreateCoupon) btnCreateCoupon.disabled = false;
  }
}
