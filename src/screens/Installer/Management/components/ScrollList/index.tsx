import React from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Circle, ScrollView, SizableText, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import type { Plant } from '@/types'

import { ManagementTab } from '../../enums'
import { getColor } from '../../utils'

interface Props {
  refreshing: boolean
  onRefresh: () => void
  listData: Plant[]
  currentTab: ManagementTab
}

function StatusBadge(item: Plant) {
  const color = getColor(item.status)
  return (
    <XStack
      alignItems="center"
      space="$1.5"
    >
      {color && (
        <Circle
          position="absolute"
          left={-10}
          size="$0.75"
          backgroundColor={color}
        />
      )}
      <SizableText fontSize="$3">{item.siteName}</SizableText>
    </XStack>
  )
}

export default function ScrollList(props: Props) {
  const renderCardContent = (item: Plant) => {
    switch (props.currentTab) {
      case ManagementTab.Plant:
        return (
          <YStack>
            <XStack>{StatusBadge(item)}</XStack>
            <XStack />

            <XStack />

            <XStack />

            <XStack />
          </YStack>
        )

      case ManagementTab.Inverter:
        return <YStack />
      default:
        return null
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
        space="$3"
      >
        <FlatList
          contentContainerStyle={{ gap: 20 }}
          data={props.listData}
          scrollEnabled={false}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <Card>{renderCardContent(item)}</Card>}
        />
      </YStack>
    </ScrollView>
  )
}
