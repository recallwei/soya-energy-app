import { Info, Leaf, TrendingUp } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText } from 'tamagui'

import { MenuItemCard } from '@/components'
import { TimeUtils } from '@/utils'

const MenuList = memo(() => {
  const { t } = useTranslation('User.Battery')
  return (
    <>
      <MenuItemCard
        title={t('Working.Modes')}
        icon={Leaf}
      />
      <MenuItemCard
        title={t('Battery.Curve')}
        icon={TrendingUp}
      />
      <MenuItemCard
        title={t('Battery.Info')}
        description={`${t('Quantity')} ${1}`}
        icon={Info}
      />

      <SizableText
        textAlign="center"
        fontSize="$3"
      >{`${t('Update.On')} ${TimeUtils.formatTime(
        Date.now(),
        'YYYY-MM-DD hh:mm:ss'
      )}`}</SizableText>
    </>
  )
})
export default MenuList
