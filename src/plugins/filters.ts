function ellipsis(text: string, max: number): string {
  return text.substring(0, max) + '...';
}


export default {
  install: (app: any) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$ellipsis = ellipsis
  }
}