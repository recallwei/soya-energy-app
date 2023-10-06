import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export interface NavigationItem {
  label: string
  screen: keyof (RootStackParamList & HomeTabParamList)
}

export interface RootStackParamList {
  Tabs: undefined
  LiveStatus: undefined
  Notification: undefined
  Services: undefined

  // Don't need auth
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined

  // Temp
  I18n: undefined
  Charts: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export interface HomeTabParamList {
  [key: string]: undefined
  Status: undefined
  Statistics: undefined
  Array: undefined
  Menu: undefined
}

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
