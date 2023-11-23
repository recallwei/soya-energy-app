import React from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { NoData } from '@/components'

interface Props {
  refreshing: boolean
  onRefresh: () => void
}

export default function ScrollList(props: Props) {
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
        <NoData />
      </YStack>
    </ScrollView>
  )
}
