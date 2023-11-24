import { RefreshControl } from 'react-native'
import { ScrollView, View, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh, useSafeAreaPadding } from '@/hooks'
import { useAuthStore } from '@/store'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()
  const { insets } = useSafeAreaPadding()
  const authStore = useAuthStore()
  return (
    <View paddingTop={authStore.isUser() ? insets.paddingTop : undefined}>
      <ScrollView
        minHeight="100%"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <YStack
          padding="$4"
          space="$3"
          marginBottom="$10"
        >
          <NoData />
        </YStack>
      </ScrollView>
    </View>
  )
}
