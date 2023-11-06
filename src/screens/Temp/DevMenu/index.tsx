import { useNavigation } from '@react-navigation/native'
import { PanelTop } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native'
import { YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function DevMenuScreen(): React.JSX.Element {
  const { navigate } = useNavigation()

  return (
    <SafeAreaView>
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title="WebView Demo"
          description="WebView Demo for events page"
          icon={PanelTop}
          onPress={() => navigate('WebViewDemo')}
        />
      </YStack>
    </SafeAreaView>
  )
}
