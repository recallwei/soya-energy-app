import { useQueries } from '@tanstack/react-query'
import { isNaN, toNumber } from 'lodash'

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
            normalRate: getRate(normal, total),
            alarmRate: getRate(alarm, total),
            unmonitoredRate: getRate(unmonitored, total),
            offlineRate: getRate(offline, total),
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
            normalRate: getRate(normal, total),
            alarmRate: getRate(alarm, total),
            unmonitoredRate: getRate(unmonitored, total),
            offlineRate: getRate(offline, total),
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
            normalRate: getRate(normal, total),
            alarmRate: getRate(alarm, total),
            unmonitoredRate: getRate(unmonitored, total),
            offlineRate: getRate(offline, total),
            url: SYSTEM_RESOURCE.BATTERY_DEFAULT_IMAGE_URL
          }
        }
      }
    ]
  })

  function getRate(value?: number | string, total?: number | string) {
    const rate = (toNumber(value) / toNumber(total)) * 100
    if (isNaN(rate)) {
      return 0
    }
    return toNumber(rate.toFixed(1))
  }

  return {
    statisticData: (results.map((result) => result.data) || []) as HomeDeviceStatistic[]
  }
}
