import { create } from 'zustand'

interface State {
  theme: 'light' | 'dark'
}

interface Actions {
  toggleTheme: () => void
  isDark: () => boolean
  getBgColor: () => string
  getTextColor: () => string
}

const initialState: State = {
  theme: 'light'
}

export const useThemeStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  isDark: () => get().theme === 'dark',
  getBgColor: () => (get().theme === 'dark' ? '#333333' : '#ffffff'),
  getTextColor: () => (get().theme === 'dark' ? '#ffffff' : '#333333')
}))
