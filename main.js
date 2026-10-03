const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 820, minWidth: 360, minHeight: 560,
    title: "P2P平行世界",
    webPreferences: { contextIsolation: true, nodeIntegration: false },
    backgroundColor: "#f5f7fa",
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "site", "index.html"));
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
