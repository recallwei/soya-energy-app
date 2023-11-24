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
  plantCapacityMin: null | string
  plantCapacityMax: null | string
  city: null | string
} & SingleSelectOption &
  MultiSelectOption
