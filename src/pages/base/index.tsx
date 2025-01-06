import { useEffect, useState } from 'react'
import { Command, CommandInput } from '@/components/ui/command'
import { Smile } from 'lucide-react'
import { Loading } from '@/components/common/Loading'
import { inputFocus } from '@/lib/utils'
import { Selector } from '@/components/common/Selector'
import { useEmojiSearch } from './core/core'

const inputId = 'baseCommandInput'

export const Base = () => {
	const { filterText, setFilterText } = useEmojiSearch()

	const [chooseMoji, setChooseMoji] = useState<string>('')

	useEffect(() => {
		inputFocus(inputId)
	}, [])

	return (
		<>
			<Command
				onKeyDown={e => {
					if (e.key === 'Enter') {
						setTimeout(() => {
							inputFocus(inputId)
						}, 100)
					}
				}}
				value={chooseMoji}
				onValueChange={val => {
					/**
					 * 选中项 的值
					 */
					setChooseMoji(val)
				}}
			>
				<CommandInput
					inputId={inputId}
					icon={<Smile className="mr-2 shrink-0 opacity-50" />}
					style={{ height: 60 }}
					placeholder={'Please enter information to filter emoji'}
					value={filterText}
					onInput={e => {
						// @ts-ignore
						setFilterText(e.target.value)
					}}
				/>
				<Selector />
				{/* <CommandList>
					<CommandEmpty>
						<div className=" mt-4 w-full h-full flex flex-col justify-center items-center">
							<Loading />
							<div className="mt-4">No results found.</div>
						</div>
					</CommandEmpty>
					{mojiList.map((item, index) => (
						<CommandGroup heading={item.type} key={index}>
							{item.list.map((_item, index) => (
								<CommandItem key={index}>
									<div className=" flex items-center">
										<div className=" text-3xl">{_item.icon}</div>
										<div className=" mx-2">{_item.key}</div>
										<div>{_item.desc}</div>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					))}

					<CommandSeparator />
				</CommandList> */}
			</Command>
		</>
	)
}
