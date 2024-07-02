const { ipcRenderer } = require('electron');

const qrColorInput = document.getElementById('qrColor');
const bgColorInput = document.getElementById('bgColor');
const logoSizeInput = document.getElementById('logoSize');
const logoMarginInput = document.getElementById('logoMargin');
const logoFileNameInput = document.getElementById('logoFileName');
const urlInput = document.getElementById('urlInput'); // New input field for URL
const qrCodeDisplay = document.getElementById('qrCodeDisplay');

function updateQRCode() {
  const url = urlInput.value.trim(); // Get URL input
  const logoFileName = logoFileNameInput.value.trim(); // Get logo file name input
  const logoPath = `./${logoFileName}`; // Construct logo path

  const qrOptions = {
    errorCorrectionLevel: 'H',
    color: {
      dark: qrColorInput.value,
      light: bgColorInput.value
    },
    width: 1024,
    logoSize: parseFloat(logoSizeInput.value) / 100,
    logoMargin: parseInt(logoMarginInput.value)
  };

  ipcRenderer.invoke('updateQRCode', { url, logoPath, qrOptions })
    .then(imagePath => {
      console.log("imagePath : " + imagePath);
      qrCodeDisplay.src = `file://${imagePath}`;
    })
    .catch(error => {
      console.error('Error updating QR code:', error);
    });
}

// Initial update
updateQRCode();

// Event listeners for inputs
qrColorInput.addEventListener('input', updateQRCode);
bgColorInput.addEventListener('input', updateQRCode);
logoSizeInput.addEventListener('input', updateQRCode);
logoMarginInput.addEventListener('input', updateQRCode);
logoFileNameInput.addEventListener('input', updateQRCode);
urlInput.addEventListener('input', updateQRCode); // Listen for changes in URL input

// Listen for response from main process
ipcRenderer.on('qrCodeUpdated', (event, imagePath) => {
  console.log("imagePath : " + imagePath);
  qrCodeDisplay.src = `file://${imagePath}`;
});
