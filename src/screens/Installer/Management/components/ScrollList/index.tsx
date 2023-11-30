import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { Circle, Component, MapPin } from '@tamagui/lucide-icons'
import { useAsyncEffect } from 'ahooks'
import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ScrollView, SizableText, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import type { Plant } from '@/types'
import { CacheUtils } from '@/utils'

import { ManagementTab } from '../../enums'
import { tabStatusI18nMap } from '../../maps'
import { getColor } from '../../utils'

interface Props {
  refreshing: boolean
  onRefresh: () => void
  listData: Plant[]
  currentTab: ManagementTab
}

const StatusBadge = memo((props: Plant) => {
  const [statusText, setStatusText] = useState('')
  const { i18n } = useTranslation()

  useEffect(() => {
    if (props.status) {
      setStatusText(tabStatusI18nMap.get(props.status)?.() ?? '')
    }
  }, [props.status, i18n.language])

  if (!props.status) {
    return null
  }

  const color = getColor(props.status)

  return (
    <XStack
      alignItems="center"
      space="$2"
    >
      {color && (
        <Circle
          size={16}
          fill={color}
          color={color}
        />
      )}
      <SizableText size="$4">{statusText}</SizableText>
    </XStack>
  )
})

const CardContent = memo(({ data, currentTab }: { data: Plant; currentTab: ManagementTab }) => {
  const { t } = useTranslation('Installer.Management')
  useAsyncEffect(async () => {
    if (data.siteUrl) {
      await CacheUtils.fetchBlob(data.siteUrl)
    }
  }, [data.siteUrl])

  switch (currentTab) {
    case ManagementTab.Plant:
      return (
        <YStack space="$1">
          <XStack alignItems="center">
            <StatusBadge {...data} />
          </XStack>
          <XStack
            alignItems="center"
            space="$2"
          >
            <Component size={16} />
            <SizableText fontWeight="$bold">{data.siteName}</SizableText>
          </XStack>
          <XStack
            alignItems="center"
            space="$3"
          >
            {data.siteUrl && (
              <CachedImage
                source={data.siteUrl}
                style={{
                  width: 100,
                  height: 60,
                  shadowRadius: 4,
                  shadowOpacity: 0.05,
                  borderRadius: 8
                }}
              />
            )}
            <YStack>
              <XStack space="$4">
                <SizableText size="$3">{t('Current.Power')}</SizableText>
                <XStack space="$2">
                  <SizableText
                    size="$3"
                    fontWeight="$bold"
                  >
                    {data.currentPower ?? '-'}
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
                    {data.productionToday ?? '-'}
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
                    {data.siteCapacity ?? '-'}
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
            <SizableText>{data.sitePosition ?? '-'}</SizableText>
          </XStack>
        </YStack>
      )
    case ManagementTab.Inverter:
      return <YStack />
    default:
      return null
  }
})

export default function ScrollList(props: Props) {
  const { navigate } = useNavigation()

  const handleClickCard = (id: string) => {
    switch (props.currentTab) {
      case ManagementTab.Plant:
        navigate('User.Tabs', { screen: 'User.Home', params: { id } })
        break
      case ManagementTab.Inverter:
        navigate('User.Devices.Invertor_Detail', { id })
        break
      case ManagementTab.Battery:
        navigate('User.Devices.Battery_Detail', { id })
        break
      default:
        break
    }
  }
  return (
    <ScrollView
      width="100%"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
    >
      <YStack
        paddingHorizontal="$4"
        paddingBottom="$4"
        space="$3"
      >
        <FlatList
          contentContainerStyle={{ gap: 8 }}
          data={props.listData}
          scrollEnabled={false}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Card onPress={() => handleClickCard(item.id)}>
              <CardContent
                data={item}
                currentTab={props.currentTab}
              />
            </Card>
          )}
        />
      </YStack>
    </ScrollView>
  )
}
