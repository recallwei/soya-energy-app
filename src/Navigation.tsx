import { useFlipper } from '@react-navigation/devtools'
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseTabBar } from '@/components'
import {
  AccountMyAccessControlScreen,
  AccountMyInfoScreen,
  AccountMyNotificationsScreen,
  AccountScreen,
  CommunityScreen,
  ExploreScreen,
  ForgotPasswordScreen,
  LiveStatusScreen,
  LoginScreen,
  NotificationScreen,
  ServicesScreen,
  SettingsAddElectricityExportRateGrossScreen,
  SettingsAddElectricityExportRateNEMScreen,
  SettingsAddElectricityExportRateNetScreen,
  SettingsAddElectricityExportRateOtherScreen,
  SettingsAddElectricityExportRateScreen,
  SettingsBatteryScreen,
  SettingsConnectivityScreen,
  SettingsElectricityRateScreen,
  SettingsElectricityRateStructureEditAutofillScreen,
  SettingsElectricityRateStructureEditManualScreen,
  SettingsElectricityRateStructureEditScreen,
  SettingsElectricityRateStructureScreen,
  SettingsLoadControlScreen,
  SettingsPerformanceCurrencyScreen,
  SettingsPerformanceEnergyScreen,
  SettingsPerformanceScreen,
  SettingsScreen,
  SignUpScreen,
  SplashScreen,
  SupportScreen,
  SystemBackupHistoryScreen,
  SystemDevicesBatteryScreen,
  SystemDevicesGatewayScreen,
  SystemDevicesLoadsScreen,
  SystemDevicesMicroinvertersScreen,
  SystemDevicesScreen,
  SystemDevicesSystemControlScreen,
  SystemEventHistoryScreen,
  SystemLiveStatusScreen,
  SystemLiveVitalsScreen,
  SystemReportsScreen,
  SystemScreen,
  SystemSiteDetailsScreen
} from '@/screens'
import { useAuthStore, useTabsStore } from '@/store'
import type { RootStackParamList, TabParamList } from '@/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation(): React.JSX.Element {
  const { t } = useTranslation(['Global'])

  const { isLogin, isLoading, loaded } = useAuthStore()
  const { currentTab } = useTabsStore()

  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  useEffect(() => {
    setTimeout(() => {
      loaded()
    }, 100)
  }, [])

  function getTabTitleI18nText(tabName: keyof TabParamList): string {
    switch (tabName) {
      case 'Status':
        return t('Global:Tabs.Status')
      case 'Statistics':
        return t('Global:Tabs.Statistics')
      case 'Array':
        return t('Global:Tabs.Array')
      case 'Menu':
        return t('Global:Tabs.Menu')
      default:
        return t('Global:Tabs.Status')
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={DefaultTheme}
    >
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#ffffff',
            headerBackTitleStyle: {
              fontSize: 16
            },
            headerStyle: {
              backgroundColor: '#333333'
            },
            contentStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitleStyle: {
              fontSize: 16
            },
            animation: 'slide_from_right',
            statusBarStyle: 'light', // iOS only
            statusBarColor: '#000000', // Android only
            statusBarAnimation: 'slide'
          }}
        >
          {isLogin ? (
            <>
              <Stack.Screen
                name="Tabs"
                component={BaseTabBar}
                options={{
                  headerShown: false,
                  title: getTabTitleI18nText(currentTab),
                  statusBarStyle: 'dark',
                  statusBarColor: '#ffffff'
                }}
              />
              <Stack.Screen
                name="LiveStatus"
                component={LiveStatusScreen}
                options={{
                  title: t('Global:Screens.LiveStatus')
                }}
              />
              {/* Menu */}
              <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                  title: t('Global:Screens.Notification')
                }}
              />
              <Stack.Screen
                name="System"
                component={SystemScreen}
                options={{
                  title: t('Global:Screens.System.System')
                }}
              />
              <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                  title: t('Global:Screens.Account.Account')
                }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  title: t('Global:Screens.Settings.Settings')
                }}
              />
              <Stack.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                  title: t('Global:Screens.Services')
                }}
              />
              <Stack.Screen
                name="Support"
                component={SupportScreen}
                options={{
                  title: t('Global:Screens.Support')
                }}
              />
              <Stack.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                  title: t('Global:Screens.Explore')
                }}
              />
              <Stack.Screen
                name="Community"
                component={CommunityScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              {/* System */}
              <Stack.Screen
                name="SystemSiteDetails"
                component={SystemSiteDetailsScreen}
                options={{
                  title: t('Global:Screens.System.SiteDetails')
                }}
              />
              <Stack.Screen
                name="SystemReports"
                component={SystemReportsScreen}
                options={{
                  title: t('Global:Screens.System.Reports')
                }}
              />
              <Stack.Screen
                name="SystemDevices"
                component={SystemDevicesScreen}
                options={{
                  title: t('Global:Screens.System.Devices.Battery')
                }}
              />
              <Stack.Screen
                name="SystemDevicesGateway"
                component={SystemDevicesGatewayScreen}
                options={{
                  title: t('Global:Screens.System.Devices.Gateway')
                }}
              />
              <Stack.Screen
                name="SystemDevicesBattery"
                component={SystemDevicesBatteryScreen}
                options={{
                  title: t('Global:Screens.System.Devices.Battery')
                }}
              />
              <Stack.Screen
                name="SystemDevicesSystemControl"
                component={SystemDevicesSystemControlScreen}
                options={{
                  title: t('Global:Screens.System.Devices.SystemControl')
                }}
              />
              <Stack.Screen
                name="SystemDevicesMicroinverters"
                component={SystemDevicesMicroinvertersScreen}
                options={{
                  title: t('Global:Screens.System.Devices.Microinverters')
                }}
              />
              <Stack.Screen
                name="SystemDevicesLoads"
                component={SystemDevicesLoadsScreen}
                options={{
                  title: t('Global:Screens.System.Devices.Loads')
                }}
              />
              <Stack.Screen
                name="SystemLiveStatus"
                component={SystemLiveStatusScreen}
                options={{
                  title: t('Global:Screens.System.LiveStatus')
                }}
              />
              <Stack.Screen
                name="SystemLiveVitals"
                component={SystemLiveVitalsScreen}
                options={{
                  title: t('Global:Screens.System.LiveVitals')
                }}
              />
              <Stack.Screen
                name="SystemEventHistory"
                component={SystemEventHistoryScreen}
                options={{
                  title: t('Global:Screens.System.EventHistory')
                }}
              />
              <Stack.Screen
                name="SystemBackupHistory"
                component={SystemBackupHistoryScreen}
                options={{
                  title: t('Global:Screens.System.BackupHistory')
                }}
              />
              {/* Account */}
              <Stack.Screen
                name="AccountMyInfo"
                component={AccountMyInfoScreen}
                options={{
                  title: t('Global:Screens.Account.MyInfo')
                }}
              />
              <Stack.Screen
                name="AccountMyNotifications"
                component={AccountMyNotificationsScreen}
                options={{
                  title: t('Global:Screens.Account.MyNotifications')
                }}
              />
              <Stack.Screen
                name="AccountMyAccessControl"
                component={AccountMyAccessControlScreen}
                options={{
                  title: t('Global:Screens.Account.MyAccessControl')
                }}
              />
              {/* Settings */}
              <Stack.Screen
                name="SettingsBattery"
                component={SettingsBatteryScreen}
                options={{
                  title: t('Global:Screens.Settings.Battery')
                }}
              />
              <Stack.Screen
                name="SettingsLoadControl"
                component={SettingsLoadControlScreen}
                options={{
                  title: t('Global:Screens.Settings.LoadControl')
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRate"
                component={SettingsElectricityRateScreen}
                options={{
                  title: t(
                    'Global:Screens.Settings.ElectricityRate.ElectricityRate'
                  )
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRateStructure"
                component={SettingsElectricityRateStructureScreen}
                options={{
                  title: t('Global:Screens.Settings.ElectricityRate.Structure')
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRateStructureEdit"
                component={SettingsElectricityRateStructureEditScreen}
                options={{
                  title: t('Global:Edit')
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRateStructureEditAutofill"
                component={SettingsElectricityRateStructureEditAutofillScreen}
                options={{
                  title: t(
                    'Global:Screens.Settings.ElectricityRate.Edit.Autofill'
                  )
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRateStructureEditManual"
                component={SettingsElectricityRateStructureEditManualScreen}
                options={{
                  title: t(
                    'Global:Screens.Settings.ElectricityRate.Edit.Manual'
                  )
                }}
              />
              <Stack.Screen
                name="SettingsAddElectricityExportRate"
                component={SettingsAddElectricityExportRateScreen}
                options={{
                  title: t(
                    'Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.AddElectricityExportRate'
                  )
                }}
              />
              <Stack.Screen
                name="SettingsAddElectricityExportRateNEM"
                component={SettingsAddElectricityExportRateNEMScreen}
                options={{
                  title: t(
                    'Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.NEM'
                  )
                }}
              />
              <Stack.Screen
                name="SettingsAddElectricityExportRateNet"
                component={SettingsAddElectricityExportRateNetScreen}
                options={{
                  title: t(
                    'Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.Net'
                  )
                }}
              />
              <Stack.Screen
                name="SettingsAddElectricityExportRateGross"
                component={SettingsAddElectricityExportRateGrossScreen}
                options={{
                  title: t(
                    'Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.Gross'
                  )
                }}
              />
              <Stack.Screen
                name="SettingsAddElectricityExportRateOther"
                component={SettingsAddElectricityExportRateOtherScreen}
                options={{
                  title: t(
                    'Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.Other'
                  )
                }}
              />
              <Stack.Screen
                name="SettingsConnectivity"
                component={SettingsConnectivityScreen}
                options={{
                  title: t('Global:Screens.Settings.Connectivity')
                }}
              />
              <Stack.Screen
                name="SettingsPerformance"
                component={SettingsPerformanceScreen}
                options={{
                  title: t('Global:Screens.Settings.Performance.Performance')
                }}
              />
              <Stack.Screen
                name="SettingsPerformanceEnergy"
                component={SettingsPerformanceEnergyScreen}
                options={{
                  title: t('Global:Screens.Settings.Performance.Energy')
                }}
              />
              <Stack.Screen
                name="SettingsPerformanceCurrency"
                component={SettingsPerformanceCurrencyScreen}
                options={{
                  title: t('Global:Screens.Settings.Performance.Currency')
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                  animationTypeForReplace: 'pop',
                  statusBarStyle: 'dark',
                  statusBarColor: '#ffffff',
                  title: t('Global:Screens.Login')
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  statusBarStyle: 'dark',
                  statusBarColor: '#ffffff',
                  title: t('Global:Screens.Signup')
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                  statusBarStyle: 'dark',
                  statusBarColor: '#ffffff',
                  title: t('Global:Screens.ForgotPassword')
                }}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
