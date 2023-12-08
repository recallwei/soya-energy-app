import i18n from '@/i18n'

import { BatteryTabStatus, InverterTabStatus, PlantTabStatus } from '../enums'
import type { TabStatusValue } from '../types'

const t = i18n.getFixedT(null, 'Installer.Management')

export const plantTabStatusMap = new Map<string, TabStatusValue>([
  [PlantTabStatus.All, { text: () => t('Status.All') }],
  [PlantTabStatus.Normal, { text: () => t('Status.Normal'), color: 'green' }],
  [PlantTabStatus.Alarm, { text: () => t('Status.Alarm'), color: 'red' }],
  [PlantTabStatus.Offline, { text: () => t('Status.Offline'), color: 'gray' }],
  [PlantTabStatus.NotMonitored, { text: () => t('Status.Not.Monitored'), color: 'yellow' }]
])

export const inverterTabStatusMap = new Map<string, TabStatusValue>([
  [InverterTabStatus.All, { text: () => t('Status.All') }],
  [InverterTabStatus.Normal, { text: () => t('Status.Normal'), color: 'green' }],
  [InverterTabStatus.Alarm, { text: () => t('Status.Alarm'), color: 'red' }],
  [InverterTabStatus.Offline, { text: () => t('Status.Offline'), color: 'gray' }],
  [InverterTabStatus.NotMonitored, { text: () => t('Status.Not.Monitored'), color: 'yellow' }]
])

export const batteryTabStatusMap = new Map<string, TabStatusValue>([
  [BatteryTabStatus.All, { text: () => t('Status.All') }],
  [BatteryTabStatus.Charging, { text: () => t('Status.Charging'), color: 'green' }],
  [BatteryTabStatus.DisCharging, { text: () => t('Status.Discharging'), color: 'green' }],
  [BatteryTabStatus.Standby, { text: () => t('Status.Standby'), color: 'yellow' }],
  [BatteryTabStatus.Offline, { text: () => t('Status.Offline'), color: 'gray' }]
])
