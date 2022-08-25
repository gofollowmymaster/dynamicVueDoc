

import permission from './permissionDirective.js'
import resizeAble from './resizeAbleDirective.js'
// import {
//   buildFormFields,
//   appendToPreset
// } from '../dynamicPage/utils/tool'

// const files = require.context("./", true, /\.vue$/);
// export const components = {};
// files.keys().forEach((url) => {
//  let urlKey = url.replace(/.*\/(\w*)\.vue$/, "$1"); //文件名作为key
//  let fileDefault = files(url).default; //export default 文件内容
//  components[urlKey] = fileDefault;
// });


export default {
  install(Vue) {
    if (this.install.installed) return;
    this.install.installed = true;

    // for (let name in components) {
    //   Vue.component(name, components[name]);
    // }

    Vue.directive('permission',permission)
    Vue.directive('resize',resizeAble)
  },
};
  
   
  
  