import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function SystemSiteDetailScreen(): React.JSX.Element {
  const { t } = useTranslation('System')

  const navigation = useNavigation()

  return (
    <ScrollView
      minHeight="100%"
      showsVerticalScrollIndicator={false}
    >
      <YStack
        padding="$4"
        space="$3"
        marginBottom="$10"
      >
        <MenuItemCard
          title={t('Title.SiteDetails')}
          description={t('Description.SiteDetails')}
          onPress={() => navigation.navigate('SystemSiteDetails')}
        />

        <MenuItemCard
          title={t('Title.Reports')}
          description={t('Description.Reports')}
          onPress={() => navigation.navigate('SystemReports')}
        />

        <MenuItemCard
          title={t('Title.Devices')}
          description={t('Description.Devices')}
          onPress={() => navigation.navigate('SystemDevices')}
        />

        <MenuItemCard
          title={t('Title.LiveStatus')}
          description={t('Description.LiveStatus')}
          onPress={() => navigation.navigate('SystemLiveStatus')}
        />

        <MenuItemCard
          title={t('Title.LiveVitals')}
          description={t('Description.LiveVitals')}
          onPress={() => navigation.navigate('SystemLiveVitals')}
        />

        <MenuItemCard
          title={t('Title.EventsHistory')}
          description={t('Description.EventsHistory')}
          onPress={() => navigation.navigate('SystemEventHistory')}
        />

        <MenuItemCard
          title={t('Title.BackupHistory')}
          description={t('Description.BackupHistory')}
          onPress={() => navigation.navigate('SystemBackupHistory')}
        />
      </YStack>
    </ScrollView>
  )
}
