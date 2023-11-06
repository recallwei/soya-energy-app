import { useNavigation } from '@react-navigation/native'
import { Eye, EyeOff, Lock, User2 } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import CryptoJS from 'crypto-js'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import { Button, Image, Input, Spinner, Text, View, XStack, YStack } from 'tamagui'

import { AuthAPI } from '@/api'
import { SCheckbox } from '@/components'
import { globalEnvConfig } from '@/env'
import { useAuthStore } from '@/store'
import type { LoginInputModel } from '@/types'
import { AuthUtils, CodePushUtils } from '@/utils'

export default function LoginScreen(): React.JSX.Element {
  const { width } = Dimensions.get('screen')

  const { t } = useTranslation(['Auth'])

  const authStore = useAuthStore()

  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginInputModel) => AuthAPI.login(data, false),
    onSuccess: (data) => {
      AuthUtils.setToken((data as { access_token: string }).access_token).catch(() => {})
      authStore.login()
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleLogin = () => {
    const { username, password } = formData
    mutate({
      username,
      password: CryptoJS.MD5(password).toString()
    })
  }

  return (
    <SafeAreaView>
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
              source={{ uri: require('../../../../assets/images/soya-logo.png') }}
              width={width * 0.618}
              height={110}
              resizeMode="contain"
            />
          </YStack>

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
              value={formData.username}
              onChangeText={(text) => {
                setFormData({ ...formData, username: text })
              }}
              disabled={isPending}
              clearButtonMode="never"
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
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text })
              }}
              secureTextEntry={!showPassword}
              disabled={isPending}
              clearButtonMode="never"
            />
            <View
              position="absolute"
              left="$3"
              alignSelf="center"
              theme="alt2"
            >
              <Lock size="$1" />
            </View>
            {formData.password.length > 0 && (
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

          <SCheckbox
            width="100%"
            label={t('Auth:RememberPassword')}
            disabled={isPending}
            checked={rememberPassword}
            onCheckedChange={(checked: boolean) => {
              setRememberPassword(checked)
            }}
          />

          <Button
            width="100%"
            onPress={handleLogin}
            disabled={isPending}
            icon={isPending ? <Spinner /> : undefined}
          >
            {t('Auth:Login')}
          </Button>

          <XStack
            justifyContent="space-between"
            width="100%"
          >
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text>{t('Auth:ForgotPassword')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text>{t('Auth:Signup')}</Text>
            </TouchableOpacity>
          </XStack>
        </YStack>

        <Text
          textAlign="center"
          onPress={() => {
            CodePushUtils.syncCode().catch(() => {})
          }}
        >
          {`${globalEnvConfig.APP_ENVIRONMENT} - v${globalEnvConfig.APP_VERSION}`}
        </Text>
      </YStack>
    </SafeAreaView>
  )
}
