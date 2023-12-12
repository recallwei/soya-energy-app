import { PlusCircle, ScanLine, Search } from '@tamagui/lucide-icons'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Input, Text, View, XStack, YStack } from 'tamagui'

import { SheetMenu } from '@/components'

import type { ManagementTab } from '../../enums'
import { tabList } from './constants'
import { useCreateMenuSheet, useSearchText } from './hooks'

interface Props {
  currentTab: ManagementTab
  setCurrentTab: (tab: ManagementTab) => void
  setKeywords: (keywords: string) => void
}

export default function HeaderArea(props: Props) {
  const { searchText, setSearchText, getInputPlaceholder, clearSearchText } = useSearchText()
  const { createSheetOpen, setCreateSheetOpen, createSheetMenuData, handleOpenCreateSheet } =
    useCreateMenuSheet()
  const handleClickScan = () => {}

  useEffect(() => {
    clearSearchText()
  }, [props.currentTab])

  return (
    <YStack
      paddingTop="$4"
      paddingHorizontal="$4"
      paddingBottom="$2"
      space="$2"
    >
      <XStack
        space="$4"
        alignItems="center"
      >
        {tabList.map((tab) => (
          <TouchableOpacity onPress={() => props.setCurrentTab(tab.value)}>
            <Text
              key={tab.value}
              fontFamily="$body"
              fontWeight={props.currentTab === tab.value ? '$semiBold' : '$regular'}
              fontSize={props.currentTab === tab.value ? '$8' : '$6'}
            >
              {tab.text()}
            </Text>
          </TouchableOpacity>
        ))}
      </XStack>

      <XStack
        alignItems="center"
        space="$2"
      >
        <XStack flex={1}>
          <Input
            flexGrow={1}
            paddingLeft="$7"
            autoCapitalize="none"
            clearButtonMode="never"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={(e) => props.setKeywords(e.nativeEvent.text)}
            placeholder={getInputPlaceholder(props.currentTab)}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 12,
              justifyContent: 'center'
            }}
          >
            <View theme="alt2">
              <Search size="$1" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClickScan}>
            <View
              position="absolute"
              right="$3"
              top={0}
              bottom={0}
              justifyContent="center"
              theme="alt2"
            >
              <ScanLine size="$1" />
            </View>
          </TouchableOpacity>
        </XStack>
        <TouchableOpacity onPress={handleOpenCreateSheet}>
          <View theme="alt2">
            <PlusCircle size="$1.5" />
          </View>
        </TouchableOpacity>
        <SheetMenu
          sheet={{
            open: createSheetOpen,
            setOpen: setCreateSheetOpen
          }}
          data={createSheetMenuData}
          autoClose
        />
      </XStack>
    </YStack>
  )
}
