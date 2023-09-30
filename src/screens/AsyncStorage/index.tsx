import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, YStack, Input } from 'tamagui'

import { TextStyles } from '@/styles'

export default function AsyncStorageScreen(): React.JSX.Element {
  const [storageValue, setStorageValue] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const valueStr = await AsyncStorage.getItem('test')
      if (valueStr !== null) {
        setValue(valueStr)
        setStorageValue(valueStr)
      } else {
        setValue('')
        setStorageValue('')
      }
    } catch {
      //
    }
  }

  async function storeData(valueStr: string) {
    try {
      await AsyncStorage.setItem('test', valueStr)
      await getData()
    } catch {
      //
    }
  }

  async function clearData() {
    setValue('')
    setStorageValue('')
    try {
      await AsyncStorage.removeItem('test')
    } catch {
      //
    }
  }

  return (
    <YStack
      rowGap="$3"
      alignItems="center"
      justifyContent="center"
      height="100%"
      padding="$2"
      paddingBottom="$16"
    >
      <Text
        style={{
          ...TextStyles.base,
          alignSelf: 'center'
        }}
      >
        {storageValue || '--'}
      </Text>
      <Button
        width="$16"
        onPress={async () => getData()}
      >
        Get
      </Button>
      <Input
        width="$16"
        value={value}
        onChangeText={(text: string) => setValue(text)}
        autoCapitalize="none"
      />
      <Button
        width="$16"
        onPress={async () => storeData(value)}
      >
        Set
      </Button>
      <Button
        width="$16"
        onPress={async () => clearData()}
      >
        Clear
      </Button>
    </YStack>
  )
}
