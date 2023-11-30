import { useNavigation } from '@react-navigation/native'
import { BellRing, Share2 } from '@tamagui/lucide-icons'
import { TouchableOpacity } from 'react-native'
import { SizableText, XStack } from 'tamagui'

import { AppMetaData } from '@/constants'

export default function Header() {
  const { navigate } = useNavigation()
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="$1"
    >
      <SizableText
        size="$8"
        fontWeight="$bold"
      >
        {AppMetaData.APP_NAME}
      </SizableText>
      <XStack
        space="$3"
        alignItems="center"
      >
        <TouchableOpacity onPress={() => navigate('Common.Message')}>
          <BellRing size="$1" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Share2 size="$1" />
        </TouchableOpacity>
      </XStack>
    </XStack>
  )
}
