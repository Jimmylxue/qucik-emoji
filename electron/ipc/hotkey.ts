import { BrowserWindow, globalShortcut } from 'electron'
import { showWindow } from './window'

export function registerHotKey(mainWindow: BrowserWindow) {
	// 注册热键
	const isMac = process.platform === 'darwin'
	const toggleScreen = isMac ? 'Command+K' : 'Ctrl+K'
	globalShortcut.register(toggleScreen, () => {
		if (mainWindow.isVisible()) {
			mainWindow.setOpacity(0)
			mainWindow.hide() // 隐藏窗口
		} else {
			mainWindow.setOpacity(1)
			mainWindow.focus()
			showWindow(mainWindow)
			mainWindow.webContents.send('window-shown')
		}
	})
}
