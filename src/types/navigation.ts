import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import type { UserRole } from '@/enums'
import type { ManagementTab } from '@/screens/Installer/Management/enums'

/**
 * NOTE: Why not use interface?
 * @see https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
 */

// 路由
export type RootStackParamList = InstallerTabParamList &
  UserTabParamList & {
    ['Installer.Tabs']: NavigatorScreenParams<InstallerTabParamList>
    ['User.Tabs']: NavigatorScreenParams<UserTabParamList>

    // Splash Screen
    Splash: undefined

    // Don't need auth
    ['Auth.Login']: undefined
    ['Auth.SignUp']: { role: UserRole }
    ['Auth.SignUp.SelectRole']: undefined
    ['Auth.Forgot_Password']: undefined

    // Camera
    ['Camera.CodeScanner']: undefined

    // Common
    ['Common.Message']: undefined
    ['Common.Message.List']: { type: string }
    ['Common.Message.Detail']: { id: string; type: string }

    ['Common.Plant.Detail']: { id: string }
    ['Common.Plant.Edit']: { id: string }
    ['Common.Plant.Create.Inverter']: { userId?: string }
    ['Common.Plant.Create']: { inverterSn: string; userId?: string }
    ['Common.Plant.Customers']: undefined

    ['Common.Inverter.Detail']: { id: string }
    ['Common.Inverter.Edit']: { id: string }
    ['Common.Inverter.Create']: undefined

    ['Common.Battery.Detail']: { id: string }
    ['Common.Battery.Edit']: { id: string }
    ['Common.Battery.Create']: undefined

    ['Common.EV.Charger.Create']: undefined
    ['Common.Mobile.Storage.Create']: undefined

    ['Common.My.Personal_Info']: undefined
    ['Common.My.Personal_Info.Change_Username']: undefined
    ['Common.My.Personal_Info.Change_Password']: undefined
    ['Common.My.Personal_Info.Change_Email']: undefined
    ['Common.My.Personal_Info.Country_Picker']: undefined

    ['Common.My.Privacy_Management']: undefined
    ['Common.My.Privacy_Management.Agreement_And_Policy']: undefined
    ['Common.My.Privacy_Management.Agreement_And_Policy.Privacy_Policy']: undefined
    ['Common.My.Privacy_Management.Email_Push']: undefined
    ['Common.My.Privacy_Management.Push_Notice']: undefined
    ['Common.My.Privacy_Management.System_Permission']: undefined

    ['Common.My.About_Us']: undefined

    ['Common.My.Settings']: undefined
    ['Common.My.Settings.Cancel_Account']: undefined
    ['Common.My.Settings.System_Units']: undefined

    // User
    ['User.Home.Live_Status']: undefined
    ['User.Home.Weather_Forecast_Settings']: undefined
    ['User.Home.Select_Location']: { longitude: number; latitude: number }
    ['User.Plant.Management']: undefined
    ['User.Devices']: undefined
  }

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>

// useRoute 泛型
export type RouteProp<T extends keyof RootStackParamList> = ScreenProps<T>['route']
// useNavigation 泛型
export type Navigation<T extends keyof RootStackParamList> = ScreenProps<T>['navigation']

/**
 * NOTE: Why not use interface?
 * @see https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
 */

// 安装商 Tab
export type InstallerTabParamList = {
  ['Installer.Home']: undefined
  ['Installer.Management']: { currentTab?: ManagementTab }
  ['Installer.Services']: undefined
  ['Installer.Guide']: undefined
  ['Installer.My']: undefined
}

export type InstallerTabScreenProps<T extends keyof InstallerTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<InstallerTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>

// 用户 Tab
export type UserTabParamList = {
  ['User.Home']: { id: string } | undefined
  ['User.Devices']: undefined
  ['User.Battery']: undefined
  ['User.Analysis']: undefined
  ['User.My']: undefined
}

export type UserTabScreenProps<T extends keyof UserTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<UserTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
