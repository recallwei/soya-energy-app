import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { SizableText, XStack } from 'tamagui'

import { useAuthStore } from '@/store'

const UserAvatar = memo(() => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const authStore = useAuthStore()

  return (
    <TouchableOpacity onPress={() => navigate('Common.My.Personal_Info')}>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingVertical="$4"
        paddingHorizontal="$2"
        width="100%"
      >
        <XStack
          alignItems="center"
          space="$3"
        >
          <CachedImage
            source={authStore.userInfo.avatarUrl}
            style={{
              width: 80,
              height: 80,
              shadowRadius: 4,
              shadowOpacity: 0.05
            }}
            imageStyle={{
              borderRadius: 50
            }}
          />
          <SizableText
            fontWeight="$bold"
            size="$7"
            marginLeft="$2"
          >
            {authStore.userInfo.username}
          </SizableText>
        </XStack>

        <XStack
          alignItems="center"
          space="$2"
        >
          <SizableText
            fontWeight="$bold"
            size="$5"
          >
            {t('Edit')}
          </SizableText>
          <ChevronRight />
        </XStack>
      </XStack>
    </TouchableOpacity>
  )
})
export default UserAvatar
