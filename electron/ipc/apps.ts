import { ipcMain } from 'electron'

import { exec } from 'child_process'
import path from 'path'

import { fileURLToPath } from 'url'

// 获取当前模块的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export function init() {
	ipcMain.handle('get-app-icons', async () => {
		return new Promise((resolve, reject) => {
			exec('ls /Applications', (error, stdout, stderr) => {
				if (error) {
					console.error(`执行错误: ${error.message}`)
					reject(error.message)
					return
				}
				if (stderr) {
					console.error(`错误: ${stderr}`)
					reject(stderr)
					return
				}

				const apps = stdout.split('\n').filter(app => app.endsWith('.app'))
				const iconsData: any[] = []

				let processedCount = 0

				apps.forEach(app => {
					const appPath = `/Applications/${app}/Contents/Info.plist`
					exec(`defaults read "${appPath}" CFBundleIconFile`, iconError => {
						if (iconError) {
							processedCount++
							if (processedCount === apps.length) resolve(iconsData)
							return
						}

						const iconPath = `/Applications/${app}/Contents/Resources/AppIcon.icns`
						const pngPath = path.join(__dirname, `${app}.png`)

						exec(
							`sips -s format png "${iconPath}" --out "${pngPath}"`,
							convertErr => {
								if (convertErr) {
									console.error(`转换错误: ${convertErr.message}`)
									processedCount++
									if (processedCount === apps.length) resolve(iconsData)
									return
								}

								iconsData.push({ app, pngPath })
								processedCount++
								if (processedCount === apps.length) resolve(iconsData)
							}
						)
					})
				})
			})
		})
	})
}
