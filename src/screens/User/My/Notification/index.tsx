import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshControl } from 'react-native'
import { Card, ScrollView, Text, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh } from '@/hooks'

interface MessageItem {
  title: string
  content: string
}

export default function NotificationScreen(): React.JSX.Element {
  const { t } = useTranslation(['Notification', 'Global'])

  const [notifications, setNotifications] = useState<MessageItem[]>([])

  const { refetch } = useQuery({
    queryKey: ['Notification'],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          setNotifications(
            Array.from({ length: Math.floor(Math.random() * 20) }, () => ({
              title: t('Notification:WarningMessageTitle'),
              content: t('Notification:WarningMessageContent')
            }))
          )
          resolve('')
        }, 1000)
      })
  })

  const { refreshing, onRefresh } = useRefresh(refetch)

  return (
    <ScrollView
      minHeight="100%"
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
        marginBottom="$10"
      >
        {notifications.length > 0 ? (
          notifications.map((notificationItem, notificationIndex) => (
            <Card
              key={notificationIndex}
              size="$3"
              bordered
              animation="bouncy"
              width="100%"
              height="auto"
              pressStyle={{ scale: 0.95 }}
            >
              <Card.Header padded>
                <YStack space="$3">
                  <Text
                    fontFamily="$body"
                    fontWeight="bold"
                    color="red"
                  >
                    {notificationItem.title}
                  </Text>
                  <Text fontFamily="$body">{notificationItem.content}</Text>
                </YStack>
              </Card.Header>
            </Card>
          ))
        ) : (
          <NoData />
        )}
      </YStack>
    </ScrollView>
  )
}
