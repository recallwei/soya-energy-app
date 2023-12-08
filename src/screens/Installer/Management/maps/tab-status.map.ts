import i18n from '@/i18n'

import { BatteryTabStatus, InverterTabStatus, PlantTabStatus } from '../enums'
import type { TabStatusValue } from '../types'

const t = i18n.getFixedT(null, 'Installer.Management')

const SUCCESS_COLOR = '#52c41a'
const WARNING_COLOR = '#faad14'
const ERROR_COLOR = '#ff4d4f'
const DISABLED_COLOR = '#999999'

export const plantTabStatusMap = new Map<string, TabStatusValue>([
  [PlantTabStatus.All, { text: t('Status.All') }],
  [PlantTabStatus.Normal, { text: t('Status.Normal'), color: SUCCESS_COLOR }],
  [PlantTabStatus.Alarm, { text: t('Status.Alarm'), color: ERROR_COLOR }],
  [PlantTabStatus.Offline, { text: t('Status.Offline'), color: DISABLED_COLOR }],
  [PlantTabStatus.NotMonitored, { text: t('Status.Not.Monitored'), color: WARNING_COLOR }]
])

export const inverterTabStatusMap = new Map<string, TabStatusValue>([
  [InverterTabStatus.All, { text: t('Status.All') }],
  [InverterTabStatus.Normal, { text: t('Status.Normal'), color: SUCCESS_COLOR }],
  [InverterTabStatus.Alarm, { text: t('Status.Alarm'), color: ERROR_COLOR }],
  [InverterTabStatus.Offline, { text: t('Status.Offline'), color: DISABLED_COLOR }],
  [InverterTabStatus.NotMonitored, { text: t('Status.Not.Monitored'), color: WARNING_COLOR }]
])

export const batteryTabStatusMap = new Map<string, TabStatusValue>([
  [BatteryTabStatus.All, { text: t('Status.All') }],
  [BatteryTabStatus.Charging, { text: t('Status.Charging'), color: SUCCESS_COLOR }],
  [BatteryTabStatus.DisCharging, { text: t('Status.Discharging'), color: SUCCESS_COLOR }],
  [BatteryTabStatus.Standby, { text: t('Status.Standby'), color: WARNING_COLOR }],
  [BatteryTabStatus.Offline, { text: t('Status.Offline'), color: DISABLED_COLOR }]
])
