import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

/**
 * NOTE: Why not use interface?
 * @see https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
 */

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>
  LiveStatus: undefined
  // Menu
  Notification: undefined
  System: undefined
  Account: undefined
  Settings: undefined
  Services: undefined
  Support: undefined
  Explore: undefined
  Community: undefined

  // System
  SystemSiteDetails: undefined
  SystemReports: undefined
  SystemDevices: undefined
  SystemDevicesGateway: undefined
  SystemDevicesBattery: undefined
  SystemDevicesSystemControl: undefined
  SystemDevicesMicroinverters: undefined
  SystemDevicesLoads: undefined
  SystemLiveStatus: undefined
  SystemLiveVitals: undefined
  SystemEventHistory: undefined
  SystemBackupHistory: undefined

  // Account
  AccountMyInfo: undefined
  AccountMyNotifications: undefined
  AccountMyAccessControl: undefined

  // Settings
  SettingsBattery: undefined
  SettingsLoadControl: undefined
  SettingsElectricityRate: undefined
  SettingsElectricityRateStructure: undefined
  SettingsElectricityRateStructureEdit: undefined
  SettingsElectricityRateStructureEditAutofill: undefined
  SettingsElectricityRateStructureEditManual: undefined
  SettingsAddElectricityExportRate: undefined
  SettingsAddElectricityExportRateNEM: undefined
  SettingsAddElectricityExportRateNet: undefined
  SettingsAddElectricityExportRateGross: undefined
  SettingsAddElectricityExportRateOther: undefined
  SettingsConnectivity: undefined
  SettingsPerformance: undefined
  SettingsPerformanceEnergy: undefined
  SettingsPerformanceCurrency: undefined

  // Don't need auth
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined

  // Temp
  DevMenu: undefined
  WebViewDemo: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>

/**
 * NOTE: Why not use interface?
 * @see https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
 */

export type TabParamList = {
  Status: undefined
  Statistics: undefined
  Array: undefined
  Menu: undefined
}

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
