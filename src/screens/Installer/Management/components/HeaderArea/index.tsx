import { PlusCircle, ScanLine, Search } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { Input, Text, View, XStack, YStack } from 'tamagui'

import type { SheetMenuListItem } from '@/components'
import { SheetMenu } from '@/components'
import i18n from '@/i18n'

import { ManagementTab } from '../../enums'

interface Props {
  currentTab: ManagementTab
  setCurrentTab: (tab: ManagementTab) => void
  setKeywords: (keywords: string) => void
}

const tFunc = i18n.getFixedT(null, 'Installer.Management')

const tabList = [
  { text: () => tFunc('Plant'), value: ManagementTab.Plant },
  { text: () => tFunc('Inverter'), value: ManagementTab.Inverter },
  { text: () => tFunc('Battery'), value: ManagementTab.Battery }
]

export default function HeaderArea(props: Props) {
  const { t } = useTranslation('Installer.Management')

  const createSheetMenuData: SheetMenuListItem[] = [
    {
      text: t('Create.Plant.For.Me'),
      onPress: () => {}
    },
    {
      text: t('Create.Plant.For.Owner'),
      onPress: () => {}
    }
  ]

  const [searchText, setSearchText] = useState('')
  const [createSheetOpen, setCreateSheetOpen] = useState(false)

  const handleOpen = () => setCreateSheetOpen(!createSheetOpen)

  const handleClickScan = () => {}

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
            onSubmitEditing={() => props.setKeywords(searchText)}
            placeholder={t('SearchText.Placeholder')}
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
        <TouchableOpacity onPress={handleOpen}>
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
