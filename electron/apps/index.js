import { exec } from 'child_process'
import path from 'path'

import { fileURLToPath } from 'url'

// 获取当前模块的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

exec('ls /Applications', (error, stdout, stderr) => {
	if (error) {
		console.error(`执行错误: ${error.message}`)
		return
	}
	if (stderr) {
		console.error(`错误: ${stderr}`)
		return
	}

	const apps = stdout.split('\n').filter(app => app.endsWith('.app'))

	console.log('apps', apps)
	apps.forEach(app => {
		const appPath = `/Applications/${app}/Contents/Info.plist`
		exec(
			`defaults read "${appPath}" CFBundleName CFBundleIconFile`,
			(err, iconName, iconError) => {
				if (iconError) return

				// const iconPath = `/Applications/${app}/Contents/Resources/${iconName.trim()}.icns`
				const iconPath = `/Applications/${app}/Contents/Resources/AppIcon.icns`
				const pngPath = path.join(__dirname, `${app}${Date.now()}.png`) // 保存 PNG 的路径

				// 使用 sips 将 .icns 转换为 .png
				exec(
					`sips -s format png "${iconPath}" --out "${pngPath}"`,
					convertErr => {
						if (convertErr) {
							console.error(`转换错误: ${convertErr.message}`)
							return
						}

						// 生成可在 HTML 中使用的 img 标签
						console.log(`应用名称: ${app}, 图标路径: ${pngPath}`)
						// console.log(`<img src="${pngPath}" alt="${app} 图标" />`)
					}
				)
			}
		)
	})
})
