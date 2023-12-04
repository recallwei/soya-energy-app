import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { ScrollView, YStack } from 'tamagui'
import { useImmer } from 'use-immer'

import { MenuItemCard } from '@/components'
import { ToastUtils } from '@/utils'

interface LocationInfo {
  latitude: number | null
  longitude: number | null
  altitude: number | null
}

export default function Screen() {
  const { navigate } = useNavigation()

  const [locationInfo, setLocationInfo] = useImmer<LocationInfo>({
    latitude: null, // 纬度
    longitude: null, // 经度
    altitude: null // 海拔
  })

  useEffect(() => handleGetLocation(), [])

  function handleGetLocation() {
    Geolocation.getCurrentPosition(
      (res) => {
        const { coords } = res
        const { latitude, longitude, altitude } = coords
        setLocationInfo((draft) => {
          draft.latitude = latitude
          draft.longitude = longitude
          draft.altitude = altitude
        })
        ToastUtils.success({ message: '已更新最新的位置信息' })
      },
      () => {
        ToastUtils.error({ message: '获取位置信息失败' })
        setLocationInfo((draft) => {
          draft.latitude = null
          draft.longitude = null
          draft.altitude = null
        })
        Geolocation.requestAuthorization(
          () => ToastUtils.success({ message: '授权位置信息成功' }),
          () => ToastUtils.error({ message: '授权位置信息失败' })
        )
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  function getLocation(latitude: number | null, longitude: number | null) {
    let latitudeExpress = ''
    let longitudeExpress = ''
    if (!latitude) {
      latitudeExpress = '0'
    } else if (latitude > 0) {
      latitudeExpress = `${latitude.toFixed(6)}°N`
    } else if (latitude < 0) {
      latitudeExpress = `${latitude.toFixed(6)}°S`
    }
    if (!longitude) {
      longitudeExpress = '0'
    } else if (longitude > 0) {
      longitudeExpress = `${longitude.toFixed(6)}°E`
    } else if (longitude < 0) {
      longitudeExpress = `${longitude.toFixed(6)}°W`
    }
    return `${latitudeExpress}, ${longitudeExpress}`
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title="天气预报"
          switcher
        />
        <MenuItemCard
          title="电站位置"
          description={getLocation(locationInfo.latitude, locationInfo.longitude)}
          onPress={() =>
            navigate('User.Home.Select_Location', {
              latitude: locationInfo.latitude ?? 0,
              longitude: locationInfo.longitude ?? 0
            })
          }
        />
        <MenuItemCard
          title="获取位置"
          onPress={() => handleGetLocation()}
        />
      </YStack>
    </ScrollView>
  )
}
