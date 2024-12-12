import { ipcMain, screen, globalShortcut, app, BrowserWindow } from "electron";
import { fileURLToPath as fileURLToPath$1 } from "node:url";
import path$1 from "node:path";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
const WindowBaseConfig = {
  width: 600,
  height: 400
};
function screenEvent(mainWindow2) {
  ipcMain.on("search-input-event", (_, type) => {
    if (type === "show") {
      mainWindow2.setResizable(true);
      mainWindow2.setSize(600, 300);
      mainWindow2.setResizable(false);
    } else {
      mainWindow2.setResizable(true);
      mainWindow2.setSize(600, 62);
      mainWindow2.setResizable(false);
    }
  });
}
function getOpenWindowBound() {
  const currentDisplay = screen.getCursorScreenPoint();
  const displays = screen.getAllDisplays();
  const display = displays.find((display2) => {
    return currentDisplay.x >= display2.bounds.x && currentDisplay.x <= display2.bounds.x + display2.bounds.width && currentDisplay.y >= display2.bounds.y && currentDisplay.y <= display2.bounds.y + display2.bounds.height;
  });
  return {
    x: display.bounds.x + display.bounds.width / 2 - WindowBaseConfig.width / 2,
    // 窗口居中
    y: display.bounds.y + display.bounds.height / 3
  };
}
function showWindow(mainWindow2) {
  const { x, y } = getOpenWindowBound();
  mainWindow2.setBounds({ x, y });
  mainWindow2.show();
}
function registerHotKey(mainWindow2) {
  const isMac = process.platform === "darwin";
  const toggleScreen = isMac ? "Command+K" : "Ctrl+K";
  globalShortcut.register(toggleScreen, () => {
    if (mainWindow2.isVisible()) {
      mainWindow2.setOpacity(0);
      mainWindow2.hide();
    } else {
      mainWindow2.setOpacity(1);
      mainWindow2.focus();
      showWindow(mainWindow2);
      mainWindow2.webContents.send("window-shown");
    }
  });
}
const __filename = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename);
function init() {
  ipcMain.handle("get-app-icons", async () => {
    return new Promise((resolve, reject) => {
      exec("ls /Applications", (error, stdout, stderr) => {
        if (error) {
          console.error(`执行错误: ${error.message}`);
          reject(error.message);
          return;
        }
        if (stderr) {
          console.error(`错误: ${stderr}`);
          reject(stderr);
          return;
        }
        const apps = stdout.split("\n").filter((app2) => app2.endsWith(".app"));
        const iconsData = [];
        let processedCount = 0;
        apps.forEach((app2) => {
          const appPath = `/Applications/${app2}/Contents/Info.plist`;
          exec(`defaults read "${appPath}" CFBundleIconFile`, (iconError) => {
            if (iconError) {
              processedCount++;
              if (processedCount === apps.length) resolve(iconsData);
              return;
            }
            const iconPath = `/Applications/${app2}/Contents/Resources/AppIcon.icns`;
            const pngPath = path.join(__dirname$1, `${app2}.png`);
            exec(
              `sips -s format png "${iconPath}" --out "${pngPath}"`,
              (convertErr) => {
                if (convertErr) {
                  console.error(`转换错误: ${convertErr.message}`);
                  processedCount++;
                  if (processedCount === apps.length) resolve(iconsData);
                  return;
                }
                iconsData.push({ app: app2, pngPath });
                processedCount++;
                if (processedCount === apps.length) resolve(iconsData);
              }
            );
          });
        });
      });
    });
  });
}
const __dirname = path$1.dirname(fileURLToPath$1(import.meta.url));
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let mainWindow;
function createWindow() {
  const { x, y } = getOpenWindowBound();
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs")
    },
    resizable: false,
    frame: false,
    alwaysOnTop: true,
    width: WindowBaseConfig.width,
    height: WindowBaseConfig.height,
    x,
    y,
    show: false
  });
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow == null ? void 0 : mainWindow.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
    showWindow(mainWindow);
    screenEvent(mainWindow);
    registerHotKey(mainWindow);
    init();
    mainWindow == null ? void 0 : mainWindow.on("focus", () => {
      mainWindow == null ? void 0 : mainWindow.setOpacity(1);
      mainWindow == null ? void 0 : mainWindow.show();
    });
  });
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path$1.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    mainWindow = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
