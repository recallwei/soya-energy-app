import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Button, Input, YStack } from 'tamagui'

import { InputTitle } from '@/components'

export default function ForgotPasswordScreen() {
  const { t } = useTranslation(['Auth', 'Global', 'Validation'])

  const { navigate } = useNavigation()

  const handleSubmit = () => navigate('Auth.Login')

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <YStack>
        <InputTitle required>{t('Email')}</InputTitle>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Validation:Email.Not.Null')}
        />
      </YStack>

      <YStack>
        <InputTitle required>{t('Verification.Code')}</InputTitle>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Validation:Verification.Code.Not.Null')}
        />
      </YStack>

      <YStack>
        <InputTitle required>{t('New.Password')}</InputTitle>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Validation:New.Password.Not.Null')}
        />
      </YStack>

      <YStack>
        <InputTitle required>{t('Confirm.Password')}</InputTitle>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Validation:Confirm.Password.Not.Null')}
        />
      </YStack>

      <Button
        width="100%"
        marginTop="$4"
        onPress={handleSubmit}
      >
        {t('Global:Submit')}
      </Button>
    </YStack>
  )
}
