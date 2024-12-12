import { useIpc } from '.'

const ipc = useIpc()

export function sendWindowSizeEvent(type: 'show' | 'close') {
	ipc.send('search-input-event', type)
}

type TWindowChangeParams = {
	routerName: 'base' | 'setting'
	type: 'show' | 'hide'
}

export function sendRouterChangeEvent(params: TWindowChangeParams) {
	ipc.send('window-page-event', params)
}

export function listenScreen() {
	const windowShownFn = () => {
		document.getElementById('baseCommandInput')?.focus()
	}
	ipc.on('window-shown', windowShownFn)
	return () => {
		ipc.off('window-shown', windowShownFn)
	}
}
