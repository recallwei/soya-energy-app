import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { BarChart4, CloudLightning, Home, Menu, MoreHorizontal } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { View } from 'tamagui'

import type { SheetMenuListItem } from '@/components'
import { SheetMenu } from '@/components'
import { UserDevicesScreen, UserHomeScreen, UserMyScreen, UserStatisticsScreen } from '@/screens'
import { useAuthStore, useTabsStore, useThemeStore } from '@/store'
import type { UserTabParamList } from '@/types'

const Tab = createBottomTabNavigator<UserTabParamList>()

export default function UserTabBar() {
  const { t } = useTranslation('Screen')
  const authStore = useAuthStore()
  const tabStore = useTabsStore()
  const themeStore = useThemeStore()
  const { navigate } = useNavigation()

  const [homeSheetOpen, setHomeSheetOpen] = useState(false)

  const homeSheetMenuData: SheetMenuListItem[] = [
    {
      text: '天气',
      onPress: () => navigate('User.Home.Weather_Forecast_Settings')
    }
  ]

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: themeStore.getBgColor()
      }}
      screenOptions={() => ({
        headerShown: true,
        headerTintColor: themeStore.getTextColor(),
        headerBackTitle: '', // iOS only,
        headerBackTitleVisible: false,
        headerBackTitleStyle: {
          fontSize: 18,
          fontFamily: 'Nunito-Regular'
        },
        headerBackButtonMenuEnabled: true,
        headerStyle: {
          backgroundColor: themeStore.getBgColor(),
          shadowColor: themeStore.isDark() ? '#111111' : '#333333'
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
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'Nunito-Regular'
        },
        tabBarStyle: {
          borderTopColor: themeStore.isDark() ? '#666666' : '#999999',
          backgroundColor: themeStore.getBgColor()
        },
        tabBarActiveTintColor: themeStore.getTextColor(),
        tabBarInactiveTintColor: '#999999'
      })}
    >
      <Tab.Screen
        name="User.Home"
        component={UserHomeScreen}
        options={() => ({
          headerTitle: t('User.Tabs.Home'),
          tabBarLabel: t('User.Tabs.Home'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <Home
                color={color}
                size={20}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setHomeSheetOpen(true)}>
              <MoreHorizontal size="$1" />
              <SheetMenu
                open={homeSheetOpen}
                setOpen={setHomeSheetOpen}
                data={homeSheetMenuData}
                autoClose
              />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            paddingRight: 18
          }
        })}
        listeners={{
          focus: () => tabStore.changeUserTab('User.Home')
        }}
      />
      <Tab.Screen
        name="User.Statistics"
        component={UserStatisticsScreen}
        options={{
          headerTitle: t('User.Tabs.Statistics'),
          tabBarLabel: t('User.Tabs.Statistics'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <CloudLightning
                color={color}
                size={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => tabStore.changeUserTab('User.Statistics')
        }}
      />
      <Tab.Screen
        name="User.Devices"
        component={UserDevicesScreen}
        options={{
          headerTitle: t('User.Tabs.Devices'),
          tabBarLabel: t('User.Tabs.Devices'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <BarChart4
                color={color}
                size={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => tabStore.changeUserTab('User.Devices')
        }}
      />
      {/* Only show this tab when user role is `User` */}
      {authStore.isUser() && (
        <Tab.Screen
          name="User.My"
          component={UserMyScreen}
          options={{
            headerTitle: t('User.Tabs.My'),
            tabBarLabel: t('User.Tabs.My'),
            tabBarIcon: ({ color }) => (
              <View marginTop="$3">
                <Menu
                  color={color}
                  size={20}
                />
              </View>
            )
          }}
          listeners={{
            focus: () => tabStore.changeUserTab('User.My')
          }}
        />
      )}
    </Tab.Navigator>
  )
}
