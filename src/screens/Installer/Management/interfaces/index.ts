export interface SingleSelectOption {
  displayRange: null | number
}

export interface MultiSelectOption {
  plantType: Set<number>
  useType: Set<number>
  gridType: Set<number>
  fundingMethod: Set<number>
  loadMonitoring: Set<number>
  others: Set<number>
}

export type FormData = {
  plantCapacityMin: null | string
  plantCapacityMax: null | string
  city: null | string
} & SingleSelectOption &
  MultiSelectOption
