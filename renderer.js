const { ipcRenderer } = require('electron');

const qrColorInput = document.getElementById('qrColor');
const bgColorInput = document.getElementById('bgColor');
const logoSizeInput = document.getElementById('logoSize');
const logoMarginInput = document.getElementById('logoMargin');
const qrCodeDisplay = document.getElementById('qrCodeDisplay');

function updateQRCode() {
  const url = 'https://yourwebsite.com/table/123'; // Replace with your URL
  const logoPath = './input.svg'; // Replace with your logo path

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

// Listen for response from main process
ipcRenderer.on('qrCodeUpdated', (event, imagePath) => {
  console.log("imagePath : " + imagePath);
  // qrCodeDisplay.src = `output.png`;
  qrCodeDisplay.src = `file://${imagePath}`;
});
