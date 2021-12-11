# sub-app
### 基于qiankun微前端的子应用模板（子应用无须安装qiankun）

#####  改造步骤：

1. src目录下 
  public-path.ts 
  ```typescript
    if (window.__POWERED_BY_QIANKUN__) {
        __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
      }
  ```
2. vue.config.js增加允许跨域访问,libraryTarget 设置为 umd
  ```javascript
    module.exports = {
      devServer: {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
      },
      configureWebpack() {
        output: {
          library: `${name}-[name]`,  // 微应用的包名，这里与主应用中注册的微应用名称一致
          libraryTarget: 'umd',  // 把微应用打包成 umd 库格式
          jsonpFunction: `webpackJsonp_${name}`,  // 按需加载相关，设置为 webpackJsonp_微应用名称 即可
        },
      }
    }


  ```
3. main.ts文件中导入pablic-path
4. 子应用挂载函数，在主应用中运行时将在 mount 生命周期钩子函数中调用，可以保证在沙箱内运行。
  ```typescript 
    function render (props = {}) {
      const { container } = props as any
      instance = createApp(App)
      router =  createRouter({
        history: createWebHistory(
          window.__POWERED_BY_QIANKUN__ ? '/' : '/'
        ),
        routes
      })

      instance?.mount(container ? container.querySelector('#app') : '#app')
    }
  ```
5. 微应用独立运行时，直接执行 render 函数挂载微应用。
  ```typescript
    if (!window.__POWERED_BY_QIANKUN__) {
      render()
    }
  ```
6. 微应用导出的生命周期钩子函数 - bootstrap, mount, unmount
  ```typescript
    export async function bootstrap () {
      console.log('app bootstraped')
    }

    export async function mount (props: Record<string, any>) {
      render(props)
    }

    export async function unmount () {
      if (instance!._container === null) {
        throw Error('instance._container is null')
      }
      instance?.unmount('#app')
      instance!._container.innerHTML = ''
      instance = null
      router = null
    }
  ```
  备注：判断子应用是否处于qiankun环境来规划菜单