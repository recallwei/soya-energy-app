export enum ManagementTab {
  'Plant' = 'Plant',
  'Invertor' = 'Invertor',
  'Battery' = 'Battery'
}

export enum TabStatus {
  'All',
  'Normal',
  'Alarm',
  'Offline',
  'NotMonitored'
}

export enum Orderby {
  'Latest_Installation_Date',
  'Earlier_Installation_Date',
  'Daily_Production_High_to_Low',
  'Daily_Production_Low_to_High',
  'Maximum_Installed_Capacity',
  'Minimum_Installed_Capacity'
}
