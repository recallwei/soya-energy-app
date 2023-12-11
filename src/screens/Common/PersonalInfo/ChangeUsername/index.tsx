import { useTranslation } from 'react-i18next'
import { SizableText, YStack } from 'tamagui'

export default function ForgotPasswordScreen() {
  const { t } = useTranslation('Common.My')
  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <SizableText textAlign="center">{t('Can.Not.Change.Username')}</SizableText>
    </YStack>
  )
}
