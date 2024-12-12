/**
 * 获取 code 和 emoji
 */
export function catchEmojiAndCode(str: string) {
	const codeMatch = str.match(/:(.+?):/)
	const code = codeMatch ? codeMatch[1] : null
	const emoji = str.split(`:${code}:`)?.[0]
	return {
		code,
		emoji,
	}
}
