import dynamicPage from "../dynamicPage/index.js"
import permission from './permissionDirective.js'
import resizeAble from './resizeAbleDirective.js'


 

export default {
    install(Vue) {
      if (this.install.installed) return;
      this.install.installed = true;
  
      Vue.directive('permission',permission)
      Vue.directive('resize',resizeAble)
      Vue.use(dynamicPage)

    },
  };
  
   
  
  