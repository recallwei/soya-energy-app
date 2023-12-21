import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { useAsyncEffect } from 'ahooks'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { SYSTEM_RESOURCE } from '@/constants'
import type { ManagementTab } from '@/screens/Installer/Management/enums'
import type { Battery } from '@/types'
import { CacheUtils, TimeUtils } from '@/utils'

import StatusBadge from '../StatusBadge'

interface Props extends Battery {
  currentTab: ManagementTab
}

const BatteryItem = memo((props: Props) => {
  const { t } = useTranslation('Installer.Management')
  const { navigate } = useNavigation()

  useAsyncEffect(async () => {
    await CacheUtils.fetchBlob(props.projectPic || SYSTEM_RESOURCE.BATTERY_DEFAULT_IMAGE_URL)
  }, [props.projectPic])

  const navToDetail = () => navigate('Common.Battery.Detail', { id: props.id! })

  return (
    <Card onPress={navToDetail}>
      <YStack space="$1">
        <XStack alignItems="center">
          <View
            width={60}
            marginRight="$3"
          >
            <StatusBadge
              status={props.status}
              currentTab={props.currentTab}
            />
          </View>
          <SizableText
            size="$4"
            fontWeight="$bold"
          >
            {props.deviceSN} {props.connectionType}
          </SizableText>
        </XStack>
        <XStack
          alignItems="center"
          space="$3"
        >
          <CachedImage
            source={props.projectPic || SYSTEM_RESOURCE.PLANT_DEFAULT_IMAGE_URL}
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
              <SizableText size="$3">{t('Model')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.inverterSN ?? '--'}
                </SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('BAT.Software.Version')}</SizableText>
              <XStack space="$2">
                <SizableText size="$3">v</SizableText>
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.swVersion ?? '--'}
                </SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Warranty.Effective.Date')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {TimeUtils.formatTime(props.currentTime, 'YYYY-MM-DD', '--')}
                </SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Expiration.Time')}</SizableText>
              <XStack space="$2">
                <SizableText size="$3">
                  {TimeUtils.formatTime(props.currentTime, 'YYYY-MM-DD', '--')}
                </SizableText>
              </XStack>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </Card>
  )
})
export default BatteryItem
