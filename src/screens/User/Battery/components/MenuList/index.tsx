import { Info, Leaf, TrendingUp } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText } from 'tamagui'

import { MenuItemCard } from '@/components'
import { WorkMode } from '@/enums'
import type { BatteryAnalysis } from '@/types'

interface Props {
  data?: BatteryAnalysis
}

const MenuList = memo((props: Props) => {
  const { t } = useTranslation('User.Battery')

  const getWorkMode = () => {
    switch (props.data?.workMode?.toString()) {
      case WorkMode.Free:
        return t('Free.Mode')
      case WorkMode.TimeShare:
        return t('Time.Share.Mode')
      default:
        return props.data?.workMode ?? '--'
    }
  }

  return (
    <>
      <MenuItemCard
        title={t('Working.Modes')}
        description={`${getWorkMode() ?? '--'}`}
        icon={Leaf}
      />
      <MenuItemCard
        title={t('Battery.Curve')}
        icon={TrendingUp}
      />
      <MenuItemCard
        title={t('Battery.Info')}
        description={`${t('Quantity')} ${props.data?.count ?? '--'}`}
        icon={Info}
      />
      <SizableText
        textAlign="center"
        fontSize="$3"
      >
        {`${t('Update.On')} ${props.data!.updatedAt}`}
      </SizableText>
    </>
  )
})
export default MenuList
