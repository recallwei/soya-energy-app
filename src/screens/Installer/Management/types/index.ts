export interface SearchParams {
  keywords: string
}

export interface SingleSelectOption {
  displayRange: null | string
  loadMonitoring: null | string
}

export interface MultiSelectOption {
  plantType: Set<string>
  useType: Set<string>
  gridType: Set<string>
  fundingMethod: Set<string>
  others: Set<string>
}

export type FormData = {
  plantCapacityMin: string
  plantCapacityMax: string
  city: string
} & SingleSelectOption &
  MultiSelectOption

export interface TabStatusValue {
  text: () => string
  color?: string
}
