import { makeAutoObservable } from 'mobx'

export class CommandStore {
	/**
	 * 完整的指令
	 * 如 fanyi hello 这个指令 _command 会存完整的 fanyi hello 全部内容
	 */
	private _command: string = ''

	get command() {
		return this._command
	}

	set command(newCommand: string) {
		this._command = newCommand
	}

	/**
	 * 具体的 指令
	 * 如 fanyi hello 这个 _commandCommand 只会存 hello
	 */
	private _contentCommand: string = ''

	get contentCommand() {
		return this._contentCommand
	}

	set contentCommand(newCommand: string) {
		this._contentCommand = newCommand
	}

	/**
	 * 是否是按下回车键状态
	 */
	private _isEnter: boolean = false

	get isEnter() {
		return this._isEnter
	}

	set isEnter(status: boolean) {
		this._isEnter = status
	}

	constructor() {
		makeAutoObservable(this)
	}
}

export const commandStore = new CommandStore()
