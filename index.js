const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("./react-app/dist/index.html");
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle("check-bluetooth", async () => {
  return new Promise((resolve) => {
    exec('powershell "Get-PnpDevice -Class Bluetooth | Select-Object Status"', (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        resolve("error");
        return;
      }
      const okCount = (stdout.match(/OK/g) || []).length;
      const isOn = okCount > 1;
      if (isOn) {
        resolve("on");
      } else {
        resolve("off");
      }
    });
  });
});
