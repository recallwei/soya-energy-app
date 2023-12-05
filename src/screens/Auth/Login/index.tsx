import { yupResolver } from '@hookform/resolvers/yup'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Eye, EyeOff, Lock, User2 } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import CryptoJS from 'crypto-js'
import _ from 'lodash'
import { useCallback, useState } from 'react'
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Image, Input, Label, SizableText, Spinner, View, XStack, YStack } from 'tamagui'

import { AuthAPI } from '@/api'
import { Checkbox } from '@/components'
import type { UserRole } from '@/enums'
import { globalEnvConfig } from '@/env'
import { useAuthStore, useThemeStore } from '@/store'
import type { LoginInputModel } from '@/types'
import { AuthUtils, DeviceUtils, ToastUtils } from '@/utils'

import type { LoginForm } from './private'
import { loginSchema } from './private'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation(['Auth', 'Global', 'Validation'])
  const authStore = useAuthStore()
  const themeStore = useThemeStore()
  const navigation = useNavigation()

  const {
    control,
    formState: { errors, isLoading },
    handleSubmit,
    resetField,
    getValues,
    setValue,
    reset
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const [showPassword, setShowPassword] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)

  const { mutate } = useMutation({
    mutationFn: (data: LoginInputModel) => AuthAPI.login(data),
    onSuccess: async ({ data }) => {
      const { access_token: accessToken, refresh_token: refreshToken } = data
      await AuthUtils.setAccessToken(accessToken)
      await AuthUtils.setRefreshToken(refreshToken)
      if (rememberPassword) {
        await AuthUtils.setAccountRememberPassword(JSON.stringify(getValues()))
      } else {
        await AuthUtils.removeAccountRememberPassword()
      }
      const role = await AuthUtils.getRole()
      if (role) {
        authStore.setUserRole(role as UserRole)
      }
      ToastUtils.success({ message: t('Global:Login.Success') })
      authStore.login()
    },
    onError: () => {
      resetField('password')
    }
  })

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        try {
          const accountData = await AuthUtils.getAccountRememberPassword()
          if (accountData) {
            const { username, password } = JSON.parse(accountData)
            setValue('username', username)
            setValue('password', password)
            setRememberPassword(true)
          } else {
            reset()
            setRememberPassword(false)
          }
        } catch {
          //
        }
      }
      init()
    }, [])
  )

  const handleLogin: SubmitHandler<LoginForm> = (data) =>
    mutate({
      username: data.username,
      password: CryptoJS.MD5(data.password).toString()
    })

  const handleSubmitError: SubmitErrorHandler<LoginForm> = (errs) => {
    const usernameErrorMsg = _.get(errs, 'username.message')
    const passwordErrorMsg = _.get(errs, 'password.message')

    if (usernameErrorMsg) {
      ToastUtils.error({ message: usernameErrorMsg })
    }

    if (passwordErrorMsg) {
      ToastUtils.error({ message: passwordErrorMsg })
    }
  }

  return (
    <>
      <YStack
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        paddingHorizontal="$6"
        justifyContent="center"
        space="$4"
        marginBottom="28%"
      >
        <YStack
          alignItems="center"
          marginBottom="$3"
        >
          <Image
            source={{
              uri: themeStore.isDark()
                ? require('../../../../assets/images/soya-logo-dark.png')
                : require('../../../../assets/images/soya-logo-light.png'),
              cache: 'force-cache'
            }}
            width={DeviceUtils.SCREEN_WIDTH * 0.618}
            height={110}
            resizeMode="contain"
          />
        </YStack>
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <XStack
              width="100%"
              position="relative"
            >
              <Input
                width="100%"
                maxLength={20}
                paddingLeft="$7"
                placeholder={t('Validation:Account.Not.Null')}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                disabled={isLoading}
                clearButtonMode="never"
                borderColor={errors.username ? 'red' : undefined}
              />
              <View
                position="absolute"
                left="$3"
                alignSelf="center"
                theme="alt2"
              >
                <User2 size="$1" />
              </View>
            </XStack>
          )}
        />

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
                maxLength={20}
                paddingHorizontal="$7"
                placeholder={t('Validation:New.Password.Not.Null')}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showPassword}
                disabled={isLoading}
                clearButtonMode="never"
                borderColor={errors.password ? 'red' : undefined}
              />
              <View
                position="absolute"
                left="$3"
                alignSelf="center"
                theme="alt2"
              >
                <Lock size="$1" />
              </View>
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

        <Checkbox
          width="100%"
          label={t('Remember.Password')}
          disabled={isLoading}
          checked={rememberPassword}
          onCheckedChange={(checked: boolean) => {
            setRememberPassword(checked)
          }}
        />
        <Button
          width="100%"
          onPress={handleSubmit(handleLogin, handleSubmitError)}
          disabled={isLoading}
          icon={isLoading ? <Spinner /> : undefined}
        >
          {t('Login')}
        </Button>
        <XStack
          justifyContent="space-between"
          width="100%"
        >
          <TouchableOpacity onPress={() => navigation.navigate('Auth.Forgot_Password')}>
            <SizableText>{t('Forgot.Password')}</SizableText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Auth.SignUp.SelectRole')}>
            <SizableText>{t('Signup')}</SizableText>
          </TouchableOpacity>
        </XStack>
      </YStack>

      {authStore.packageMetadata && (
        <YStack
          position="absolute"
          left={0}
          right={0}
          bottom={insets.bottom}
        >
          <Label textAlign="center">
            {`${globalEnvConfig.APP_ENVIRONMENT} - ${authStore.packageMetadata.appVersion}.${authStore.packageMetadata.label}`}
          </Label>
        </YStack>
      )}
    </>
  )
}
