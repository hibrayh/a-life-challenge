const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    //load the index.html from a url (React apps use port 3000 as default)
    win.loadURL('http://localhost:3000')

    // Uncomment to open the DevTools when launching window.
    //win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    // MacOS prefers for applications to remain open in the background and be taken care of by the OS
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // In MacOS, pressing an application twice allows for duplication of windows, which is not a feature we desire.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
