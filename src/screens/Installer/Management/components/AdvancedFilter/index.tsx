import { ChevronDown, Filter, Heart } from '@tamagui/lucide-icons'
import { useToggle } from 'ahooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { SizableText, View, XStack } from 'tamagui'

import { SheetMenu } from '@/components'

import { Orderby } from '../../enums'

interface Props {
  setDrawerOpen: (open: boolean) => void
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

  const [orderBySheetOpen, { set: setOrderBySheetOpen, setRight: handleOpenOrderBySheet }] =
    useToggle(false)
  const [starStatus, { toggle: toggleStarStatus }] = useToggle(false)

  const getCurrentOrderByText = () => orderBySheetMenu.find((item) => item.value === orderBy)!.text

  return (
    <XStack
      paddingHorizontal="$4"
      paddingVertical="$2"
      justifyContent="space-between"
      alignItems="center"
    >
      <TouchableOpacity onPress={handleOpenOrderBySheet}>
        <XStack
          alignItems="center"
          space="$1"
        >
          <SizableText>{getCurrentOrderByText()}</SizableText>
          <View marginTop="$1">
            <ChevronDown size="$1" />
          </View>
        </XStack>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleStarStatus}>
        <View theme="alt1">
          <Heart
            size="$1"
            fill={starStatus ? 'red' : 'transparent'}
            color={starStatus ? 'red' : undefined}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.setDrawerOpen(true)}>
        <View theme="alt1">
          <Filter size="$1" />
        </View>
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
