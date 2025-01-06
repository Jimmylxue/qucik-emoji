import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { mojiList, TEmojiType } from './command/gitmoji/const'
import { filterEmoji } from './utils'

type EmojiSearchContext = {
	filterText: string
	setFilterText?: (filterText: string) => void
	renderEmoji: TEmojiType[]
}

const EmojiSearchContext = createContext<EmojiSearchContext>({
	filterText: '',
	renderEmoji: [],
})

export function EmojiSearchContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const data = useEmojiSearchData()
	return (
		<EmojiSearchContext.Provider value={data}>
			{children}
		</EmojiSearchContext.Provider>
	)
}

export function useEmojiSearch() {
	return useContext(EmojiSearchContext)
}

export function useEmojiSearchData() {
	const [filterText, setFilterText] = useState<string>('')

	const renderEmoji = useMemo(() => {
		if (!filterText) {
			return mojiList
		}
		return filterEmoji(mojiList, filterText)
	}, [filterText])
	return {
		filterText,
		setFilterText,
		renderEmoji,
	}
}
