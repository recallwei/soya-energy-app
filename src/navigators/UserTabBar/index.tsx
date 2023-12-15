import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, PieChart, ServerCrash, UserCircle2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { View } from 'tamagui'

import { globalStyles } from '@/constants'
import {
  CommonMyScreen,
  UserAnalysisScreen,
  UserBatteryScreen,
  UserDevicesScreen,
  UserHomeScreen
} from '@/screens'
import { useAuthStore, useTabsStore, useThemeStore } from '@/store'
import { SVG } from '@/svg'
import type { UserTabParamList } from '@/types'

const Tab = createBottomTabNavigator<UserTabParamList>()

export default function UserTabBar() {
  const { t } = useTranslation('Screen')
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
          fontSize: 12,
          fontFamily: 'Nunito-Regular'
        },
        tabBarStyle: {
          borderTopColor: themeStore.isDark() ? '#666666' : '#999999',
          backgroundColor: themeStore.getBgColor(),
          ...(Platform.OS === 'android' && { paddingBottom: 6 })
        },
        tabBarActiveTintColor: globalStyles.primaryColor,
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
          )
        })}
        listeners={{
          focus: () => tabStore.changeUserTab('User.Home')
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
              <ServerCrash
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
      <Tab.Screen
        name="User.Battery"
        component={UserBatteryScreen}
        options={{
          headerTitle: t('User.Tabs.Battery'),
          tabBarLabel: t('User.Tabs.Battery'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <SVG.BatteryVerticalHigh
                color={color}
                width={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => tabStore.changeUserTab('User.Battery')
        }}
      />
      <Tab.Screen
        name="User.Analysis"
        component={UserAnalysisScreen}
        options={{
          headerTitle: t('User.Tabs.Analysis'),
          tabBarLabel: t('User.Tabs.Analysis'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <PieChart
                color={color}
                size={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => tabStore.changeUserTab('User.Analysis')
        }}
      />
      {authStore.isUser() && (
        <Tab.Screen
          name="User.My"
          component={CommonMyScreen}
          options={{
            headerTitle: t('User.Tabs.My'),
            tabBarLabel: t('User.Tabs.My'),
            tabBarIcon: ({ color }) => (
              <View marginTop="$3">
                <UserCircle2
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
