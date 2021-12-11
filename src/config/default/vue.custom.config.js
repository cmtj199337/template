const vueDefaultConfig = {
    publicPath: process.env.NODE_ENV === 'development' ?  '/' : '/subapp/cache',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    //webpack 配置的项目名称
    title: '缓存中心',
    titleSeparator: ' - ',
    titleReverse: false,
    devPort: '9001',
    abbreviation: 'vt2at',
    providePlugin: {},
    build7z: false,
    startMessage:''
}

module.exports = vueDefaultConfig
  