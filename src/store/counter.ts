import { create } from 'zustand'

interface State {
  count: number
}

interface Actions {
  increment: (value: number) => void
  decrement: (value: number) => void
}

const initialState: State = {
  count: 1
}

export const useCounterStore = create<State & Actions>()((set) => ({
  ...initialState,
  increment: (value) => set((state) => ({ count: state.count + value })),
  decrement: (value) => set((state) => ({ count: state.count - value })),
  reset: () => set(initialState)
}))
