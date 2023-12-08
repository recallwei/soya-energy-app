import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BellRing, MoreHorizontal, PlusCircle, Settings } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { SizableText, XStack } from 'tamagui'

import { InstallerTabBar, UserTabBar } from '@/navigators'
import {
  AuthForgotPasswordScreen,
  AuthLoginScreen,
  AuthSignUpScreen,
  AuthSignUpSelectRoleScreen,
  AuthSplashScreen,
  CommonInverterDetailScreen,
  CommonMessageDetailScreen,
  CommonMessageListScreen,
  CommonMessageScreen,
  CommonMyAboutUsScreen,
  CommonMyPersonalInfoCountryPickerScreen,
  CommonMyPersonalInfoEditScreen,
  CommonMyPersonalInfoScreen,
  CommonMyPrivacyManagementAgreementAndPolicyPrivacyPolicyScreen,
  CommonMyPrivacyManagementAgreementAndPolicyScreen,
  CommonMyPrivacyManagementEmailPushScreen,
  CommonMyPrivacyManagementPushNoticeScreen,
  CommonMyPrivacyManagementScreen,
  CommonMyPrivacyManagementSystemPermissionScreen,
  CommonMySettingsCancelAccountScreen,
  CommonMySettingsScreen,
  CommonMySettingsSystemUnitsScreen,
  CommonPlantCreateFormScreen,
  CommonPlantCreateScanSNScreen,
  CommonPlantDetailScreen,
  CommonPlantEditScreen,
  DemoScreen,
  DevMenuScreen,
  ImageCacheTestScreen,
  ImagePicker,
  UserDevicesBatteryDetailScreen,
  UserDevicesInvertorDetailScreen,
  UserHomeSelectLocationScreen,
  UserHomeWeatherForecastSettingsScreen,
  UserPlantManagementScreen,
  WebViewDemoScreen
} from '@/screens'
import { useAuthStore, usePlantStore, useTabsStore, useThemeStore } from '@/store'
import type { InstallerTabParamList, RootStackParamList, UserTabParamList } from '@/types'

