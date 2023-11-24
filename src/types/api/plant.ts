export interface Plant {
  /**
   * 主键 ID
   */
  id: string
  /**
   * 电站容量
   */
  siteCapacity?: string
  /**
   * 站点 Code
   */
  siteCode?: string
  /**
   * 并网类型
   */
  siteGridType?: string
  /**
   * 站点名称
   */
  siteName?: string
  /**
   * 连接类型
   */
  siteNetType?: string
  /**
   * 站点类型
   */
  siteType?: string
  /**
   * 封面地址
   */
  siteUrl?: string
  /**
   * 业务状态
   */
  status?: string
  /**
   * 用户
   */
  userName?: string
}
