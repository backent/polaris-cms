import { defineStore } from "pinia";

export const useAppStore = defineStore('app', {
  state: () => ({
    fullScreen: false
  }),
  getters: {
    isFullScreen: (state) => {
      return state.fullScreen
    }
  },
  actions: {
    setFullScreen(value: boolean) {
      this.fullScreen = value
    }
  }
})