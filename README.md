# QR Code Generator

## Overview

This project is a QR code generator that allows you to customize QR codes with logos, colors, and sizes. It is built using Electron for the front-end interface and Node.js with Sharp for image processing.

## Features

- Generate QR codes with custom URLs.
- Customize QR code color and background color.
- Embed a high-resolution logo into the QR code.
- Adjust logo size and margin within the QR code.
- Preview generated QR codes in real-time.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/HimanshuRW/QR-code-generator.git
   cd QR-Code-Generator
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Install Electron globally:

   ```bash
   npm install -g electron
   ```
4. Set the execution policy to allow running scripts (required on Windows):

   - Open PowerShell as an administrator.
   - Run the following command:
        ```powershell
        Set-ExecutionPolicy RemoteSigned
        ```
   - You might be prompted to confirm the change. Enter Y for Yes.
   - Verify the change by running:
        ```powershell
        Get-ExecutionPolicy
        ```
        It should return RemoteSigned.
5. Verify the Electron installation:

    ```bash
    electron --version
    ```
## Usage
1. Input the URL and customize QR code settings in the left panel.
2. Adjust QR code color, background color, logo size, and margin using the controls provided.
3. The generated QR code will display in the right panel.
4. Optionally, save the generated QR code using the "Save" button.
## Running the Application
To start the Electron application, run the following command in your project directory:

```bash
npm start
```
## Configuration

- Logo File: Specify the name of the logo file in the input box. The default is input.svg.
- URL: Set the URL that the QR code will point to. The default is https://yourwebsite.com/table/123.
