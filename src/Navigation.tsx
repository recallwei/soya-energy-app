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
  ChartsScreen,
  ForgotPasswordScreen,
  I18nScreen,
  LiveStatusScreen,
  LoginScreen,
  SignUpScreen,
  SplashScreen
} from '@/screens'
import { useAuthStore, useTabsStore } from '@/store'
import { GlobalStyles } from '@/styles'
import type { HomeTabParamList, RootStackParamList } from '@/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation(): React.JSX.Element {
  const { isLogin, isLoading, loaded } = useAuthStore()
  const { currentTab } = useTabsStore()
  const { t } = useTranslation()

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
        return t('Tabs.Status')
      case 'Statistics':
        return t('Tabs.Statistics')
      case 'Array':
        return t('Tabs.Array')
      case 'Menu':
        return t('Tabs.Menu')
      default:
        return t('Tabs.Status')
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
                  title: 'Live Status'
                }}
              />

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
                  statusBarColor: '#ffffff'
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  headerShown: false,
                  statusBarStyle: 'dark',
                  statusBarColor: '#ffffff'
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                  headerShown: false,
                  statusBarStyle: 'dark',
                  statusBarColor: '#ffffff'
                }}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
