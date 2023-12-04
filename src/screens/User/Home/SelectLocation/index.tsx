import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useImmer } from 'use-immer'

import type { RouteProp } from '@/types'

interface LocationInfo {
  latitude: number
  longitude: number
}
export default function Screen() {
  const route = useRoute<RouteProp<'User.Home.Select_Location'>>()

  const [locationInfo, setLocationInfo] = useImmer<LocationInfo>({
    latitude: 0, // 纬度
    longitude: 0 // 经度
  })

  useEffect(
    () =>
      setLocationInfo((draft) => {
        draft.latitude = route.params.latitude
        draft.longitude = route.params.longitude
      }),
    [route.params.latitude, route.params.longitude]
  )

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={{
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }}
      onRegionChange={() => {}}
      onRegionChangeComplete={() => {}}
    >
      <Marker
        draggable
        coordinate={{ latitude: locationInfo.latitude, longitude: locationInfo.longitude }}
        onDragEnd={(e) =>
          setLocationInfo((draft) => {
            if (!e.nativeEvent?.coordinate) return
            const { latitude, longitude } = e.nativeEvent.coordinate
            draft.latitude = latitude
            draft.longitude = longitude
          })
        }
        title="当前位置"
        description="xxxxxxxx"
      />
    </MapView>
  )
}
