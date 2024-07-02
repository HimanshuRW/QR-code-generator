const {generateQRCodeWithHighResLogo} = require("./qr.js");

const url = 'https://yourwebsite.com/table/123';
const logoPath = 'input.svg'; // Ensure this is a high-resolution SVG file
const outputPath = 'output.png';

const options = {
  color: {
    dark: '#FF0000', // Red color for QR code
    light: '#FFFFFF' // White background color
  },
  logoSize: 0.2, // 30% of QR code size
  logoMargin: 30 // 30 pixels margin around logo
};

generateQRCodeWithHighResLogo(url, logoPath, outputPath, options);
