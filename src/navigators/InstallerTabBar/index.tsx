import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Compass, GanttChartSquare, Home, LayoutGrid, UserCircle2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { View } from 'tamagui'

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
  const { t } = useTranslation(['Global'])

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
          backgroundColor: themeStore.getBgColor()
        },
        tabBarActiveTintColor: themeStore.getTextColor(),
        tabBarInactiveTintColor: '#999999'
      })}
    >
      <Tab.Screen
        name="Installer.Home"
        component={InstallerHomeScreen}
        options={{
          headerTitle: t('Global:Installer.Tabs.Home'),
          tabBarLabel: t('Global:Installer.Tabs.Home'),
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
          headerTitle: t('Global:Installer.Tabs.Management'),
          tabBarLabel: t('Global:Installer.Tabs.Management'),
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
          focus: () => tabStore.changeInstallerTab('Installer.Management')
        }}
      />
      <Tab.Screen
        name="Installer.Services"
        component={InstallerServicesScreen}
        options={{
          headerTitle: t('Global:Installer.Tabs.Services'),
          tabBarLabel: t('Global:Installer.Tabs.Services'),
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
          headerTitle: t('Global:Installer.Tabs.Guide'),
          tabBarLabel: t('Global:Installer.Tabs.Guide'),
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
          headerTitle: t('Global:Installer.Tabs.My'),
          tabBarLabel: t('Global:Installer.Tabs.My'),
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
