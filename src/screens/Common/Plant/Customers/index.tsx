import { CachedImage } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'
import { SizableText, Spinner, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { globalStyles, SYSTEM_RESOURCE } from '@/constants'
import { useRefresh } from '@/hooks'

import { useCustomersQuery } from './hooks'

export default function Screen() {
  const { t } = useTranslation(['Global', 'Auth'])
  const { refreshing, onRefresh } = useRefresh()
  const { navigate } = useNavigation()
  const { customerList, queryResult } = useCustomersQuery()

  return (
    <YStack minHeight="100%">
      <FlatList
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 18,
          paddingVertical: 12
        }}
        data={customerList}
        keyExtractor={({ id }) => id!}
        renderItem={({ item }) => (
          <Card onPress={() => navigate('Common.Plant.Create.Inverter', { userId: item.id })}>
            <YStack>
              <XStack
                justifyContent="space-between"
                alignItems="center"
              >
                <SizableText size="$3">
                  {t('Auth:Username')}: {item.name || '--'}
                </SizableText>
                <CachedImage
                  source={item.avatar || SYSTEM_RESOURCE.USER_DEFAULT_IMAGE_URL}
                  style={{
                    width: 24,
                    height: 24,
                    overflow: 'hidden',
                    shadowRadius: 4,
                    shadowOpacity: 0.05,
                    borderRadius: 9999
                  }}
                  resizeMode="cover"
                />
              </XStack>
              <SizableText size="$3">
                {t('Auth:Email')}: {item.email || '--'}
              </SizableText>
            </YStack>
          </Card>
        )}
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
      />
    </YStack>
  )
}
