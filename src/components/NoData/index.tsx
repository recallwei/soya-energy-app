import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Label } from 'tamagui'

const NoData = memo(() => {
  const { t } = useTranslation('Global')
  return (
    <Label
      textAlign="center"
      paddingVertical="$4"
    >
      {t('No.Data')}
    </Label>
  )
})

export default NoData
