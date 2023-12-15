import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, ToggleGroup } from 'tamagui'

import { DateRange } from '@/enums'

interface Props {
  currentTab: string
  setCurrentTab: (value: DateRange) => void
}
const DateRangeSelector = memo((props: Props) => {
  const { t } = useTranslation('User.Analysis')
  return (
    <ToggleGroup
      alignSelf="center"
      orientation="horizontal"
      type="single"
      size="$3"
      disableDeactivation
      value={props.currentTab}
      onValueChange={(value: DateRange) => props.setCurrentTab(value)}
    >
      <ToggleGroup.Item
        value={DateRange.DAY}
        width="auto"
      >
        <SizableText>{t('Day')}</SizableText>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value={DateRange.MONTH}
        width="auto"
      >
        <SizableText>{t('Month')}</SizableText>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value={DateRange.YEAR}
        width="auto"
      >
        <SizableText>{t('Year')}</SizableText>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value={DateRange.LIFE_TIME}
        width="auto"
      >
        <SizableText>{t('Life.Time')}</SizableText>
      </ToggleGroup.Item>
    </ToggleGroup>
  )
})
export default DateRangeSelector
