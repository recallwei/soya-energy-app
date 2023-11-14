import { useFlipper } from '@react-navigation/devtools'
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { InstallerTabBar, UserTabBar } from '@/navigators'
import {
  AccountMyAccessControlScreen,
  AccountMyInfoScreen,
  AccountMyNotificationsScreen,
  AccountScreen,
  AuthForgotPasswordScreen,
  AuthLoginScreen,
  AuthSignUpScreen,
  AuthSplashScreen,
  CommonAboutUsScreen,
  CommonMyPrivacyManagementScreen,
  CommonMySettingsPersonalInfoScreen,
  CommonMySettingsScreen,
  CommonMySettingsSystemUnitsScreen,
  CommunityScreen,
  DemoScreen,
  DevMenuScreen,
  ExploreScreen,
  ImageCacheTestScreen,
  LiveStatusScreen,
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
  SystemSiteDetailsScreen,
  WebViewDemoScreen
} from '@/screens'
import { useAuthStore, useTabsStore, useThemeStore } from '@/store'
import type { InstallerTabParamList, RootStackParamList, UserTabParamList } from '@/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  const { t } = useTranslation(['Screen', 'Global'])

  const authStore = useAuthStore()
  const tabStore = useTabsStore()
  const themeStore = useThemeStore()

  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  useEffect(() => {
    setTimeout(() => {
      authStore.loaded()
    }, 2000)
  }, [])

  function getInstallerTabTitleI18nText(tabName: keyof InstallerTabParamList): string {
    switch (tabName) {
      case 'Installer.Home':
        return t('Installer.Tabs.Home')
      case 'Installer.Management':
        return t('Installer.Tabs.Management')
      case 'Installer.Services':
        return t('Installer.Tabs.Services')
      case 'Installer.Guide':
        return t('Installer.Tabs.Guide')
      case 'Installer.My':
        return t('Installer.Tabs.My')
      default:
        return ''
    }
  }

  function getUserTabTitleI18nText(tabName: keyof UserTabParamList): string {
    switch (tabName) {
      case 'User.Home':
        return t('User.Tabs.Home')
      case 'User.Statistics':
        return t('User.Tabs.Statistics')
      case 'User.Devices':
        return t('User.Tabs.Devices')
      case 'User.My':
        return t('User.Tabs.My')
      default:
        return ''
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={DefaultTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerTintColor: themeStore.getTextColor(),
          headerBackTitle: '', // iOS only,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            fontSize: 18,
            fontFamily: 'Nunito-Regular'
          },
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: themeStore.getBgColor()
          },
          contentStyle: {
            backgroundColor: themeStore.getBgColor()
          },
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Nunito-SemiBold',
            color: themeStore.getTextColor()
          },
          animation: 'slide_from_right',
          statusBarStyle: themeStore.isDark() ? 'light' : 'dark', // iOS only
          statusBarColor: themeStore.getBgColor(), // Android only
          statusBarAnimation: 'slide',
          animationTypeForReplace: 'pop'
        }}
      >
        {authStore.isLogin ? (
          <>
            {authStore.isInstaller() && (
              <>
                <Stack.Screen
                  name="Installer.Tabs"
                  component={InstallerTabBar}
                  options={{
                    headerShown: false,
                    animation: 'simple_push',
                    animationTypeForReplace: 'push',
                    contentStyle: {
                      backgroundColor: themeStore.isDark() ? '#333333' : '#ffffff'
                    },
                    title: getInstallerTabTitleI18nText(tabStore.installerCurrentTab)
                  }}
                />
                <Stack.Screen
                  name="Common.My.Privacy_Management"
                  component={CommonMyPrivacyManagementScreen}
                  options={{ title: t('Common.My.Privacy.Management') }}
                />
                <Stack.Screen
                  name="Common.My.About_Us"
                  component={CommonAboutUsScreen}
                  options={{ title: t('Common.My.About.Us') }}
                />
                <Stack.Screen
                  name="Common.My.Settings"
                  component={CommonMySettingsScreen}
                  options={{ title: t('Common.My.Settings') }}
                />
                <Stack.Screen
                  name="Common.My.Settings.Personal_Info"
                  component={CommonMySettingsPersonalInfoScreen}
                  options={{ title: t('Common.My.Settings.Personal.Info') }}
                />
                <Stack.Screen
                  name="Common.My.Settings.System_Units"
                  component={CommonMySettingsSystemUnitsScreen}
                  options={{ title: t('Common.My.Settings.System.Units') }}
                />
              </>
            )}
            {authStore.isUser() && (
              <Stack.Screen
                name="User.Tabs"
                component={UserTabBar}
                options={{
                  headerShown: false,
                  animation: 'simple_push',
                  animationTypeForReplace: 'push',
                  contentStyle: {
                    backgroundColor: themeStore.isDark() ? '#333333' : '#ffffff'
                  },
                  title: getUserTabTitleI18nText(tabStore.userCurrentTab)
                }}
              />
            )}
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
                title: t('Global:Screens.Settings.ElectricityRate.ElectricityRate')
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
                title: t('Global:Screens.Settings.ElectricityRate.Edit.Autofill')
              }}
            />
            <Stack.Screen
              name="SettingsElectricityRateStructureEditManual"
              component={SettingsElectricityRateStructureEditManualScreen}
              options={{
                title: t('Global:Screens.Settings.ElectricityRate.Edit.Manual')
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
                title: t('Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.NEM')
              }}
            />
            <Stack.Screen
              name="SettingsAddElectricityExportRateNet"
              component={SettingsAddElectricityExportRateNetScreen}
              options={{
                title: t('Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.Net')
              }}
            />
            <Stack.Screen
              name="SettingsAddElectricityExportRateGross"
              component={SettingsAddElectricityExportRateGrossScreen}
              options={{
                title: t('Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.Gross')
              }}
            />
            <Stack.Screen
              name="SettingsAddElectricityExportRateOther"
              component={SettingsAddElectricityExportRateOtherScreen}
              options={{
                title: t('Global:Screens.Settings.ElectricityRate.AddElectricityExportRate.Other')
              }}
            />
            <Stack.Screen
              name="SettingsConnectivity"
              component={SettingsConnectivityScreen}
              options={{ title: t('Global:Screens.Settings.Connectivity') }}
            />
            <Stack.Screen
              name="SettingsPerformance"
              component={SettingsPerformanceScreen}
              options={{ title: t('Global:Screens.Settings.Performance.Performance') }}
            />
            <Stack.Screen
              name="SettingsPerformanceEnergy"
              component={SettingsPerformanceEnergyScreen}
              options={{ title: t('Global:Screens.Settings.Performance.Energy') }}
            />
            <Stack.Screen
              name="SettingsPerformanceCurrency"
              component={SettingsPerformanceCurrencyScreen}
              options={{
                title: t('Global:Screens.Settings.Performance.Currency')
              }}
            />

            {/* Temp */}
            <Stack.Screen
              name="Temp.Dev_Menu"
              component={DevMenuScreen}
              options={{ title: t('Temp.Dev.Menu') }}
            />
            <Stack.Screen
              name="Temp.Demo"
              component={DemoScreen}
              options={{ title: t('Temp.Demo') }}
            />
            <Stack.Screen
              name="Temp.WebView_Demo"
              component={WebViewDemoScreen}
              options={{ title: t('Temp.WebView.Demo') }}
            />
            <Stack.Screen
              name="Temp.Image_Cache_Test"
              component={ImageCacheTestScreen}
              options={{ title: t('Temp.Image.Cache.Test') }}
            />
          </>
        ) : (
          <>
            {authStore.isLoading ? (
              <Stack.Screen
                name="Splash"
                component={AuthSplashScreen}
                options={{
                  headerShown: false
                }}
              />
            ) : (
              <Stack.Group>
                <Stack.Screen
                  name="Auth.Login"
                  component={AuthLoginScreen}
                  options={{
                    headerShown: false,
                    title: t('Auth.Login')
                  }}
                />
                <Stack.Screen
                  name="Auth.SignUp"
                  component={AuthSignUpScreen}
                  options={{
                    title: t('Auth.SignUp')
                  }}
                />
                <Stack.Screen
                  name="Auth.Forgot_Password"
                  component={AuthForgotPasswordScreen}
                  options={{
                    title: t('Auth.Forgot.Password')
                  }}
                />
              </Stack.Group>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
