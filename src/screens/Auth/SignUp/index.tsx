import { useRoute } from '@react-navigation/native'
import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { Controller } from 'react-hook-form'
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
import { useImmer } from 'use-immer'

import { Checkbox, InputTitle } from '@/components'
import { globalStyles } from '@/constants'
import { SendEmailType, UserRole } from '@/enums'
import { useSendEmailCodeMutation } from '@/hooks'
import type { RouteProp } from '@/types'
import { DeviceUtils, ToastUtils } from '@/utils'

import { useSignupForm, useSignupMutation } from './hooks'
import type { SignUpForm } from './types'

export default function Screen() {
  const { t } = useTranslation(['Auth', 'Global', 'Validation'])
  const route = useRoute<RouteProp<'Auth.SignUp'>>()
  const insets = useSafeAreaInsets()

  const [role, setRole] = useState<UserRole>(UserRole.USER)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [agreementData, setAgreementData] = useImmer({
    userAgreement: false,
    privacyAgreement: false,
    emailAgreement: false
  })

  const { handleSignup, isSignupLoading } = useSignupMutation()
  const { handleSendEmailCode, isSendEmailCodeLoading } = useSendEmailCodeMutation(
    SendEmailType.Signup
  )
  const { control, handleSubmit, handleSubmitError, getEmail, errors } = useSignupForm()

  useEffect(() => {
    setRole(route.params.role)
  }, [route.params.role])

  const handleClickSubmit: SubmitHandler<SignUpForm> = (data) => {
    if (Object.values(agreementData).some((item) => !item)) {
      ToastUtils.error({ message: t('Validation:Agreement.Not.Null') })
      return
    }
    handleSignup(data)
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
              value={role === UserRole.USER ? t('Role.Type.Owner') : t('Role.Type.Installer')}
              disabled
            />
          </YStack>

          <YStack>
            <InputTitle required>{t('Account')}</InputTitle>
            <Controller
              name="account"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                  placeholder={t('Validation:Account.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isSignupLoading}
                  borderColor={errors.account ? 'red' : undefined}
                />
              )}
            />
          </YStack>

          <YStack>
            <InputTitle required>{t('Email')}</InputTitle>
            <XStack space="$2">
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                    placeholder={t('Validation:Email.Not.Null')}
                    flex={1}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    disabled={isSignupLoading}
                    borderColor={errors.email ? 'red' : undefined}
                  />
                )}
              />
              <Button
                icon={isSendEmailCodeLoading ? <Spinner /> : undefined}
                disabled={isSendEmailCodeLoading}
                onPress={() => handleSendEmailCode(getEmail())}
              >
                {t('Global:Send')}
              </Button>
            </XStack>
          </YStack>

          <YStack>
            <InputTitle required>{t('Verification.Code')}</InputTitle>
            <Controller
              name="emailCode"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                  placeholder={t('Validation:Verification.Code.Not.Null')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isSignupLoading}
                  borderColor={errors.emailCode ? 'red' : undefined}
                />
              )}
            />
          </YStack>

          <YStack>
            <InputTitle required>{t('Password')}</InputTitle>
            <Controller
              name="password"
              control={control}
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
                    placeholder={t('Validation:Password.Not.Null')}
                    borderColor={errors.password ? 'red' : undefined}
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

          <YStack>
            <InputTitle required>{t('Confirm.Password')}</InputTitle>
            <Controller
              name="confirmPassword"
              control={control}
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
                    placeholder={t('Validation:Confirm.Password.Not.Null')}
                    borderColor={errors.confirmPassword ? 'red' : undefined}
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

          <YStack>
            <SizableText>{t('Country.Region')}</SizableText>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
              placeholder={t('Validation:Country.Region.Not.Null')}
            />
          </YStack>

          <YStack marginBottom="$3">
            <SizableText>{t('Time.Zone')}</SizableText>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
              placeholder={t('Validation:Time.Zone.Not.Null')}
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
            checked={agreementData.userAgreement}
            onCheckedChange={(checked: boolean) => {
              setAgreementData((draft) => {
                draft.userAgreement = checked
              })
            }}
          />
          <Checkbox
            label={t('Agree.Owner.Privacy.Policy')}
            checked={agreementData.privacyAgreement}
            onCheckedChange={(checked: boolean) => {
              setAgreementData((draft) => {
                draft.privacyAgreement = checked
              })
            }}
          />
          <Checkbox
            label={t('Agree.Enterprise.Policy')}
            checked={agreementData.emailAgreement}
            onCheckedChange={(checked: boolean) => {
              setAgreementData((draft) => {
                draft.emailAgreement = checked
              })
            }}
          />

          <Button
            width="100%"
            marginVertical="$4"
            onPress={handleSubmit(handleClickSubmit, handleSubmitError)}
            disabled={isSignupLoading}
            icon={isSignupLoading ? <Spinner /> : undefined}
          >
            {t('Global:Submit')}
          </Button>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
