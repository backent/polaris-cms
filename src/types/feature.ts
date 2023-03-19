export type Feature = {
  id?: number,
  name: string,
  order: number,
  file_name?: string,
  original_name?: string,
  link?: string,
  created_at?: Date,
  updated_at?: Date,
}

export type Features = Array<Feature>
export type FormFeature = Feature & {
  temp_id?: number
}