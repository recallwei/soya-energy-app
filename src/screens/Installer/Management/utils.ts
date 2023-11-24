import { TabStatus } from './enums'

export const getColor = (value?: string) => {
  switch (value as TabStatus) {
    case TabStatus.Normal:
      return 'green'
    case TabStatus.Alarm:
      return 'red'
    case TabStatus.Offline:
      return 'gray'
    case TabStatus.NotMonitored:
      return 'yellow'
    case TabStatus.All:
    default:
      return undefined
  }
}
