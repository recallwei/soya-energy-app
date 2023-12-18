import { Eye, EyeOff } from '@tamagui/lucide-icons'
import CryptoJS from 'crypto-js'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Input, Spinner, View, XStack, YStack } from 'tamagui'

import { InputTitle } from '@/components'

import { useChangePasswordForm, useChangePasswordMutation } from './hooks'

export default function ForgotPasswordScreen() {
  const { t } = useTranslation(['Auth', 'Global', 'Validation'])

  const { control, handleResetForm, handleSubmit, handleSubmitError } = useChangePasswordForm()
  const { isPending, handleChangePassword } = useChangePasswordMutation({ handleResetForm })

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <Controller
        name="oldPassword"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack>
            <InputTitle required>{t('Old.Password')}</InputTitle>
            <XStack
              width="100%"
              position="relative"
            >
              <Input
                width="100%"
                maxLength={20}
                autoCapitalize="none"
                placeholder={t('Validation:Old.Password.Not.Null')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showOldPassword}
                disabled={isPending}
                clearButtonMode="never"
                borderColor={error ? 'red' : undefined}
              />
              {value.length > 0 && (
                <View
                  position="absolute"
                  right="$3"
                  alignSelf="center"
                  theme="alt2"
                  onPress={() => setShowOldPassword((prev) => !prev)}
                >
                  {showOldPassword ? <EyeOff size="$1" /> : <Eye size="$1" />}
                </View>
              )}
            </XStack>
          </YStack>
        )}
      />
      <Controller
        name="newPassword"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack>
            <InputTitle required>{t('New.Password')}</InputTitle>
            <XStack
              width="100%"
              position="relative"
            >
              <Input
                width="100%"
                maxLength={20}
                autoCapitalize="none"
                placeholder={t('Validation:New.Password.Not.Null')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showNewPassword}
                disabled={isPending}
                clearButtonMode="never"
                borderColor={error ? 'red' : undefined}
              />
              {value.length > 0 && (
                <View
                  position="absolute"
                  right="$3"
                  alignSelf="center"
                  theme="alt2"
                  onPress={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <EyeOff size="$1" /> : <Eye size="$1" />}
                </View>
              )}
            </XStack>
          </YStack>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack>
            <InputTitle required>{t('Confirm.Password')}</InputTitle>
            <XStack
              width="100%"
              position="relative"
            >
              <Input
                width="100%"
                maxLength={20}
                autoCapitalize="none"
                placeholder={t('Validation:Confirm.Password.Not.Null')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showConfirmPassword}
                disabled={isPending}
                clearButtonMode="never"
                borderColor={error ? 'red' : undefined}
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
          </YStack>
        )}
      />

      <Button
        width="100%"
        marginTop="$4"
        onPress={handleSubmit(
          (data) =>
            handleChangePassword({
              newPassword: CryptoJS.MD5(data.newPassword).toString(),
              oldPassword: CryptoJS.MD5(data.oldPassword).toString()
            }),
          handleSubmitError
        )}
        disabled={isPending}
        icon={isPending ? <Spinner /> : undefined}
      >
        {t('Global:Submit')}
      </Button>
    </YStack>
  )
}
