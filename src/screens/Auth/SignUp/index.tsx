import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Label, ScrollView, Spinner, YStack } from 'tamagui'

import { Checkbox, RadioGroup } from '@/components'
import { useAuthStore } from '@/store'

export default function SignUpScreen(): React.JSX.Element {
  const { t } = useTranslation(['Global', 'Auth'])

  const RadioGroupData = [
    {
      label: t('Auth:SignupScreen.Ratio.ForCompany'),
      value: '0'
    },
    {
      label: t('Auth:SignupScreen.Ratio.ForIndividual'),
      value: '1'
    },
    {
      label: t('Global:Others'),
      value: '2'
    }
  ]

  const authStore = useAuthStore()

  const [formData, setFormData] = useState({
    source: '',
    installation: false,
    privacy: false
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: typeof formData) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, 1000)
      }),
    // AuthAPI.signup()
    onSuccess: (data) => {
      console.log(data)
      authStore.login()
    },
    onError: (error) => {
      console.log(error)
      authStore.login()
    }
  })

  const handleRadioGroupChange = (value: string) =>
    setFormData((val) => ({ ...val, source: value }))

  const handleChangeInstallation = (value: boolean) =>
    setFormData((val) => ({ ...val, installation: value }))

  const handleChangePrivacy = (value: boolean) => setFormData((val) => ({ ...val, privacy: value }))

  const handleSignup = () => {
    mutate(formData)
  }

  return (
    <ScrollView>
      <YStack
        padding="$4"
        space="$3"
      >
        <Label
          fontWeight="$bold"
          marginVertical="$2"
        >
          {t('Auth:SignupScreen.PersonalInfo')}
        </Label>

        <YStack space="$2">
          <Label>{t('Auth:SignupScreen.Input.FirstName')}</Label>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </YStack>

        <YStack space="$2">
          <Label>{t('Auth:SignupScreen.Input.LastName')}</Label>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </YStack>

        <YStack space="$2">
          <Label>{t('Auth:SignupScreen.Input.Country')}</Label>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </YStack>

        <YStack space="$2">
          <Label>{t('Auth:SignupScreen.Input.EmailAddress')}</Label>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </YStack>

        <YStack
          space="$2"
          marginBottom="$3"
        >
          <Label>{t('Auth:SignupScreen.Input.PhoneNumber')}</Label>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </YStack>

        <RadioGroup
          value={formData.source}
          data={RadioGroupData}
          onValueChange={handleRadioGroupChange}
        />

        {formData.source === '0' && (
          <YStack
            space="$3"
            marginVertical="$3"
          >
            <Label
              fontWeight="bold"
              marginVertical="$2"
            >
              {t('Auth:SignupScreen.CompanyInfo')}
            </Label>

            <YStack space="$2">
              <Label>{t('Auth:SignupScreen.Input.CompanyName')}</Label>
              <Input
                autoCapitalize="none"
                clearButtonMode="while-editing"
              />
            </YStack>

            <YStack space="$2">
              <Label>{t('Auth:SignupScreen.Input.StreetAddress')}</Label>
              <Input
                autoCapitalize="none"
                clearButtonMode="while-editing"
              />
            </YStack>

            <YStack space="$2">
              <Label>{t('Auth:SignupScreen.Input.StreetAddressOptional')}</Label>
              <Input
                autoCapitalize="none"
                clearButtonMode="while-editing"
              />
            </YStack>

            <YStack space="$2">
              <Label>{t('Auth:SignupScreen.Input.City')}</Label>
              <Input
                autoCapitalize="none"
                clearButtonMode="while-editing"
              />
            </YStack>
          </YStack>
        )}

        <Checkbox
          label={t('Auth:SignupScreen.Checkbox.Installation')}
          checked={formData.installation}
          onCheckedChange={handleChangeInstallation}
        />
        <Checkbox
          label={t('Auth:SignupScreen.Checkbox.Privacy')}
          checked={formData.privacy}
          onCheckedChange={handleChangePrivacy}
        />

        <Button
          marginVertical="$8"
          width="100%"
          onPress={handleSignup}
          disabled={isPending}
          icon={isPending ? <Spinner /> : undefined}
        >
          {t('Global:Submit')}
        </Button>
      </YStack>
    </ScrollView>
  )
}
