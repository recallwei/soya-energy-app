import { Separator, SizableText, XStack, YStack } from 'tamagui'

import { Card } from '@/components'

export default function Statistics() {
  return (
    <YStack space="$3">
      <XStack justifyContent="space-between">
        <Card width="49%">
          <YStack>
            <SizableText>18.2 KWH</SizableText>
            <SizableText>累计发电量</SizableText>
          </YStack>
        </Card>
        <Card width="49%">
          <YStack>
            <SizableText>18.2 KWH</SizableText>
            <SizableText>总装机容量</SizableText>
          </YStack>
        </Card>
      </XStack>

      <Card>
        <XStack justifyContent="space-between">
          <YStack>
            <SizableText>0.0 KWH</SizableText>
            <SizableText>Today</SizableText>
          </YStack>
          <Separator
            alignSelf="stretch"
            vertical
            marginHorizontal={15}
          />
          <YStack>
            <SizableText>0.0 KWH</SizableText>
            <SizableText>Today</SizableText>
          </YStack>
          <Separator
            alignSelf="stretch"
            vertical
            marginHorizontal={15}
          />
          <YStack>
            <SizableText>0.0 KWH</SizableText>
            <SizableText>Today</SizableText>
          </YStack>
        </XStack>
      </Card>
    </YStack>
  )
}
