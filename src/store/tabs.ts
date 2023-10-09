import { create } from 'zustand'

import type { TabParamList } from '@/types'

interface State {
  currentTab: keyof TabParamList
}

interface Actions {
  changeTab: (value: keyof TabParamList) => void
}

const initialState: State = {
  currentTab: 'Status'
}

export const useTabsStore = create<State & Actions>()((set) => ({
  ...initialState,
  changeTab: (value) => set(() => ({ currentTab: value }))
}))
