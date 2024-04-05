const inputColorEl = document.querySelector("#input-color");
const inputModeEl = document.querySelector("#input-mode");
const colorDisplayElArray = document.querySelectorAll(".color-display");
const colorValElArray = document.querySelectorAll(".color-val");

document.addEventListener("click", (e) => {
  if (e.target.id === "get-btn") {
    const selectedColor = getHexColorNumber();
    const selectedMode = inputModeEl.value;
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}`)
      .then(resp => resp.json())
      .then(data => {
        for (const color in data.colors) {
          colorDisplayElArray[color].style.backgroundColor = data.colors[color].hex.value;
          colorValElArray[color].textContent = data.colors[color].hex.value;
        }
      });
  } else if (e.target.dataset.color) {
    const selectedColor = e.target.dataset.color;
    const selectedColorEl = document.querySelector(`#copied-${selectedColor}`);
    selectedColorEl.classList.remove("copied-modal-hidden");
    setTimeout(() => {
      selectedColorEl.classList.add("copied-modal-hidden");
    }, 1500);
  }
});

function getHexColorNumber() {
  let hexValue = inputColorEl.value;
  hexValue = hexValue.split("");
  hexValue.shift();
  hexValue = hexValue.join("");
  return hexValue;
}
