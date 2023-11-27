import type { LocalPackage } from 'react-native-code-push'
import { create } from 'zustand'

import { UserRole } from '@/enums'

interface State {
  isLogin: boolean
  isLoading: boolean
  userRole: UserRole
  downloadProgress: number
  packageMetadata: LocalPackage | null
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
  setPackageMetadata: (localPackage: LocalPackage | null) => void
}

const initialState: State = {
  isLogin: false,
  isLoading: true,
  userRole: UserRole.INSTALLER,
  downloadProgress: 0,
  packageMetadata: null
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
  setDownloadProgress: (downloadProgress: number) => set(() => ({ downloadProgress })),
  setPackageMetadata: (packageMetadata: LocalPackage | null) => set(() => ({ packageMetadata }))
}))