import type { SheetMenuListItem } from './components'
import { DropDownMenu, SheetMenu } from './components'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  const { t } = useTranslation(['Screen', 'Global'])

  const authStore = useAuthStore()
  const tabStore = useTabsStore()
  const themeStore = useThemeStore()
  const plantStore = usePlantStore()

  const [homePlantSheetOpen, setHomePlantSheetOpen] = useState(false)
  const [homeSheetOpen, setHomeSheetOpen] = useState(false)

  const getHomeSheetMenuData = (navigation: any): SheetMenuListItem[] => [
    { text: '天气', onPress: () => navigation.navigate('User.Home.Weather_Forecast_Settings') },
    { text: '管理', onPress: () => navigation.navigate('Common.Plant.Detail') },
    { text: '电站月报', onPress: () => navigation.navigate('Common.Plant.Detail') },
    { text: '电站视图', onPress: () => navigation.navigate('Common.Plant.Detail') },
    { text: '电站地图', onPress: () => navigation.navigate('Common.Plant.Detail') },
    { text: '分享', onPress: () => navigation.navigate('Common.Plant.Detail') }
  ]

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
      case 'User.Devices':
        return t('User.Tabs.Devices')
      case 'User.Battery':
        return t('User.Tabs.Battery')
      case 'User.Analysis':
        return t('User.Tabs.Analysis')
      case 'User.My':
        return t('User.Tabs.My')
      default:
        return ''
    }
  }

  return (
    <NavigationContainer theme={DefaultTheme}>
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
          animationTypeForReplace: 'pop',
          headerTitleAlign: 'center'
        }}
      >
        {authStore.isLoading ? (
          <Stack.Screen
            name="Splash"
            component={AuthSplashScreen}
            options={{
              headerShown: false
            }}
          />
        ) : (
          <>
            {!authStore.isLogin ? (
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
                  name="Auth.SignUp.SelectRole"
                  component={AuthSignUpSelectRoleScreen}
                  options={{
                    title: t('Auth.SignUp.Select.Role')
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
            ) : (
              <>
                {authStore.isInstaller() && (
                  <Stack.Screen
                    name="Installer.Tabs"
                    component={InstallerTabBar}
                    options={{
                      headerShown: false,
                      title: getInstallerTabTitleI18nText(tabStore.installerCurrentTab)
                    }}
                  />
                )}
                <Stack.Screen
                  name="User.Tabs"
                  component={UserTabBar}
                  options={({ navigation }) => ({
                    headerShown: true,
                    title: getUserTabTitleI18nText(tabStore.userCurrentTab),
                    headerTitle: () => {
                      switch (tabStore.userCurrentTab) {
                        case 'User.Home':
                          return (
                            <DropDownMenu
                              text={plantStore.currentPlant.plantName}
                              sheetMenu={{
                                sheet: {
                                  open: homePlantSheetOpen,
                                  setOpen: setHomePlantSheetOpen,
                                  scrollable: true
                                },
                                footer: (
                                  <XStack justifyContent="space-between">
                                    <TouchableOpacity
                                      onPress={() => {
                                        navigation.navigate('Common.Plant.Create.Scan_SN')
                                        setHomePlantSheetOpen(false)
                                      }}
                                    >
                                      <XStack
                                        alignItems="center"
                                        space="$2"
                                      >
                                        <PlusCircle size="$1" />
                                        <SizableText>添加</SizableText>
                                      </XStack>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={() => {
                                        navigation.navigate('User.Plant.Management')
                                        setHomePlantSheetOpen(false)
                                      }}
                                    >
                                      <XStack
                                        alignItems="center"
                                        space="$2"
                                      >
                                        <SizableText>管理</SizableText>
                                        <Settings size="$1" />
                                      </XStack>
                                    </TouchableOpacity>
                                  </XStack>
                                ),
                                data: plantStore.plantList.map<SheetMenuListItem>((item) => ({
                                  text: item.plantName,
                                  value: item.id,
                                  onPress: () => plantStore.setCurrentPlant(item)
                                }))
                              }}
                            />
                          )
                        case 'User.Devices':
                        case 'User.Battery':
                        case 'User.Analysis':
                        case 'User.My':
                          return (
                            <SizableText>
                              {getUserTabTitleI18nText(tabStore.userCurrentTab)}
                            </SizableText>
                          )
                        default:
                          return null
                      }
                    },
                    headerRight: () => {
                      switch (tabStore.userCurrentTab) {
                        case 'User.Home':
                          return (
                            <XStack space="$3">
                              {authStore.isUser() && (
                                <TouchableOpacity
                                  onPress={() => navigation.navigate('Common.Message')}
                                >
                                  <BellRing size="$1" />
                                </TouchableOpacity>
                              )}
                              <TouchableOpacity onPress={() => setHomeSheetOpen(true)}>
                                <MoreHorizontal size="$1" />
                                <SheetMenu
                                  data={getHomeSheetMenuData(navigation)}
                                  sheet={{
                                    open: homeSheetOpen,
                                    setOpen: setHomeSheetOpen
                                  }}
                                  autoClose
                                />
                              </TouchableOpacity>
                            </XStack>
                          )
                        default:
                          return null
                      }
                    }
                  })}
                />
                <Stack.Screen
                  name="Common.Message"
                  component={CommonMessageScreen}
                  options={({ navigation }) => ({
                    title: t('Common.Message'),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Common.My.Privacy_Management.Push_Notice')
                        }
                      >
                        <Settings size="$1" />
                      </TouchableOpacity>
                    )
                  })}
                />
                <Stack.Screen
                  name="Common.Message.List"
                  component={CommonMessageListScreen}
                  options={{ title: t('Common.Message.List') }}
                />
                <Stack.Screen
                  name="Common.Message.Detail"
                  component={CommonMessageDetailScreen}
                  options={{ title: t('Common.Message.Detail') }}
                />
                <Stack.Screen
                  name="Common.Plant.Detail"
                  component={CommonPlantDetailScreen}
                  options={{ title: t('Common.Plant.Detail') }}
                />
                <Stack.Screen
                  name="Common.Plant.Create.Scan_SN"
                  component={CommonPlantCreateScanSNScreen}
                  options={{ title: t('Common.Plant.Create.Scan.SN') }}
                />
                <Stack.Screen
                  name="Common.Plant.Create.Form"
                  component={CommonPlantCreateFormScreen}
                  options={{ title: t('Common.Plant.Create.Form') }}
                />
                <Stack.Screen
                  name="Common.Plant.Edit"
                  component={CommonPlantEditScreen}
                  options={{ title: t('Common.Plant.Edit') }}
                />
                <Stack.Screen
                  name="Common.Inverter.Detail"
                  component={CommonInverterDetailScreen}
                  options={{ title: t('Common.Inverter.Detail') }}
                />
                <Stack.Screen
                  name="Common.My.Privacy_Management"
                  component={CommonMyPrivacyManagementScreen}
                  options={{ title: t('Common.My.Privacy.Management') }}
                />
                <Stack.Screen
                  name="Common.My.Privacy_Management.Agreement_And_Policy"
                  component={CommonMyPrivacyManagementAgreementAndPolicyScreen}
                  options={{ title: t('Common.My.Privacy.Management.Agreement.And.Policy') }}
                />
                <Stack.Screen
                  name="Common.My.Privacy_Management.Agreement_And_Policy.Privacy_Policy"
                  component={CommonMyPrivacyManagementAgreementAndPolicyPrivacyPolicyScreen}
                  options={{
                    title: t('Common.My.Privacy.Management.Agreement.And.Policy.Privacy.Policy')
                  }}
                />
                <Stack.Screen
                  name="Common.My.Privacy_Management.System_Permission"
                  component={CommonMyPrivacyManagementSystemPermissionScreen}
                  options={{ title: t('Common.My.Privacy.Management.System.Permission') }}
                />
                <Stack.Screen
                  name="Common.My.Privacy_Management.Email_Push"
                  component={CommonMyPrivacyManagementEmailPushScreen}
                  options={{ title: t('Common.My.Privacy.Management.Email.Push') }}
                />
                <Stack.Screen
                  name="Common.My.Privacy_Management.Push_Notice"
                  component={CommonMyPrivacyManagementPushNoticeScreen}
                  options={{ title: t('Common.My.Privacy.Management.Push.Notice') }}
                />
                <Stack.Screen
                  name="Common.My.About_Us"
                  component={CommonMyAboutUsScreen}
                  options={{ title: t('Common.My.About.Us') }}
                />
                <Stack.Screen
                  name="Common.My.Settings"
                  component={CommonMySettingsScreen}
                  options={{ title: t('Common.My.Settings') }}
                />
                <Stack.Screen
                  name="Common.My.Personal_Info"
                  component={CommonMyPersonalInfoScreen}
                  options={{ title: t('Common.My.Personal.Info') }}
                />
                <Stack.Screen
                  name="Common.My.Personal_Info.Edit"
                  component={CommonMyPersonalInfoEditScreen}
                  options={{ title: t('Common.My.Personal.Info.Edit') }}
                />
                <Stack.Screen
                  name="Common.My.Personal_Info.Country_Picker"
                  component={CommonMyPersonalInfoCountryPickerScreen}
                  options={{ title: t('Common.My.Personal.Info.Country.Picker') }}
                />
                <Stack.Screen
                  name="Common.My.Settings.System_Units"
                  component={CommonMySettingsSystemUnitsScreen}
                  options={{ title: t('Common.My.Settings.System.Units') }}
                />
                <Stack.Screen
                  name="Common.My.Settings.Cancel_Account"
                  component={CommonMySettingsCancelAccountScreen}
                  options={{ title: t('Common.My.Settings.Cancel.Account') }}
                />
                <Stack.Screen
                  name="User.Home.Weather_Forecast_Settings"
                  component={UserHomeWeatherForecastSettingsScreen}
                  options={{ title: t('User.Home.Weather.Forecast.Settings') }}
                />
                <Stack.Screen
                  name="User.Home.Select_Location"
                  component={UserHomeSelectLocationScreen}
                  options={{ title: t('User.Home.Select.Location') }}
                />
                <Stack.Screen
                  name="User.Plant.Management"
                  component={UserPlantManagementScreen}
                  options={{ title: t('User.Plant.Management') }}
                />
                <Stack.Screen
                  name="User.Devices.Invertor_Detail"
                  component={UserDevicesInvertorDetailScreen}
                  options={{ title: t('User.Devices.Inverter.Detail') }}
                />
                <Stack.Screen
                  name="User.Devices.Battery_Detail"
                  component={UserDevicesBatteryDetailScreen}
                  options={{ title: t('User.Devices.Battery.Detail') }}
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
                <Stack.Screen
                  name="Temp.Image_Picker"
                  component={ImagePicker}
                  options={{ title: t('Temp.Image.Picker') }}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
