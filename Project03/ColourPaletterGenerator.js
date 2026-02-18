const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.getElementById("palette-container");

generateBtn.addEventListener("click", generatePalette);

// Generate on page load
document.addEventListener("DOMContentLoaded", generatePalette);

function generatePalette() {
  const fragment = document.createDocumentFragment();
  paletteContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const color = generateRandomColor();
    fragment.appendChild(createColorBox(color));
  }

  paletteContainer.appendChild(fragment);
}

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase();
}

function createColorBox(color) {
  const col = document.createElement("div");
  col.className = "col-md-2 col-sm-4 col-6";

  col.innerHTML = `
    <div class="card color-box shadow-sm">
      <div class="color" style="background:${color}"></div>
      <div class="card-body d-flex justify-content-between align-items-center p-2">
        <span class="hex-value">${color}</span>
        <i class="far fa-copy text-secondary copy-btn"></i>
      </div>
    </div>
  `;

  col.querySelector(".color-box").addEventListener("click", () => {
    copyToClipboard(color);
  });

  return col;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied " + text + " ✔");
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "position-fixed bottom-0 end-0 p-3";
  toast.innerHTML = `
    <div class="toast show align-items-center text-bg-success border-0">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto"></button>
      </div>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}
