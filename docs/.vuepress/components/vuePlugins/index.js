
import permission from './permissionDirective.js'
import resizeAble from './resizeAbleDirective.js'
// import {
//   buildFormFields,
//   appendToPreset
// } from '../dynamicPage/utils/tool'


export default {
  install(Vue) {
    if (this.install.installed) return;
    this.install.installed = true;

    Vue.directive('permission',permission)
    Vue.directive('resize',resizeAble)
  },
};
  
   
  
  