import { useNavigation } from '@react-navigation/native'
import { FlatList, RefreshControl, View } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()
  const { navigate } = useNavigation()

  const list = [
    {
      id: '1',
      title: '通知标题',
      date: '2022/06/22',
      type: '1',
      content:
        'There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.'
    },
    {
      id: '2',
      title: '通知标题',
      date: '2022/06/22',
      type: '2',
      content:
        'There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.'
    },
    {
      id: '3',
      title: '通知标题',
      date: '2022/06/22',
      type: '3',
      content:
        'There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.'
    },
    {
      id: '4',
      title: '通知标题',
      date: '2022/06/22',
      type: '4',
      content:
        'There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.There are some problems happened.'
    }
  ]

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <YStack
          padding="$4"
          space="$3"
        >
          <FlatList
            contentContainerStyle={{ gap: 12 }}
            scrollEnabled={false}
            data={list}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <MenuItemCard
                description={item.content}
                descriptionLines={2}
                header
                headerLeftText={item.title}
                headerRightText={item.date}
                onPress={() =>
                  navigate('Common.Message.Detail', {
                    id: item.id,
                    type: item.type
                  })
                }
              />
            )}
          />
        </YStack>
      </ScrollView>
    </View>
  )
}
