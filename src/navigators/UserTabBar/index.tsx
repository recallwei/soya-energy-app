import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BarChart4, CloudLightning, Home, Menu } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { View } from 'tamagui'

import { UserDevicesScreen, UserHomeScreen, UserMyScreen, UserStatisticsScreen } from '@/screens'
import { useAuthStore, useTabsStore, useThemeStore } from '@/store'
import type { UserTabParamList } from '@/types'

const Tab = createBottomTabNavigator<UserTabParamList>()

export default function UserTabBar() {
  const { t } = useTranslation(['Global'])

  const authStore = useAuthStore()
  const tabStore = useTabsStore()
  const themeStore = useThemeStore()

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: themeStore.getBgColor()
      }}
      screenOptions={() => ({
        headerShown: false,
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
        options={{
          headerTitle: t('Global:User.Tabs.Home'),
          tabBarLabel: t('Global:User.Tabs.Home'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <Home
                color={color}
                size={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => tabStore.changeUserTab('User.Home')
        }}
      />
      <Tab.Screen
        name="User.Statistics"
        component={UserStatisticsScreen}
        options={{
          headerTitle: t('Global:User.Tabs.Statistics'),
          tabBarLabel: t('Global:User.Tabs.Statistics'),
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
          headerTitle: t('Global:User.Tabs.Devices'),
          tabBarLabel: t('Global:User.Tabs.Devices'),
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
            headerTitle: t('Global:User.Tabs.My'),
            tabBarLabel: t('Global:User.Tabs.My'),
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
