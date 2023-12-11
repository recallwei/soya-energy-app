export enum ManagementTab {
  'Plant' = 'Plant',
  'Inverter' = 'Inverter',
  'Battery' = 'Battery'
}

export enum PlantTabStatus {
  'All' = '0',
  'Normal' = '1',
  'Alarm' = '2',
  'Offline' = '3',
  'NotMonitored' = '4'
}

export enum InverterTabStatus {
  'All' = '0',
  'Normal' = '1',
  'Alarm' = '2',
  'Offline' = '3',
  'NotMonitored' = '4'
}

export enum BatteryTabStatus {
  'All' = '0',
  'Charging' = '1',
  'DisCharging' = '2',
  'Standby' = '3',
  'Offline' = '4'
}

export enum PlantOrderby {
  'Latest_Installation_Date' = '1',
  'Earlier_Installation_Date' = '2',
  'Daily_Production_High_to_Low' = '3',
  'Daily_Production_Low_to_High' = '4',
  'Maximum_Installed_Capacity' = '5',
  'Minimum_Installed_Capacity' = '6'
}

export enum InverterOrderby {
  'Latest_Installation_Date' = '1',
  'Created_Earlier_Than' = '2',
  'Maximum_Real_Time_Power' = '3',
  'Minimum_Real_Time_Power' = '4'
}

export enum BatteryOrderby {
  'Latest_Installation_Date' = '1',
  'Created_Earlier_Than' = '2'
}

export enum DisplayRange {
  'My' = '1',
  'Customer' = '2'
}

export enum PlantType {
  'On_Grid' = '1',
  'Energy_Storage' = '2',
  'AC_Coupling' = '3'
}

export enum Others {
  'Partially_Offline' = '1'
}

export enum InverterType {
  'On_Grid' = '1',
  'Energy_Storage' = '2',
  'AC_Coupling' = '3'
}

export enum BatteryType {
  'BuiltIn' = '1',
  'Expand' = '2'
}
