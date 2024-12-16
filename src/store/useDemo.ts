import { create } from 'zustand'

type TDemo = {
	count: number
	increment: () => void
	decrement: () => void
	dzSet: (_count: number) => void
}

export const useDemo = create<TDemo>(set => {
	return {
		count: 0,
		increment: () => set(state => ({ count: state.count + 1 })),
		decrement: () => set(state => ({ count: state.count - 1 })),
		dzSet: _count =>
			set({
				count: _count,
			}),
	}
})
