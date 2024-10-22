import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useAsyncEffect } from 'ahooks'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { SizableText, XStack } from 'tamagui'

import { SYSTEM_RESOURCE } from '@/constants'
import { useAuthStore } from '@/store'
import { CacheUtils } from '@/utils'

const UserAvatar = memo(() => {
  const { navigate } = useNavigation()
  const authStore = useAuthStore()

  useAsyncEffect(async () => {
    await CacheUtils.fetchBlob(authStore.user.avatar || SYSTEM_RESOURCE.USER_DEFAULT_IMAGE_URL)
  }, [])

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
            source={authStore.user.avatar || SYSTEM_RESOURCE.USER_DEFAULT_IMAGE_URL}
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
            {authStore.user.realName}
          </SizableText>
          <ChevronRight />
        </XStack>
      </XStack>
    </TouchableOpacity>
  )
})
export default UserAvatar
