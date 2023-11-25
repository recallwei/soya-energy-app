import i18n from '@/i18n'

import { TabStatus } from './enums'

const t = i18n.getFixedT(null, 'Installer.Management')

export const tabStatusI18nMap = new Map<string, () => string>([
  [TabStatus.All, () => t('Status.All')],
  [TabStatus.Normal, () => t('Status.Normal')],
  [TabStatus.Alarm, () => t('Status.Alarm')],
  [TabStatus.Offline, () => t('Status.Offline')],
  [TabStatus.NotMonitored, () => t('Status.Not.Monitored')]
])
