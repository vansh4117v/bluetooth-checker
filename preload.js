const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bluetoothAPI", {
  check: () => ipcRenderer.invoke("check-bluetooth"),
});
