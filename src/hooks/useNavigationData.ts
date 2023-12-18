import { useTranslation } from 'react-i18next'

import type { SheetMenuListItem } from '@/components'
import type { InstallerTabParamList, UserTabParamList } from '@/types'

export const useNavigationData = () => {
  const { t } = useTranslation(['Screen', 'Global', 'Installer.Management'])

  const getHomeSheetMenuData = ({ navigate }: { navigate: any }): SheetMenuListItem[] => [
    { text: t('Global:Weather'), onPress: () => navigate('User.Home.Weather_Forecast_Settings') },
    { text: t('Global:Management'), onPress: () => navigate('Common.Plant.Detail') },
    {
      text: t('Common.Plant.Monthly.Report'),
      onPress: () => navigate('Common.Plant.Detail')
    },
    { text: t('Common.Plant.View'), onPress: () => navigate('Common.Plant.Detail') },
    { text: t('Common.Plant.Map'), onPress: () => navigate('Common.Plant.Detail') },
    { text: t('Global:Share'), onPress: () => navigate('Common.Plant.Detail') }
  ]

  const getDevicesSheetMenuData = ({ navigate }: { navigate: any }): SheetMenuListItem[] => [
    { text: t('Installer.Management:Inverter'), onPress: () => navigate('Common.Inverter.Create') },
    {
      text: t('Installer.Management:Plant.Menu.EV.Charger'),
      onPress: () => navigate('Common.EV.Charger.Create')
    },
    {
      text: t('Installer.Management:Plant.Menu.Mobile.Storage'),
      onPress: () => navigate('Common.Mobile.Storage.Create')
    }
  ]

  function getInstallerTabTitleI18nText(tabName: keyof InstallerTabParamList): string {
    switch (tabName) {
      case 'Installer.Home':
        return t('Installer.Tabs.Home')
      case 'Installer.Management':
        return t('Installer.Tabs.Management')
      case 'Installer.Services':
        return t('Installer.Tabs.Services')
      case 'Installer.Guide':
        return t('Installer.Tabs.Guide')
      case 'Installer.My':
        return t('Installer.Tabs.My')
      default:
        return ''
    }
  }

  function getUserTabTitleI18nText(tabName: keyof UserTabParamList): string {
    switch (tabName) {
      case 'User.Home':
        return t('User.Tabs.Home')
      case 'User.Devices':
        return t('User.Tabs.Devices')
      case 'User.Battery':
        return t('User.Tabs.Battery')
      case 'User.Analysis':
        return t('User.Tabs.Analysis')
      case 'User.My':
        return t('User.Tabs.My')
      default:
        return ''
    }
  }

  return {
    getHomeSheetMenuData,
    getDevicesSheetMenuData,
    getInstallerTabTitleI18nText,
    getUserTabTitleI18nText
  }
}
