import type { BasePageModel } from '.'

export interface Battery {
  id: string
  /**
   * 电池连接类型 [1:内置 2:扩展]
   */
  connectionType?: number
  /**
   * bms(bat) 电池电流
   */
  current?: string
  /**
   * 当前时间
   */
  currentTime?: string
  /**
   * bms(bat) 循环次数
   */
  cycleCount?: string
  /**
   * 电池 SN
   */
  deviceSN?: string
  /**
   * 硬件版本
   */
  hdVersion?: string
  /**
   * 电池健康状态
   */
  healthStatus?: string
  /**
   * 逆变器 SN
   */
  inverterSN?: string
  /**
   * 电站 ID
   */
  plantId?: string
  /**
   * 电站名称
   */
  plantName?: string
  /**
   * bms(bat) SOC
   */
  soc?: string
  /**
   * 电池状态 [1:充电中 2:放电中 3:待机 4:离线]
   */
  status?: string
  /**
   * 软件版本
   */
  swVersion?: string
  /**
   * bms(bat) 电池温度
   */
  temperature?: string
  /**
   * 电控电表类型 [1:bms 2:bat]
   */
  type?: string
  /**
   * bms(bat) 电池电压
   */
  voltage?: string
  projectPic?: string
}

export interface BatteryPageModel extends BasePageModel {
  status?: string
  order?: string
  batteryType?: string
}

export interface BatteryAnalysis {
  /**
   * 当前容量
   */
  capacity?: string
  /**
   * 电池数量
   */
  count?: number
  /**
   * 设计容量
   */
  designCapacity?: string
  /**
   * 健康状态（1：优秀 2：良好 3：一般 4：较差）
   */
  healthStatus?: string
  /**
   * 电池功率
   */
  power?: string
  /**
   * 电池SOC
   */
  soc?: string
  /**
   * 电池状态[1:充电中 2:放电中 3:待机 4:离线]
   */
  status?: number
  /**
   * 温度
   */
  temperature?: string
  /**
   * 工作模式(1:自由模式 2:分时模式)
   */
  workMode?: number

  updatedAt?: string
}
