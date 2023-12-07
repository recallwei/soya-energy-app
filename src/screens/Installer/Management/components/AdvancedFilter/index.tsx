import { ChevronUpCircle, Filter } from '@tamagui/lucide-icons'
import { useToggle } from 'ahooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { View, XStack } from 'tamagui'

import { DropDownMenu } from '@/components'

import { Orderby } from '../../enums'

interface Props {
  setDrawerOpen: (open: boolean) => void
  scrollToTop: () => void
}

export default function AdvancedFilter(props: Props) {
  const [orderBy, setOrderBy] = useState(Orderby.Latest_Installation_Date)
  const { t } = useTranslation('Installer.Management')

  const orderBySheetMenu = [
    {
      text: t('Latest.Installation.Date'),
      value: Orderby.Latest_Installation_Date
    },
    {
      text: t('Earlier.Installation.Date'),
      value: Orderby.Earlier_Installation_Date
    },
    {
      text: t('Daily.Production.High.To.Low'),
      value: Orderby.Daily_Production_High_to_Low
    },
    {
      text: t('Daily.Production.Low.To.High'),
      value: Orderby.Daily_Production_Low_to_High
    },
    {
      text: t('Maximum.Installed.Capacity'),
      value: Orderby.Maximum_Installed_Capacity
    },
    {
      text: t('Minimum.Installed.Capacity'),
      value: Orderby.Minimum_Installed_Capacity
    }
  ]

  const [orderBySheetOpen, { set: setOrderBySheetOpen }] = useToggle(false)
  // const [starStatus, { toggle: toggleStarStatus }] = useToggle(false)

  const getCurrentOrderByText = () => orderBySheetMenu.find((item) => item.value === orderBy)!.text

  return (
    <XStack
      paddingHorizontal="$4"
      paddingVertical="$2"
      justifyContent="space-between"
      alignItems="center"
    >
      <DropDownMenu
        text={getCurrentOrderByText()}
        sheetMenu={{
          sheet: { open: orderBySheetOpen, setOpen: setOrderBySheetOpen },
          data: orderBySheetMenu.map((item) => ({
            ...item,
            onPress: () => setOrderBy(item.value)
          }))
        }}
      />

      <XStack space="$2.5">
        {/* <TouchableOpacity onPress={toggleStarStatus}>
          <View theme="alt1">
            <Heart
              size="$1"
              fill={starStatus ? 'red' : 'transparent'}
              color={starStatus ? 'red' : undefined}
            />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => props.scrollToTop()}>
          <View theme="alt1">
            <ChevronUpCircle size="$1" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.setDrawerOpen(true)}>
          <View theme="alt1">
            <Filter size="$1" />
          </View>
        </TouchableOpacity>
      </XStack>
    </XStack>
  )
}
