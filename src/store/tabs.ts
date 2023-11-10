import { create } from 'zustand'

import type { InstallerTabParamList, UserTabParamList } from '@/types'

interface State {
  installerCurrentTab: keyof InstallerTabParamList
  userCurrentTab: keyof UserTabParamList
}

interface Actions {
  changeInstallerTab: (value: keyof InstallerTabParamList) => void
  changeUserTab: (value: keyof UserTabParamList) => void
}

const initialState: State = {
  installerCurrentTab: 'Installer.Home',
  userCurrentTab: 'User.Home'
}

export const useTabsStore = create<State & Actions>()((set) => ({
  ...initialState,
  changeInstallerTab: (value) => set(() => ({ installerCurrentTab: value })),
  changeUserTab: (value) => set(() => ({ userCurrentTab: value }))
}))
