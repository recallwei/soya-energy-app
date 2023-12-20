import type { Battery, Inverter } from '.'

export type Device = (Inverter | Battery) & {
  type: string
}

export interface DevicePageModel {
  plantId?: string
}
