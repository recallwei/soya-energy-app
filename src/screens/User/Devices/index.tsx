import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'
import { SizableText, Spinner, YStack } from 'tamagui'

import { SheetMenu } from '@/components'
import { globalStyles } from '@/constants'
import { useRefresh } from '@/hooks'
import {
  BatteryItem,
  InverterItem
} from '@/screens/Installer/Management/components/ScrollList/components'
import { ManagementTab } from '@/screens/Installer/Management/enums'

import { DeviceType } from './enums'
import { useDevicesQuery, useSheet } from './hooks'

export default function Screen() {
  const { t } = useTranslation()
  const { queryResult, devices } = useDevicesQuery()
  const { refreshing, onRefresh } = useRefresh(queryResult.refetch)
  const { handleOpenSheet, sheetOpen, setSheetOpen, sheetMenuData } = useSheet()

  return (
    <YStack minHeight="100%">
      <FlatList
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 18,
          paddingVertical: 12
        }}
        data={devices}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          switch (item.type) {
            case DeviceType.Inverter:
              return (
                <InverterItem
                  handleOpenSheet={handleOpenSheet}
                  actionBtn
                  currentTab={ManagementTab.Inverter}
                  {...item}
                />
              )
            case DeviceType.Battery:
              return (
                <BatteryItem
                  currentTab={ManagementTab.Battery}
                  {...item}
                />
              )
            default:
              return null
          }
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        progressViewOffset={30}
        ListFooterComponent={
          <>
            {queryResult.isFetching && (
              <Spinner
                style={{ marginTop: 10 }}
                color={globalStyles.primaryColor}
              />
            )}
            {queryResult.isFetched && (
              <SizableText
                textAlign="center"
                marginTop="$2"
              >
                {t('No.More.Data')}
              </SizableText>
            )}
          </>
        }
        ListHeaderComponent={
          <SheetMenu
            data={sheetMenuData}
            sheet={{
              open: sheetOpen,
              setOpen: setSheetOpen
            }}
            autoClose
          />
        }
      />
      <SheetMenu
        data={sheetMenuData}
        sheet={{
          open: sheetOpen,
          setOpen: setSheetOpen
        }}
        autoClose
      />
    </YStack>
  )
}
