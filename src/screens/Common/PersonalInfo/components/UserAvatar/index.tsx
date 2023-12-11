import { CachedImage } from '@georstat/react-native-image-cache'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useAsyncEffect } from 'ahooks'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { SizableText, XStack } from 'tamagui'

import { SheetMenu } from '@/components'
import { SYSTEM_RESOURCE } from '@/constants'
import { useAuthStore } from '@/store'
import { AlertUtils, CacheUtils, ToastUtils } from '@/utils'

const UserAvatar = memo(() => {
  const { t } = useTranslation()
  const authStore = useAuthStore()
  const [open, setOpen] = useState(false)

  useAsyncEffect(async () => {
    await CacheUtils.fetchBlob(authStore.user.avatar ?? SYSTEM_RESOURCE.USER_DEFAULT_IMAGE_URL)
  }, [])

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
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
              source={authStore.user.avatar ?? SYSTEM_RESOURCE.USER_DEFAULT_IMAGE_URL}
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
      <SheetMenu
        data={[
          {
            text: t('Take.Photo'),
            onPress: () => {
              ImagePicker.openCamera({
                width: 400,
                height: 400,
                cropping: true,
                multiple: false
              }).then(() => {
                AlertUtils.loading({ title: t('Uploading') })
                setTimeout(() => AlertUtils.dismiss(), 3000)
                ToastUtils.success({ title: t('Upload.Success') })
              })
            }
          },
          {
            text: t('Choose.Photo'),
            onPress: () => {
              ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
                multiple: false
              }).then(() => {
                AlertUtils.loading({ title: t('Uploading') })
                setTimeout(() => AlertUtils.dismiss(), 3000)
                ToastUtils.success({ title: t('Upload.Success') })
              })
            }
          }
        ]}
        autoClose
        sheet={{
          open,
          setOpen
        }}
      />
    </>
  )
})
export default UserAvatar
