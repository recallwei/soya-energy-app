import { create } from 'zustand'

import type { HomeTabParamList } from '@/types'

interface State {
  currentTab: keyof HomeTabParamList
}

interface Actions {
  changeTab: (value: keyof HomeTabParamList) => void
}

const initialState: State = {
  currentTab: 'Status'
}

export const useTabsStore = create<State & Actions>()((set) => ({
  ...initialState,
  changeTab: (value) => set(() => ({ currentTab: value }))
}))
