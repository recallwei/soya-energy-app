import { useNavigation } from '@react-navigation/native'
import { Eye, EyeOff, Lock, User2 } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Button, Input, Spinner, Text, View, XStack, YStack } from 'tamagui'

import { SCheckbox } from '@/components'
// import { AuthAPI } from '@/api'
import { useAuthStore } from '@/store'
import { SVG } from '@/svg'

export default function LoginScreen(): React.JSX.Element {
  const { t } = useTranslation(['Auth'])

  const authStore = useAuthStore()

  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    account: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            account: '123',
            password: '123'
          })
        }, 1000)
      }),
    // AuthAPI.login()
    onSuccess: (data) => {
      console.log(data)
      authStore.login()
    },
    onError: (error) => {
      console.log(error)
      authStore.login()
    }
  })

  const handleLogin = () => {
    mutate()
  }

  return (
    <SafeAreaView>
      <YStack
        padding="$6"
        paddingTop="$12"
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        height="100%"
        minWidth={300}
        space="$4"
      >
        <YStack
          alignItems="center"
          space="$4"
          marginBottom="$2"
        >
          <SVG.SolarPanel
            color="#333333"
            width={50}
            height={50}
            strokeWidth={20}
          />
          <Text
            fontSize="$8"
            letterSpacing={2}
          >
            SOYA SOLAR
          </Text>
        </YStack>

        <XStack
          width="100%"
          position="relative"
        >
          <Input
            width="100%"
            maxLength={16}
            paddingLeft="$7"
            placeholder={t('Auth:Account.Placeholder')}
            autoCapitalize="none"
            value={formData.account}
            onChangeText={(text) => {
              setFormData((prev) => ({
                ...prev,
                account: text
              }))
            }}
            disabled={isLoading}
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
            maxLength={16}
            paddingHorizontal="$7"
            placeholder={t('Auth:Password.Placeholder')}
            autoCapitalize="none"
            value={formData.password}
            onChangeText={(text) => {
              setFormData((prev) => ({
                ...prev,
                password: text
              }))
            }}
            secureTextEntry={!showPassword}
            disabled={isLoading}
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
          disabled={isLoading}
          checked={rememberPassword}
          onCheckedChange={(checked: boolean) => {
            setRememberPassword(checked)
          }}
        />

        <Button
          width="100%"
          onPress={handleLogin}
          disabled={isLoading}
          icon={isLoading ? <Spinner /> : undefined}
        >
          {t('Auth:Login')}
        </Button>

        <XStack
          justifyContent="space-between"
          width="100%"
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text>{t('Auth:ForgotPassword')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text>{t('Auth:Signup')}</Text>
          </TouchableOpacity>
        </XStack>
      </YStack>
    </SafeAreaView>
  )
}
