export function modalTemplate(id, title, content) {
  return `
    <div id="${id}-overlay" class="modal-overlay hidden">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" data-modal-close="${id}">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
      </div>
    </div>
  `;
}

export function openModal(id) {
  const overlay = document.getElementById(`${id}-overlay`);
  if (overlay) overlay.classList.remove("hidden");
}

export function closeModal(id) {
  const overlay = document.getElementById(`${id}-overlay`);
  if (overlay) overlay.classList.add("hidden");
}

export function initModal(id) {
  const overlay = document.getElementById(`${id}-overlay`);
  if (!overlay) return;

  const closeBtn = overlay.querySelector("[data-modal-close]");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal(id));
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(id);
  });
}
