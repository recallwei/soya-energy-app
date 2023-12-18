import { useQueries } from '@tanstack/react-query'

import { HomeAPI } from '@/api'
import { SYSTEM_RESOURCE } from '@/constants'
import type { HomeDeviceStatistic, R } from '@/types'

import { DeviceType } from '../enums'

export const useHomeDeviceStatisticQuery = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: [HomeAPI.DEVICE_STATISTIC_QUERY_KEY, DeviceType.PLANT],
        queryFn: () => HomeAPI.deviceStatistic(DeviceType.PLANT),
        select: (data: R<HomeDeviceStatistic>) => {
          const { normal, total, alarm, offline, unmonitored } = data.data
          return {
            id: DeviceType.PLANT,
            normal,
            alarm,
            offline,
            unmonitored,
            total,
            normalRate: normal && total ? Number((normal / total) * 100).toFixed(1) : 0,
            alarmRate: alarm && total ? Number((alarm / total) * 100).toFixed(1) : 0,
            unmonitoredRate:
              unmonitored && total ? Number((unmonitored / total) * 100).toFixed(1) : 0,
            offlineRate: offline && total ? Number((offline / total) * 100).toFixed(1) : 0,
            url: SYSTEM_RESOURCE.PLANT_DEFAULT_IMAGE_URL
          }
        }
      },
      {
        queryKey: [HomeAPI.DEVICE_STATISTIC_QUERY_KEY, DeviceType.INVERTER],
        queryFn: () => HomeAPI.deviceStatistic(DeviceType.INVERTER),
        select: (data: R<HomeDeviceStatistic>) => {
          const { normal, total, alarm, offline, unmonitored } = data.data
          return {
            id: DeviceType.INVERTER,
            normal,
            alarm,
            offline,
            unmonitored,
            total,
            normalRate: normal && total ? Number((normal / total) * 100).toFixed(1) : 0,
            alarmRate: alarm && total ? Number((alarm / total) * 100).toFixed(1) : 0,
            unmonitoredRate:
              unmonitored && total ? Number((unmonitored / total) * 100).toFixed(1) : 0,
            offlineRate: offline && total ? Number((offline / total) * 100).toFixed(1) : 0,
            url: SYSTEM_RESOURCE.INVERTER_DEFAULT_IMAGE_URL
          }
        }
      },
      {
        queryKey: [HomeAPI.DEVICE_STATISTIC_QUERY_KEY, DeviceType.BATTERY],
        queryFn: () => HomeAPI.deviceStatistic(DeviceType.BATTERY),
        select: (data: R<HomeDeviceStatistic>) => {
          const { normal, total, alarm, offline, unmonitored } = data.data
          return {
            id: DeviceType.BATTERY,
            normal,
            alarm,
            offline,
            unmonitored,
            total,
            normalRate: normal && total ? Number((normal / total) * 100).toFixed(1) : 0,
            alarmRate: alarm && total ? Number((alarm / total) * 100).toFixed(1) : 0,
            unmonitoredRate:
              unmonitored && total ? Number((unmonitored / total) * 100).toFixed(1) : 0,
            offlineRate: offline && total ? Number((offline / total) * 100).toFixed(1) : 0,
            url: SYSTEM_RESOURCE.BATTERY_DEFAULT_IMAGE_URL
          }
        }
      }
    ]
  })

  return {
    statisticData: (results.map((result) => result.data) ?? []) as HomeDeviceStatistic[]
  }
}
