const { contextBridge, ipcRenderer } = require('electron');

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow');
}

try {
  contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func()),
  });
} catch (error) {
  console.error(error);
}
