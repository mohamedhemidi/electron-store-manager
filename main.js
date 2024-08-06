// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { initializeDatabase } = require('./config/dbconfig');
const {
  CreateClient,
  GetClientsList,
  UpdateClient,
  DeleteClient,
} = require('./services/clients');
const channels = require('./constants/channels.json');
const {
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
  ReadOrdersList,
} = require('./services/orders');
const GetClientOrders = require('./services/clients/getClientOrders');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile('./app/dist/index.html');

  mainWindow.loadURL('http://localhost:5173/');
  // mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  initializeDatabase();

  // Clients
  ipcMain.on(channels.CreateClientRequest, (event, args) => CreateClient(args));
  ipcMain.on(channels.UpdateClientRequest, (event, args) => UpdateClient(args));
  ipcMain.on(channels.DeleteClientRequest, (event, args) => DeleteClient(args));
  ipcMain.on(channels.ClientsListRequest, (event, args) =>
    GetClientsList(event, args)
  );
  // Orders

  ipcMain.on(channels.CreateOrderRequest, (event, args) => CreateOrder(args));
  ipcMain.on(channels.UpdateOrderRequest, (event, args) => UpdateOrder(args));
  ipcMain.on(channels.DeleteOrderRequest, (event, args) => DeleteOrder(args));
  ipcMain.on(channels.OrdersListRequest, (event, args) =>
    ReadOrdersList(event, args)
  );
  ipcMain.on(channels.ClientOrdersListRequest, (event, args) =>
    GetClientOrders(event, args)
  );

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
