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
  order?: string
  displayRange?: string
  loadingMonitoring?: string
  plantType?: string
  others?: string
  systemPowerMax?: string
  systemPowerMin?: string
}

export interface CreatePlantModel {
  /**
   * 详细地址
   */
  address?: string
  /**
   * 城市名
   */
  city?: string
  /**
   * 城市编码
   */
  cityCode?: string
  /**
   * 国家名称
   */
  country?: string
  /**
   * 国家编码
   */
  countryCode?: string
  /**
   * 区/县名称
   */
  county?: string
  /**
   * 区/县编码
   */
  countyCode?: string
  /**
   * 完整地址
   */
  fullAddress?: string
  /**
   * 逆变器器SN
   */
  inverterSn?: string
  /**
   * 纬度
   */
  latitude?: number
  /**
   * 经度
   */
  longitude?: number
  /**
   * 电表序列号NMI
   */
  meterId?: string
  /**
   * 组件数量
   */
  moduleNum?: string
  /**
   * 电站名称
   */
  plantName?: string
  /**
   * 电站编码
   */
  plantNo?: string
  /**
   * 电站图片
   */
  projectPic?: string
  /**
   * 省份名称
   */
  province?: string
  /**
   * 省份编码
   */
  provinceCode?: string
  /**
   * 光伏板倾角，单位°
   */
  pvPanelAngle?: string
  /**
   * 光伏板方位角，单位°
   */
  pvPanelAzimuth?: string
  /**
   * 街道/镇名称
   */
  street?: string
  /**
   * 街道类型
   */
  streetType?: string
  /**
   * 电站装机容量
   */
  systemPower?: string
  /**
   * 时区ID
   */
  timeZone?: string
  /**
   * 时区名称
   */
  timeZoneName?: string
  /**
   * 电站类型，0并网，1储能，3交流耦合
   */
  type?: string
  /**
   * 邮政编码
   */
  zipCode?: string
  /**
   * 用户 ID：代建电站时使用
   */
  userId?: string
}
