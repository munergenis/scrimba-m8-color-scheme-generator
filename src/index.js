const inputColorEl = document.querySelector("#input-color");
const inputModeEl = document.querySelector("#input-mode");
const colorDisplayElArray = document.querySelectorAll(".color-display");
const colorValElArray = document.querySelectorAll(".color-val");

// Event listeners
document.addEventListener("click", (e) => {
  if (e.target.id === "get-btn") {
    handleGetColorsClick();
  } else if (e.target.dataset.color) {
    copyColorToClipboard(e.target.dataset.color);
  }
});

// Functions
function handleGetColorsClick() {
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
}

function getHexColorNumber() {
  let hexValue = inputColorEl.value;
  hexValue = hexValue.split("");
  hexValue.shift();
  hexValue = hexValue.join("");
  return hexValue;
}

function copyColorToClipboard(color) {
  const colorVal = getColorVal(color);
  navigator.clipboard.writeText(colorVal)
    .then(() => showModalInColor(color), () => alert("Failed to copy"))
  ;
}

function getColorVal(color) {
  const colorValIndex = Number(color.split("").pop()) - 1;
  return colorValElArray[colorValIndex].textContent;
}

function showModalInColor(color) {
  const selectedColorEl = document.querySelector(`#copied-${color}`);
  selectedColorEl.classList.remove("copied-modal-hidden");
  setTimeout(() => {
    selectedColorEl.classList.add("copied-modal-hidden");
  }, 1500);
}
