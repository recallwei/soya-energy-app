import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Pressable, RefreshControl, TouchableWithoutFeedback } from 'react-native'
import type { Image } from 'react-native-image-crop-picker'
import ImagePicker from 'react-native-image-crop-picker'
import { Button, Image as TImage, ScrollView, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'
import { ToastUtils } from '@/utils'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()
  const { t } = useTranslation('Temp')

  const [images, setImages] = useState<Image[]>([])

  const [currentImage, setCurrentImage] = useState<Image | null>(null)

  const handleOpenImagePicker = () => {
    ImagePicker.clean()
      .then(() => {})
      .catch(() => {})
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      mediaType: 'photo',
      maxFiles: 10
    }).then((imageList) => {
      setImages(imageList)
      setCurrentImage(null)
    })
  }

  const handleOpenCamera = () => {
    ImagePicker.clean()
      .then(() => {})
      .catch(() => {})
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo'
    })
      .then((image) => {
        setImages([image])
        setCurrentImage(null)
      })
      .catch(() => {
        setImages([])
        setCurrentImage(null)
      })
  }

  const handleCropPicture = () => {
    if (!currentImage) {
      ToastUtils.error({ message: t('Image.Picker.Please.Select') })
      return
    }
    ImagePicker.openCropper({
      path: currentImage.path,
      width: 300,
      height: 400,
      mediaType: 'photo'
    }).then((image) => {
      setImages(
        images.map((item) => {
          if (item.path === currentImage.path) {
            return image
          }
          return item
        })
      )
      setCurrentImage(null)
      ToastUtils.success({ message: t('Image.Picker.Crop.Success') })
    })
  }

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
      <Pressable
        onPress={() => {
          if (currentImage) {
            ImagePicker.cleanSingle(currentImage.path).catch(() => {})
            setCurrentImage(null)
          }
        }}
      >
        <YStack
          padding="$4"
          space="$2"
        >
          <Button onPress={handleOpenImagePicker}>{t('Image.Picker.Select.From.Gallery')}</Button>
          <Button onPress={handleOpenCamera}>{t('Image.Picker.Select.From.Camera')}</Button>
          <Button onPress={handleCropPicture}>{t('Image.Picker.Crop.Picture')}</Button>
          <FlatList
            contentContainerStyle={{ gap: 20, marginTop: 12 }}
            scrollEnabled={false}
            data={images}
            keyExtractor={({ path }) => path}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => setCurrentImage(item)}>
                <TImage
                  source={{ uri: item.path }}
                  width="80%"
                  height={150}
                  borderRadius="$4"
                  resizeMode="cover"
                  alignSelf="center"
                  style={{
                    borderWidth: currentImage?.path === item.path ? 3 : 0,
                    borderColor: 'green'
                  }}
                />
              </TouchableWithoutFeedback>
            )}
          />
        </YStack>
      </Pressable>
    </ScrollView>
  )
}
