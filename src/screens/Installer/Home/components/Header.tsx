import { BellRing, Share2 } from '@tamagui/lucide-icons'
import { TouchableOpacity } from 'react-native'
import { SizableText, XStack } from 'tamagui'

import { AppMetaData } from '@/constants'

export default function Header() {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
    >
      <SizableText size="$8">{AppMetaData.APP_NAME}</SizableText>
      <XStack
        space="$3"
        alignItems="center"
      >
        <TouchableOpacity onPress={() => {}}>
          <BellRing size="$1" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Share2 size="$1" />
        </TouchableOpacity>
      </XStack>
    </XStack>
  )
}
