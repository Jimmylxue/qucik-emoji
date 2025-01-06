import emoji from 'emojilib'

console.log('emoji', emoji)

const emojiList: any = []

Object.entries(emoji).forEach(item => {
	const icon = item[0]
	const keys = item[1]
	const _item = {
		icon,
		// @ts-ignore
		key: keys.join(''),
		desc: '',
	}
	emojiList.push(_item)
})

export const moji = {
	type: 'Emoji',
	list: emojiList,
}
