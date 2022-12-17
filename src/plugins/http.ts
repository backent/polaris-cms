import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:7008',
})


export default {
  install: (app: any) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$http = instance
    app.provide('http', instance)
  }
}