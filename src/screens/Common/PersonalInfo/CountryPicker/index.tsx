import { useEffect, useRef, useState } from 'react'
import { Platform, SectionList, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SizableText, View, XStack, YStack } from 'tamagui'

import { getCountryCodeAlphabet, globalStyles } from '@/constants'
import { ToastUtils } from '@/utils'

interface GroupItem {
  title: string
  data: CountryItem[]
}

interface CountryItem {
  name: string
  code: string
}

export default function Screen() {
  const insets = useSafeAreaInsets()
  const [countryData, setCountryData] = useState<GroupItem[]>([])

  const sectionListRef = useRef<SectionList>(null)

  useEffect(() => {
    const meta = getCountryCodeAlphabet()
    setCountryData(
      Object.keys(meta).map((title) => ({
        title,
        data: meta[title as keyof typeof meta]
      }))
    )
  }, [])

  const handleScrollToSection = (index: number) => {
    setTimeout(() => {
      sectionListRef.current!.scrollToLocation({
        sectionIndex: index,
        itemIndex: Platform.OS === 'ios' && index !== 0 ? -1 : 0,
        animated: true,
        viewOffset: 0,
        viewPosition: 0
      })
      ToastUtils.success({
        message: JSON.stringify(index)
      })
    }, 100)
  }

  const handleSelectItem = (item: any) => {
    console.log(item)
    ToastUtils.success({
      message: JSON.stringify(item)
    })
  }

  return (
    <View paddingBottom={insets.bottom}>
      <SectionList
        ref={sectionListRef}
        contentContainerStyle={{ marginRight: 30, padding: 8 }}
        keyExtractor={({ title }) => title}
        sections={countryData}
        renderSectionHeader={({ section: { title } }) => (
          <View
            backgroundColor={globalStyles.primaryColor}
            paddingHorizontal="$1"
            marginBottom="$2"
          >
            <SizableText
              size="$6"
              color="white"
            >
              {title}
            </SizableText>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectItem(item)}>
            <XStack
              key={item.name}
              justifyContent="space-between"
              alignItems="center"
              marginBottom={10}
              width="100%"
            >
              <View width="80%">
                <SizableText>{item.name}</SizableText>
              </View>
              <View>
                <SizableText>{item.code}</SizableText>
              </View>
            </XStack>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        initialNumToRender={500}
      />
      <YStack
        position="absolute"
        right={0}
        top={0}
        bottom={insets.bottom}
        alignItems="center"
        justifyContent="center"
        width={30}
      >
        {countryData.map((item, index: number) => (
          <TouchableOpacity
            key={item.title}
            onPressIn={() => handleScrollToSection(index)}
          >
            <SizableText
              size="$2"
              lineHeight="$2"
            >
              {item.title}
            </SizableText>
          </TouchableOpacity>
        ))}
      </YStack>
    </View>
  )
}
