import { TEmojiType } from '@/pages/base/core/command/gitmoji/const'

export function getRowAndColByArrowUpAndArrowLeft(
	currentRow: number,
	renderEmoji: TEmojiType[]
) {
	if (currentRow === 0) {
		return { row: 0, index: 0 }
	}
	let preRow = currentRow - 1
	return {
		row: preRow,
		index: renderEmoji[preRow].list.length - 1,
	}
}

export function getRowAndColByArrowDownAndArrowRight(
	currentRow: number,
	renderEmoji: TEmojiType[]
) {
	console.log('sss')
	if (currentRow === renderEmoji.length - 1) {
		return { row: currentRow, index: renderEmoji[currentRow].list.length - 1 }
	}
	let nextRow = currentRow + 1
	return {
		row: nextRow,
		index: 0,
	}
}
