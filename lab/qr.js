const QRCode = require('qrcode');
const Jimp = require('jimp');

async function generateQRCodeWithLogo(url, logoPath, outputPath) {
  try {
    // Generate QR code
    const qrCodeBuffer = await QRCode.toBuffer(url, { errorCorrectionLevel: 'H' });

    // Load QR code image
    const qrImage = await Jimp.read(qrCodeBuffer);

    // Load logo image
    const logo = await Jimp.read(logoPath);

    // Resize logo
    const logoSize = qrImage.bitmap.width / 5; // Adjust the size as needed
    logo.resize(logoSize, logoSize);

    // Calculate logo position
    const x = (qrImage.bitmap.width - logoSize) / 2;
    const y = (qrImage.bitmap.height - logoSize) / 2;

    // Composite the logo onto the QR code
    qrImage.composite(logo, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1,
      opacityDest: 1,
    });

    // Save the resulting image
    await qrImage.writeAsync(outputPath);
    console.log('QR code with logo generated successfully!');
  } catch (error) {
    console.error('Error generating QR code with logo:', error);
  }
}

// Example usage
const url = 'https://yourwebsite.com/table/123';
const logoPath = './imgs/circleLogo1.png';
const outputPath = 'qr_with_logo.png';

generateQRCodeWithLogo(url, logoPath, outputPath);
