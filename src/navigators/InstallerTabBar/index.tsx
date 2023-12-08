import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Compass, GanttChartSquare, Home, LayoutGrid, UserCircle2 } from '@tamagui/lucide-icons'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { View } from 'tamagui'

import { PlantAPI } from '@/api'
import {
  InstallerGuideScreen,
  InstallerHomeScreen,
  InstallerManagementScreen,
  InstallerMyScreen,
  InstallerServicesScreen
} from '@/screens'
import { useTabsStore, useThemeStore } from '@/store'
import type { InstallerTabParamList } from '@/types'

const Tab = createBottomTabNavigator<InstallerTabParamList>()

export default function InstallerTabBar() {
  const { t } = useTranslation('Screen')
  const queryClient = useQueryClient()
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
          paddingBottom: Platform.select({
            android: 6
          })
        },
        tabBarActiveTintColor: themeStore.getTextColor(),
        tabBarInactiveTintColor: '#999999'
      })}
    >
      <Tab.Screen
        name="Installer.Home"
        component={InstallerHomeScreen}
        options={{
          headerTitle: t('Installer.Tabs.Home'),
          tabBarLabel: t('Installer.Tabs.Home'),
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
          focus: () => tabStore.changeInstallerTab('Installer.Home')
        }}
      />
      <Tab.Screen
        name="Installer.Management"
        component={InstallerManagementScreen}
        options={{
          headerTitle: t('Installer.Tabs.Management'),
          tabBarLabel: t('Installer.Tabs.Management'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <GanttChartSquare
                color={color}
                size={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => {
            tabStore.changeInstallerTab('Installer.Management')
            queryClient.invalidateQueries({
              queryKey: [PlantAPI.LIST_QUERY_KEY]
            })
          }
        }}
      />
      <Tab.Screen
        name="Installer.Services"
        component={InstallerServicesScreen}
        options={{
          headerTitle: t('Installer.Tabs.Services'),
          tabBarLabel: t('Installer.Tabs.Services'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <LayoutGrid
                color={color}
                size={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => tabStore.changeInstallerTab('Installer.Services')
        }}
      />
      <Tab.Screen
        name="Installer.Guide"
        component={InstallerGuideScreen}
        options={{
          headerTitle: t('Installer.Tabs.Guide'),
          tabBarLabel: t('Installer.Tabs.Guide'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <Compass
                color={color}
                size={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => tabStore.changeInstallerTab('Installer.Guide')
        }}
      />
      <Tab.Screen
        name="Installer.My"
        component={InstallerMyScreen}
        options={{
          headerTitle: t('Installer.Tabs.My'),
          tabBarLabel: t('Installer.Tabs.My'),
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
          focus: () => tabStore.changeInstallerTab('Installer.My')
        }}
      />
    </Tab.Navigator>
  )
}
