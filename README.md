# 🌐 P2P 平行世界

**无服务器存储 · 端到端直连 · 双世界(明网/暗网) 的点对点聊天室。** 网页、Windows、macOS、Linux、Android 全平台可用,打开即聊。

在线版(免安装): **https://p2p-world.pages.dev/**

## ✨ 功能

- 💬 **纯 P2P 聊天**:消息经 WebRTC DataChannel 在设备间直连,不经中心服务器存储
- 🔒 **全员隐身(暗网模式)**:一键断开公共信令,全员转入纯 P2P 通道——外部无法看到在线者,也无法收到任何通信
- 🏠 **房间隔离**:不同房间号即不同世界,互不可见
- 📎 **文件/图片直传**:64KB 分块点对点传输
- 📤 **聊天导出**:一键导出 txt
- 📱 **双端适配**:桌面与手机浏览器均可完美使用;手机可"添加到主屏幕"当 App 用

## 📦 下载(打开即用,免安装)

| 平台 | 文件 | 用法 |
|---|---|---|
| Windows | `p2p-平行世界-*.exe` (portable) | 双击即用 |
| macOS | `*.mac.zip` | 解压拖入应用程序;首次打开右键→打开(未签名) |
| Linux | `*.AppImage` | `chmod +x` 后直接运行 |
| Android | `app-debug.apk` | 允许未知来源后安装 |
| iOS | 暂无旁载安装(苹果限制) | 用 Safari 打开在线版 → 添加到主屏幕(PWA) |

> 开发版在线运行需联网加载信令 broker;桌面版同样需要网络建立 P2P 连接。

## 🔧 实现原理

```
WebRTC DataChannel ── 端到端直连(聊天/文件)
STUN ── NAT 打洞
MQTT 公共 broker ── 仅握手信令(交换连接名片), 不承载内容
暗网模式 ── 信令通道整体关闭, 纯 P2P 存活
房间号 ── MQTT topic 隔离
```

- 单文件网页(`site/index.html`),内联全部依赖,无 CDN 依赖
- Electron 桌面壳 / Capacitor 安卓壳,内核与网页版完全一致

## 🚀 从源码运行

```bash
git clone https://github.com/iamsamyiok/p2p-world.git
cd p2p-world
# 网页版: 直接用浏览器打开 site/index.html, 或
npx serve site
# 桌面版:
npm install && npm start
```

## ⚠️ 已知限制

- 隐身(暗网)模式下刷新页面,无法自动重连原隐身网络(无信令通道)
- 对称型 NAT 的严格内网可能无法打洞(可自建 TURN 解决,见 roadmap)
- 聊天记录仅存本机浏览器 localStorage

## 📄 License

MIT

## 🔥 Windows 防火墙说明(重要)

P2P 直连需要接收其他设备的入站 UDP 流量。**推荐使用"Setup 安装版"**——安装器会自动写入防火墙放行规则,安装后开箱即连。

若使用便携版(portable exe):它每次启动解压到随机临时路径,Windows 防火墙的"按路径授权"永远匹配不上,首次跨设备连接会弹"Windows 安全中心警报"——**请务必点"允许访问"**;若已误点取消,重装安装版即可修复。
