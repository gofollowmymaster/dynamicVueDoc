import dynamicPage from "../dynamicPage/index.js"
import permission from './directive.js'


 

export default {
    install(Vue) {
      if (this.install.installed) return;
      this.install.installed = true;
  
      Vue.directive('permission',permission)
      Vue.use(dynamicPage)

    },
  };
  
   
  
  