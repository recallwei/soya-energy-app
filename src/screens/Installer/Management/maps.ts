import i18n from '@/i18n'

import { TabStatus } from './enums'

const { t } = i18n

export const tabStatusI18nMap = new Map<string, () => string>([
  [TabStatus.All, () => t('Installer.Management:Status.All')],
  [TabStatus.Normal, () => t('Installer.Management:Status.Normal')],
  [TabStatus.Alarm, () => t('Installer.Management:Status.Alarm')],
  [TabStatus.Offline, () => t('Installer.Management:Status.Offline')],
  [TabStatus.NotMonitored, () => t('Installer.Management:Status.Not.Monitored')]
])
