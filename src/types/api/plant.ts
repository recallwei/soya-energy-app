import type { BasePageModel } from './axios'

export interface Plant {
  /**
   * 详细地址
   */
  address?: string
  /**
   * 安装商名称-额外
   */
  clientName?: string
  /**
   * 创建时间
   */
  createTime?: Date
  /**
   * 主键id
   */
  id: string
  /**
   * 离线时间-额外
   */
  offlineTime?: string
  /**
   * 上线时间-额外
   */
  onlineTime?: string
  /**
   * 电站名称
   */
  plantName?: string
  /**
   * 电站编码
   */
  plantNo?: string
  /**
   * 电站UID
   */
  plantUid?: string
  /**
   * 电站功率-额外
   */
  power?: number
  /**
   * 电站状态[1:正常 2:告警 3:离线 4:未监控 5:部分离线]
   */
  status?: string
  /**
   * 电站装机容量
   */
  systemPower?: string
  /**
   * 当日发电量-额外
   */
  todayPower?: number
  /**
   * 累计发电量-额外
   */
  totalPower?: number
  /**
   * 电站类型[0:并网 1:储能 3:交流耦合]
   */
  type?: string
  /**
   * 业主名称-额外
   */
  userName?: string
  /**
   * 图片
   */
  projectPic?: string
}

export interface PlantPageModel extends BasePageModel {
  status?: string
}
