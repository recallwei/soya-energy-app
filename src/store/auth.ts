import { create } from 'zustand'

import { UserRole } from '@/enums'

interface State {
  isLogin: boolean
  isLoading: boolean
  userRole: UserRole
}

interface Actions {
  login: () => void
  logout: () => void
  loading: () => void
  loaded: () => void
  isInstaller: () => boolean
  isUser: () => boolean
  setUserRole: (userRole: UserRole) => void
}

const initialState: State = {
  isLogin: false,
  isLoading: true,
  userRole: UserRole.INSTALLER
}

export const useAuthStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
  loading: () => set(() => ({ isLoading: true })),
  loaded: () => set(() => ({ isLoading: false })),
  isInstaller: () => get().userRole === UserRole.INSTALLER,
  isUser: () => get().userRole === UserRole.USER,
  setUserRole: (userRole: UserRole) => set(() => ({ userRole }))
}))
