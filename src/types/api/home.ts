export interface HomeStatistic {
  /**
   * 总装机量
   */
  totalInstalledCapacity?: number
  /**
   * 累计发电量
   */
  totalPowerGeneration?: number
  /**
   * 今日发电量
   */
  todayPowerGeneration?: number
  /**
   * 本月发电量
   */
  monthPowerGeneration?: number
  /**
   * 本年发电量
   */
  yearPowerGeneration?: number
}

export interface HomeDeviceStatistic {
  /**
   * 告警/放电中
   */
  alarm?: number
  /**
   * 正常/充电中
   */
  normal?: number
  /**
   * 离线
   */
  offline?: number
  /**
   * 总数
   */
  total?: number
  /**
   * 未监控/待机
   */
  unmonitored?: number
  /**
   * 正常运行率（前端计算）
   */
  normalRate?: number
  /**
   * 告警率（前端计算）
   */
  alarmRate?: number
  /**
   * 离线率（前端计算）
   */
  offlineRate?: number
  /**
   * 未监控率（前端计算）
   */
  unmonitoredRate?: number

  id: string
  url: string
}
