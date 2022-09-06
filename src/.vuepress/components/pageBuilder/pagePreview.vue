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
import mock from "mockjs";

import { buildFormFields ,deepMerge ,appendToPreset} from  "dyvue2"
import pageConfig from  "./pageConfig.js"

var Mock = mock
var MockDyFields =  mockDyFields
 

function updateApi(params) {
  return Promise.resolve({});
}

function saveApi(params) {
  return Promise.resolve({});
}

function deleteApi(ids) {
  ids = Array.isArray(ids) ? ids.join(",") : ids;
  return Promise.resolve({});
}

function detailApi(data) {
  debugger
  return Promise.resolve(Mock.mock(MockDyFields(parseObject(fields))));
}
 

    var formFields=  buildFormFields( parseObject(fields))
 

    function  parseObject(content){
      let res
      try{
       res=  eval(content)
      }catch(err){
        console.error(err)
      }
      return res
    }



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
        create: saveApi,
        bulkdelete: deleteApi,
        list:   (params)=> {
          return Promise.resolve(
            Mock.mock({
              "list|10": [MockDyFields(this.fields)],
              totalCount: 20,
            })
          );
        },
        // detail: oldtreeDetailApi,
        update: updateApi,
      },
      // 页面配置
      pageOptions: {

         
      },
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
          contentParsed=  parseObject(ev.data.content)
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

         self.pageOptionsCache&& this.onPageOptionChange(self.pageOptionsCache)


        }
        if (ev.data.type == "page") {
          this.onPageOptionChange(ev.data.content)
        }
        self.pageKey= new Date().getTime()

      }
    });

  },
  mounted(){
       let contentParsed
     try{
       contentParsed= eval(pageConfig)
      }catch(err){
        console.error(err)
      }

      let {pageOptions,apiPromises }=  contentParsed
      this.pageOptions = deepMerge(
            this.pageOptions, pageOptions
      );
      this.apiPromises= deepMerge(this.apiPromises,apiPromises)
  },
  methods: {
    onPageOptionChange(content){
        let contentParsed

        try{
            // formFields=  buildFormFields( this.fields)
            console.log('--formFields1--',formFields)
            contentParsed=  eval(content)
            console.log('--contentParsed--',contentParsed)
        }catch(err){
          console.error(err)
        }
        let {pageOptions,apiPromises }=  contentParsed

        this.pageOptions =pageOptions;
        this.apiPromises= deepMerge(this.apiPromises,apiPromises)

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
