import { Laptop, Settings, ShieldCheck, Siren, Users2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { RefreshControl } from 'react-native'
import { ScrollView, View, XStack, YStack } from 'tamagui'

import { HeadingTitle } from '@/components'
import { useRefresh, useSafeAreaPadding } from '@/hooks'

import { ServiceItem } from './components'

export default function DemoScreen() {
  const { insetsWithoutBottom } = useSafeAreaPadding()
  const { t } = useTranslation('Installer.Services')

  const { refreshing, onRefresh } = useRefresh()

  return (
    <View {...insetsWithoutBottom}>
      <ScrollView
        minHeight="100%"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <YStack
          padding="$4"
          space="$4"
        >
          <View space="$4">
            <HeadingTitle title={t('Household.PV.Services')} />
            <XStack space="$2">
              <ServiceItem
                icon={<Siren size="$2" />}
                text={t('Alarm.Process')}
              />
              <ServiceItem
                icon={<Laptop size="$2" />}
                text={t('Remote.Configuration')}
              />
              <ServiceItem
                icon={<ShieldCheck size="$2" />}
                text={t('Warranty.Check')}
              />
              <ServiceItem
                icon={<Siren size="$2" />}
                text={t('Plant.Transfer')}
              />
            </XStack>
          </View>

          <View space="$4">
            <HeadingTitle title={t('Common.Services')} />
            <XStack
              space="$2"
              width="50%"
              paddingRight="$2"
            >
              <ServiceItem
                icon={<Users2 size="$2" />}
                text={t('My.Customers')}
              />
              <ServiceItem
                icon={<Settings size="$2" />}
                text={t('Electricity.Tariff.Settings')}
              />
            </XStack>
          </View>
        </YStack>
      </ScrollView>
    </View>
  )
}
