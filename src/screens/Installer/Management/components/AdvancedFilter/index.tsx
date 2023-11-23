import { ChevronDown } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { SizableText, View, XStack } from 'tamagui'

import { SheetMenu } from '@/components'
import i18n from '@/i18n'

import { Orderby } from '../../enums'

const orderByTextMap = new Map([
  [Orderby.Latest_Installation_Date, () => i18n.t('Installer.Management:Latest.Installation.Date')],
  [
    Orderby.Earlier_Installation_Date,
    () => i18n.t('Installer.Management:Earlier.Installation.Date')
  ],
  [
    Orderby.Daily_Production_High_to_Low,
    () => i18n.t('Installer.Management:Daily.Production.High.To.Low')
  ],
  [
    Orderby.Daily_Production_Low_to_High,
    () => i18n.t('Installer.Management:Daily.Production.Low.To.High')
  ],
  [
    Orderby.Maximum_Installed_Capacity,
    () => i18n.t('Installer.Management:Maximum.Installed.Capacity')
  ],
  [
    Orderby.Minimum_Installed_Capacity,
    () => i18n.t('Installer.Management:Minimum.Installed.Capacity')
  ]
])

const orderBySheetMenu = Array.from(orderByTextMap).map(([value, text]) => ({
  text: text(),
  value
}))

export default function AdvancedFilter() {
  const [orderBy, setOrderBy] = useState(Orderby.Latest_Installation_Date)

  const [orderBySheetOpen, setOrderBySheetOpen] = useState(false)

  const handleOpenOrderBySheet = () => setOrderBySheetOpen(true)

  return (
    <XStack
      paddingHorizontal="$4"
      paddingVertical="$2"
    >
      <TouchableOpacity onPress={handleOpenOrderBySheet}>
        <XStack
          alignItems="center"
          space="$2"
        >
          <SizableText>{orderByTextMap.get(orderBy)!()}</SizableText>
          <View marginTop="$1s">
            <ChevronDown size="$1" />
          </View>
        </XStack>
      </TouchableOpacity>

      <SheetMenu
        open={orderBySheetOpen}
        setOpen={setOrderBySheetOpen}
        autoClose
        data={orderBySheetMenu.map((item) => ({
          ...item,
          onPress: () => setOrderBy(item.value)
        }))}
      />
    </XStack>
  )
}
