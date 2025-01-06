import { moji } from './emoji'
import { gitMoji } from './git'

export type TEmojiType = {
	type: string
	list: { icon: string; key: string; desc: string }[]
}

export const mojiList = [gitMoji, moji] as TEmojiType[]
