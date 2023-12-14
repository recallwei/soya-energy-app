import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'
import { SizableStack, SizableText, Spinner, View } from 'tamagui'

import { globalStyles } from '@/constants'
import { useRefresh } from '@/hooks'

import { useInfiniteDevices } from './hooks'

export default function Screen() {
  const { t } = useTranslation('Global')
  const { devicesInfiniteQuery, devices, loadedAll, refetch } = useInfiniteDevices()
  const { refreshing, onRefresh } = useRefresh(async () => refetch())
  // const { sheetMenuData, sheetOpen, setSheetOpen, handleOpenSheet } = usePlantSheet()

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 18,
          paddingBottom: 18
        }}
        data={devices}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <SizableStack>{item.id}</SizableStack>}
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
            {devicesInfiniteQuery.isFetchingNextPage && (
              <Spinner
                style={{ marginTop: 10 }}
                color={globalStyles.primaryColor}
              />
            )}
            {loadedAll && (
              <SizableText
                textAlign="center"
                marginTop="$2"
              >
                {t('No.More.Data')}
              </SizableText>
            )}
          </>
        }
      />
    </View>
  )
}
