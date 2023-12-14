import type { BasePageModel } from '.'

export interface Device {
  /**
   * 电池工作状态 [1:旁路]
   */
  batStatus?: string
  /**
   * device_sn
   */
  deviceSN?: string
  /**
   * id
   */
  id: string
  /**
   * 当前功率
   */
  power?: number
  /**
   * 额定功率
   */
  ratedPower?: number
  /**
   * 电池soc
   */
  soc?: number
  /**
   * 设备状态:状态 1:正常 2:告警 3:离线 4:未监控
   */
  status?: number
  /**
   * 今日发电量
   */
  todayPower?: number
  /**
   * 累计发电量
   */
  totalPower?: number
  /**
   * 设备类型 [1:逆变器 2:电池]
   */
  type?: string
  /**
   * 质保日期
   */
  warrantyDate?: Date
}

export interface DevicePageModel extends BasePageModel {
  id: string
}
