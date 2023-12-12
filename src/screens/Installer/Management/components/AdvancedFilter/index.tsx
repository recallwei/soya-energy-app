import { ChevronUpCircle, Filter, Heart } from '@tamagui/lucide-icons'
import { useToggle } from 'ahooks'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { View, XStack } from 'tamagui'

import { DropDownMenu } from '@/components'
import { globalStyles } from '@/constants'

import { BatteryOrderby, InverterOrderby, ManagementTab, PlantOrderby } from '../../enums'

interface Props {
  currentTab: ManagementTab
  setOrder: (order: string) => void
  setDrawerOpen: (open: boolean) => void
  scrollToTop: () => void
}

export default function AdvancedFilter(props: Props) {
  const [orderBy, setOrderBy] = useState<PlantOrderby | InverterOrderby | BatteryOrderby>(
    PlantOrderby.Latest_Installation_Date
  )
  const { t } = useTranslation('Installer.Management')

  useEffect(() => {
    switch (props.currentTab) {
      case ManagementTab.Plant:
        setOrderBy(PlantOrderby.Latest_Installation_Date)
        break
      case ManagementTab.Battery:
        setOrderBy(InverterOrderby.Latest_Installation_Date)
        break
      case ManagementTab.Inverter:
        setOrderBy(BatteryOrderby.Latest_Installation_Date)
        break
      default:
        break
    }
  }, [props.currentTab])

  useEffect(() => {
    props.setOrder(orderBy)
  }, [orderBy])

  const getOrderBySheetMenu = () => {
    switch (props.currentTab) {
      case ManagementTab.Plant:
        return [
          {
            text: t('Latest.Installation.Date'),
            value: PlantOrderby.Latest_Installation_Date
          },
          {
            text: t('Earlier.Installation.Date'),
            value: PlantOrderby.Earlier_Installation_Date
          },
          {
            text: t('Daily.Production.High.To.Low'),
            value: PlantOrderby.Daily_Production_High_to_Low
          },
          {
            text: t('Daily.Production.Low.To.High'),
            value: PlantOrderby.Daily_Production_Low_to_High
          },
          {
            text: t('Maximum.Installed.Capacity'),
            value: PlantOrderby.Maximum_Installed_Capacity
          },
          {
            text: t('Minimum.Installed.Capacity'),
            value: PlantOrderby.Minimum_Installed_Capacity
          }
        ]
      case ManagementTab.Battery:
        return [
          {
            text: t('Latest.Installation.Date'),
            value: InverterOrderby.Latest_Installation_Date
          },
          {
            text: t('Created.Earlier.Than'),
            value: InverterOrderby.Created_Earlier_Than
          },
          {
            text: t('Maximum.Real.Time.Power'),
            value: InverterOrderby.Maximum_Real_Time_Power
          },
          {
            text: t('Minimum.Real.Time.Power'),
            value: InverterOrderby.Minimum_Real_Time_Power
          }
        ]
      case ManagementTab.Inverter:
        return [
          {
            text: t('Latest.Installation.Date'),
            value: BatteryOrderby.Latest_Installation_Date
          },
          {
            text: t('Created.Earlier.Than'),
            value: BatteryOrderby.Created_Earlier_Than
          }
        ]
      default:
        return []
    }
  }

  const [orderBySheetOpen, { set: setOrderBySheetOpen }] = useToggle(false)
  const [starStatus, { toggle: toggleStarStatus }] = useToggle(false)

  const getCurrentOrderByText = () =>
    getOrderBySheetMenu().find((item) => item.value === orderBy)?.text

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
          data: getOrderBySheetMenu().map((item) => ({
            ...item,
            color: item.value === orderBy ? globalStyles.primaryColor : undefined,
            onPress: () => {
              setOrderBy(item.value)
            }
          }))
        }}
      />

      <XStack space="$2.5">
        {false && (
          <TouchableOpacity onPress={toggleStarStatus}>
            <View theme="alt1">
              <Heart
                size="$1"
                fill={starStatus ? 'red' : 'transparent'}
                color={starStatus ? 'red' : undefined}
              />
            </View>
          </TouchableOpacity>
        )}

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
