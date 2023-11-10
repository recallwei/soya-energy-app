import { useNavigation } from '@react-navigation/native'
import { Layers, PanelTop } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function DevMenuScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets()
  const { navigate } = useNavigation()

  return (
    <View
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title="Demo"
          description="Page just for dev testing"
          icon={Layers}
          onPress={() => navigate('Demo')}
        />
        <MenuItemCard
          title="WebView Demo"
          description="WebView Demo for events page"
          icon={PanelTop}
          onPress={() => navigate('WebViewDemo')}
        />
      </YStack>
    </View>
  )
}
