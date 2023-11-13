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
import { DevSettings, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Image, Input, Label, Spinner, View, XStack, YStack } from 'tamagui'
import * as yup from 'yup'

import { AuthAPI } from '@/api'
import { Checkbox } from '@/components'
import { globalEnvConfig } from '@/env'
import { useAuthStore, useThemeStore } from '@/store'
import type { LoginInputModel } from '@/types'
import { AuthUtils, CodePushUtils, ToastUtils } from '@/utils'

interface FormData {
  username: string
  password: string
}

const schema = yup
  .object({
    username: yup.string().min(6).max(20).required(),
    password: yup.string().min(6).max(20).required()
  })
  .required()

export default function Screen() {
  const { width } = Dimensions.get('screen')
  const insets = useSafeAreaInsets()
  const { t } = useTranslation(['Auth'])
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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const [showPassword, setShowPassword] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)

  const { mutate } = useMutation({
    mutationFn: (data: LoginInputModel) => AuthAPI.login(data, true),
    onSuccess: async (data) => {
      await AuthUtils.setToken((data as { access_token: string }).access_token)
      authStore.login()
      if (rememberPassword) {
        await AuthUtils.setAccountRememberPassword(JSON.stringify(getValues()))
      } else {
        await AuthUtils.removeAccountRememberPassword()
      }
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

  const handleLogin: SubmitHandler<FormData> = (data) =>
    mutate({
      username: data.username,
      password: CryptoJS.MD5(data.password).toString()
    })

  const handleSubmitError: SubmitErrorHandler<FormData> = (errs) => {
    const usernameErrorMsg = _.get(errs, 'username.message')
    const passwordErrorMsg = _.get(errs, 'password.message')

    if (usernameErrorMsg) {
      ToastUtils.success({ message: usernameErrorMsg })
    }

    if (passwordErrorMsg) {
      ToastUtils.error({ message: passwordErrorMsg })
    }
  }

  return (
    <YStack
      height="100%"
      minWidth={300}
      paddingHorizontal="$6"
      alignItems="center"
      space="$4"
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
    >
      <YStack
        alignItems="center"
        marginBottom="$3"
        paddingTop="$12"
      >
        <Image
          source={{
            uri: themeStore.isDark()
              ? require('../../../../assets/images/soya-logo-dark.png')
              : require('../../../../assets/images/soya-logo-light.png'),
            cache: 'force-cache'
          }}
          width={width * 0.618}
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
              placeholder={t('Auth:Account.Placeholder')}
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
              placeholder={t('Auth:Password.Placeholder')}
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
        label={t('Auth:RememberPassword')}
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
        {t('Auth:Login')}
      </Button>
      <XStack
        justifyContent="space-between"
        width="100%"
      >
        <Label onPress={() => navigation.navigate('Auth.Forgot_Password')}>
          {t('Auth:ForgotPassword')}
        </Label>
        <Label onPress={() => navigation.navigate('Auth.SignUp')}>{t('Auth:Signup')}</Label>
      </XStack>

      <Label
        position="absolute"
        bottom={insets.bottom}
        textAlign="center"
        onPress={() => {
          DevSettings.reload()
          CodePushUtils.syncCode()
        }}
      >
        {`${globalEnvConfig.APP_ENVIRONMENT} - v${globalEnvConfig.APP_VERSION}`}
      </Label>
    </YStack>
  )
}
