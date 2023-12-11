import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { UserRole } from '@/enums'
import type { User } from '@/types'
import { AuthUtils } from '@/utils'

interface State {
  isLogin: boolean
  isLoading: boolean
  userRole: string | null
  downloadProgress: number
  user: User
}

interface Actions {
  login: () => void
  logout: () => void
  loading: () => void
  loaded: () => void
  isInstaller: () => boolean
  isUser: () => boolean
  setUserRole: (userRole: string) => void
  setUser: (user: User) => void
  setDownloadProgress: (downloadProgress: number) => void
}

const initialState: State = {
  isLogin: false,
  isLoading: true,
  userRole: null,
  downloadProgress: 0,
  user: {}
}

export const useAuthStore = create<State & Actions>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    login: () => set(() => ({ isLogin: true })),
    logout: () => set(() => ({ isLogin: false })),
    loading: () => set(() => ({ isLoading: true })),
    loaded: () => set(() => ({ isLoading: false })),
    isInstaller: () => get().userRole === UserRole.INSTALLER,
    isUser: () => get().userRole === UserRole.USER,
    setUserRole: (userRole: string) => set(() => ({ userRole })),
    setUser: (user: User) => set(() => ({ user: user ?? {} })),
    setDownloadProgress: (downloadProgress: number) => set(() => ({ downloadProgress }))
  }))
)

useAuthStore.subscribe(
  (state) => state.isLogin,
  async (isLogin) => {
    if (!isLogin) {
      await AuthUtils.removeAccessToken()
      await AuthUtils.removeRefreshToken()
      await AuthUtils.removeRole()
    }
  }
)
