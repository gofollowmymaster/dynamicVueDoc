/* const context=require.content(需要搜索的目录,是否搜索子目录,匹配文件的正则表达式)
context.resolve()、context.keys()、context.id
*/

import globalDialogForm from "./utils/globalDialogForm"
import globalDialogPage from "./utils/globalDialogPage"
import bus from "./utils/bus"


const files = require.context("./components", true, /\.vue$/);
export const components = {};
files.keys().forEach((url) => {
 let urlKey = url.replace(/.*\/(\w*)\.vue$/, "$1"); //文件名作为key
 let fileDefault = files(url).default; //export default 文件内容
 components[urlKey] = fileDefault;
});


import './css/index.less'



export default {
 install(Vue) {
   if (this.install.installed) return;
   this.install.installed = true;

   for (let name in components) {
     Vue.component(name, components[name]);
   }
   Vue.prototype.$globalDialogPage=globalDialogPage
   Vue.prototype.$globalDialogForm=globalDialogForm
   Vue.prototype.$dynamicBus=bus


 },
};



