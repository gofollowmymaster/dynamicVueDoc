/* const context=require.content(需要搜索的目录,是否搜索子目录,匹配文件的正则表达式)
context.resolve()、context.keys()、context.id
*/
 


const files = require.context("./", true, /\.vue$/);
export const components = {};
files.keys().forEach((url) => {
 let urlKey = url.replace(/.*\/(\w*)\.vue$/, "$1"); //文件名作为key
 let fileDefault = files(url).default; //export default 文件内容
 components[urlKey] = fileDefault;
});

import MonacoEditor from 'vue-monaco-editor'

export default {
 install(Vue) {
   if (this.install.installed) return;
   this.install.installed = true;

   for (let name in components) {
     Vue.component(name, components[name]);
   }
   Vue.component('MonacoEditor', MonacoEditor);
 },
};



