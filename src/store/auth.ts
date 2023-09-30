import { create } from 'zustand'

interface State {
  isLogin: boolean
  isLoading: boolean
}

interface Actions {
  login: () => void
  logout: () => void
  loading: () => void
  loaded: () => void
}

const initialState: State = {
  isLogin: false,
  isLoading: true
}

export const useAuthStore = create<State & Actions>()((set) => ({
  ...initialState,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
  loading: () => set(() => ({ isLoading: true })),
  loaded: () => set(() => ({ isLoading: false }))
}))
