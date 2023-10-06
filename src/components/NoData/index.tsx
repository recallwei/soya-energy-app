import { useTranslation } from 'react-i18next'
import { Text } from 'tamagui'

export default function NoData(): React.JSX.Element {
  const { t } = useTranslation(['Global'])
  return (
    <Text
      textAlign="center"
      paddingVertical="$4"
    >
      {t('Global:NoData')}
    </Text>
  )
}
