const { app, BrowserWindow } = require("electron");
const path = require("path");
let results = [];
app.whenReady().then(() => {
  // 两个实例同机: 一个房间A发起, 一个房间A响应
  const mk = (hash, label) => {
    const w = new BrowserWindow({ show: false, webPreferences: { contextIsolation: true, nodeIntegration: false } });
    w.webContents.on("console-message", (e, l, m) => { if (/加入|连接|error|Error|fail/i.test(m)) console.log(`[${label}]`, String(m).slice(0,120)); });
    w.loadFile(path.join(__dirname, "site", "index.html"), { hash });
    return w;
  };
  mk("probe-lan", "A");
  setTimeout(() => mk("probe-lan", "B"), 2500);
  setTimeout(async () => {
    for (const w of app ? [] : []) {}
    // 从B实例读用户数
    const wins = BrowserWindow.getAllWindows();
    const r = await wins[1].webContents.executeJavaScript(`JSON.stringify({
      online: document.getElementById("online-count").innerText,
      channels: Object.keys(dataChannels).length,
      dcStates: Object.values(dataChannels).map(d=>d.readyState)
    })`).catch(e => "ERR:" + e.message.slice(0,100));
    console.log("[B实例状态]", r);
    setTimeout(() => app.quit(), 2000);
  }, 15000);
});
