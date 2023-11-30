import { create } from 'zustand'

import type { Plant } from '@/types'

interface State {
  currentPlant: Plant
  plantList: Plant[]
}

interface Actions {
  setCurrentPlant: (plant: Plant) => void
}

const initialState: State = {
  currentPlant: {
    id: '123',
    siteName: '阿姆斯特丹 - 电站'
  },
  plantList: [
    {
      id: '123',
      siteName: '阿姆斯特丹 - 电站'
    },
    {
      id: '1234',
      siteName: '法兰克福 - 电站'
    }
  ]
}

export const usePlantStore = create<State & Actions>()((set) => ({
  ...initialState,
  setCurrentPlant: (plant: Plant) => set({ currentPlant: plant })
}))
