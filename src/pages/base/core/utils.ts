import { TEmojiType } from './command/gitmoji/const'

export function filterEmoji(emojiList: TEmojiType[], filterKey: string) {
	const filterArr: TEmojiType[] = []
	emojiList.forEach(item => {
		const _filterList = item.list.filter(_it => _it.key.includes(filterKey))
		if (_filterList.length) {
			filterArr.push({
				type: item.type,
				list: _filterList,
			})
		}
	})
	return filterArr
}
