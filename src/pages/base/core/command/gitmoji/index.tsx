import { Loading } from '@/components/common/Loading'
import {
	CommandInput,
	Command,
	CommandList,
	CommandGroup,
	CommandItem,
	CommandEmpty,
	CommandSeparator,
} from '@/components/ui/command'
import { copyToClipboard, inputFocus } from '@/lib/utils'
import { Smile } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { gitMojiList } from './const'
import { catchEmojiAndCode } from './utils'

const placeholderText = 'Please choose git-moji'

const inputId = 'gitmojiInput'

type TProps = {
	destructCommand: () => void
}

export const EmojiContent = observer(({ destructCommand }: TProps) => {
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
						console.log('chooseMoji', chooseMoji)
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
					placeholder={placeholderText}
					value={inputText}
					onInput={e => {
						// @ts-ignore
						setInputText(e.target.value)
					}}
					onKeyDown={async e => {
						// @ts-ignore
						const newValue = e.target.value
						if (inputText === '' && e.key === 'Backspace') {
							destructCommand()
						}
						if (
							inputText.trim() !== ''
							//  &&
							// e.key === 'Enter' &&
							// !isSameRequest
						) {
						}
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
					{/* <CommandGroup heading="System">
						<CommandItem>
							<div className=" flex items-center">
								<div>setting</div>
							</div>
						</CommandItem>
					</CommandGroup> */}
					<CommandSeparator />
				</CommandList>
			</Command>
		</>
	)
})

export const GITMOJI_COMMAND = {
	icon: <Smile className="mr-2 shrink-0 opacity-50" />,
	key: 'Git-Moji',
	placeholder: placeholderText,
	content: EmojiContent,
}
