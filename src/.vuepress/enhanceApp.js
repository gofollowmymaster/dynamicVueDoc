 

 
import {
  buildFormFields,
  appendToPreset,buildSearchFields,buildTableFields,buildDetailFields,generateActionOption
} from 'dyvue2'
import dyvue2  from 'dyvue2'
import dyPugin  from './components/vuePlugins/index.js'
import pageBuilder  from './components/pageBuilder/index.js'
import ElementUI from 'element-ui'
import dyconfig  from './dyconfig'

 
import('./components/pageBuilder/index') 


import "dyvue2/lib/dyvue2.css"
import 'element-ui/lib/theme-chalk/index.css';

 

 


export default async ({
  Vue,
      options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
   
  Vue.prototype.$buildFormFields=buildFormFields
  Vue.prototype.$buildSearchFields=buildSearchFields
  Vue.prototype.$buildTableFields=buildTableFields
  Vue.prototype.$buildDetailFields=buildDetailFields
  Vue.prototype.$appendToPreset=appendToPreset
  Vue.prototype.$generateActionOption=generateActionOption  


  if (!isServer) {
    import('element-ui').then(({default:ElementUI})=>{
      Vue.use(ElementUI)
    })
    import('dyvue2').then(({default:dyPugin})=>{
      Vue.use(dyPugin, dyconfig)
    })
    import('./components/vuePlugins/index.js').then(({default:dyPugin})=>{
      Vue.use(dyPugin)
    })
    import('./components/pageBuilder/index').then(({default:pageBuilder})=>{
      Vue.use(pageBuilder)
    })
  }else{
    Vue.use(ElementUI)
    Vue.use(dyPugin)
    Vue.use(pageBuilder)
    Vue.use(dyPugin, dyconfig)


  }
}
 