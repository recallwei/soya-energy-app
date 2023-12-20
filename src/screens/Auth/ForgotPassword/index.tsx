import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Input, Spinner, View, XStack, YStack } from 'tamagui'

import { InputTitle } from '@/components'
import { SendEmailType } from '@/enums'
import { useSendEmailCodeMutation } from '@/hooks'

import { useForgotPasswordForm, useForgotPasswordMutation } from './hooks'

export default function ForgotPasswordScreen() {
  const { t } = useTranslation(['Auth', 'Global', 'Validation'])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { handleForgotPassword, isForgotPasswordLoading } = useForgotPasswordMutation()
  const { handleSendEmailCode, isSendEmailCodeLoading } = useSendEmailCodeMutation(
    SendEmailType.ForgotPassword
  )
  const { control, handleSubmit, handleSubmitError, getEmail, errors } = useForgotPasswordForm()

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
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
                disabled={isForgotPasswordLoading}
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
              disabled={isForgotPasswordLoading}
              borderColor={errors.emailCode ? 'red' : undefined}
            />
          )}
        />
      </YStack>

      <YStack>
        <InputTitle required>{t('New.Password')}</InputTitle>
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

      <Button
        width="100%"
        marginTop="$4"
        onPress={handleSubmit(handleForgotPassword, handleSubmitError)}
      >
        {t('Global:Submit')}
      </Button>
    </YStack>
  )
}
