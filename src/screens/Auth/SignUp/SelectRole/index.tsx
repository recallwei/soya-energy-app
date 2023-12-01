import { useNavigation } from '@react-navigation/native'
import { User2, UserCog } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { UserRole } from '@/enums'
import { useRefresh } from '@/hooks'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()
  const { t } = useTranslation('Auth')
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View paddingBottom={insets.bottom}>
      <ScrollView
        height="100%"
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
          <MenuItemCard
            title={t('I.Am.An.Owner.Text')}
            description={t('I.Am.An.Owner.Description')}
            icon={User2}
            onPress={() => navigation.navigate('Auth.SignUp', { role: UserRole.USER })}
          />
          <MenuItemCard
            title={t('I.Am.An.Installer.Text')}
            description={t('I.Am.An.Installer.Description')}
            icon={UserCog}
            onPress={() => navigation.navigate('Auth.SignUp', { role: UserRole.INSTALLER })}
          />
        </YStack>
      </ScrollView>
    </View>
  )
}
