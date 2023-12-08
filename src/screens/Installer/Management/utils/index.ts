import { ManagementTab } from '../enums'
import { batteryTabStatusMap, inverterTabStatusMap, plantTabStatusMap } from '../maps'
import type { TabStatusValue } from '../types'

const fallback = {
  text: () => ''
}

export const getStatusMeta = (value: string, currentTab: ManagementTab): TabStatusValue => {
  switch (currentTab) {
    case ManagementTab.Plant:
      return plantTabStatusMap.get(value) ?? fallback
    case ManagementTab.Inverter:
      return inverterTabStatusMap.get(value) ?? fallback
    case ManagementTab.Battery:
      return batteryTabStatusMap.get(value) ?? fallback
    default:
      return fallback
  }
}
