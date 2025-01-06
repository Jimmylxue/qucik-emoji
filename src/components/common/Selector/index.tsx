import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useEmojiSearch } from '@/pages/base/core/core'
import {
	getRowAndColByArrowDownAndArrowRight,
	getRowAndColByArrowUpAndArrowLeft,
} from './core'
import { copyToClipboard } from '@/lib/utils'
import { toast } from 'sonner'

const gridColCount = 7

export function Selector() {
	const { renderEmoji } = useEmojiSearch()
	const [selectTypeRow, setSelectTypeRow] = useState<number>(0)
	const [selectedIndex, setSelectedIndex] = useState<number>(0)

	const renderTypeRowCount = renderEmoji[selectTypeRow]?.list?.length || 0

	useEffect(() => {
		setSelectTypeRow(0)
		setSelectedIndex(0)
	}, [renderEmoji])

	useEffect(() => {
		const keyDownFn = (e: any) => {
			const key = e.key
			switch (key) {
				case 'ArrowUp':
					if (selectedIndex >= gridColCount) {
						setSelectedIndex(selectedIndex - gridColCount)
					} else {
						const { row, index } = getRowAndColByArrowUpAndArrowLeft(
							selectTypeRow,
							renderEmoji
						)
						setSelectTypeRow(row)
						setSelectedIndex(index)
					}
					break
				case 'ArrowDown':
					if (selectedIndex < renderTypeRowCount - gridColCount) {
						setSelectedIndex(selectedIndex + gridColCount)
					} else {
						const { row, index } = getRowAndColByArrowDownAndArrowRight(
							selectTypeRow,
							renderEmoji
						)
						setSelectTypeRow(row)
						setSelectedIndex(index)
					}
					break
				case 'ArrowLeft':
					if (selectedIndex !== 0) {
						setSelectedIndex(selectedIndex - 1)
					} else {
						const { row, index } = getRowAndColByArrowUpAndArrowLeft(
							selectTypeRow,
							renderEmoji
						)
						setSelectTypeRow(row)
						setSelectedIndex(index)
					}
					break
				case 'ArrowRight':
					if (selectedIndex + 1 < renderTypeRowCount) {
						setSelectedIndex(selectedIndex + 1)
					} else {
						const { row, index } = getRowAndColByArrowDownAndArrowRight(
							selectTypeRow,
							renderEmoji
						)
						setSelectTypeRow(row)
						setSelectedIndex(index)
					}
					break
				case 'Enter':
					const chooseEmoji = renderEmoji[selectTypeRow]?.list?.[selectedIndex]
					copyToClipboard(chooseEmoji.icon)
					toast('The copy has been copied', {})
					s
			}
		}
		document.addEventListener('keydown', keyDownFn)
		document
			.getElementById(`element-${selectTypeRow}-${selectedIndex}`)
			?.scrollIntoView({ behavior: 'smooth', block: 'center' })
		return () => {
			document.removeEventListener('keydown', keyDownFn)
		}
	}, [selectTypeRow, selectedIndex, renderTypeRowCount])

	return (
		<div
			className={classNames(
				`w-full grid grid-cols-${gridColCount} place-items-center gap-2 px-2 py-2 h-[338px] overflow-y-auto overflow-x-hidden`
			)}
		>
			{renderEmoji.map((_, idx) => (
				<div className=" contents" key={idx}>
					<div
						className=" flex justify-start text-left w-full text-gray-400"
						style={{
							gridColumn: `span ${gridColCount}`,
						}}
					>
						{_?.type}
					</div>
					{_?.list?.map((item, index) => (
						<div
							key={index}
							className={classNames(
								'  w-[75px] h-[75px] flex justify-center items-center text-3xl rounded-2xl',
								{
									' shadow-2xl border-red-200 border shadow-red-200':
										index === selectedIndex && idx === selectTypeRow,
								}
							)}
							id={`element-${idx}-${index}`}
						>
							{item.icon}
						</div>
					))}
				</div>
			))}
		</div>
	)
}
