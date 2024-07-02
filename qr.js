const QRCode = require('qrcode');
const sharp = require('sharp');

async function generateQRCodeWithHighResLogo(url, logoPath, outputPath) {
  try {
    // Define QR code options
    const qrOptions = {
      errorCorrectionLevel: 'H',
      color: {
        dark: '#0A74DA', // Dark sky blue color
        light: '#FFFFFF' // White background
      },
      width: 1024 // Higher width for better quality
    };

    // Generate QR code
    const qrCodeBuffer = await QRCode.toBuffer(url, qrOptions);

    // Load the QR code buffer with sharp
    const qrImage = sharp(qrCodeBuffer);

    // Get QR code metadata
    const qrMetadata = await qrImage.metadata();

    // Load and resize the logo image with sharp for high-quality processing
    const logoBuffer = await sharp(logoPath)
      .resize(Math.floor(qrMetadata.width / 4), Math.floor(qrMetadata.height / 4), {
        fit: sharp.fit.contain,
        kernel: sharp.kernel.lanczos3 // Use a high-quality resampling kernel
      })
      .png() // Convert to PNG format for compatibility
      .toBuffer();

    // Create a white background for the logo with margin
    const logoSize = Math.floor(qrMetadata.width / 4);
    const margin = 20; // Adjust margin as needed
    const logoWithMargin = await sharp({
      create: {
        width: logoSize + margin,
        height: logoSize + margin,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
      }
    })
      .composite([{ input: logoBuffer, top: margin / 2, left: margin / 2 }])
      .png() // Ensure output is in PNG format for compatibility
      .toBuffer();

    // Composite the logo onto the QR code
    const compositeImage = await qrImage
      .composite([
        {
          input: logoWithMargin,
          top: Math.floor((qrMetadata.height - logoSize - margin) / 2),
          left: Math.floor((qrMetadata.width - logoSize - margin) / 2)
        }
      ])
      .png() // Ensure output is in PNG format for compatibility
      .toBuffer();

    // Save the resulting image
    await sharp(compositeImage).toFile(outputPath);
    console.log('High-quality QR code with high-resolution logo generated successfully!');
  } catch (error) {
    console.error('Error generating high-quality QR code with high-resolution logo:', error);
  }
}

// Example usage
const url = 'https://yourwebsite.com/table/123';
// const logoPath = './imgs/Yologo1.png'; // Ensure this is a high-resolution SVG file
const logoPath = 'input.svg'; // Ensure this is a high-resolution SVG file
const outputPath = 'output.png';

generateQRCodeWithHighResLogo(url, logoPath, outputPath);
