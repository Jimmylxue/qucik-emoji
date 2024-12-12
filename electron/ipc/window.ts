import { BrowserWindow, ipcMain, screen } from 'electron'
import { WindowBaseConfig } from '../const'

export function screenEvent(mainWindow: BrowserWindow) {
	ipcMain.on('search-input-event', (_, type) => {
		if (type === 'show') {
			mainWindow.setResizable(true)
			mainWindow.setSize(600, 300)
			mainWindow.setResizable(false)
		} else {
			mainWindow.setResizable(true)
			mainWindow.setSize(600, 62)
			mainWindow.setResizable(false)
		}
	})
}

export function getOpenWindowBound() {
	const currentDisplay = screen.getCursorScreenPoint()
	const displays = screen.getAllDisplays()

	const display = displays.find(display => {
		return (
			currentDisplay.x >= display.bounds.x &&
			currentDisplay.x <= display.bounds.x + display.bounds.width &&
			currentDisplay.y >= display.bounds.y &&
			currentDisplay.y <= display.bounds.y + display.bounds.height
		)
	})

	return {
		x:
			display!.bounds.x +
			display!.bounds.width / 2 -
			WindowBaseConfig.width / 2, // 窗口居中
		y: display!.bounds.y + display!.bounds.height / 3,
	}
}

export function showWindow(mainWindow: BrowserWindow) {
	const { x, y } = getOpenWindowBound()
	// 设置窗口位置并显示
	mainWindow.setBounds({ x, y })
	mainWindow.show()
}
