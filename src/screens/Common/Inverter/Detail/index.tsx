import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { RefreshControl, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ScrollView, SizableText, XStack, YStack } from 'tamagui'

import { CopyButton } from '@/components'
import { useRefresh } from '@/hooks'
import StatusBadge from '@/screens/Installer/Management/components/ScrollList/components/StatusBadge'
import { ManagementTab } from '@/screens/Installer/Management/enums'
import type { RouteProp } from '@/types'

import { AlarmArea, FieldRow } from './components'
import { useInverterDetailQuery } from './hooks'

export default function Screen() {
  const { t } = useTranslation(['Common.Inverter', 'Global'])
  const route = useRoute<RouteProp<'Common.Inverter.Detail'>>()
  const { detail, isLoading, refetch } = useInverterDetailQuery({ id: route.params.id })
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

          <AlarmArea />

          {detail && (
            <YStack>
              <FieldRow
                leftText={t('Model')}
                rightText={detail.deviceModel || '--'}
              />

              <FieldRow
                leftText={t('Rated.Power')}
                rightText={detail.ratedPower ?? '--'}
                stripe
              />

              <TouchableOpacity onPress={() => {}}>
                <FieldRow
                  leftText={t('Alias')}
                  customRight={
                    <XStack
                      space="$1"
                      alignItems="center"
                    >
                      <SizableText
                        size="$3"
                        fontWeight="$bold"
                      >
                        {detail.deviceAlias || '--'}
                      </SizableText>
                      <ChevronRight size="$1" />
                    </XStack>
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigate('User.Tabs', {
                    screen: 'User.Home'
                  })
                }
              >
                <FieldRow
                  leftText={t('Plant')}
                  stripe
                  customRight={
                    <XStack
                      space="$1"
                      alignItems="center"
                    >
                      <SizableText
                        fontSize="$3"
                        fontWeight="$bold"
                      >
                        {detail.plantName || '--'}
                      </SizableText>
                      <ChevronRight size="$1" />
                    </XStack>
                  }
                />
              </TouchableOpacity>

              <FieldRow
                leftText={t('Inverter.SN')}
                customRight={
                  <YStack space="$2">
                    <SizableText
                      fontSize="$3"
                      fontWeight="$bold"
                    >
                      {detail.plantName || '--'}
                    </SizableText>
                    <CopyButton copyText={detail.plantName} />
                  </YStack>
                }
              />

              <FieldRow
                leftText={t('Module.SN')}
                stripe
                customRight={
                  <YStack space="$2">
                    <SizableText
                      fontSize="$3"
                      fontWeight="$bold"
                    >
                      {detail.plantName || '--'}
                    </SizableText>
                    <CopyButton copyText={detail.plantName} />
                  </YStack>
                }
              />

              <FieldRow
                leftText={t('Module.Firmware.Version.No')}
                rightText={detail.plantName || '--'}
              />

              <FieldRow
                leftText={t('Display.Board.Version')}
                rightText={detail.plantName || '--'}
                stripe
              />

              <FieldRow
                leftText={t('Control.Board.Version')}
                rightText={detail.plantName || '--'}
              />

              <FieldRow
                leftText={t('Device.Owner')}
                rightText={detail.plantName || '--'}
                stripe
              />
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </View>
  )
}
