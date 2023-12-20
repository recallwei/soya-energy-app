import type { BasePageModel } from '.'

export interface Inverter {
  /**
   * 安装商名称
   */
  clientName?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 设备别名
   */
  deviceAlias?: string
  /**
   * 接入组件功率
   */
  deviceComponentPower?: string
  /**
   * 设备ID
   */
  deviceId?: string
  /**
   * 设备型号
   */
  deviceModel?: string
  /**
   * 设备序列号
   */
  deviceSN?: string
  /**
   * 机器类型：[0并网，1储能，3交流耦合]
   */
  deviceType?: string
  /**
   * 显示板软件版本
   */
  dfw?: string
  /**
   * 主键
   */
  id?: string
  /**
   * Inverter PC code
   */
  invPC?: string
  /**
   * 主机软件版本
   */
  mfw?: string
  /**
   * 模块SN
   */
  moduleSN?: string
  /**
   * 站点ID
   */
  plantId?: string
  /**
   * 站点名称
   */
  plantName?: string
  /**
   * 当前功率
   */
  power?: string
  /**
   * 额定功率
   */
  ratedPower?: number
  /**
   * 从机软件版本
   */
  sfw?: string
  /**
   * 状态 1:正常 2:告警 3:离线 4:未监控
   */
  status?: string
  /**
   * 当日发电
   */
  todayPower?: number
  /**
   * 累计发电
   */
  totalPower?: number
  /**
   * 业主名称
   */
  userName?: string
  /**
   * 质保日期
   */
  warrantyDate?: string
  /**
   * 图片
   */
  projectPic?: string
}

export interface InverterPageModel extends BasePageModel {
  status?: string
  order?: string
  inverterType?: string
  ratePowerMin?: string
  ratePowerMax?: string
}

export interface InverterEditModel {
  id: string
  deviceComponentPower: string
  deviceAlias?: string
}

export interface InverterCreateModel {
  plantId: string
  deviceSN: string
  deviceComponentPower: string
  deviceAlias?: string
}
