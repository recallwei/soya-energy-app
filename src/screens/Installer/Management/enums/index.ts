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

export enum Orderby {
  'Latest_Installation_Date' = '0',
  'Earlier_Installation_Date' = '1',
  'Daily_Production_High_to_Low' = '2',
  'Daily_Production_Low_to_High' = '3',
  'Maximum_Installed_Capacity' = '4',
  'Minimum_Installed_Capacity' = '5'
}

export enum DisplayRange {
  'All' = '0',
  'My' = '1',
  'Customer' = '2',
  'Visitors' = '3',
  'Others' = '4'
}

export enum PlantType {
  'On_Grid' = '0',
  'Energy_Storage' = '1',
  'AC_Coupling' = '2'
}

export enum UseType {
  'Home_Use' = '0',
  'Industrial_And_Commercial_Roof' = '1',
  'Ground_Mounted_Plant' = '2',
  'Poverty_Alleviation_Power_Plant' = '3'
}

export enum GridType {
  'Export_All_To_Grid' = '0',
  'Self_Consumption' = '1',
  'Off_Grid_Mode' = '2'
}

export enum FundingMethod {
  'Owner_Full_Payment' = '0',
  'Owners_Loan' = '1',
  'Self_Invested_Power_Plant' = '2',
  'Joint_Venture_With_Owner' = '3'
}

export enum Others {
  'Partially_Offline' = '0'
}
