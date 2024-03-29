export type Product = {
  id?: number,
  name: string,
  slug?: string,
  category_id: number | null,
  code: string,

  id_description: string,
  en_description: string,
  features: string,
  premium_material: string,

  dimension_width: number,
  dimension_length: number,
  dimension_height: number,
  
  seat_width: number,
  seat_length: number,
  seat_height: number,

  created_at?: Date,
  updated_at?: Date
}

export type FormProduct = Product & {
  files: Array<any>,
  filesHeader: Array<any>,
  filesDimension: Array<any>,
  removedFiles: Array<any>,
  removedFilesHeader: Array<any>,
  removedFilesDimension: Array<any>,
  order: Array<any>,
  feature_ids: Array<number>
}

export type ProductFilter = {
  name: string,
  code: string,
  category_id: number | null
}