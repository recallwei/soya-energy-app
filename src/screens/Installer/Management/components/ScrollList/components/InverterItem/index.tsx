import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { Component } from '@tamagui/lucide-icons'
import { useAsyncEffect } from 'ahooks'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { SYSTEM_RESOURCE } from '@/constants'
import type { ManagementTab } from '@/screens/Installer/Management/enums'
import type { Inverter } from '@/types'
import { CacheUtils } from '@/utils'

import StatusBadge from '../StatusBadge'

interface Props extends Inverter {
  currentTab: ManagementTab
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
        <XStack alignItems="center">
          <StatusBadge
            status={props.status}
            type={props.currentTab}
          />
        </XStack>
        <XStack
          alignItems="center"
          space="$2"
        >
          <Component size={16} />
          <SizableText fontWeight="$bold">{props.plantName}</SizableText>
        </XStack>
        <XStack
          alignItems="center"
          space="$3"
        >
          <CachedImage
            source={props.projectPic ?? SYSTEM_RESOURCE.PLANT_DEFAULT_IMAGE_URL}
            style={{
              width: 100,
              height: 60,
              shadowRadius: 4,
              shadowOpacity: 0.05,
              borderRadius: 8
            }}
          />
          <YStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Current.Power')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.power ?? '-'}
                </SizableText>
                <SizableText size="$3">W</SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Production.Today')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.todayPower ?? '-'}
                </SizableText>
                <SizableText size="$3">kWh</SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Capacity')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.todayPower ?? '-'}
                </SizableText>
                <SizableText size="$3">kWp</SizableText>
              </XStack>
            </XStack>
            <XStack space="$4">
              <SizableText size="$3">{t('Capacity')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.todayPower ?? '-'}
                </SizableText>
                <SizableText size="$3">kWp</SizableText>
              </XStack>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </Card>
  )
})
export default InverterItem
