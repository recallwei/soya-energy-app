import { create } from 'zustand'

import type { Plant } from '@/types'

interface State {
  currentPlant: Plant | null
  plantList: Plant[]
}

interface Actions {
  setCurrentPlant: (plant: Plant) => void
  setPlantList: (plantList: Plant[]) => void
}

const initialState: State = {
  currentPlant: null,
  plantList: []
}

export const usePlantStore = create<State & Actions>()((set) => ({
  ...initialState,
  setCurrentPlant: (plant: Plant) => set({ currentPlant: plant }),
  setPlantList: (plantList: Plant[]) => set({ plantList })
}))
