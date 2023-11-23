import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Button, Input, SizableText, YStack } from 'tamagui'

export default function ForgotPasswordScreen() {
  const { t } = useTranslation(['Auth', 'Global'])

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
        <SizableText>{t('Email.Text')}</SizableText>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Email.Placeholder')}
        />
      </YStack>

      <YStack>
        <SizableText>{t('Verification.Code.Text')}</SizableText>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Verification.Code.Placeholder')}
        />
      </YStack>

      <YStack>
        <SizableText>{t('New.Password.Text')}</SizableText>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('New.Password.Placeholder')}
        />
      </YStack>

      <YStack>
        <SizableText>{t('Confirm.Password.Text')}</SizableText>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Confirm.Password.Placeholder')}
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
