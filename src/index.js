document.addEventListener("click", (e) => {
  if (e.target.dataset.color) {
    const selectedColor = e.target.dataset.color;
    const selectedColorEl = document.querySelector(`#copied-${selectedColor}`);
    selectedColorEl.classList.remove("copied-modal-hidden");
    setTimeout(() => {
      selectedColorEl.classList.add("copied-modal-hidden");
    }, 1500);
  }
});
