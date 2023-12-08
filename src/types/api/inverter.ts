import type { BasePageModel } from '.'

export interface Inverter {
  /**
   * 创建时间
   */
  createTime?: Date
  /**
   * 设备别名
   */
  deviceAlias?: string
  /**
   * 设备ID
   */
  deviceId?: number
  /**
   * 设备型号
   */
  deviceModel?: string
  /**
   * 设备序列号
   */
  deviceSN?: string
  /**
   * 主键
   */
  id?: string
  /**
   * 电站名称
   */
  plantName?: string
  /**
   * 当前功率-额外
   */
  power?: number
  /**
   * 设备额度功率
   */
  ratedPower?: number
  /**
   * 逆变器状态:(1:正常 2:告警 3:离线 4:未监控)
   */
  status?: string
  /**
   * 当日发电-额外
   */
  todayPower?: number
  /**
   * 累计发电-额外
   */
  totalPower?: number
  /**
   * 逆变器类型[0并网，1储能，3交流耦合]
   */
  type?: string
  /**
   * 质保日期-额外
   */
  warrantyDate?: number
  /**
   * 图片
   */
  projectPic?: string
}

export interface InverterPageModel extends BasePageModel {
  status?: string
}
