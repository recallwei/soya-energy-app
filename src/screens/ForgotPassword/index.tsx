import { useTranslation } from 'react-i18next'
import { Button, Input, Text, YStack } from 'tamagui'

export default function ForgotPasswordScreen(): React.JSX.Element {
  const { t } = useTranslation(['Global', 'Auth'])

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <YStack space="$2">
        <Text>{t('Auth:Account.Placeholder')}</Text>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder=""
        />
      </YStack>

      <Button
        width="100%"
        marginTop="$4"
      >
        {t('Global:Submit')}
      </Button>
    </YStack>
  )
}
