import { globalStyles } from '@/constants'
import i18n from '@/i18n'

import { BatteryTabStatus, InverterTabStatus, PlantTabStatus } from '../enums'
import type { TabStatusValue } from '../types'

const t = i18n.getFixedT(null, 'Installer.Management')

const DISABLED_COLOR = '#999999'

export const plantTabStatusMap = new Map<string, TabStatusValue>([
  [PlantTabStatus.All, { text: t('Status.All') }],
  [PlantTabStatus.Normal, { text: t('Status.Normal'), color: globalStyles.successColor }],
  [PlantTabStatus.Alarm, { text: t('Status.Alarm'), color: globalStyles.errorColor }],
  [PlantTabStatus.Offline, { text: t('Status.Offline'), color: DISABLED_COLOR }],
  [
    PlantTabStatus.NotMonitored,
    { text: t('Status.Not.Monitored'), color: globalStyles.warningColor }
  ]
])

export const inverterTabStatusMap = new Map<string, TabStatusValue>([
  [InverterTabStatus.All, { text: t('Status.All') }],
  [InverterTabStatus.Normal, { text: t('Status.Normal'), color: globalStyles.successColor }],
  [InverterTabStatus.Alarm, { text: t('Status.Alarm'), color: globalStyles.errorColor }],
  [InverterTabStatus.Offline, { text: t('Status.Offline'), color: DISABLED_COLOR }],
  [
    InverterTabStatus.NotMonitored,
    { text: t('Status.Not.Monitored'), color: globalStyles.warningColor }
  ]
])

export const batteryTabStatusMap = new Map<string, TabStatusValue>([
  [BatteryTabStatus.All, { text: t('Status.All') }],
  [BatteryTabStatus.Charging, { text: t('Status.Charging'), color: globalStyles.successColor }],
  [
    BatteryTabStatus.DisCharging,
    { text: t('Status.Discharging'), color: globalStyles.successColor }
  ],
  [BatteryTabStatus.Standby, { text: t('Status.Standby'), color: globalStyles.warningColor }],
  [BatteryTabStatus.Offline, { text: t('Status.Offline'), color: DISABLED_COLOR }]
])
