import { create } from 'zustand'

import { UserRole } from '@/enums'
import type { UserInfo } from '@/types'

interface State {
  isLogin: boolean
  isLoading: boolean
  userRole: UserRole
  downloadProgress: number
  userInfo: UserInfo
}

interface Actions {
  login: () => void
  logout: () => void
  loading: () => void
  loaded: () => void
  isInstaller: () => boolean
  isUser: () => boolean
  setUserRole: (userRole: UserRole) => void
  setDownloadProgress: (downloadProgress: number) => void
}

const initialState: State = {
  isLogin: false,
  isLoading: true,
  userRole: UserRole.INSTALLER,
  downloadProgress: 0,
  userInfo: {
    username: 'Bruce',
    avatarUrl: 'https://avatars.githubusercontent.com/u/62941121?v=4'
  }
}

export const useAuthStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
  loading: () => set(() => ({ isLoading: true })),
  loaded: () => set(() => ({ isLoading: false })),
  isInstaller: () => get().userRole === UserRole.INSTALLER,
  isUser: () => get().userRole === UserRole.USER,
  setUserRole: (userRole: UserRole) => set(() => ({ userRole })),
  setDownloadProgress: (downloadProgress: number) => set(() => ({ downloadProgress }))
}))
