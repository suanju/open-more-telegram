import { join } from "path";
import { app, BrowserWindow, ipcMain } from "electron";

const url = process.env["VITE_DEV_SERVER_URL"];

let win: BrowserWindow | null;
const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      webviewTag: true,
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: true,
      preload: join(__dirname, "./preload.js"),
    },
  });

  if (url) {
    win.loadURL(url);
  } else {
    win.loadFile(join(join(__dirname, "../dist"), "index.html"));
  }

  ipcMain.on("update-userList", (event, info) => {
    console.log(event, info);
  });
};

app.whenReady().then(() => {
  createWindow();
  win?.show();
});

app.on("window-all-closed", () => {
  win = null;
  app.quit();
});
