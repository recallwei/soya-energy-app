import { useNavigation } from '@react-navigation/native'
import { ChevronRight, GripVertical } from '@tamagui/lucide-icons'
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'
import { SizableText, View, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { useRefresh } from '@/hooks'
import { usePlantStore } from '@/store'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()
  const { navigate } = useNavigation()
  const plantStore = usePlantStore()

  const handleClickCard = (id: string) => navigate('Common.Plant.Detail', { id })

  return (
    <View paddingVertical="$4">
      <DraggableFlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{
          height: '100%'
        }}
        data={plantStore.plantList}
        scrollEnabled
        keyExtractor={({ id }) => id}
        renderItem={({ item, drag }) => (
          <ScaleDecorator>
            <View
              paddingHorizontal="$4"
              paddingBottom="$2"
            >
              <Card
                onPress={() => handleClickCard(item.id)}
                onLongPress={drag}
              >
                <XStack
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <XStack
                    space="$3"
                    alignItems="center"
                  >
                    <GripVertical />
                    <YStack>
                      <SizableText>{item.id}</SizableText>
                      <SizableText>{item.plantName}</SizableText>
                    </YStack>
                  </XStack>
                  <View>
                    <ChevronRight />
                  </View>
                </XStack>
              </Card>
            </View>
          </ScaleDecorator>
        )}
        onDragEnd={({ data }) => plantStore.setPlantList(data)}
      />
    </View>
  )
}
