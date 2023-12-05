import { yupResolver } from '@hookform/resolvers/yup'
import { useRoute } from '@react-navigation/native'
import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import type { Image } from 'react-native-image-crop-picker'
import ImagePicker from 'react-native-image-crop-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Button,
  Image as TImage,
  Input,
  Label,
  Paragraph,
  ScrollView,
  SizableText,
  Spinner,
  View,
  XStack,
  YStack
} from 'tamagui'

import { Checkbox } from '@/components'
import { globalStyles } from '@/constants'
import { UserRole } from '@/enums'
import { useAuthStore } from '@/store'
import type { RouteProp } from '@/types'
import { DeviceUtils, ToastUtils } from '@/utils'

import { type SignUpForm, signupSchema } from './private'

export default function Screen() {
  const { t } = useTranslation(['Auth', 'Global', 'Validation'])
  const route = useRoute<RouteProp<'Auth.SignUp'>>()
  const insets = useSafeAreaInsets()
  const authStore = useAuthStore()

  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const [role, setRole] = useState<UserRole>(UserRole.USER)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    userAgreement: false,
    privacyAgreement: false,
    emailAgreement: false
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpForm) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, 1000)
      }),
    // AuthAPI.signup()
    onSuccess: () => {
      authStore.login()
      ImagePicker.cleanSingle(selectedImage!.path).catch(() => {})
    },
    onError: () => authStore.login()
  })

  useEffect(() => {
    setRole(route.params.role)
  }, [route.params.role])

  const handleChangeUserAgreement = (value: boolean) =>
    setFormData((val) => ({ ...val, userAgreement: value }))

  const handleChangePrivacyAgreement = (value: boolean) =>
    setFormData((val) => ({ ...val, privacyAgreement: value }))

  const handleChangeEmailAgreement = (value: boolean) =>
    setFormData((val) => ({ ...val, emailAgreement: value }))

  const handleSignup: SubmitHandler<SignUpForm> = (data) => mutate(data)

  const handleSubmitError: SubmitErrorHandler<SignUpForm> = (errs) => {
    const message = Object.values(errs).map((item) => item.message)[0]
    if (message) {
      ToastUtils.error({ title: message })
    }
  }

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

  const handleOpenSettings = () => DeviceUtils.openSettings()

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={120}
      style={{ paddingBottom: insets.bottom }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack
          padding="$4"
          gap="$3"
        >
          <SizableText
            fontWeight="$bold"
            fontSize="$7"
          >
            {t('Personal.Details')}
          </SizableText>

          <YStack>
            <SizableText>{t('Role.Type')}</SizableText>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </YStack>

          <YStack>
            <SizableText>{t('Username')}</SizableText>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </YStack>

          <YStack>
            <SizableText>{t('Country.Region')}</SizableText>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </YStack>

          <YStack>
            <SizableText>{t('Time.Zone')}</SizableText>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </YStack>

          <YStack>
            <SizableText>{t('Email')}</SizableText>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </YStack>

          <YStack>
            <SizableText>{t('Validation:Password.Not.Null')}</SizableText>
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                min: 6,
                max: 20
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <XStack
                  width="100%"
                  position="relative"
                >
                  <Input
                    width="100%"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    clearButtonMode="never"
                    autoCapitalize="none"
                  />
                  {value.length > 0 && (
                    <View
                      position="absolute"
                      right="$3"
                      alignSelf="center"
                      theme="alt2"
                      onPress={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size="$1" /> : <Eye size="$1" />}
                    </View>
                  )}
                </XStack>
              )}
            />
          </YStack>

          <YStack marginBottom="$3">
            <SizableText>{t('Validation:Confirm.Password.Not.Null')}</SizableText>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: true,
                min: 6,
                max: 20
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <XStack
                  width="100%"
                  position="relative"
                >
                  <Input
                    width="100%"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showConfirmPassword}
                    clearButtonMode="never"
                    autoCapitalize="none"
                  />
                  {value.length > 0 && (
                    <View
                      position="absolute"
                      right="$3"
                      alignSelf="center"
                      theme="alt2"
                      onPress={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <EyeOff size="$1" /> : <Eye size="$1" />}
                    </View>
                  )}
                </XStack>
              )}
            />
          </YStack>

          {role === UserRole.INSTALLER && (
            <>
              <SizableText
                fontWeight="$bold"
                fontSize="$7"
              >
                {t('Company.Details')}
              </SizableText>

              <YStack>
                <SizableText>{t('Company.Name')}</SizableText>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Zip.Postal.Code')}</Label>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Customer.Support.Email')}</Label>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Customer.Support.Phone')}</Label>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Website.URL')}</Label>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Company.Logo.Text')}</Label>
              </YStack>

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

              <Paragraph fontSize="$3">{t('Company.Logo.Description')}</Paragraph>

              <View>
                <Paragraph>{t('Company.Logo.Settings.Description')}</Paragraph>
                <TouchableOpacity onPress={handleOpenSettings}>
                  <SizableText style={{ color: globalStyles.primaryColor }}>
                    {t('Global:Go.To.Set')}
                  </SizableText>
                </TouchableOpacity>
              </View>
            </>
          )}

          <Checkbox
            marginTop="$3"
            label={t('Agree.User.Registration.Agreement')}
            checked={formData.userAgreement}
            onCheckedChange={handleChangeUserAgreement}
          />
          <Checkbox
            label={t('Agree.Owner.Privacy.Policy')}
            checked={formData.privacyAgreement}
            onCheckedChange={handleChangePrivacyAgreement}
          />
          <Checkbox
            label={t('Agree.Enterprise.Policy')}
            checked={formData.emailAgreement}
            onCheckedChange={handleChangeEmailAgreement}
          />

          <Button
            width="100%"
            marginVertical="$4"
            onPress={handleSubmit(handleSignup, handleSubmitError)}
            disabled={isPending}
            icon={isPending ? <Spinner /> : undefined}
          >
            {t('Global:Submit')}
          </Button>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
