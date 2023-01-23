export type Setting = {
  id?: number,
  type: SettingTypes,
  value: string,
}

export type Settings = Array<Setting>

const settingType = ['product-sort', 'product-category'] as const
export type SettingTypes = typeof settingType[number]