const { app, BrowserWindow } = require("electron");
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 1100, height: 760, show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false } });
  win.webContents.on("console-message", (e, level, msg, line, src) => {
    console.log("[CONSOLE]", String(msg).slice(0, 220));
  });
  win.webContents.on("render-process-gone", (e, d) => console.log("[GONE]", d.reason));
  win.loadFile("site/index.html", { hash: "probe-exe" });
  setTimeout(() => {
    win.webContents.executeJavaScript(`JSON.stringify({
      protocol: location.protocol,
      secureCtx: window.isSecureContext,
      subtle: typeof crypto.subtle,
      mqttType: typeof mqttClient,
      mqttConnected: (typeof mqttClient !== "undefined" && mqttClient) ? mqttClient.connected : null,
      roomId: (typeof roomId !== "undefined") ? roomId : null
    })`).then(r => { console.log("[STATE]", r); }).catch(e => console.log("[STATE-ERR]", e.message.slice(0,150)));
    setTimeout(() => { app.quit(); }, 2500);
  }, 12000);
});
