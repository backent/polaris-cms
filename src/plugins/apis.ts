import type { HttpAPI } from "@/types/api"
import type { AxiosInstance } from "axios"

const postFix = 'API'

const defaultMethodsRouteFactory = (http: AxiosInstance, route: string): HttpAPI => {
  return {
    get: () => http.get(route),
    show: (id: number | string) => http.get(`${route}/${id}`),
    post: (data: object) => http.post(route, data),
    put: (id: number | string, data?: object) => http.put(`${route}/${id}`, data),
    delete: (id: number | string) => http.delete(`${route}/${id}`)
  }
}

const apis = {
  categories: (http: AxiosInstance): HttpAPI => {
    const route = '/api/categories'
    return defaultMethodsRouteFactory(http, route)
  },
  types: (http: AxiosInstance): HttpAPI => {
    const route = '/api/types'
    return defaultMethodsRouteFactory(http, route)
  },
  products: (http: AxiosInstance): HttpAPI => {
    const route = '/api/products'
    return defaultMethodsRouteFactory(http, route)
  },
  tempMedia: (http: AxiosInstance): HttpAPI => {
    const route = '/api/temp-media'
    return defaultMethodsRouteFactory(http, route)
  },
}

function registerApis(app: any, http: AxiosInstance) {
  Object.entries(apis).forEach(([apiName, routes]) => {
    app.provide(`${apiName}${postFix}`, routes(http))
  })
}

export default {
  install: (app: any) => {
    registerApis(app, app.config.globalProperties.$http)
  }
}