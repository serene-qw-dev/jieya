const { app, BrowserWindow, shell } = require('electron')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 900,
    minHeight: 650,
    title: '解压研究所',
    backgroundColor: '#f6f4fb',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  })

  win.loadFile(path.join(__dirname, 'src', 'index.html'))
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
