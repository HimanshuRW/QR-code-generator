const QRCode = require('qrcode');
const sharp = require('sharp');

async function generateQRCodeWithHighResLogo(url, logoPath, outputPath, options = {}) {
  try {
    // Define default QR code options
    const defaultQROptions = {
      errorCorrectionLevel: 'H',
      color: {
        dark: '#0A74DA', // Dark sky blue color
        light: '#FFFFFF' // White background
      },
      width: 1024, // Higher width for better quality
      logoSize: 0.25, // Default logo size as a percentage of QR code size
      logoMargin: 20 // Default logo margin in pixels
    };

    // Merge default options with provided options
    const mergedOptions = { ...defaultQROptions, ...options };

    // Generate QR code
    const qrCodeBuffer = await QRCode.toBuffer(url, mergedOptions);

    // Load QR code buffer with Sharp
    const qrImage = sharp(qrCodeBuffer);
    const qrMetadata = await qrImage.metadata();

    // Load and resize the logo image
    const logoBuffer = await sharp(logoPath)
      .resize({
        width: Math.floor(qrMetadata.width * mergedOptions.logoSize),
        height: Math.floor(qrMetadata.height * mergedOptions.logoSize),
        fit: sharp.fit.contain,
        kernel: sharp.kernel.lanczos3
      })
      .toBuffer();

    // Create white background for the logo with margin
    const logoSize = Math.floor(qrMetadata.width * mergedOptions.logoSize);
    const margin = mergedOptions.logoMargin;
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

    // Composite logo onto QR code
    const compositeImage = await qrImage
      .composite([
        {
          input: logoWithMargin,
          top: Math.floor((qrMetadata.height - logoSize - margin) / 2),
          left: Math.floor((qrMetadata.width - logoSize - margin) / 2)
        }
      ])
      .toBuffer();

    // Save resulting image
    await sharp(compositeImage).toFile(outputPath);
    console.log('High-quality QR code with high-resolution logo generated successfully!');
  } catch (error) {
    console.error('Error generating high-quality QR code with high-resolution logo:', error);
  }
}

module.exports = { generateQRCodeWithHighResLogo };