import { CachedImage } from '@georstat/react-native-image-cache'
import { RefreshControl } from 'react-native'
import { ScrollView, View, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()

  return (
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
        space="$4"
        alignItems="center"
      >
        <View
          padding="$3"
          backgroundColor="#dfdfdf"
          borderRadius="$3"
        >
          <CachedImage
            source="https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-light.png"
            style={{ height: 150, width: 200 }}
          />
        </View>
        <View
          padding="$3"
          backgroundColor="#444444"
          borderRadius="$3"
        >
          <CachedImage
            source="https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-dark.png"
            style={{ height: 150, width: 200 }}
          />
        </View>
      </YStack>
    </ScrollView>
  )
}
