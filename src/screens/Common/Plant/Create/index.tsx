import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { Image } from 'react-native-image-crop-picker'
import ImagePicker from 'react-native-image-crop-picker'
import {
  Button,
  Image as TImage,
  Input,
  ScrollView,
  SizableText,
  Spinner,
  View,
  YStack
} from 'tamagui'

import { Checkbox, InputTitle } from '@/components'
import type { RouteProp } from '@/types'
import { ToastUtils } from '@/utils'

import { useCreateForm, useCreateMutation } from './hooks'

export default function Screen() {
  const { t } = useTranslation(['Global', 'Common.Plant', 'Validation'])
  const route = useRoute<RouteProp<'Common.Plant.Create'>>()

  const { handleSubmit, handleSubmitError, control } = useCreateForm()
  const { handleCreatePlant, isCreateLoading } = useCreateMutation()
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  const [userAgreement, setUserAgreement] = useState(false)

  const handleSelectFile = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      multiple: false,
      mediaType: 'photo'
    })
      .then((image) => {
        if (selectedImage) {
          ImagePicker.cleanSingle(selectedImage.path).catch(() => {})
        }
        setSelectedImage(image)
      })
      .catch(() => {})
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack
          padding="$4"
          gap="$3"
          position="relative"
          height="100%"
        >
          <Controller
            name="plantName"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle required>{t('Common.Plant:Name')}</InputTitle>
                <Input
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:Plant.Name.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />
          <Controller
            name="systemPower"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle required>{t('Common.Plant:Capacity')}</InputTitle>
                <Input
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:Capacity.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle required>{t('Common.Plant:Country.Region')}</InputTitle>
                <Input
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:Country.Region.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />
          <Controller
            name="timeZone"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle required>{t('Common.Plant:Time.Zone')}</InputTitle>
                <Input
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:Time.Zone.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle required>{t('Common.Plant:Address')}</InputTitle>
                <Input
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:Address.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle required>{t('Common.Plant:Type')}</InputTitle>
                <Input
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:Plant.Type.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />
          <Controller
            name="moduleNum"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle>{t('Common.Plant:Components.Number')}</InputTitle>
                <Input
                  keyboardType="decimal-pad"
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:Component.Num.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />
          <Controller
            name="pvPanelAzimuth"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle>{t('Common.Plant:PV.Panel.Azimuth')}</InputTitle>
                <Input
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:PV.Panel.Azimuth.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />
          <Controller
            name="pvPanelAngle"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack>
                <InputTitle>{t('Common.Plant:PV.Panel.Inclination')}</InputTitle>
                <Input
                  maxLength={30}
                  autoCapitalize="none"
                  placeholder={t('Validation:PV.Panel.Inclination.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isCreateLoading}
                  borderColor={error ? 'red' : undefined}
                />
              </YStack>
            )}
          />

          <SizableText>{t('Common.Plant:Plant.Logo')}</SizableText>

          {selectedImage && (
            <TImage
              source={{ uri: selectedImage.path }}
              width={120}
              height={120}
              borderRadius="$4"
              resizeMode="cover"
              alignSelf="center"
            />
          )}

          <Button
            width="100%"
            onPress={handleSelectFile}
          >
            {t('Global:Choose.File')}
          </Button>

          <Checkbox
            marginTop="$3"
            label={t('Common.Plant:I.Have.Obtained.User.Authorization')}
            checked={userAgreement}
            onCheckedChange={(checked: boolean) => setUserAgreement(checked)}
          />

          <Button
            width="100%"
            marginTop="$4"
            onPress={handleSubmit((data) => {
              if (!userAgreement) {
                ToastUtils.success({ message: t('Validation:Agreement.Not.Null') })
                return
              }
              handleCreatePlant({
                ...data,
                userId: route.params.userId,
                inverterSn: route.params.inverterSn
              })
            }, handleSubmitError)}
            disabled={isCreateLoading}
            icon={isCreateLoading ? <Spinner /> : undefined}
          >
            {t('Submit')}
          </Button>
        </YStack>
      </ScrollView>
    </View>
  )
}
