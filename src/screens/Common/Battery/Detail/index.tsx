import { useNavigation, useRoute } from '@react-navigation/native'
import { BatteryFull, ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { RefreshControl, TouchableOpacity, View } from 'react-native'
import { ScrollView, Separator, SizableText, XStack, YStack } from 'tamagui'

import { CopyButton, FieldRow } from '@/components'
import { globalStyles } from '@/constants'
import { useRefresh } from '@/hooks'
import type { RouteProp } from '@/types'

import { useBatteryDetailQuery } from './hooks'

export default function Screen() {
  const { t } = useTranslation(['Common.Battery', 'Global'])
  const route = useRoute<RouteProp<'Common.Battery.Detail'>>()
  const { detail, isLoading, refetch } = useBatteryDetailQuery({ id: route.params.id })
  const { refreshing, onRefresh } = useRefresh(refetch)
  const { navigate } = useNavigation()

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
                <XStack
                  alignItems="center"
                  space="$2"
                >
                  <BatteryFull
                    size="$1"
                    color={globalStyles.primaryColor}
                  />
                  <SizableText size="$3">{t('Standby')}</SizableText>
                </XStack>
              }
            />
            <FieldRow
              leftText={t('Battery.SOC')}
              rightText={t('Good')}
              stripe
            />
          </YStack>

          <Separator />

          <YStack>
            <FieldRow
              leftText={t('Battery.SN')}
              customRight={
                <YStack
                  space="$2"
                  alignItems="flex-end"
                >
                  <SizableText
                    fontSize="$3"
                    fontWeight="$bold"
                  >
                    {detail?.deviceSN || '--'}
                  </SizableText>
                  <CopyButton copyText={detail?.deviceSN} />
                </YStack>
              }
            />
            <FieldRow
              leftText={t('Battery')}
              rightText={detail?.connectionType || '--'}
              stripe
            />
            <FieldRow
              leftText={t('Battery.Model')}
              rightText={detail?.soc || '--'}
            />
            <FieldRow
              leftText={t('BMS.Software.Version')}
              rightText={detail?.soc || '--'}
              stripe
            />
            <FieldRow
              leftText={t('Battery.Type')}
              rightText={detail?.type || '--'}
            />
          </YStack>

          <Separator />

          <YStack>
            <TouchableOpacity
              onPress={() => {
                if (!detail?.plantId) {
                  return
                }
                navigate('User.Home', { id: detail.plantId })
              }}
            >
              <FieldRow
                leftText={t('Plant')}
                customRight={
                  <XStack
                    space="$1"
                    alignItems="center"
                  >
                    <SizableText
                      size="$3"
                      fontWeight="$bold"
                    >
                      {detail?.plantName || '--'}
                    </SizableText>
                    <ChevronRight size="$1" />
                  </XStack>
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!detail?.inverterSN) {
                  return
                }
                navigate('Common.Inverter.Detail', { id: detail.inverterSN })
              }}
            >
              <FieldRow
                leftText={t('Report.Inverter')}
                customRight={
                  <XStack
                    space="$1"
                    alignItems="center"
                  >
                    <SizableText
                      size="$3"
                      fontWeight="$bold"
                    >
                      {detail?.inverterSN || '--'}
                    </SizableText>
                    <ChevronRight size="$1" />
                  </XStack>
                }
                stripe
              />
            </TouchableOpacity>
          </YStack>

          <Separator />

          <YStack>
            <SizableText
              fontWeight="$bold"
              padding="$2"
            >
              {t('BMS.Information')}
            </SizableText>
            <FieldRow
              leftText={t('Battery.SOC')}
              rightText={detail?.soc || '--'}
            />
            <FieldRow
              leftText={t('Battery.Voltage')}
              rightText={detail?.voltage || '--'}
              stripe
            />
            <FieldRow
              leftText={t('Battery.Current')}
              rightText={detail?.current || '--'}
            />
            <FieldRow
              leftText={t('Battery.Temperature')}
              rightText={detail?.temperature ?? '--'}
              stripe
            />
            <FieldRow
              leftText={t('Cycle.Times')}
              rightText={detail?.cycleCount ?? '--'}
            />
          </YStack>
        </YStack>
      </ScrollView>
    </View>
  )
}
