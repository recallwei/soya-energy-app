import { yupResolver } from '@hookform/resolvers/yup'
import { useRoute } from '@react-navigation/native'
import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Linking, Platform, TouchableOpacity } from 'react-native'
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
import * as yup from 'yup'

import { Checkbox } from '@/components'
import { globalStyles } from '@/constants'
import { UserRole } from '@/enums'
import { useAuthStore } from '@/store'
import type { RouteProp } from '@/types'
import { ToastUtils } from '@/utils'

interface FormData {
  username: string
  password: string
  confirmPassword: string
}

const schema = yup
  .object({
    username: yup.string().min(6).max(20).required(),
    password: yup.string().min(6).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')])
      .required()
  })
  .required()

export default function Screen() {
  const { t } = useTranslation(['Auth', 'Global'])
  const route = useRoute<RouteProp<'Auth.SignUp'>>()
  const insets = useSafeAreaInsets()
  const authStore = useAuthStore()

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
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
    mutationFn: (data: FormData) =>
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

  const handleSignup: SubmitHandler<FormData> = (data) => mutate(data)

  const handleSubmitError: SubmitErrorHandler<FormData> = (errs) => {
    const usernameErrorMsg = _.get(errs, 'username.message')
    const passwordErrorMsg = _.get(errs, 'password.message')

    if (usernameErrorMsg) {
      ToastUtils.error({ message: usernameErrorMsg })
    }

    if (passwordErrorMsg) {
      ToastUtils.error({ message: passwordErrorMsg })
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

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:')
    } else {
      Linking.openSettings()
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={120}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        paddingBottom={insets.bottom}
      >
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
            <SizableText>{t('Email.Text')}</SizableText>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </YStack>

          <YStack>
            <SizableText>{t('Password.Text')}</SizableText>
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
            <SizableText>{t('Confirm.Password.Text')}</SizableText>
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
                <SizableText>{t('Company.Name.Text')}</SizableText>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Zip.Postal.Code.Text')}</Label>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Customer.Support.Email.Text')}</Label>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Customer.Support.Phone.Text')}</Label>
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                />
              </YStack>

              <YStack>
                <Label>{t('Website.URL.Text')}</Label>
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
                  <SizableText style={{ color: globalStyles.primaryColor }}>Click here</SizableText>
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
