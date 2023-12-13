import { useRoute } from '@react-navigation/native'
import { ChevronRight, Circle } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { RefreshControl, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ScrollView, Separator, SizableText, Stack, XStack, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'
import StatusBadge from '@/screens/Installer/Management/components/ScrollList/components/StatusBadge'
import { ManagementTab } from '@/screens/Installer/Management/enums'
import type { RouteProp } from '@/types'

import { FieldRow } from './components'
import { useInverterDetailQuery } from './hooks'

export default function Screen() {
  const { t } = useTranslation(['Common.Inverter', 'Global'])
  const route = useRoute<RouteProp<'Common.Inverter.Detail'>>()
  const { detail, isLoading, refetch } = useInverterDetailQuery({ id: route.params.id })
  const { refreshing, onRefresh } = useRefresh(refetch)

  return (
    <View>
      <ScrollView
        minHeight="100%"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <YStack
          padding="$2"
          space="$3"
        >
          <YStack>
            <FieldRow
              leftText={t('Global:Real.Time.Status')}
              customRight={
                <StatusBadge
                  currentTab={ManagementTab.Inverter}
                  status={detail.status}
                />
              }
            />
            <FieldRow
              leftText={t('Current.Power')}
              rightText={`${detail.power ?? '--'}W`}
              stripe
            />
          </YStack>

          <TouchableOpacity onPress={() => {}}>
            <FieldRow
              leftText={t('Alarm.Message')}
              customRight={<ChevronRight />}
            />
          </TouchableOpacity>

          <XStack
            padding="$2"
            justifyContent="space-between"
          >
            <Stack />
            <YStack
              alignItems="center"
              space="$2"
            >
              <XStack
                alignItems="center"
                space="$0.5"
              >
                <Circle
                  size={16}
                  fill="#ff4d4f"
                  color="#ff4d4f"
                />
                <SizableText size="$3">{t('Urgent.Alarms')}</SizableText>
              </XStack>
              <SizableText>0</SizableText>
            </YStack>

            <Separator vertical />

            <YStack
              alignItems="center"
              space="$2"
            >
              <XStack
                alignItems="center"
                space="$0.5"
              >
                <Circle
                  size={16}
                  fill="#ef4518"
                  color="#ef4518"
                />
                <SizableText size="$3">{t('Important.Alarms')}</SizableText>
              </XStack>
              <SizableText>0</SizableText>
            </YStack>

            <Separator vertical />

            <YStack
              alignItems="center"
              space="$2"
            >
              <XStack
                alignItems="center"
                space="$0.5"
              >
                <Circle
                  size={16}
                  fill="#ff6600"
                  color="#ff6600"
                />
                <SizableText size="$3">{t('General.Alarms')}</SizableText>
              </XStack>
              <SizableText>0</SizableText>
            </YStack>

            <Stack />
          </XStack>

          {detail && (
            <YStack>
              <XStack
                alignItems="center"
                justifyContent="space-between"
                padding="$2"
              >
                <SizableText>{t('Model')}</SizableText>
                <SizableText fontWeight="$bold">{detail.deviceModel ?? '--'}</SizableText>
              </XStack>
              <XStack
                alignItems="center"
                backgroundColor="$gray2"
                borderRadius="$2"
              >
                <SizableText>{t('Rated.Power')}</SizableText>
                <SizableText fontWeight="$bold">{detail.ratedPower ?? '--'}</SizableText>
              </XStack>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </View>
  )
}
