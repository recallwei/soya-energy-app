import type { TFunction } from 'i18next'

export interface SearchParams {
  keywords: string
  status: string
  order: string
  displayRange: string
  loadingMonitoring: string
  plantType: string
  others: string
  systemPowerMax: string
  systemPowerMin: string
  inverterType: string
  ratePowerMin: string
  ratePowerMax: string
  batteryType: string
}

export interface SingleSelectOption {
  displayRange: null | string
  loadMonitoring: null | string
}

export interface MultiSelectOption {
  plantType: Set<string>
  others: Set<string>
  inverterType: Set<string>
  batteryType: Set<string>
}

export type FormData = {
  systemPowerMin: string
  systemPowerMax: string
  city: string
  ratePowerMin: string
  ratePowerMax: string
} & SingleSelectOption &
  MultiSelectOption

export interface TabStatusValue {
  text: TFunction | string
  color?: string
}
