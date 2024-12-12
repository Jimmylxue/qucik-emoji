import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { getOpenWindowBound, screenEvent, showWindow } from './ipc/window'
import { registerHotKey } from './ipc/hotkey'
import { init } from './ipc/apps'
import { WindowBaseConfig } from './const'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
	? path.join(process.env.APP_ROOT, 'public')
	: RENDERER_DIST

let mainWindow: BrowserWindow | null

function createWindow() {
	const { x, y } = getOpenWindowBound()

	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs'),
		},
		resizable: false,
		frame: false,
		alwaysOnTop: true,
		width: WindowBaseConfig.width,
		height: WindowBaseConfig.height,
		x,
		y,
		show: false,
	})

	// Test active push message to Renderer-process.
	mainWindow.webContents.on('did-finish-load', () => {
		mainWindow?.webContents.send(
			'main-process-message',
			new Date().toLocaleString()
		)
		showWindow(mainWindow!)
		screenEvent(mainWindow!)
		registerHotKey(mainWindow!)
		init()

		mainWindow?.on('blur', () => {
			mainWindow?.setOpacity(0)
			mainWindow?.hide()
		})

		mainWindow?.on('focus', () => {
			mainWindow?.setOpacity(1)
			mainWindow?.show()
		})
	})

	if (VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(VITE_DEV_SERVER_URL)
	} else {
		// win.loadFile('dist/index.html')
		mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
	}
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
		mainWindow = null
	}
})

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

app.whenReady().then(() => {
	createWindow()
})
