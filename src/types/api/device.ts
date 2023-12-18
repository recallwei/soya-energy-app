import type { Battery, Inverter } from '.'

export type Device = Inverter | Battery

export interface DevicePageModel {
  plantId?: string
}
