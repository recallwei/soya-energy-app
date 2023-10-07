import { useFlipper } from '@react-navigation/devtools'
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { TabBar } from '@/components'
import {
  AccountMyAccessControlScreen,
  AccountMyInfoScreen,
  AccountMyNotificationsScreen,
  AccountScreen,
  ChartsScreen,
  CommunityScreen,
  ExploreScreen,
  ForgotPasswordScreen,
  I18nScreen,
  LiveStatusScreen,
  LoginScreen,
  NotificationScreen,
  ServicesScreen,
  SettingsAddElectricityExportRateScreen,
  SettingsBatteryScreen,
  SettingsConnectivityScreen,
  SettingsElectricityRateScreen,
  SettingsElectricityRateStructureEditAutoFillScreen,
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
import { GlobalStyles } from '@/styles'
import type { HomeTabParamList, RootStackParamList } from '@/types'

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

  function getTabTitleI18nText(tabName: keyof HomeTabParamList): string {
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
            headerBackTitleStyle: GlobalStyles.headerBackTitle,
            headerStyle: {
              backgroundColor: '#333333'
            },
            contentStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitleStyle: GlobalStyles.headerTitle,
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
                component={TabBar}
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
                  title: t('Global:Screens.System')
                }}
              />
              <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                  title: t('Global:Screens.Account')
                }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  title: t('Global:Screens.Settings')
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
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemReports"
                component={SystemReportsScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemDevices"
                component={SystemDevicesScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemDevicesGateway"
                component={SystemDevicesGatewayScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemDevicesBattery"
                component={SystemDevicesBatteryScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemDevicesSystemControl"
                component={SystemDevicesSystemControlScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemDevicesMicroinverters"
                component={SystemDevicesMicroinvertersScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemDevicesLoads"
                component={SystemDevicesLoadsScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemLiveStatus"
                component={SystemLiveStatusScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemLiveVitals"
                component={SystemLiveVitalsScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemEventHistory"
                component={SystemEventHistoryScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SystemBackupHistory"
                component={SystemBackupHistoryScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              {/* Account */}
              <Stack.Screen
                name="AccountMyInfo"
                component={AccountMyInfoScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="AccountMyNotifications"
                component={AccountMyNotificationsScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="AccountMyAccessControl"
                component={AccountMyAccessControlScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              {/* Settings */}
              <Stack.Screen
                name="SettingsBattery"
                component={SettingsBatteryScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsLoadControl"
                component={SettingsLoadControlScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRate"
                component={SettingsElectricityRateScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRateStructure"
                component={SettingsElectricityRateStructureScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRateStructureEdit"
                component={SettingsElectricityRateStructureEditScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRateStructureEditAutoFill"
                component={SettingsElectricityRateStructureEditAutoFillScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsElectricityRateStructureEditManual"
                component={SettingsElectricityRateStructureEditManualScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsAddElectricityExportRate"
                component={SettingsAddElectricityExportRateScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsConnectivity"
                component={SettingsConnectivityScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsPerformance"
                component={SettingsPerformanceScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsPerformanceEnergy"
                component={SettingsPerformanceEnergyScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />
              <Stack.Screen
                name="SettingsPerformanceCurrency"
                component={SettingsPerformanceCurrencyScreen}
                options={{
                  title: t('Global:Screens.Community')
                }}
              />

              {/* Temp */}
              <Stack.Screen
                name="I18n"
                component={I18nScreen}
                options={{
                  title: 'i18n'
                }}
              />
              <Stack.Screen
                name="Charts"
                component={ChartsScreen}
                options={{
                  title: 'Charts'
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
