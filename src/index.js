const { app, BrowserWindow } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 195,
    frame: false,
    alwaysOnTop: false,
    skipTaskbar: true,
    fullscreen: false,
    resizable: false,
    transparent: true,
    movable: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  setInterval(() => {
    if (mainWindow) {
      mainWindow.setSkipTaskbar(true);
    }
  }, 5*1000);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  win.on('enter-full-screen', () => {
    win.setFullScreen(false)
  })

  win.on('maximize', () => {
    win.unmaximize()
  })

  const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  win.setBounds({
    x: 0,
    y: 0,
    width: width,
    height: height
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.