import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { Component, MapPin, MoreHorizontal } from '@tamagui/lucide-icons'
import { useAsyncEffect } from 'ahooks'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { SizableText, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { SYSTEM_RESOURCE } from '@/constants'
import type { ManagementTab } from '@/screens/Installer/Management/enums'
import type { Plant } from '@/types'
import { CacheUtils } from '@/utils'

import StatusBadge from '../StatusBadge'

interface Props extends Plant {
  handleOpenPlantSheet: (id: string) => void
  currentTab: ManagementTab
}

const PlantItem = memo((props: Props) => {
  const { t } = useTranslation('Installer.Management')
  const { navigate } = useNavigation()

  useAsyncEffect(async () => {
    await CacheUtils.fetchBlob(props.projectPic ?? SYSTEM_RESOURCE.PLANT_DEFAULT_IMAGE_URL)
  }, [props.projectPic])

  const navToDetail = () => navigate('User.Tabs', { screen: 'User.Home', params: { id: props.id } })

  return (
    <Card onPress={navToDetail}>
      <XStack
        position="absolute"
        right="$4"
        top="$4"
      >
        <TouchableOpacity onPress={() => props.handleOpenPlantSheet(props.id)}>
          <MoreHorizontal size={20} />
        </TouchableOpacity>
      </XStack>
      <YStack space="$1">
        <XStack alignItems="center">
          <StatusBadge
            status={props.status}
            currentTab={props.currentTab}
          />
        </XStack>
        <XStack
          alignItems="center"
          space="$2"
        >
          <Component size={16} />
          <SizableText
            size="$4"
            fontWeight="$bold"
          >
            {props.plantName}
          </SizableText>
        </XStack>
        <XStack
          alignItems="center"
          space="$3"
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
            <XStack space="$3">
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
            <XStack space="$3">
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
            <XStack space="$3">
              <SizableText size="$3">{t('Capacity')}</SizableText>
              <XStack space="$2">
                <SizableText
                  size="$3"
                  fontWeight="$bold"
                >
                  {props.systemPower ?? '-'}
                </SizableText>
                <SizableText size="$3">kWp</SizableText>
              </XStack>
            </XStack>
          </YStack>
        </XStack>

        <XStack
          alignItems="center"
          space="$2"
        >
          <MapPin size={16} />
          <SizableText size="$2">{props.address ?? '-'}</SizableText>
        </XStack>
      </YStack>
    </Card>
  )
})
export default PlantItem
