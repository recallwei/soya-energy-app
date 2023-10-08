import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function SettingsScreen(): React.JSX.Element {
  const { t } = useTranslation('Settings')

  const navigation = useNavigation()

  const [gridControl] = useState(false)
  const [darkMode] = useState(false)

  return (
    <YStack
      padding="$4"
      space="$3"
      marginBottom="$10"
    >
      <MenuItemCard
        title={t('Title.Battery')}
        description={t('Description.Battery')}
        onPress={() => navigation.navigate('SettingsBattery')}
      />

      <MenuItemCard
        title={t('Title.LoadControl')}
        description={t('Description.LoadControl')}
        onPress={() => navigation.navigate('SettingsLoadControl')}
      />

      <MenuItemCard
        title={t('Title.ElectricityRate')}
        description={t('Description.ElectricityRate')}
        onPress={() => navigation.navigate('SettingsElectricityRate')}
      />

      <MenuItemCard
        title={t('Title.Connectivity')}
        description={t('Description.Connectivity')}
        onPress={() => navigation.navigate('SettingsConnectivity')}
      />

      <MenuItemCard
        title={t('Title.GridControl')}
        description={
          gridControl
            ? t('Description.GridControl.True')
            : t('Description.GridControl.False')
        }
        switcher
      />

      <MenuItemCard
        title={t('Title.Performance')}
        description={t('Description.Performance')}
        onPress={() => navigation.navigate('SettingsPerformance')}
      />

      <MenuItemCard
        title={t('Title.DarkMode')}
        description={
          darkMode
            ? t('Description.DarkMode.True')
            : t('Description.DarkMode.False')
        }
        switcher
      />
    </YStack>
  )
}
