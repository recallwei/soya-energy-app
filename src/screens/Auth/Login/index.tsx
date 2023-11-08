import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { Eye, EyeOff, Lock, User2 } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import CryptoJS from 'crypto-js'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Dimensions, SafeAreaView } from 'react-native'
import { Button, Image, Input, Label, Spinner, View, XStack, YStack } from 'tamagui'
import * as yup from 'yup'

import { AuthAPI } from '@/api'
import { SCheckbox } from '@/components'
import { globalEnvConfig } from '@/env'
import { GlobalToastProvider } from '@/providers'
import { useAuthStore } from '@/store'
import type { LoginInputModel } from '@/types'
import { AuthUtils, CodePushUtils } from '@/utils'

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

export default function LoginScreen(): React.JSX.Element {
  const { width } = Dimensions.get('screen')

  const { t } = useTranslation(['Auth'])

  const authStore = useAuthStore()

  const navigation = useNavigation()

  const {
    control,
    formState: { errors, isLoading },
    handleSubmit,
    resetField,
    getValues,
    setValue
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

  useEffect(() => {
    const init = async () => {
      try {
        const accountData = JSON.parse((await AuthUtils.getAccountRememberPassword()) ?? '')
        if (rememberPassword) {
          setValue('username', accountData.username)
          setValue('password', accountData.password)
        }
      } catch {
        //
      }
    }
    init()
  }, [])

  const handleLogin: SubmitHandler<FormData> = (data) =>
    mutate({
      username: data.username,
      password: CryptoJS.MD5(data.password).toString()
    })

  const handleSubmitError: SubmitErrorHandler<FormData> = (errs) => {
    // toast
    console.log(_.get(errs, 'username.message'))
    console.log(_.get(errs, 'password.message'))
  }

  return (
    <SafeAreaView>
      <GlobalToastProvider />
      <YStack
        width="100%"
        height="100%"
        minWidth={300}
        justifyContent="space-between"
      >
        <YStack
          padding="$6"
          justifyContent="flex-start"
          alignItems="center"
          space="$4"
        >
          <YStack
            alignItems="center"
            marginBottom="$6"
            paddingTop="$12"
          >
            <Image
              source={{
                uri: require('../../../../assets/images/soya-logo.png'),
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
            render={({ field: { onChange, value } }) => (
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
            render={({ field: { onChange, value } }) => (
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

          <SCheckbox
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
            <Label onPress={() => navigation.navigate('ForgotPassword')}>
              {t('Auth:ForgotPassword')}
            </Label>
            <Label onPress={() => navigation.navigate('SignUp')}>{t('Auth:Signup')}</Label>
          </XStack>
        </YStack>

        <Label
          textAlign="center"
          letterSpacing="$sm"
          onPress={() => CodePushUtils.syncCode()}
        >
          {`${globalEnvConfig.APP_ENVIRONMENT} - v${globalEnvConfig.APP_VERSION}`}
        </Label>
      </YStack>
    </SafeAreaView>
  )
}
