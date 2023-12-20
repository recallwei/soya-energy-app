import type { Battery, Inverter } from '.'

export type Device = (Inverter | Battery) & {
  type: string
  inverterId: string
}

export interface DevicePageModel {
  plantId?: string
}
