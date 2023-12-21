export interface CreatePlantForm {
  plantName: string
  systemPower: string
  country: string
  timeZone: string
  address: string
  type: string
  moduleNum?: string
  pvPanelAzimuth?: string
  pvPanelAngle?: string
}
