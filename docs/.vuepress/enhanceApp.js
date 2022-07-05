 

 
import {
  buildFormFields,
  appendToPreset,buildSearchFields,buildTableFields,buildDetailFields
} from 'dyvue2'

import "dyvue2/lib/dyvue2.css"
import 'element-ui/lib/theme-chalk/index.css';


const dev = "//23.13.5.135:8090";  
const amapWebKey = 'ffe3f53e63db6ca6bbe1d85264a8fc5b'
const amapWebMapKey = '467fddcf60be0b46a5506d94cd2cc858'
const tandiMapKey = 'b0c8343e73356d02148906ef935c9cf8'
const amapStyleConfig={
    zoom:15,
    zooms:[13, 18],
    showLabel:false,
    expandZoomRange:false,
    animateEnable:true,
    jogEnable:true,
    center:[106.559675,29.559168], 
    labelzIndex:120,
    lockMapBound:10000,
    regionPath:[]
}
const isDebug=false
const host = dev;

 


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

  if (!isServer) {
    import('element-ui').then(({default:ElementUI})=>{
      Vue.use(ElementUI)
    })
    import('dyvue2').then(({default:dyPugin})=>{
      Vue.use(dyPugin, {
        actionTip:'msg',
        isDebug,
        host,
        staticHost:'http:'+host+'/file/static',
        amapWebKey,
        amapWebMapKey,
        tandiMapKey,
        amapStyleConfig,
        regionCode:'500103000000'
    })
    })
    import('./components/vuePlugins/index.js').then(({default:dyPugin})=>{
      Vue.use(dyPugin)
    })
    import('./components/pageBuilder/index').then(({default:pageBuilder})=>{
    Vue.use(pageBuilder)
  })






   

  }
}
 