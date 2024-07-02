const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { generateQRCodeWithHighResLogo } = require('./qr');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      reloadIgnoringCache: true // Force reload ignoring cache
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open DevTools
  // mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

ipcMain.handle('updateQRCode', async (event, { url, logoPath, qrOptions }) => {
  try {
    await deleteOutputFiles();
    const outputPath = path.join(__dirname, 'output' + new Date().getTime() + '.png'); // Example output path
    await generateQRCodeWithHighResLogo(url, logoPath, outputPath, qrOptions);
    return outputPath;
  } catch (error) {
    throw error;
  }
});


async function deleteOutputFiles() {
  const directoryPath = './'; // Replace with your directory path

  try {
      const files = await fs.promises.readdir(directoryPath);

      for (const file of files) {
          if (file.startsWith('output') && (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.svg'))) {
              const filePath = path.join(directoryPath, file);
              await fs.promises.unlink(filePath);
              console.log(`Deleted file: ${filePath}`);
          }
      }

      console.log('Deletion completed.');
  } catch (error) {
      console.error('Error deleting files:', error);
  }
}