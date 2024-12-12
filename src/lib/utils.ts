import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * 使input框聚焦 id不加 #
 * @param id domID
 */
export function inputFocus(id: string) {
	const inputElement = document.querySelector(`[inputId=${id}]`)
	if (inputElement) {
		// @ts-ignore
		inputElement?.focus()
	}
}

export function copyToClipboard(text: string) {
	const textarea = document.createElement('textarea')
	textarea.value = text
	document.body.appendChild(textarea)
	textarea.select()
	document.execCommand('copy')
	document.body.removeChild(textarea)
}
