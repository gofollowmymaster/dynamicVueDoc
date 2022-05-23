 

 
import {
  buildFormFields,
  appendToPreset
} from './components/dynamicPage/utils/tool'

import 'element-ui/lib/theme-chalk/index.css';
  

export default async ({
  Vue,
      options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  debugger
  Vue.prototype.$buildFormFields=buildFormFields
  Vue.prototype.$appendToPreset=appendToPreset

  if (!isServer) {
    import('element-ui').then(({default:ElementUI})=>{
      Vue.use(ElementUI)
    })
    import('./components/vuePlugins/index.js').then(({default:dyPugin})=>{
      Vue.use(dyPugin)
    })
    import('./components/pageBuilder/index').then(({default:pageBuilder})=>{
    Vue.use(pageBuilder)
  })






   

  }
}
 