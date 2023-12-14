import { Laptop, Settings, ShieldCheck, Siren, Users2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View, XStack, YStack } from 'tamagui'

import { HeadingTitle } from '@/components'
import { useRefresh } from '@/hooks'

import { ServiceItem } from './components'

export default function DemoScreen() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation('Installer.Services')

  const { refreshing, onRefresh } = useRefresh()

  return (
    <View
      paddingTop={insets.top}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
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
                icon={
                  <Siren
                    size="$1.5"
                    color="$gray12"
                  />
                }
                text={t('Alarm.Process')}
              />
              <ServiceItem
                icon={
                  <Laptop
                    size="$1.5"
                    color="$gray12"
                  />
                }
                text={t('Remote.Configuration')}
              />
            </XStack>
            <XStack space="$2">
              <ServiceItem
                icon={
                  <ShieldCheck
                    size="$1.5"
                    color="$gray12"
                  />
                }
                text={t('Warranty.Check')}
              />
              <ServiceItem
                icon={
                  <Siren
                    size="$1.5"
                    color="$gray12"
                  />
                }
                text={t('Plant.Transfer')}
              />
            </XStack>
          </View>

          <View space="$4">
            <HeadingTitle title={t('Common.Services')} />
            <XStack
              space="$2"
              paddingRight="$2"
            >
              <ServiceItem
                icon={
                  <Users2
                    size="$1.5"
                    color="$gray12"
                  />
                }
                text={t('My.Customers')}
              />
              <ServiceItem
                icon={
                  <Settings
                    size="$1.5"
                    color="$gray12"
                  />
                }
                text={t('Electricity.Tariff.Settings')}
              />
            </XStack>
          </View>
        </YStack>
      </ScrollView>
    </View>
  )
}
