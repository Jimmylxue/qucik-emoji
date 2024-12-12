import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import { Smile } from 'lucide-react'
import { Loading } from '@/components/common/Loading'
import { copyToClipboard, inputFocus } from '@/lib/utils'
import { toast } from 'sonner'
import { catchEmojiAndCode } from './core/command/gitmoji/utils'
import { gitMojiList } from './core/command/gitmoji/const'

const inputId = 'baseCommandInput'

export const Base = observer(() => {
	const [inputText, setInputText] = useState<string>('')

	const [chooseMoji, setChooseMoji] = useState<string>('')

	useEffect(() => {
		inputFocus(inputId)
	}, [])

	return (
		<>
			<Command
				onKeyDown={e => {
					if (e.key === 'Enter') {
						const { emoji } = catchEmojiAndCode(chooseMoji)
						copyToClipboard(emoji)
						toast('The copy has been copied', {})
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
					value={inputText}
					onInput={e => {
						// @ts-ignore
						setInputText(e.target.value)
					}}
				/>
				<CommandList>
					<CommandEmpty>
						<div className=" mt-4 w-full h-full flex flex-col justify-center items-center">
							<Loading />
							<div className="mt-4">No results found.</div>
						</div>
					</CommandEmpty>
					<CommandGroup heading="Git">
						{gitMojiList.map((item, index) => (
							<CommandItem key={index}>
								<div className=" flex items-center">
									<div className=" text-3xl">{item.icon}</div>
									<div className=" mx-2">{item.key}</div>
									<div>{item.desc}</div>
								</div>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
				</CommandList>
			</Command>
		</>
	)
})
