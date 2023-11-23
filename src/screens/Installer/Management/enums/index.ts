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

export enum DisplayRange {
  'All',
  'My',
  'Customer',
  'Visitors',
  'Others'
}

export enum PlantType {
  'On_Grid',
  'Energy_Storage',
  'AC_Coupling'
}

export enum UseType {
  'Home_Use',
  'Industrial_And_Commercial_Roof',
  'Ground_Mounted_Plant',
  'Poverty_Alleviation_Power_Plant'
}

export enum GridType {
  'Export_All_To_Grid',
  'Self_Consumption',
  'Off_Grid_Mode'
}

export enum FundingMethod {
  'Owner_Full_Payment',
  'Owners_Loan',
  'Self_Invested_Power_Plant',
  'Joint_Venture_With_Owner'
}

export enum LoadMonitoring {
  'N',
  'Y'
}
