import { useTranslation } from 'react-i18next'

import type { SheetMenuListItem } from '@/components'
import type { InstallerTabParamList, UserTabParamList } from '@/types'

export const useNavigationData = () => {
  const { t } = useTranslation('Screen')

  const getHomeSheetMenuData = (navigation: any): SheetMenuListItem[] => [
    { text: '天气', onPress: () => navigation.navigate('User.Home.Weather_Forecast_Settings') },
    { text: '管理', onPress: () => navigation.navigate('Common.Plant.Detail') },
    { text: '电站月报', onPress: () => navigation.navigate('Common.Plant.Detail') },
    { text: '电站视图', onPress: () => navigation.navigate('Common.Plant.Detail') },
    { text: '电站地图', onPress: () => navigation.navigate('Common.Plant.Detail') },
    { text: '分享', onPress: () => navigation.navigate('Common.Plant.Detail') }
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
    getInstallerTabTitleI18nText,
    getUserTabTitleI18nText
  }
}
