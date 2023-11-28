import { CachedImage } from '@georstat/react-native-image-cache'
import { ChevronRight } from '@tamagui/lucide-icons'
import { Card, SizableText, XStack, YStack } from 'tamagui'

export default function Screen() {
  const userAvatar = 'https://avatars.githubusercontent.com/u/62941121?v=4'

  return (
    <YStack
      padding="$4"
      space="$1"
    >
      <XStack>
        <CachedImage
          source={userAvatar}
          style={{
            width: 100,
            height: 100,
            shadowRadius: 4,
            shadowOpacity: 0.05
          }}
          imageStyle={{
            borderRadius: 50
          }}
        />
        <XStack>
          <SizableText>Edit</SizableText>
          <ChevronRight />
        </XStack>
      </XStack>
      <Card>
        <Card.Footer />
      </Card>
    </YStack>
  )
}
