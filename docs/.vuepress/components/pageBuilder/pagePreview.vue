<template>
  <DynamicCurdPage
    :key="pageKey"
    style="margin-left:16px;margin-right:16px;width:auto" 
    class="page-wraper"
    :entityLabel="entityLabel"
    :fields="fields"
    :pageOptionsprops="pageOptions"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</template>
<script>
const entityLabel = "实体";

import fields from "./fields.js";

import { mockDyFields ,  } from "../vuePlugins/utils";
import Mock from "mockjs";
import pageOptions from  "./pageConfig.js"

import { buildFormFields ,deepMerge ,appendToPreset} from  "dyvue2"


 

function oldtreeUpdateApi(params) {
  return Promise.resolve({});
}

function oldtreeSaveApi(params) {
  return Promise.resolve({});
}

function oldtreeDeleteApi(ids) {
  ids = Array.isArray(ids) ? ids.join(",") : ids;
  return Promise.resolve({});
}

function oldtreeDetailApi(data) {
  debugger
  return Promise.resolve(Mock.mock(mockDyFields(parseObject(fields))));
}
function buildDynamicSelectOption(){
   return {}
}

 

    function  parseObject(content){
      try{
       return  eval(content)
      }catch(err){
        console.error(err)
      }
    }

    var formFields=  buildFormFields( parseObject(fields))


export default {
  name: "pagePreview",
  components: {
    // CurdPage
  },
  data() {
    return {
      pageKey:new Date().getTime(),
      isLoaded:false,
      // form字段
      fields:parseObject(fields),
      entityLabel,
      // 页面配置
      apiPromises: {
        create: oldtreeSaveApi,
        bulkdelete: oldtreeDeleteApi,
        list:   (params)=> {
          return Promise.resolve(
            Mock.mock({
              "list|10": [mockDyFields(this.fields)],
              totalCount: 20,
            })
          );
        },
        // detail: oldtreeDetailApi,
        update: oldtreeUpdateApi,
      },
      // 页面配置
      pageOptions: {

         
      },
      component:''
    };
  },
  created() {
    const self = this;
    // const 
    window.addEventListener("message", (ev, data) => {
      if (
        ev.origin.indexOf(location.hostname) > -1 &&
        ev.data.origin == "jsEditor"
      ) {
   
        debugger
        let contentParsed

        try{
          contentParsed=  eval(ev.data.content)
        }catch(err){
          console.error(err)
        }

        if(!contentParsed)return 

        if (ev.data.type == "fields") {
          try{
            contentParsed=  eval(ev.data.content)
          }catch(err){
            console.error(err)
          }

          self.fields = contentParsed;

          this.onPageOptionChange(self.pageOptionsCache)


        }
        if (ev.data.type == "page") {
          this.onPageOptionChange(ev.data.content)


        }
        self.pageKey= new Date().getTime()

      }
    });

  },
  mounted(){
      this.pageOptions = deepMerge(
            this.pageOptions,
            parseObject(pageOptions)
      );
  },
  methods: {
    onPageOptionChange(content){
        let contentParsed

        try{
            formFields=  buildFormFields( this.fields)
            console.log('--formFields1--',formFields)
            contentParsed=  eval(content)
            console.log('--contentParsed--',contentParsed)
        }catch(err){
          console.error(err)
        }

        this.pageOptions =contentParsed;
        this.pageOptionsCache =content
    },
    parseObjByEval(obj) {
      return eval(obj);
    },
    parseObjectByJson(obj) {
      return JSON.parse(obj, (k, v) => {
        if (typeof v === "string" && v.startsWith("function")) {
          return window.eval("(" + v + ")");
        }
        return v;
      });
      },
   
   
  },
};
</script>
<style lang="css" scoped>
.page-wraper{
  position: relative;
}
</style>
