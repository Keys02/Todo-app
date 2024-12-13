const { app, BrowserWindow } = require('electron')
const { globalShortcut } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000
  })
  

  win.loadFile('index.html')
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow()
})

app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+R", () => {
      console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    console.log("CommandOrControl+I is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
      console.log("F5 is pressed: Shortcut Disabled");
  });
});

app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
});