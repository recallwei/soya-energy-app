import { Check, Eye, EyeOff, Lock, User2 } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native'
import {
  Button,
  Checkbox,
  Input,
  Label,
  Spinner,
  Text,
  View,
  XStack,
  YStack
} from 'tamagui'

// import { AuthAPI } from '@/api'
import { useAuthStore } from '@/store'
import { SVG } from '@/svg'

export default function LoginScreen(): React.JSX.Element {
  const { t } = useTranslation('auth')
  const authStore = useAuthStore()
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

  const navToForgotPassword = () => {}

  const navToSignUp = () => {}

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
            placeholder={t('Account.Placeholder')}
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
            placeholder={t('Password.Placeholder')}
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

        <XStack
          width="100%"
          space="$2"
          alignItems="center"
        >
          <Checkbox
            checked={rememberPassword}
            onCheckedChange={(checked: boolean) => {
              setRememberPassword(checked)
            }}
            disabled={isLoading}
          >
            <Checkbox.Indicator>
              <Check />
            </Checkbox.Indicator>
          </Checkbox>

          <Label>{t('RememberPassword')}</Label>
        </XStack>

        <Button
          width="100%"
          onPress={handleLogin}
          disabled={isLoading}
          icon={isLoading ? <Spinner /> : undefined}
        >
          {t('Login')}
        </Button>

        <XStack
          justifyContent="space-between"
          width="100%"
        >
          <Text onPress={navToForgotPassword}>Forgot password?</Text>

          <Text onPress={navToSignUp}>New account</Text>
        </XStack>
      </YStack>
    </SafeAreaView>
  )
}
