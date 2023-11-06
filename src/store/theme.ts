import { create } from 'zustand'

interface State {
  theme: 'light' | 'dark'
}

interface Actions {
  toggleTheme: () => void
}

const initialState: State = {
  theme: 'light'
}

export const useThemeStore = create<State & Actions>()((set) => ({
  ...initialState,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
}))
