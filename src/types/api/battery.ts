import type { BasePageModel } from '.'

export interface Battery {}

export interface BatteryPageModel extends BasePageModel {
  status?: string
  order?: string
  batteryType?: string
}
