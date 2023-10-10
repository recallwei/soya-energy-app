import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BarChart4, CloudLightning, Grid, Menu } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { View } from 'tamagui'

import {
  ArrayScreen,
  MenuScreen,
  StatisticsScreen,
  StatusScreen
} from '@/screens'
import { useTabsStore } from '@/store'
import { GlobalStyles } from '@/styles'
import type { TabParamList } from '@/types'

const Tab = createBottomTabNavigator<TabParamList>()

export default function BaseTabBar(): React.JSX.Element {
  const { t } = useTranslation(['Global'])

  const { changeTab } = useTabsStore()

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        headerTintColor: '#ffffff',
        headerBackTitleStyle: GlobalStyles.headerBackTitle,
        headerStyle: {
          backgroundColor: '#333333'
        },
        headerTitleStyle: GlobalStyles.headerTitle,
        tabBarLabelStyle: GlobalStyles.tabBarLabel,
        tabBarActiveTintColor: '#333333',
        tabBarInactiveTintColor: '#999999'
      })}
    >
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          headerTitle: t('Global:Screens.Status'),
          tabBarLabel: t('Global:Tabs.Status'),
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
          focus: () => changeTab('Status')
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          headerTitle: t('Global:Screens.Statistics'),
          tabBarLabel: t('Global:Tabs.Statistics'),
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
          focus: () => changeTab('Statistics')
        }}
      />
      <Tab.Screen
        name="Array"
        component={ArrayScreen}
        options={{
          headerTitle: t('Global:Screens.Array'),
          tabBarLabel: t('Global:Tabs.Array'),
          tabBarIcon: ({ color }) => (
            <View marginTop="$3">
              <Grid
                color={color}
                size={20}
              />
            </View>
          )
        }}
        listeners={{
          focus: () => changeTab('Array')
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerTitle: t('Global:Screens.Menu'),
          tabBarLabel: t('Global:Tabs.Menu'),
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
          focus: () => changeTab('Menu')
        }}
      />
    </Tab.Navigator>
  )
}
