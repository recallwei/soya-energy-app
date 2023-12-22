export interface EnergyBenefit {
  /**
   * CO2减排
   */
  co2Reduction?: number
  /**
   * 累计植树
   */
  treeTotal?: number
}

export interface EnergyFlow {
  /**
   * 电池流向[1:逆进 2:逆出]
   */
  batteryDirection?: number
  /**
   * 电池累计
   */
  batteryTotal?: number
  /**
   * 电网流向[1:逆进 2:逆出]
   */
  gridDirection?: number
  /**
   * 电网累计
   */
  gridTotal?: number
  /**
   * 负载流向[1:逆进 2:逆出]
   */
  loadDirection?: number
  /**
   * 负载累计
   */
  loadTotal?: number
  /**
   * 太阳能流向[1:逆进 2:逆出]
   */
  solarDirection?: number
  /**
   * 太阳能累计
   */
  solarTotal?: number
}

export interface EnergyStatistics {
  /**
   * CO2
   */
  co2?: string
  /**
   * 上网电量
   */
  onlinePower?: string
  /**
   * 购买电量
   */
  purchasePower?: string
  /**
   * 自己自足
   */
  selfConsumptionPower?: string
  /**
   * 自发自用
   */
  selfUsePower?: string
  /**
   * tree
   */
  tree?: string
}

export interface EnergyQueryModel {
  batteryNo?: string
  deviceSN?: string
  inverterNo?: string
  plantNo?: string
}
