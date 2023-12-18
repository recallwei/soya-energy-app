import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { MoreHorizontal } from '@tamagui/lucide-icons'
import { useAsyncEffect } from 'ahooks'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { SizableText, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { SYSTEM_RESOURCE } from '@/constants'
import type { ManagementTab } from '@/screens/Installer/Management/enums'
import type { Inverter } from '@/types'
import { CacheUtils, TimeUtils } from '@/utils'

import StatusBadge from '../StatusBadge'

interface Props extends Inverter {
  handleOpenSheet: (id: string) => void
  currentTab: ManagementTab
  actionBtn?: boolean
}

const InverterItem = memo((props: Props) => {
  const { t } = useTranslation('Installer.Management')
  const { navigate } = useNavigation()

  useAsyncEffect(async () => {
    await CacheUtils.fetchBlob(props.projectPic ?? SYSTEM_RESOURCE.INVERTER_DEFAULT_IMAGE_URL)
  }, [props.projectPic])

  const navToDetail = () => navigate('Common.Inverter.Detail', { id: props.id! })

  return (
    <Card onPress={navToDetail}>
      <YStack space="$1">
        <XStack
          alignItems="center"
          space="$4"
        >
          <View width={60}>
            <StatusBadge
              status={props.status}
              currentTab={props.currentTab}
            />
          </View>
          <XStack
            justifyContent="space-between"
            alignItems="center"
            flex={1}
          >
            <SizableText
              size="$4"
              fontWeight="$bold"
            >
              {props.deviceSN}
            </SizableText>

            {props.actionBtn && (
              <TouchableOpacity onPress={() => props.handleOpenSheet(props.id)}>
                <MoreHorizontal size={20} />
              </TouchableOpacity>
            )}
          </XStack>
        </XStack>
        <XStack
          alignItems="center"
          space="$4"
        >
          <CachedImage
            source={props.projectPic ?? SYSTEM_RESOURCE.PLANT_DEFAULT_IMAGE_URL}
            style={{
              width: 60,
              height: 60,
              shadowRadius: 4,
              shadowOpacity: 0.05,
              borderRadius: 4,
              overflow: 'hidden'
            }}
            resizeMode="cover"
          />
          <YStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Current.Power')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.power ?? '--'}
                </SizableText>
                <SizableText size="$3">W</SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Todays.Energy')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.todayPower ?? '--'}
                </SizableText>
                <SizableText size="$3">kWh</SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Total.Energy')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.totalPower ?? '--'}
                </SizableText>
                <SizableText size="$3">MWh</SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Warranty.Date')}</SizableText>
              <XStack space="$2">
                <SizableText size="$3">
                  {TimeUtils.formatTime(props.warrantyDate, 'YYYY-MM-DD', '--')}
                </SizableText>
              </XStack>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </Card>
  )
})
export default InverterItem
