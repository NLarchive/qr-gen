const contentInput = document.getElementById('content');
const logoInput = document.getElementById('logo-input');
const logoPreview = document.getElementById('logo-preview');
const sizeInput = document.getElementById('size');
const sizeLabel = document.getElementById('size-label');
const darkColorInput = document.getElementById('dark-color');
const lightColorInput = document.getElementById('light-color');
const generateButton = document.getElementById('generate');
const downloadButton = document.getElementById('download');
const exampleButton = document.getElementById('example');
const canvas = document.getElementById('qr-canvas');
const ctx = canvas.getContext('2d');

const defaultLogoUrl = 'logo.png';
let activeLogoUrl = defaultLogoUrl;
let logoImageLoaded = false;

const logoImage = new Image();
logoImage.src = defaultLogoUrl;
logoImage.onload = () => {
  logoImageLoaded = true;
  drawQRCode();
};
logoImage.onerror = () => {
  logoImageLoaded = false;
};

function drawQRCode() {
  const text = contentInput.value.trim();
  if (!text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const size = Number(sizeInput.value);
  const dark = darkColorInput.value;
  const light = lightColorInput.value;
  canvas.width = size;
  canvas.height = size;

  const qr = qrcode(0, 'H');
  qr.addData(text);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const tileSize = size / moduleCount;

  ctx.fillStyle = light;
  ctx.fillRect(0, 0, size, size);

  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      ctx.fillStyle = qr.isDark(row, col) ? dark : light;
      const w = Math.ceil((col + 1) * tileSize) - Math.floor(col * tileSize);
      const h = Math.ceil((row + 1) * tileSize) - Math.floor(row * tileSize);
      ctx.fillRect(Math.round(col * tileSize), Math.round(row * tileSize), w, h);
    }
  }

  if (activeLogoUrl) {
    const image = new Image();
    image.onload = () => {
      const padding = Math.max(8, Math.round(size * 0.02));
      const logoSize = Math.max(64, Math.min(180, Math.round(size * 0.22)));
      const x = Math.round((size - logoSize) / 2);
      const y = Math.round((size - logoSize) / 2);

      ctx.save();
      ctx.fillStyle = light;
      ctx.fillRect(x - padding, y - padding, logoSize + padding * 2, logoSize + padding * 2);
      ctx.drawImage(image, x, y, logoSize, logoSize);
      ctx.restore();
    };
    image.onerror = () => {
      console.warn('No se pudo cargar el logo', activeLogoUrl);
    };
    image.src = activeLogoUrl;
  }
}

function updateLogo(url) {
  activeLogoUrl = url || defaultLogoUrl;
  logoPreview.src = activeLogoUrl;
  drawQRCode();
}

logoInput.addEventListener('change', (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) {
    updateLogo(defaultLogoUrl);
    return;
  }

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    updateLogo(loadEvent.target.result);
  };
  reader.readAsDataURL(file);
});

sizeInput.addEventListener('input', () => {
  sizeLabel.textContent = sizeInput.value;
  drawQRCode();
});

darkColorInput.addEventListener('input', drawQRCode);
lightColorInput.addEventListener('input', drawQRCode);
contentInput.addEventListener('input', drawQRCode);

generateButton.addEventListener('click', drawQRCode);

downloadButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'qr-logo.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

exampleButton.addEventListener('click', () => {
  contentInput.value = 'https://www.bardetodos.es/';
  updateLogo(defaultLogoUrl);
});

window.addEventListener('load', () => {
  sizeLabel.textContent = sizeInput.value;
  updateLogo(defaultLogoUrl);
});
