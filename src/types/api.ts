type Id = number | string

export type HttpAPI = {
  get(): Promise<any>,
  show(id: Id): Promise<any>,
  post(data: object): Promise<any>,
  put(id: Id, data?: object): Promise<any>,
  delete(id: Id ): Promise<any>
}