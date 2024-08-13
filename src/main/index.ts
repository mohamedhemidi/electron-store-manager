import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { ClientCreate, ClientListRead, ClientUpdate, ClientDelete } from './services/clients'
import { setupDatabase } from './config/DBconfig'
import channels from '@shared/constants/channels'
import { setupTables } from './models'
import { OrderCreate, OrderDelete, OrderListRead, OrderUpdate } from './services/orders'
import ClientOrdersRead from './services/clients/ClientOrdersRead'
import GenerateTiquetPDF from './services/tiquet/GenerateTiquetPDF'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false,
    center: true,
    title: 'Store',
    // frame: false,
    // vibrancy: 'under-window',
    // visualEffectState: 'active',
    // autoHideMenuBar: true,
    // titleBarStyle: 'hidden',
    // trafficLightPosition: { x: 15, y: 10 },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

setupDatabase()

setupTables()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test

  /*
  / Clients
  /** */
  ipcMain.on(channels.CreateClientRequest, (_event, args) => ClientCreate(args))
  ipcMain.on(channels.ClientsListRequest, (event, args) => ClientListRead(event, args))
  ipcMain.on(channels.UpdateClientRequest, (_event, args) => ClientUpdate(args))
  ipcMain.on(channels.DeleteClientRequest, (_event, args) => ClientDelete(args))
  ipcMain.on(channels.ClientOrdersListRequest, (event, args) => ClientOrdersRead(event, args))

  /*
  / Orders
  /** */

  ipcMain.on(channels.CreateOrderRequest, (_event, args) => OrderCreate(args))
  ipcMain.on(channels.UpdateOrderRequest, (_event, args) => OrderUpdate(args))
  ipcMain.on(channels.DeleteOrderRequest, (_event, args) => OrderDelete(args))
  ipcMain.on(channels.OrdersListRequest, (event, args) => OrderListRead(event, args))

  /*
  / PDF Print
  /** */

  ipcMain.on(channels.PrintTiquetPdf, async (event, args) => GenerateTiquetPDF(event, args))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
