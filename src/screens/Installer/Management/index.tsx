import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'tamagui'

import { HeaderArea, ScrollList } from './components'

export default function InstallerManagementScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets()
  return (
    <View
      height="100%"
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <HeaderArea />
      <ScrollList />
    </View>
  )
}
